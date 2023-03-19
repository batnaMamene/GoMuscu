import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FamilleComponent } from "./famille.component";

const routes: Routes = [
    {   path: 'famille',   component: FamilleComponent   },
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FamilleRoutingModule { }