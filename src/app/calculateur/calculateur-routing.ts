import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CalculateurComponent } from "./calculateur.component";

const routes: Routes = [
    {   path: 'calculateur',   component: CalculateurComponent   },
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalculateurRoutingModule { }