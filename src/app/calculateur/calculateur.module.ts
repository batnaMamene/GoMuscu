import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MatCardModule } from '@angular/material/card';
import { CalculateurComponent } from "./calculateur.component";
import { CalculateurRoutingModule } from "./calculateur-routing";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatOptionModule } from "@angular/material/core";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatDialogModule } from "@angular/material/dialog";
import { WaitModule } from "../wait/wait.module";
import { ErrorModule } from "../error/error.module";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatExpansionModule } from "@angular/material/expansion";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ProgressBarModule } from "../shared/progress-bar/progress-bar.module";
import { GradesModule } from "../shared/grades/grades.module";
import { LigneInfosModule } from "../ligne-infos/ligne-infos.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { DialogBoxModule } from "../shared/dialog-box/dialog-box.module";

@NgModule({
    declarations: [
      CalculateurComponent
    ],
    imports: [
      BrowserModule,
      CalculateurRoutingModule,
      MatIconModule,
      MatTooltipModule,
      MatOptionModule,
      MatAutocompleteModule,
      MatFormFieldModule,
      ReactiveFormsModule,
      FormsModule,
      MatInputModule,
      MatButtonModule,
      MatCardModule,
      MatSelectModule,
      MatDialogModule,
      WaitModule,
      ErrorModule,
      MatDatepickerModule,
      MatExpansionModule,
      MatProgressBarModule,
      ProgressBarModule,
      GradesModule,
      LigneInfosModule,
      FontAwesomeModule,
      DialogBoxModule
    ]
  })
  export class CalculateurModule {
    constructor(){}
  }