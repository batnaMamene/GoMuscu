import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MatCardModule } from '@angular/material/card';
import { ExerciceRoutingModule } from "./exercice-routing";
import { ExerciceComponent } from "./exercice.component";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatListModule } from "@angular/material/list";
import { WaitModule } from "../wait/wait.module";
import { ErrorModule } from "../error/error.module";
import { DialogBoxModule } from "../shared/dialog-box/dialog-box.module";

@NgModule({
    declarations: [
      ExerciceComponent,
    ],
    imports: [
      BrowserModule,
      ExerciceRoutingModule,
      MatCardModule,
      MatIconModule,
      MatButtonModule,
      MatInputModule,
      MatExpansionModule,
      MatListModule,
      DialogBoxModule,
      WaitModule,
      ErrorModule
    ]
  })
  export class ExerciceModule {
    constructor(){}
  }