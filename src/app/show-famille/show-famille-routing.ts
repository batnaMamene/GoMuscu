import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShowFamilleComponent } from "./show-famille.component";

const routes: Routes = [
    {   path: 'show-famille/:name',   component: ShowFamilleComponent   },
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowFamilleRoutingModule { }