import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../shared/data.service';
import { Method } from '../shared/method';
import Chart from 'chart.js/auto';
import "chartjs-plugin-annotation";
import { MatDialog } from '@angular/material/dialog';
import { AddParamsComponent } from '../add-params/add-params.component';
import { Params } from '../model/params';
import { DialogService } from '../shared/dialog.service';

@Component({
  selector: 'app-suivi',
  templateUrl: './suivi.component.html',
  styleUrls: ['./suivi.component.scss']
})
export class SuiviComponent implements OnInit {

  constructor(private dataService: DataService, private method: Method, private dialogService: DialogService) {
    dialogService.getClose().subscribe(res => {
      this.openDialogBox = false;
    });
  }

  allCalculateurs: any;
  allDepense: any;
  allUsers: any;
  allUsersFiltered: any;
  user: string = "";
  type: string = "Type de nutriment";
  paramsForm: FormGroup = new FormGroup({
    date: new FormControl(new Date(), Validators.required),
    name: new FormControl("",Validators.required),
    poids: new FormControl("",Validators.required),
    MG: new FormControl("",Validators.required),
    coefLip: new FormControl("",Validators.required),
    coefProt: new FormControl("",Validators.required),
    activity: new FormControl("",Validators.required),
  });
  infoForm: FormGroup = new FormGroup({
    type: new FormControl("",Validators.required),
  });
  calories: any[] = [];
  depense: any[] = [];
  chart!: Chart;
  height: number = 0;
  width: number = 0;
  show: boolean = false;
  error: boolean = false;
  created: boolean = false;
  openDialogBox: boolean = false;


  allType: any[] = ["Calories","Dépenses","Protéines","Glucides","Lipides","Fibres"];

  ngOnInit(): void {
    
    if(window.innerWidth < 600){
      this.height = window.innerHeight * 0.35;
      this.width = window.innerHeight * 0.5;
    } else{
      this.height = window.innerHeight * 0.58;
      this.width = window.innerWidth *0.5;
    }
    this.dataService.getData("/Params").subscribe(res => {
      if(res.length === 0)  this.error = true;
      else{
        this.allUsers = res;
        this.show = true;
        this.allUsersFiltered = res;
      }
    });
    this.dataService.getData("/Calculateur").subscribe(res => {
      this.allCalculateurs = res;
    });
    this.dataService.getData("/CalculDepense").subscribe(res => {
      this.allDepense = res;
    });
    
  }

  ngAfterViewChecked(){
    if(!this.created){
      setTimeout(()=> {
        try{
          this.createChartCalories([]);
        } catch(e){}
      }, 0);
    }
    setTimeout(() => {
      this.created = true;
    },1000)
  }

  fillForm(event: any){
    this.allUsers.forEach((element: any) => {
      if(element.name === event.option.value){
        this.user = event.option.value;
        this.paramsForm.get("poids")?.setValue(element.poids);
        this.paramsForm.get("MG")?.setValue(element.MG);
        this.paramsForm.get("coefLip")?.setValue(element.coefLip);
        this.paramsForm.get("coefProt")?.setValue(element.coefProt);
        this.paramsForm.get("activity")?.setValue(element.act);
      }
    });
    this.calories = this.allCalculateurs.filter((e:any) => e.name === this.user);
    this.depense = this.allDepense.filter((e:any) => e.name === this.user);
    this.method.sortByDate(this.calories);
    this.method.sortByDate(this.depense);

    if(this.type !== "Type de nutriment"){
      if(this.chart != null){
        this.chart.destroy();
      }
      if(this.type === "Dépenses"){
        this.createChartCalories(this.depense);
      }
      else  this.createChartCalories(this.calories);
    } else{
      if(this.chart != null){
        this.chart.destroy();
      }
      this.createChartCalories([]);
    }
  }

  createChartCalories(data: any){
    let datasets = [];
    let labels:any = [];
    let point: any = {
      backgroundColor: 'black',
    }
    point.data = [""];
    point.label = this.type;
    data.forEach((element: any) => {
      if(element.name === this.user){
        if(this.type === "Calories" || this.type === "Dépenses")  point.data.push(element.calories.toString());
        else if(this.type === "Protéines")  point.data.push(element.proteines.toString());
        else if(this.type === "Glucides")  point.data.push(element.glucides.toString());
        else if(this.type === "Lipides")  point.data.push(element.lipides.toString());
        else if(this.type === "Fibres")  point.data.push(element.fibres.toString());
        labels.push(element.date);
      }
    });
    datasets.push(point);
    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
          datasets: datasets
      },
      options: {
        maintainAspectRatio: false,
        plugins:{
          legend:{
            display: false
          }
        },
        
        aspectRatio:2.5,
        borderColor: "#FFF842",
        scales: {
          x: {
            labels: labels,
            border:{
              color: "#7F7C21"
            },
            ticks: {
              display: false
            }
          },
          y:{
            border:{
              color: "#7F7C21"
            },
            ticks: {
              display: false
            }
          }
        },
      }
    });
  }

  changeType(event:any){
    this.type = event.value;
    if(this.chart != null){
      this.chart.destroy();
    }
    if(this.type === "Dépenses"){
      this.createChartCalories(this.depense);
    }
    else  this.createChartCalories(this.calories);
  }

  filter(event: any) {
    const filterValue = event.target.value.toLowerCase();
    this.allUsersFiltered = this.allUsers.filter((element: any) => {
      const name: string = element.name.toLowerCase();
      if(name.includes(filterValue))  return true;
      else  return false;
    });
    
  }

  addParams(){
    this.openDialogBox = true;
    this.dialogService.setComponent(AddParamsComponent);
  }

  changeParams(){
    const newParams: Params = {
      name: this.paramsForm.value.name,
      poids: Number(this.paramsForm.value.poids),
      MG: Number(this.paramsForm.value.MG),
      coefLip: Number(this.paramsForm.value.coefLip),
      coefProt: Number(this.paramsForm.value.coefProt),
      act: Number(this.paramsForm.value.activity),
    }

    const find = this.allUsers.find((e:any) => e.name === newParams.name);
    this.dataService.updateData("/Params",find.id,newParams)
  }

}
