import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatListModule } from "@angular/material/list";
import { WaitModule } from "../wait/wait.module";
import { ErrorModule } from "../error/error.module";
import { ExerciceDetailsComponent } from "./exercice-details.component";
import { ExerciceDetailsRoutingModule } from "./exercice-details-routing";

@NgModule({
    declarations: [
      ExerciceDetailsComponent,
    ],
    imports: [
      BrowserModule,
      ExerciceDetailsRoutingModule,
      MatCardModule,
      MatIconModule,
      MatButtonModule,
      MatInputModule,
      MatExpansionModule,
      MatListModule,
      WaitModule,
      ErrorModule
    ]
  })
  export class ExerciceDetailsModule {
    constructor(){}
  }