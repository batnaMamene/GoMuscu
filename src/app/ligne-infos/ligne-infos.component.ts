import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { faFish,faWineBottle,faSeedling,faCookieBite,faEgg,faDrumstickBite,faBreadSlice,faAppleAlt,faPepperHot,faUtensils,faHotdog,faOilCan,faGlassCheers, faCheese, faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../shared/data.service';
import { Method } from '../shared/method';


@Component({
  selector: 'ligne-infos',
  templateUrl: './ligne-infos.component.html',
  styleUrls: ['./ligne-infos.component.scss'],
  animations: [
    trigger('hideLigne', [
      state('hidden', style({
        opacity: '0'
      })),
      transition('* => hidden', [
        animate('0.5s ease')
      ])
    ])
  ]
})
export class LigneInfosComponent implements OnInit {

  @Input() data: any;
  @Output() refresh: any = new EventEmitter<String>();
  constructor(private dataService: DataService,private method: Method) { }

  iconFish = faFish;
  iconAlcool = faWineBottle;
  iconVeggie = faSeedling;
  iconFruits = faAppleAlt;
  iconViande = faDrumstickBite;
  iconFriandise = faCookieBite;
  iconEgg = faEgg;
  iconCereals = faBreadSlice;
  iconSpice = faPepperHot;
  iconFat = faHotdog;
  iconRecette = faUtensils;
  iconHuile = faOilCan;
  iconBoisson = faGlassCheers;
  iconMilk = faCheese;
  iconMusculation = faDumbbell;

  selectedIcon: any;
  selectedColor: any;
  backgroundColor: any;
  randomPosition: any[] = [];
  allAliment: any[] = [];
  allDepense: any[] = [];
  type: string = "";

  hideLigne: string = "";

  ngOnInit(): void {
    this.dataService.getData("/Aliment").subscribe(res => {
      this.allAliment = res;
    });
    this.dataService.getData("/Depense").subscribe(res => {
      this.allDepense = res;
    });
    if(this.data.type != null){
      this.type = "Aliment";
      switch(this.data.type){
        case "Viande": {
          this.selectedIcon = this.iconViande;
          this.selectedColor = "#fc93a1";
          this.backgroundColor = "rgba(252, 147, 161, 0.4)";
        }
        break;
        case "Légume": {
          this.selectedIcon = this.iconVeggie;
          this.selectedColor = "#6ae39a";
          this.backgroundColor = "rgba(106, 227, 154, 0.4)";
        }
        break;
        case "Fruit": {
          this.selectedIcon = this.iconFruits;
          this.selectedColor = "#fc93a1";
          this.backgroundColor = "rgba(252, 147, 161, 0.4)";
        }
        break;
        case "Friandise": {
          this.selectedIcon = this.iconFriandise;
          this.selectedColor = "#dab38c";
          this.backgroundColor = "rgba(218, 179, 140, 0.4)";
        }
        break;
        case "Fat": {
          this.selectedIcon = this.iconFat;
          this.selectedColor = "#ffbf7d";
          this.backgroundColor = "rgba(255, 191, 125, 1)";
        }
        break;
        case "Boisson": {
          this.selectedIcon = this.iconBoisson;
          this.selectedColor = "#fff967";
          this.backgroundColor = "rgba(255, 249, 103, 0.4)"
        }
        break;
        case "Alcool": {
          this.selectedIcon = this.iconAlcool;
          this.selectedColor = "#757575";
          this.backgroundColor = "rgba(117, 117, 117, 0.4)";
        }
        break;
        case "Huile": {
          this.selectedIcon = this.iconHuile;
          this.selectedColor = "#267b48";
          this.backgroundColor = "rgba(38, 123, 72, 0.4)";
        }
        break;
        case "Condiment": {
          this.selectedIcon = this.iconSpice;
          this.selectedColor = "#f5554a";
          this.backgroundColor = "rgba(245, 85, 74, 0.4)";
        }
        break;
        case "Poisson": {
          this.selectedIcon = this.iconFish;
          this.selectedColor = "#98c9f7";
          this.backgroundColor = "rgba(152, 201, 247, 0.4)";
        }
        break;
        case "Oeuf": {
          this.selectedIcon = this.iconEgg;
          this.selectedColor = "#fff2cc";
          this.backgroundColor = "rgba(255, 242, 204, 0.4)";
        }
        break;
        case "Céréale": {
          this.selectedIcon = this.iconCereals;
          this.selectedColor = "#fff967";
          this.backgroundColor = "rgba(255, 249, 103, 0.4)"
        }
        break;
        case "Recette": {
          this.selectedIcon = this.iconRecette;
          this.selectedColor = "#f2f2f2";
          this.backgroundColor = "#ffffff"
        }
        break;
        case "Laitage": {
          this.selectedIcon = this.iconMilk;
          this.selectedColor = "#fff2cc";
          this.backgroundColor = "rgba(255, 242, 204, 0.4)";
        }
        break;
      }
    } else{
      this.type = "Dépense";
      switch(this.data.sport){
        case "Musculation": {
          this.selectedIcon = this.iconMusculation;
          this.selectedColor = "rgba(117, 117, 117, 0.5)";
          this.backgroundColor = "rgba(117, 117, 117, 0.4)";
        }
      }
    }
    this.calculRandomPosition();
  }


  calculRandomPosition(){

    let valuesMin: number[] = [0,21.5,43,64.5];
    let valuesMax: number[] = [21.5,43,64.5,86];
    for(let i = 0; i < 4; i++){
      let min = Math.ceil(i*20.5);
      let max = Math.floor(i*20.5 +20.5);
      const top = (Math.floor(Math.random() * (max - min)) + min).toString() + "%";
      
      const index = Math.floor(Math.random()*valuesMax.length);
      max = valuesMax[index];
      min = valuesMin[index];
      const left = (Math.floor(Math.random() * (max - min)) + min).toString() + "%";

      valuesMax.splice(index,1);
      valuesMin.splice(index,1);

      this.randomPosition.push({
        top: top,
        left: left,
      });
    }
  }

  updateLigne(event:any){
    if(this.type === "Aliment"){
      const newQuantity = event.target.value;
      const quantity = newQuantity/100;
      const find = this.allAliment.find((e:any) => e.name === this.data.aliment);
      this.data.calories = Math.round(find.calories * (quantity));
      this.data.proteines = Math.round(find.proteines * (quantity));
      this.data.glucides = Math.round(find.glucides * (quantity));
      this.data.lipides = Math.round(find.lipides * (quantity));
      this.data.fibres = Math.round(find.fibres * (quantity));
      this.data.quantity = newQuantity;
      this.dataService.updateData("/Ligne",this.data.id,this.data);
      this.refresh.emit("Ligne update");
    } else{
      const newTime = event.target.value;
      
    }
    
  }

  deleteLigne(){
    this.hideLigne = "hidden";
    this.dataService.deleteData("/Ligne",this.data.id);
    this.refresh.emit("Ligne update");
  }

}
