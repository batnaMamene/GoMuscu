import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddExerciceComponent } from '../add-exercice/add-exercice.component';
import { EditExerciceComponent } from '../edit-exercice/edit-exercice.component';
import { DataService } from '../shared/data.service';
import { DialogService } from '../shared/dialog.service';

@Component({
  selector: 'app-exercice',
  templateUrl: './exercice.component.html',
  styleUrls: ['./exercice.component.scss']
})
export class ExerciceComponent implements OnInit {

  constructor(private dialogService: DialogService, private dataService: DataService) {
    dialogService.getClose().subscribe(res => {
      this.openDialogBox = false;
    });
  }

  allMuscles: any[] = [];
  allExercices: any[] = [];
  bas: any[] = [];
  haut: any[] = [];
  selectedExercices: any[] = [];
  panelBas: boolean = false;
  panelHaut: boolean = false;
  name: string = "";
  error: boolean = false;
  show: boolean = false;
  openDialogBox: boolean = false;

  ngOnInit(): void {
    this.dataService.getData("/Famille").subscribe(res => {
      if(res.length === 0)  this.error = true;
      else{
        this.show = true;
        res.forEach((element:any) => {
          if(element.zone === "haut") this.haut.push(element);
          else  this.bas.push(element);
        });
        this.dataService.getData("/Muscle").subscribe(mus => {
          mus.forEach((element:any) => {
            const find = this.haut.find(e => e.name === element.famille);
            if(find != null)  element.zone = "haut";
            else  element.zone = "bas";
          });
          this.allMuscles = mus;
          this.dataService.getData("/Exercice").subscribe(ex => {
            this.allExercices = ex;
            this.allExercices.forEach((element:any) => {
              element.famille = [];
              element.primary.forEach((m:any) => {
                const find = this.allMuscles.find(e => e.name === m);
                if(find != null)  element.famille.push(find.famille);
              });
            });
          });
        })
      }
    });
  }

  addExercice(){
    this.openDialogBox = true;
    this.dialogService.setComponent(AddExerciceComponent);
  }

  editExercice(info:any){
    this.openDialogBox = true;
    this.dialogService.setComponent(EditExerciceComponent);
  }

  setSelect(name: string){
    this.name = name;
    this.haut.forEach((element: any) => {
      element.select = false;
      if(element.name === name) element.select = true;
    });
    this.bas.forEach((element: any) => {
      element.select = false;
      if(element.name === name) element.select = true;
    });
    this.selectedExercices = [];
    this.allExercices.forEach((element:any) => {
      element.famille.forEach((fam:any) => {
        if(name === fam) this.selectedExercices.push(element);
      });
    });
    this.selectedExercices = this.selectedExercices.filter((el, i, a) => i === a.indexOf(el));

  }
}
