import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SuiviComponent } from "./suivi.component";

const routes: Routes = [
    {   path: 'suivi',   component: SuiviComponent   },
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuiviRoutingModule { }