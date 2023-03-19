import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Method } from '../shared/method';

@Component({
  selector: 'app-suivi-calculateur',
  templateUrl: './suivi-calculateur.component.html',
  styleUrls: ['./suivi-calculateur.component.scss']
})
export class SuiviCalculateurComponent implements OnInit {

  constructor(private dataService: DataService, private method: Method) { }

  allCalculateurs: any;
  lignes: any;
  allUsers: any;

  ngOnInit(): void {
    this.dataService.getData("/Calculateur").subscribe(res => {
      this.allCalculateurs = res;
      this.dataService.getTodayData("/Ligne", this.method.getDate(new Date())).subscribe(res => {
        this.lignes = res;
      });
    });
    this.dataService.getData("/Params").subscribe(res => {
      this.allUsers = res;
    });
  }

}
