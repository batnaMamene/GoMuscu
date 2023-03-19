import { trigger, transition, style, stagger, animate, state, query } from '@angular/animations';
import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddDepenseComponent } from '../add-depense/add-depense.component';
import { AddExerciceComponent } from '../add-exercice/add-exercice.component';
import { AlimentComponent } from '../aliment/aliment.component';
import { DataService } from '../shared/data.service';
import { Method } from '../shared/method';
import { faCalculator,faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { DialogBoxComponent } from '../shared/dialog-box/dialog-box.component';
import { DialogService } from '../shared/dialog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('linkAnimations1', [
      state('hidden', style({
        opacity: '0',
      })),
      state('show', style({
        opacity: '1',
      })),
      transition('* => show', [
        animate('2s ease')
      ]),
      transition('* => hidden', [
        animate('2s ease')
      ])
    ]),
    trigger('linkAnimations2', [
      state('hidden', style({
        opacity: '0'
      })),
      state('show', style({
        opacity: '1'
      })),
      transition('* => show', [
        animate('2s ease')
      ]),
      transition('* => hidden', [
        animate('2s ease')
      ])
    ]),
    trigger('tableAnimation', [
      state('hidden', style({
        transform: 'rotate(0deg)'
      })),
      state('show', style({
        transform: 'rotateY(180deg)'
      })),
      transition('* => show', [
        animate('2s ease')
      ]),
      transition('* => hidden', [
        animate('2s ease')
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  @ViewChildren('muscleButton')  muscleButton!: any;
  @ViewChildren('roundImg')  roundImg!: any;

  constructor(private methods: Method,private dataService: DataService,private dialogService: DialogService) {
    dialogService.getClose().subscribe(res => {
      this.openDialogBox = false;
    });
  }

  planning: any[] = [];
  familles: any[] = [];
  today: string = "";
  allLigneExercice: any[] = [];
  allPlanning: any;
  todayPlanning: any[] = [];
  calculatorIcon = faCalculator;
  planningIcon = faCalendarDay;
  openDialogBox: boolean = false;

  userForm: FormGroup = new FormGroup({
    name: new FormControl("",Validators.required)
  });
  user: any = {
    name: "Utilisateur"
  };
  allUsers: any[] = [];
  allCalculateurs: any[] = [];

  calculateur: any = {
    lipides: 0,
    proteines: 0,
    glucides: 0,
    fibres: 0,
    calories: 0
  };
  objectifs: any = {
    lipides: 0,
    proteines: 0,
    glucides: 0,
    MS: 0
  };
  depense: any = {
    calories: 0
  };
  panelObj: boolean = false;

  linkAnimations: string[] = ['show','show','show','show','hidden','hidden','hidden','hidden'];
  tableAnimation: string = "";
  tableTitles:string[] = ["Protéines","Glucides","Lipides","Fibres","Calories"];
  currentPosition: number = 0;
  currentPositionBottom: number = 0;
  disableScroll: boolean = false;
  

  ngOnInit(): void {
    if(window.innerHeight >= window.innerWidth) this.linkAnimations = ['show','show','show','show','show','show','show','show']
    this.today = this.methods.getDay(new Date().getDay());

    this.dataService.getData('/Params').subscribe(res => {
      this.dataService.getData('/Planning').subscribe(plan => {
        this.dataService.getData('/Famille').subscribe(f => {
          plan.forEach((element: {
            muscles: any[]; jour: string;}) => {
            if(element.jour === this.today){
              f.forEach((fam: { name: any; }) => {
                element.muscles.forEach(musc => {
                  if(fam.name === musc) this.familles.push(fam);
                });
              });
            }
          });
        });
        this.dataService.getTodayData("/LigneExercice",this.methods.getDate(new Date())).subscribe(li => {
          this.allLigneExercice = li;
          this.allPlanning = plan;
          this.allPlanning.forEach((element:any) => {
            if(element.name === "Antoine"){
              element.planning.forEach((pla:any) => {
                this.planning.push(pla);
              });
            }
          });
          this.setTodayPlanning(new Date().getDay());
        });
        this.allUsers = res;
        const find = this.allUsers.find((e:any) =>  e.name === "Antoine")
        this.user = find;
        this.dataService.getTodayData("/Depense",this.methods.getDate(new Date())).subscribe(dep => {
          this.objectifs = this.methods.calculObjectifs(this.user.poids,this.user.MG,this.user.coefLip,this.user.coefProt,this.user.act);
          dep.forEach((d:any) => {
            if(d.name === "Antoine"){
              this.objectifs.calories += d.calories;
              this.objectifs.glucides += d.calories/4;
            }
          });
        });
        this.dataService.getTodayData('/Calculateur',this.methods.getDate(new Date())).subscribe(res => {
          if(res[0] != null){
            res.forEach((element:any) => {
              if(element.name === "Antoine"){
                this.calculateur.calories = element.calories;
                this.calculateur.proteines = element.proteines;
                this.calculateur.lipides = element.lipides;
                this.calculateur.glucides = element.glucides;
                this.calculateur.fibres = element.fibres;
              }
            }); 
          }
        });
      });
    });
  }

  ngAfterViewInit(){
    this.setAnimation();
  }

  setAnimation(): void {
      if(this.muscleButton != null && window.innerHeight < window.innerWidth){
        window.scroll()
        window.addEventListener("scroll", (event)=>{
          let positionBotton = window.pageYOffset + window.innerHeight;
          this.muscleButton.forEach((element:any) => {
            let index = 0;
            switch(element.nativeElement.id){
              case 'cal': index = 0;
              break;
              case 'sui': index = 1;
              break;
              case 'addCal': index = 2;
              break;
              case 'addAl': index = 3;
              break;
              case 'exo': index = 4;
              positionBotton -= 40;
              break;
              case 'addExo': index = 5;
              positionBotton -= 40;
              break;
              case 'plan': index = 6;
              positionBotton -= 40;
              break;
              case 'fam': index = 7;
              positionBotton -= 40;
              break;
            }
            if(positionBotton > element.nativeElement.offsetTop - window.innerHeight * 0.15){
              this.linkAnimations[index] = "show";
            } 
            // else{
            //   this.linkAnimations[index] = "hidden";
            // }
            // if(window.pageYOffset - window.innerHeight * 0.15 > element.nativeElement.offsetTop){
            //   this.linkAnimations[index] = "hidden";
            // }
          });

          this.roundImg.forEach((element:any) => {
            let positionTopElement = element.nativeElement.offsetTop - element.nativeElement.clientHeight/2;
            let positionBottomElement = element.nativeElement.offsetTop + element.nativeElement.clientHeight;
            let offset = ((window.innerHeight-window.pageYOffset)/window.innerHeight * 25) + 25;
            if(element.nativeElement.id === "bottom"){
              positionTopElement += 2*window.innerHeight;
              positionBottomElement += 2.4*window.innerHeight;
              offset = ((2*window.innerHeight-window.pageYOffset)/window.innerHeight * 25) + 50;
            }
            if(positionBotton > positionTopElement && window.pageYOffset < positionBottomElement){
              let top = offset.toString() + "%";
              element.nativeElement.style.top = top;
            }
          });
        });
      }    
  }

  add(type: string){
    if(type === "aliment") {
      this.openDialogBox = true;
      this.dialogService.setComponent(AlimentComponent);
    }
    else if(type === "exercice") {
      this.openDialogBox = true;
      this.dialogService.setComponent(AddExerciceComponent);
    }
    else if(type === "activité") {
      this.openDialogBox = true;
      this.dialogService.setComponent(AddDepenseComponent);
    }
  }

  setTodayPlanning(day: number){
    this.todayPlanning = [];
    this.dataService.getTodayData("/LigneExercice",this.methods.getDate(new Date())).subscribe(res => {
      this.allLigneExercice = res;
      let plan: any;
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
        this.todayPlanning.push(obj);
      });
  
      this.todayPlanning.forEach((element:any,index:any) => {
        const find = this.allLigneExercice.find((e:any) => {
          if(e.name === element.name && e.date === this.methods.getDate(new Date())) return true;
          else   return false;
        });
        if(find != null){
          element.details = find.details;
        }
      });
    });
    
  }

}
