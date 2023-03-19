import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DepenseComponent } from "./depense.component";

const routes: Routes = [
    {   path: 'depense',   component: DepenseComponent   },
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepenseRoutingModule { }