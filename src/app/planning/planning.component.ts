import { copyArrayItem } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { elementAt, Subject } from 'rxjs';
import { AddExerciceComponent } from '../add-exercice/add-exercice.component';
import { DataService } from '../shared/data.service';
import { DialogService } from '../shared/dialog.service';
import { Method } from '../shared/method';
import { AddExerciceSeanceComponent } from './add-exercice-seance/add-exercice-seance.component';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit {

  constructor(private dataService: DataService, private method: Method, private dialogService: DialogService, private bottomSheet: MatBottomSheet) {
    dialogService.getClose().subscribe(res => {
      this.openDialogBox = false;
    });
  }

  show: boolean = false;
  error: boolean = false;
  allPlanning: any;
  selectedPlanning: any;
  todayPlanning: any[] = [];
  lastWeekPlanning: any[] = [];
  titles: any[] = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];
  allExercices: any;
  allExercicesFiltered: any[] = [];
  allMuscles: any;
  allUsers: any;
  allUsersFiltered: any;
  allLigneExercice: any[] = [];
  createPlanning: FormGroup = new FormGroup({
    famille: new FormControl("",Validators.required),
  });
  allFamilles: any;
  allFamillesFiltered: any;
  userId: string = "";
  userName: string = "";
  planning: any[] = [];
  dateForm: FormGroup = new FormGroup({
    date: new FormControl(new Date(),Validators.required),
  });
  selectedDate: string = "";
  noSeries: any[] = [];
  yesSeries: any[] = [];
  openDialogBox: boolean = false;

  ngOnInit(): void {
    this.selectedDate = this.method.getDate(new Date());
    this.dataService.getData("/Params").subscribe(res => {
      this.allUsers = res;
      this.userId = res[0].id;
    });
    this.dataService.getData("/Famille").subscribe(fam => {
      this.allFamilles = fam;
      this.dataService.getData("/Exercice").subscribe(res => {
        this.allExercices = res;
      });
      this.dataService.getData("/Muscle").subscribe(res => {
        this.allMuscles = res;
        this.allFamilles.forEach((e:any) => {
          delete e.image;
          delete e.zone;
          delete e.schema;
          delete e.id;
          e.muscles = [];
          res.forEach((m:any) => {
            if(e.name === m.famille){
              e.muscles.push({name: m.name,serie:0});
            }
          });
        });
        
        this.dataService.getData("/Planning").subscribe(res => {
          this.dataService.getTodayData("/LigneExercice",this.selectedDate).subscribe(li => {
            this.allLigneExercice = li;
            if(res.length === 0)  this.error = true;
            else{
              this.show = true;
              this.allPlanning = res;
              this.allPlanning.forEach((element:any) => {
                if(element.name === "Antoine"){
                  element.planning.forEach((plan:any) => {
                    this.planning.push(plan);
                  });
                }
              });
              this.userName = "Antoine";
              this.setUser("Antoine");
            }
          });
        });
      });
    });
  }

  setTodayPlanning(day: number,date: string){
    let subject = new Subject<any>();
    this.dataService.getTodayData("/LigneExercice",date).subscribe(res => {
      let allLigneExercice = res.filter((e:any) => e.user === this.userName);
      let didSeance: boolean = false;
      allLigneExercice.forEach((exo: any) => {
        exo.details.forEach((detail: any) => {
          if(detail.serie !== 0 || detail.charge !== 0) didSeance = true;
        });
      });
      let plan: any = {
        exercices: []
      };
      if(allLigneExercice.length > 0 && didSeance){
        allLigneExercice.forEach((ligne: any) => {
          plan.exercices.push({
            serie: ligne.details.length,
            id: ligne.id,
            name: ligne.name
          });
        });
      } else{
        switch(day){
          case 0: 
            plan = this.planning.find((e:any) => e.day === "Dimanche");
          break;
          case 1: 
            plan = this.planning.find((e:any) => e.day === "Lundi");
          break;
          case 2: plan = this.planning.find((e:any) => e.day === "Mardi");
          break;
          case 3: plan = this.planning.find((e:any) => e.day === "Mercredi");
          break;
          case 4: plan = this.planning.find((e:any) => e.day === "Jeudi");
          break;
          case 5: plan = this.planning.find((e:any) => e.day === "Vendredi");
          break;
          case 6: plan = this.planning.find((e:any) => e.day === "Samedi");
          break;
        }
      }
      
      let dayPlanning: any[] = [];

      plan.exercices.forEach((element:any) => {
        const tab: any[] = [];
        for(let i = 0; i < element.serie; i++){
          tab.push({
            repetition: 0,
            charge: 0
          });
        }
        const obj = {
          name: element.name,
          serie: element.serie,
          details: tab
        }
        dayPlanning.push(obj);
      });

      
    
      dayPlanning.forEach((element:any,index:any) => {
        const find = allLigneExercice.find((e:any) => {
          if(e.name === element.name && e.date === date) return true;
          else   return false;
        });
        if(find != null){
          element.details = find.details;
        }
      });

      this.setFamilles();
      subject.next(dayPlanning);
    });
    return subject.asObservable();
  }

  setFamilles(){
    let tamp: any[] = [];
    this.planning.forEach((e:any) => {
      e.exercices.forEach((exo:any) => {
        this.allExercices.forEach((element:any) => {
          if(element.name === exo.name){
            tamp.push({name: exo.name, serie: Number(exo.serie),muscles: element.primary});
          }
        });
      });
    });

    this.allFamilles.forEach((element:any)=>{
      element.muscles.forEach((mus:any) => {
        mus.serie = 0;
      });
    });

    this.allFamilles.forEach((element:any)=>{
      element.muscles.forEach((mus:any) => {
        tamp.forEach((t:any) => {
          const find = t.muscles.forEach((e:any) => {
            if(mus.name === e){
              mus.serie += Number(t.serie);
            }
          });
        });
      });
    });

    this.noSeries = this.allFamilles.filter((element:any) => {
      let no = false;
      element.muscles.forEach((e:any) => {
        if(e.serie === 0) no = true;
      });
      if(no)  return true;
      else  return false;
    });

    this.noSeries.forEach((element:any) => {
      let indexesToSuppres: any[] = [];
      element.muscles.forEach((e:any,index: number) => {
        if(e.serie !== 0) indexesToSuppres.push(index);
      });
      indexesToSuppres.forEach((e:any,index:number) => {
        element.muscles.splice(e-index,1);
      });
    });

    this.yesSeries = this.allFamilles.filter((element:any) => {
      let no = false;
      element.muscles.forEach((e:any) => {
        if(e.serie !== 0) no = true;
      });
      if(no)  return true;
      else  return false;
    });

    this.yesSeries.forEach((element:any) => {
      let indexesToSuppres: any[] = [];
      element.muscles.forEach((e:any,index: number) => {
        if(e.serie === 0) indexesToSuppres.push(index);
      });
      indexesToSuppres.forEach((e:any,index:number) => {
        element.muscles.splice(e-index,1);
      });
    });
  }

  filter(event: any,type: string) {
    const filterValue = event.target.value.toLowerCase();
    if(type === "Famille"){
      this.allFamillesFiltered = this.allFamilles.filter((element: any) => {
        const name: string = element.name.toLowerCase();
        if(name.includes(filterValue))  return true;
        else  return false;
      });
    } else if(type === "Users"){
      this.allUsersFiltered = this.allUsers.filter((element: any) => {
        const name: string = element.name.toLowerCase();
        if(name.includes(filterValue))  return true;
        else  return false;
      });
    }
  }

  setExercices(e:any){
    const famille = e.option.value;
    this.allExercicesFiltered = this.allExercices.filter((element:any) => {
      if(element.famille === famille)  return true;
      else  return false;
    });
    this.allExercicesFiltered.forEach((element:any) => {
      element.serie = 0;
      delete element.image;
      delete element.primary;
      delete element.secondary;
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if(event.previousContainer.id === "day"){
        transferArrayItem(event.previousContainer.data,event.container.data,event.previousIndex,event.currentIndex);
        if(event.container.id === "exercices"){
          this.allExercicesFiltered.splice(event.previousIndex, 1);
        }
      }
      else  copyArrayItem(event.previousContainer.data,event.container.data,event.previousIndex,event.currentIndex);
    }
  }

  removeItem(info: any,day: any){
    let indexToSuppress: number;
    this.planning.forEach((e:any) => {
      if(e.day === day){
        e.exercices.forEach((e:any,index:number) => {
          if(e.name == info.name) indexToSuppress = index;
        });
        e.exercices.splice(indexToSuppress,1);
      }
    });
  }

  setSerie(day:any,exercice:string,e:any){
    const serie = e.target.value;
    this.planning.forEach((element:any) => {
      if(element.day === day.day){
        element.exercices.forEach((exo:any) => {
          if(exo === exercice)  exo.serie = serie;
        });
      }
    });
  }

  setUser(e:any){
    this.planning = [];
    this.todayPlanning = [];
    this.noSeries = [];
    this.yesSeries = [];
    let user: string = "";
    if(e.option != null){
      this.userName = e.option.value;
      user = e.option.value;
    }
    else  user = e;
    this.selectedPlanning = this.allPlanning.find((params:any) => params.name === user);
    if(this.selectedPlanning != null){
      this.selectedPlanning.planning.forEach((element:any) => {
        this.planning.push(element);
      });
    }
    this.getPlanning();
  }

  getPlanning(){
    this.setTodayPlanning(this.dateForm.value.date.getDay(),this.selectedDate).subscribe(res => {
      this.todayPlanning = res;
      this.todayPlanning.forEach((exo:any) => {
        let volume = 0;
        exo.details.forEach((det: any) => {
          volume += det.charge * det.repetition;
        });
        exo.volumeTotal = volume;
      });
      const lastWeekDate = new Date(this.dateForm.value.date.getTime() - 7 * 24 * 60 * 60 * 1000);
      const lastWeekDateString = this.method.getDate(lastWeekDate);
      this.setTodayPlanning(lastWeekDate.getDay(), lastWeekDateString).subscribe(last => {
        this.lastWeekPlanning = last;
        this.lastWeekPlanning.forEach((exo:any) => {
          let volume = 0;
          exo.details.forEach((det: any) => {
            volume += det.charge * det.repetition;
          });
          exo.volumeTotal = volume;
        });
        this.todayPlanning.forEach((todayExo: any) => {
          const find = this.lastWeekPlanning.find((lastWeekExo:any) => lastWeekExo.name === todayExo.name);
          if(find){
            todayExo.totalVolumeLastWeek = find.volumeTotal;
          } else{
            todayExo.totalVolumeLastWeek = 0;
          }
        });
      });
    });
  }

  savePlanning(){
    const plan: any = {
      id: this.selectedPlanning.id,
      planning: this.planning
    };
    this.dataService.updateData("/Planning",this.selectedPlanning.id,plan)
  }

  setDate(event:any){
    const selectedDate = event.target.value;
    this.selectedDate = this.method.getDate(selectedDate);
    this.getPlanning();
    this.dataService.getTodayData("/LigneExercice",this.selectedDate);
  }

  saveResult(){
    this.todayPlanning.forEach((element:any) => {
      element.details.forEach((det:any) => {
        let i = /,/i
        det.charge.toString().replace(i,".");
        det.charge = Number(det.charge);
        det.repetition = Number(det.repetition);
      });
      const obj = {
        details: element.details,
        name: element.name,
        date: this.selectedDate,
        user: this.userName
      }
      const find = this.allLigneExercice.find((e:any) =>{
        if(e.name === element.name && e.date === this.selectedDate) return true
        else  return false;
      });
      if(find == null){
        this.dataService.addData("/LigneExercice",obj);
      } else{
        this.dataService.updateData("/LigneExercice",find.id,obj);
      }
    });
  }

  addExercice(){
    this.openDialogBox = true;
    this.dialogService.setComponent(AddExerciceComponent);
  }

  // test(e:any){
  //   console.log(e)
  // }
  
  addSerie(nameExercice:string){
    this.todayPlanning.forEach((element: any) => {
      if(element.name === nameExercice){
        const newNbSerie = (Number(element.serie) + 1).toString();
        element.serie = newNbSerie;
        element.details.push({repetition: 0, charge: 0});
      }
    });
  }

  removeSerie(nameExercice:string){
    this.todayPlanning.forEach((element: any) => {
      if(element.name === nameExercice){
        const newNbSerie = (Number(element.serie) - 1).toString();
        element.serie = newNbSerie;
        element.details.pop();
      }
    });
  }

  removeExercice(nameExercice:string){
    let indexToSuppress:number = 0;
    this.todayPlanning.forEach((element: any, index: number) => {
      if(element.name === nameExercice) indexToSuppress = index;
    });

    this.todayPlanning.splice(indexToSuppress,1);
  }

  addExerciceSeance(): void {
    const bottomSheet = this.bottomSheet.open(AddExerciceSeanceComponent);

    bottomSheet.afterDismissed().subscribe(res => {
      this.todayPlanning.push({
        name: res,
        details: [
          {repetition: 0, charge: 0}
        ],
        serie: "1"
      })
    });
  }

  setVolume(exo: any, planning: any[]){
    this.todayPlanning.forEach((e:any) => {
      if(e.name === exo.name){
        let volume = 0;
        exo.details.forEach((detail:any) => {
          volume += Number(detail.charge) * Number(detail.repetition);
        });
        e.volumeTotal = volume;
      }
    });
  }
}
