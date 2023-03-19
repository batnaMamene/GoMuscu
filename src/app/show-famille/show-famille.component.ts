import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AddMuscleComponent } from '../add-muscle/add-muscle.component';
import { EditComponent } from '../edit/edit.component';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-show-famille',
  templateUrl: './show-famille.component.html',
  styleUrls: ['./show-famille.component.scss']
})
export class ShowFamilleComponent implements OnInit {

  constructor(private route: ActivatedRoute, private dataService: DataService, private dialogRef: MatDialog) { }

  famille: any;
  exercices: any[] = [];
  show:boolean = false;
  error: boolean = false;

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const name = params.get('name')!;
      this.dataService.getData("/Famille").subscribe(res => {
        if(res.length === 0)  this.error = true;
        else{
          this.show = true;
          res.forEach((element: any) => {
            if(element.name === name) this.famille = element;
          });
        }
      });
      this.dataService.getData("Muscle").subscribe(mus => {
        let muscles: any[] = [];
        mus.forEach((element:any) => {
          if(element.famille === name)  muscles.push(element.name);
        });
        this.dataService.getData("/Exercice").subscribe(res => {
          res.forEach((element:any) => {
            element.primary.forEach((pri:any) => {
              const muscle = muscles.find((e:any) => e === pri);
              if(muscle != null)  this.exercices.push(element);
            });
          });
        });
      })
      
    });
  }

  edit(){
    this.dialogRef.open(EditComponent,{
      height: '50%',
      width: '50%',
      data : {
        famille : this.famille
      }
    });
  }

  add(){
    this.dialogRef.open(AddMuscleComponent,{
      height: '30%',
      width: '30%',
      data : {
        famille : this.famille.name
      }
    });
  }

}
