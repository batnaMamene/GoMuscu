import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SuiviCalculateurComponent } from "./suivi-calculateur.component";

const routes: Routes = [
    {   path: 'show-calculateur/:date',   component: SuiviCalculateurComponent   },
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuiviCalculateurRoutingModule { }