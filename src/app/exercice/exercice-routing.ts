import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ExerciceComponent } from "./exercice.component";

const routes: Routes = [
    {   path: 'exercice',   component: ExerciceComponent   },
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExerciceRoutingModule { }