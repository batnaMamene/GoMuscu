import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AlimentComponent } from "./aliment.component";

const routes: Routes = [
    {   path: 'aliment',   component: AlimentComponent   },
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlimentRoutingModule { }