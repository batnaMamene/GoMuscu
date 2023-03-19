import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddParamsComponent } from '../add-params/add-params.component';
import { AlimentComponent } from '../aliment/aliment.component';
import { Aliment } from '../model/aliment';
import { Lignes } from '../model/lignes';
import { DataService } from '../shared/data.service';
import { Method } from '../shared/method';
import {} from '@fortawesome/free-solid-svg-icons';
import {} from '@fortawesome/free-brands-svg-icons'
import { DialogService } from '../shared/dialog.service';


@Component({
  selector: 'app-calculateur',
  templateUrl: './calculateur.component.html',
  styleUrls: ['./calculateur.component.scss']
})
export class CalculateurComponent implements OnInit {

  constructor(private method: Method, private dataService: DataService,private dialogService: DialogService) {
    dialogService.getClose().subscribe(res => {
      this.openDialogBox = false;
    });
  }

  selectedDate: string = "";
  allParams: any;
  allParamsFiltered: any;
  objectifs: any = {
    lipides: 0,
    proteines: 0,
    glucides: 0,
    MS: 0
  };
  todayLignes: any[] = [];
  allAliments: any;
  allAlimentsFiltered: any;
  allRecetteFiltered: any;
  allDepense: any;
  allDepenseFiltered: any;
  dateForm: FormGroup = new FormGroup({
    date: new FormControl(new Date(),Validators.required),
  });
  addLigneForm: FormGroup = new FormGroup({
    aliment: new FormControl("",Validators.required),
    quantity: new FormControl("", Validators.required)
  });
  addAlimentForm: FormGroup = new FormGroup({
    aliment: new FormControl("",Validators.required),
    quantity: new FormControl("", Validators.required)
  });
  addDepenseForm: FormGroup = new FormGroup({
    sport: new FormControl("",Validators.required),
    time: new FormControl("", Validators.required)
  });
  paramsForm: FormGroup = new FormGroup({
    name: new FormControl("",Validators.required),
    poids: new FormControl("",Validators.required),
    MG: new FormControl("",Validators.required),
    coefLip: new FormControl("",Validators.required),
    coefProt: new FormControl("",Validators.required),
    activity: new FormControl("",Validators.required),
  });
  nomRecetteForm: FormGroup = new FormGroup({
    name: new FormControl("",Validators.required),
  });
  depense: any = {
    calories: 0
  };
  depenseToday: any[] = [];
  calculateur: any;
  ingredients: any[] = [];
  caloriesRecette: any = {
    lipides: 0,
    proteines: 0,
    glucides: 0,
    fibres: 0,
    calories: 0
  };

  user: any;
  userId: string = "";
  poids: number = 0;
  show: boolean = false;
  error: boolean = false;

  tableTitles:string[] = ["Aliment","Quantité","Protéines","Glucides","Lipides","Fibres","Calories"];
  tableTitlesPhone:string[] = ["Aliment","Quantité","Calories"];
  resultTitles:string[] = ["Protéines","Glucides","Lipides","Fibres","Calories"];
  depenseTitles:string[] = ["Sport","Temps (min)","Calories"];
  recetteTitles:string[] = ["Quantité","Protéines","Glucides","Lipides","Fibres","Calories"];
  ingredientsTitles:string[] = ["Aliment","Quantité"];

  panelObj: boolean = false;
  scrollLeft: number = 0;
  scrollTop: number = 0;
  openDialogBox: boolean = false;

  ngOnInit(): void {
    this.selectedDate = this.method.getDate(new Date());
    this.dataService.getTodayData('/Calculateur',this.selectedDate).subscribe(res => {
      this.calculateur = {
        calories: 0,
        lipides: 0,
        proteines: 0,
        glucides: 0,
        fibres: 0
      }
      res.forEach((element:any) => {
        if(element.name === "Antoine"){this.calculateur = element}
      });
    });
    this.dataService.getData('/Params').subscribe(res => {
      if(res.length === 0)  this.error = true;
      this.allParams = res;
      this.allParamsFiltered = res;
      this.allParams.forEach((params: any,index:number) => {
        if(params.name === "Antoine"){
          this.poids = params.poids;
          this.user = params.name;
          this.userId = params.id;
          this.paramsForm.get("name")?.setValue(params.name);
          this.paramsForm.get("poids")?.setValue(params.poids);
          this.paramsForm.get("MG")?.setValue(params.MG);
          this.paramsForm.get("coefLip")?.setValue(params.coefLip);
          this.paramsForm.get("coefProt")?.setValue(params.coefProt);
          this.paramsForm.get("activity")?.setValue(params.act);
          this.objectifs = this.method.calculObjectifs(this.poids,params.MG,params.coefLip,params.coefProt,params.act);
          this.dataService.getTodayData('/CalculDepense',this.selectedDate).subscribe(res => {
            if(res.length > 0)  this.depense = res[0];
            this.objectifs.calories += this.depense.calories;
            this.show = true;
          });
        }
      });
      this.dataService.getData('/Aliment').subscribe(al => {
        this.allAliments = al;
        this.allAlimentsFiltered = al;
        this.allRecetteFiltered = al;
        this.dataService.getTodayData('/Ligne',this.selectedDate).subscribe(res => {
          res.forEach((ligne: any) => {
            this.allAliments.forEach((aliment:any) => {
              if(ligne.aliment === aliment.name && ligne.name === this.user){
                const quantity = ligne.quantity/100;
                ligne.glucides = Math.round(aliment.glucides * quantity);
                ligne.lipides = Math.round(aliment.lipides * quantity);
                ligne.proteines = Math.round(aliment.proteines * quantity);
                ligne.fibres = Math.round(aliment.fibres * quantity);
                ligne.calories = Math.round(aliment.calories * quantity);
                ligne.type = aliment.type;
                this.todayLignes.push(ligne);
              }
            });
          });
        });
      });
      this.dataService.getData('/Depense').subscribe(dep => {
        this.allDepense = dep;
        this.allDepenseFiltered = dep;
        this.dataService.getTodayData('/LigneDepense',this.selectedDate).subscribe(res => {
          res.forEach((ligne: any) => {
            this.allDepense.forEach((sport: any) => {
              if(ligne.sport === sport.sport && ligne.name == this.user){
                ligne.image = sport.image;
                ligne.calories = this.method.calculDepense(this.poids,sport.MET,ligne.time);
                this.depenseToday.push(ligne)
              }
            });
            this.depenseToday = res;
          });
        });
      });
    });

  }

  addLigne(){
    const round = Math.round;

    this.calculateur.date = this.selectedDate;
    const aliment = this.allAliments.find((element: { name: any; }) => element.name === this.addLigneForm.value.aliment);
    const quantity = Number(this.addLigneForm.value.quantity)/100;

    this.calculateur.calories += round(aliment.calories * quantity);
    this.calculateur.proteines += round(aliment.proteines * quantity);
    this.calculateur.glucides += round(aliment.glucides * quantity);
    this.calculateur.lipides += round(aliment.lipides * quantity);
    this.calculateur.fibres += round(aliment.fibres * quantity);
    
    if(aliment != null){
      const newLigne = {
        aliment: aliment.name,
        quantity: quantity * 100,
        glucides: Number(aliment.glucides * quantity),
        lipides: Number(aliment.lipides * quantity),
        proteines: Number(aliment.proteines * quantity),
        fibres: Number(aliment.fibres * quantity),
        calories: Number(aliment.calories * quantity),
        type: aliment.type
      }

      const data: Lignes = {
        name: this.user,
        date: this.selectedDate,
        aliment: aliment.name,
        quantity: Number(this.addLigneForm.value.quantity)
      }

      let push = true;
      this.todayLignes.forEach((element: any) => {
        if(element.aliment === aliment.name){
          push = false;
          element.quantity += Number(this.addLigneForm.value.quantity);
          element.calories += aliment.calories * quantity;
          element.proteines += aliment.proteines * quantity;
          element.glucides += aliment.glucides * quantity;
          element.lipides += aliment.lipides * quantity;
          element.fibres += aliment.fibres * quantity;
          data.quantity = element.quantity;
          this.dataService.updateData("/Ligne",element.id,data);
        }
      });
      if(push){
        this.todayLignes.push(newLigne);
        this.dataService.addData("/Ligne",data);
      }


      if(this.calculateur.name != null) this.dataService.updateData("/Calculateur", this.calculateur.id, this.calculateur);
      else {
        this.calculateur.name = this.user;
        this.dataService.addData("/Calculateur", this.calculateur);
      }

      setTimeout(() => {
        this.dataService.getTodayData('/Calculateur',this.selectedDate).subscribe(res => {
          this.calculateur = res[0];
        });
        this.dataService.getTodayData('/Ligne',this.selectedDate).subscribe(res => {
          res.forEach((ligne: any,index:number) => {
            this.allAliments.forEach((aliment: any) => {
              if(ligne.aliment === aliment.name){
                const quantity = ligne.quantity/100;
                ligne.glucides = aliment.glucides * quantity;
                ligne.lipides = aliment.lipides * quantity;
                ligne.proteines = aliment.proteines * quantity;
                ligne.fibres = aliment.fibres * quantity;
                ligne.calories = aliment.calories * quantity;
                ligne.type = aliment.type;
              }
            });
            this.todayLignes.splice(index,1,ligne);
          });
        });
      }, 1000);
    }
  }

  addDepense(){
    const sport = this.allDepense.find((element: { sport: any; }) => element.sport === this.addDepenseForm.value.sport);

    let push = true;
    const ligneDepense = {
      sport: sport.sport,
      name: this.user,
      time: Number(this.addDepenseForm.value.time),
      image: sport.image,
      date: this.method.getDate(this.dateForm.value.date),
      calories: this.method.calculDepense(Number(this.paramsForm.value.poids),sport.MET,Number(this.addDepenseForm.value.time))
    }
    this.depenseToday.forEach(element => {
      if(element.sport === this.addDepenseForm.value.sport){
        push = false;
        const newTime = element.time + Number(this.addDepenseForm.value.time)
        element.time = newTime;
        element.calories = this.method.calculDepense(Number(this.paramsForm.value.poids),sport.MET,element.time + Number(this.addDepenseForm.value.time));
        this.dataService.updateData("/LigneDepense",element.id,{
          name: ligneDepense.name,
          sport: ligneDepense.sport,
          time: newTime,
          date: ligneDepense.date
        })
      }
    });

    if(push){
      this.depenseToday.splice(this.depenseToday.length,0,ligneDepense);
      this.dataService.addData("/LigneDepense",{
        name: ligneDepense.name,
        sport: ligneDepense.sport,
        time: ligneDepense.time,
        date: ligneDepense.date
      });
    }

    this.objectifs.calories += Number(this.method.calculDepense(this.paramsForm.value.poids,sport.MET,this.addDepenseForm.value.time));
    this.objectifs.glucides += Number(this.method.calculDepense(this.paramsForm.value.poids,sport.MET,this.addDepenseForm.value.time)/4);
    this.depense.calories += Number(this.method.calculDepense(this.paramsForm.value.poids,sport.MET,this.addDepenseForm.value.time));

    if(this.depense.name != null) this.dataService.updateData("/CalculDepense",this.depense.id,this.depense);
    else{
      this.depense.name = this.user;
      this.depense.date = this.method.getDate(new Date());
      this.dataService.addData("/CalculDepense",this.depense);
    }
    this.dataService.getTodayData('/LigneDepense',this.selectedDate).subscribe(res => {
      res.forEach((ligne: {
        image: any;
        time: number; sport: any; calories: number;}) => {
        this.allDepense.forEach((sport: {image: any;MET: number; sport: any;}) => {
          if(ligne.sport === sport.sport){
            ligne.image = sport.image;
            ligne.calories = Number(this.method.calculDepense(Number(this.paramsForm.value.poids),sport.MET,ligne.time));
          }
        });
        this.depenseToday = res;
      });
    });

  }

  addAliment(){
    const aliment = this.allAliments.find((element: { name: any; }) => element.name === this.addAlimentForm.value.aliment);
    const quantity = Number(this.addAlimentForm.value.quantity)/100;

    const newLigne: any = {
      aliment: aliment.name,
      quantity: quantity * 100,
      glucides: aliment.glucides * quantity,
      lipides: aliment.lipides * quantity,
      proteines: aliment.proteines * quantity,
      fibres: aliment.fibres * quantity,
      calories: aliment.calories * quantity,
    }

    this.ingredients.push(newLigne);

    this.caloriesRecette = this.method.calculCaloriesRecette(this.ingredients);
  }

  suppressLigne(ligne: any){
    let indexToSuppress:number = 0;

    this.todayLignes.forEach((element: any,index: number) => {
      if(element.aliment === ligne.aliment){
        indexToSuppress = index;

        this.calculateur.calories -= element.calories;
        this.calculateur.proteines -= element.proteines;
        this.calculateur.glucides -= element.glucides;
        this.calculateur.lipides -= element.lipides;
        this.calculateur.fibres -= element.fibres;

        this.dataService.deleteData("/Ligne",element.id); 
        this.dataService.updateData("/Calculateur",this.calculateur.id,this.calculateur);
      }
    });

    this.todayLignes.splice(indexToSuppress,1);
  }

  suppressDepense(ligne: any){
    let indexToSuppress:number = 0;

    this.depenseToday.forEach((element: any,index: number) => {
      if(element.sport === ligne.sport){
        indexToSuppress = index;

        this.objectifs.calories -= element.calories;
        this.objectifs.glucides -= element.calories/4;
        this.depense.calories -= element.calories;
        this.dataService.deleteData("/LigneDepense",element.id);
        const dep :any = {
          calories: this.depense.calories,
          date: this.method.getDate(new Date()),
          name: this.paramsForm.value.name
        }
        if(this.depense.id != null) this.dataService.updateData("/CalculDepense",this.depense.id,this.depense);
        else  this.dataService.addData("/CalculDepense", dep);
      }
    });

    this.depenseToday.splice(indexToSuppress,1);
  }

  suppressAliment(ligne: any){
    let indexToSuppress:number = 0;

    this.ingredients.forEach((element: any,index: number) => {
      if(element.aliment === ligne.aliment){
        indexToSuppress = index;
      }
    });
    this.ingredients.splice(indexToSuppress,1);
    this.caloriesRecette = this.method.calculCaloriesRecette(this.ingredients);
  }

  fillForm(event: any){
    this.allParams.forEach((element:any) => {
      if(element.name === event.option.value){
        this.paramsForm.get("poids")?.setValue(element.poids);
        this.paramsForm.get("MG")?.setValue(element.MG);
        this.paramsForm.get("coefLip")?.setValue(element.coefLip);
        this.paramsForm.get("coefProt")?.setValue(element.coefProt);
        this.paramsForm.get("activity")?.setValue(element.act);
    
        this.user = element.name;
        this.userId = element.id;
        this.poids = element.poids;
        this.objectifs = this.method.calculObjectifs(element.poids,element.MG,element.coefLip,element.coefProt,element.act);    
      }
    });
    this.calculateur = {
      calories: 0,
      lipides: 0,
      proteines: 0,
      glucides: 0,
      fibres: 0
    };
    this.todayLignes = [];
    this.dataService.getTodayData("/Calculateur", this.selectedDate).subscribe(res => {
      res.forEach((element:any) => {
        if(element.name === this.user){
          this.calculateur.calories = Number(element.calories);
          this.calculateur.lipides = Number(element.lipides);
          this.calculateur.proteines = Number(element.proteines);
          this.calculateur.glucides = Number(element.glucides);
          this.calculateur.fibres = Number(element.fibres);
        }
      });
    });
    this.dataService.getTodayData('/Ligne',this.selectedDate).subscribe(res => {
      res.forEach((ligne: any) => {
        this.allAliments.forEach((aliment: any) => {
          if(ligne.aliment === aliment.name && ligne.name === this.user){
            const quantity = ligne.quantity/100;
            ligne.glucides = Math.round(aliment.glucides * quantity);
            ligne.lipides = Math.round(aliment.lipides * quantity);
            ligne.proteines = Math.round(aliment.proteines * quantity);
            ligne.fibres = Math.round(aliment.fibres * quantity);
            ligne.calories = Math.round(aliment.calories * quantity);
            ligne.type = aliment.type;
            this.todayLignes.push(ligne);
          }
        });
      });
    });
    this.dataService.getTodayData('/LigneDepense',this.selectedDate).subscribe(res => {
      res.forEach((ligne: any) => {
        this.allDepense.forEach((sport: any) => {
          if(ligne.sport === sport.sport && ligne.name == this.user){
            ligne.image = sport.image;
            ligne.calories = Number(this.method.calculDepense(this.poids,sport.MET,ligne.time));
            this.depenseToday.push(ligne)
          }
        });
      });
    });
  }

  setParams(){
    const params = {
      name: this.user,
      poids: Number(this.paramsForm.value.poids),
      MG: Number(this.paramsForm.value.MG),
      coefLip: Number(this.paramsForm.value.coefLip),
      coefProt: Number(this.paramsForm.value.coefProt),
      act: Number(this.paramsForm.value.activity)
    }
    this.objectifs = this.method.calculObjectifs(params.poids,params.MG,params.coefLip,params.coefProt,params.act);
    this.objectifs.calories = Number(this.objectifs.calories);
    this.objectifs.proteines = Number(this.objectifs.proteines);
    this.objectifs.lipides = Number(this.objectifs.lipides);
    this.objectifs.glucides = Number(this.objectifs.glucides);
    this.objectifs.fibres = Number(this.objectifs.fibres);

    this.dataService.updateData("/Params", this.userId, params);
  }

  addRecette(){
    const aliment: Aliment = {
      name: this.nomRecetteForm.value.name,
      type: "Recette",
      glucides: this.caloriesRecette.glucides,
      lipides: this.caloriesRecette.lipides,
      proteines: this.caloriesRecette.proteines,
      calories: this.caloriesRecette.calories,
      fibres: this.caloriesRecette.fibres,
      IG: -1
    }

    this.dataService.addData('/Aliment',aliment);
    this.ingredients = [];
    this.caloriesRecette = {
      lipides: 0,
      proteines: 0,
      glucides: 0,
      fibres: 0,
      calories: 0
    }

    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  newAliment(){
    this.openDialogBox = true;
    this.dialogService.setComponent(AlimentComponent);
  }

  filter(event: any,type: string) {
    const filterValue = event.target.value.toLowerCase();
    if(type === "Aliments"){
      this.allAlimentsFiltered = this.allAliments.filter((element: any) => {
        const name: string = element.name.toLowerCase();
        if(name.includes(filterValue))  return true;
        else  return false;
      });
    } else if(type === "Depense"){
      this.allDepenseFiltered = this.allDepense.filter((element: any) => {
        const name: string = element.sport.toLowerCase();
        if(name.includes(filterValue))  return true;
        else  return false;
      });
    }  else if(type === "Params"){
      this.allParamsFiltered = this.allParams.filter((element: any) => {
        const name: string = element.name.toLowerCase();
        if(name.includes(filterValue))  return true;
        else  return false;
      });
    } else if(type === "Recette"){
      this.allRecetteFiltered = this.allAliments.filter((element: any) => {
        const name: string = element.name.toLowerCase();
        if(name.includes(filterValue))  return true;
        else  return false;
      });
    }
    
  }

  setDate(event:any){
  const selectedDate = event.target.value;
  this.selectedDate = this.method.getDate(selectedDate);
  this.todayLignes = [];
  this.depenseToday = [];
  this.dataService.getTodayData("/Calculateur",this.selectedDate).subscribe(res => {
    this.calculateur = {
      calories: 0,
      lipides: 0,
      proteines: 0,
      glucides: 0,
      fibres: 0
    }
    if(res[0] != null){
     res.forEach((element:any) => {
      if(element.name === this.user){
        this.calculateur = element;
      }
     }); 
    }

    this.dataService.getTodayData("/Ligne",this.selectedDate).subscribe(lig => {
      lig.forEach((element: any) => {
        const aliment = this.allAliments.find((e: any) => e.name === element.aliment);
        if(aliment != null && element.name === this.user){
            const quantity = element.quantity/100;
            element.glucides = Math.round(aliment.glucides * quantity);
            element.lipides = Math.round(aliment.lipides * quantity);
            element.proteines = Math.round(aliment.proteines * quantity);
            element.fibres = Math.round(aliment.fibres * quantity);
            element.calories = Math.round(aliment.calories * quantity);
            this.todayLignes.push(element);
          }
        });
      });
    });
    
    this.dataService.getTodayData("/CalculDepense",this.selectedDate).subscribe(res => {
      this.depense = {
        calories: 0
      }; if(res != null){
        res.forEach((element:any) => {
          if(element.name === this.user){
            const find = this.allDepense.find((e:any) =>  e.name === element.sport);
            this.depense.calories = element.calories;
            this.depense.name = element.name;
          }
        });
      }
      this.dataService.getTodayData("/LigneDepense",this.selectedDate).subscribe(dep => {
        dep.forEach((element: any) => {
          const depense = this.allDepense.find((e: {sport: any;}) => e.sport === element.sport)
          if(depense != null && element.name === this.user){
            const poids = Number(this.paramsForm.value.poids);
            element.image = depense.image;
            element.calories = this.method.calculDepense(poids,depense.MET,element.time);
            this.depenseToday.push(element);
          }
        });
        const find = this.allParams.find((element:any) => element.name === this.user);
        this.objectifs = this.method.calculObjectifs(this.poids,find.MG,find.coefLip,find.coefProt,find.act);
        this.objectifs.calories += this.depense.calories;
        this.objectifs.glucides += this.depense.calories/4;
      });
    });
    
  }

  refreshData(event:any){
    if(event === "Ligne update"){
      setTimeout(() => {
        this.dataService.getTodayData('/Ligne',this.selectedDate).subscribe(res => {
          this.todayLignes = [];
          res.forEach((ligne: any,index:number) => {
            this.allAliments.forEach((aliment: any) => {
              if(ligne.aliment === aliment.name){
                const quantity = Number(ligne.quantity)/100;
                ligne.glucides = Math.round(Number(aliment.glucides * quantity));
                ligne.lipides = Math.round(Number(aliment.lipides * quantity));
                ligne.proteines = Math.round(Number(aliment.proteines * quantity));
                ligne.fibres = Math.round(Number(aliment.fibres * quantity));
                ligne.calories = Math.round(Number(aliment.calories * quantity));
                ligne.type = aliment.type;
              }
            });
            this.todayLignes.push(ligne);
          });
          this.calculateur.calories = 0;
          this.calculateur.fibres = 0;
          this.calculateur.lipides = 0;
          this.calculateur.glucides = 0;
          this.calculateur.proteines = 0;
          this.todayLignes.forEach((element: any) => {
            this.calculateur.calories += element.calories;
            this.calculateur.fibres += element.fibres;
            this.calculateur.lipides += element.lipides;
            this.calculateur.glucides += element.glucides;
            this.calculateur.proteines += element.proteines;
          });
          this.dataService.updateData("/Calculateur", this.calculateur.id, this.calculateur);
        });
        
      },1000);
      
    }
  }

}
