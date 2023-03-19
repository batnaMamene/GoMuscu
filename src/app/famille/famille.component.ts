import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { MatDialog } from '@angular/material/dialog';
import { AddFamilleComponent } from '../add-famille/add-famille.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DialogService } from '../shared/dialog.service';

@Component({
  selector: 'app-famille',
  templateUrl: './famille.component.html',
  styleUrls: ['./famille.component.scss'],
  animations: [
    trigger('displayCard',
      [
        state('hidden', style({
          opacity: 0,
        })),
        state('show', style({
          opacity: 1,
        })),
        transition('hidden => show', [
          animate('1s')
        ]),
        transition('show => hidden', [
          animate('1s')
        ])
      ]
    )
  ]
})
export class FamilleComponent implements OnInit {

  constructor(private dataService: DataService,private dialogService: DialogService) {
    dialogService.getClose().subscribe(res => {
      this.openDialogBox = false;
    });
  }

  allFamilles: any[] = [];
  haut: any[] = [];
  bas: any[] = [];
  familyShowed: any = null;
  zoneCard: string = "";
  top: number = 0;
  left: number = 0;
  panelBas = false;
  panelHaut = false;
  schema: string = "";
  name: string = "";
  show: boolean = false;
  error: boolean = false;
  display: string = "hidden";
  openDialogBox: boolean = false;

  ngOnInit(): void {

    this.dataService.getData('/Famille').subscribe(res => {
      if(res.length === 0)  this.error = true;
      else{
        this.show = true;
        this.allFamilles = res;
        res.forEach((element: any) => {
          element.select = false;
          if(element.zone === "haut") this.haut.push(element);
          else  this.bas.push(element);
        });
      }
    });
  }

  addFamille(){
    this.openDialogBox = true;
    this.dialogService.setComponent(AddFamilleComponent);
  }

  setSelect(name: string){
    this.name = name;
    this.haut.forEach((element: any) => {
      element.select = false;
      if(element.name === name){
        element.select = true;
        this.schema = element.schema
      }
    });
    this.bas.forEach((element: any) => {
      element.select = false;
      if(element.name === name){
        element.select = true;
        this.schema = element.schema
      }
    });

    this.display = "show";
  }

}
