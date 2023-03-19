import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MatCardModule } from '@angular/material/card';
import { SuiviCalculateurComponent } from "./suivi-calculateur.component";
import { SuiviCalculateurRoutingModule } from "./suivi-calculateur-routing";

@NgModule({
    declarations: [
      SuiviCalculateurComponent,
    ],
    imports: [
      BrowserModule,
      SuiviCalculateurRoutingModule,
      MatCardModule
    ]
  })
  export class SuiviCalculateurModule {
    constructor(){}
  }