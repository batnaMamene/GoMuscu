import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ExerciceDetailsComponent } from "./exercice-details.component";

const routes: Routes = [
    {   path: 'exercice/:name',   component: ExerciceDetailsComponent   },
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExerciceDetailsRoutingModule { }