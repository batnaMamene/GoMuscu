import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AlimentListComponent } from "./aliment-list.component";

const routes: Routes = [
    {   path: 'alimentList',   component: AlimentListComponent   },
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlimentListRoutingModule { }