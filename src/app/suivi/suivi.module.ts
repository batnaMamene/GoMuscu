import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SuiviRoutingModule } from "./suivi-routing";
import { SuiviComponent } from "./suivi.component";
import { MatNativeDateModule } from "@angular/material/core";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { WaitModule } from "../wait/wait.module";
import { ErrorModule } from "../error/error.module";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatDialogModule } from "@angular/material/dialog";
import { DialogBoxModule } from "../shared/dialog-box/dialog-box.module";

@NgModule({
    declarations: [
      SuiviComponent
    ],
    imports: [
      BrowserModule,
      SuiviRoutingModule,
      MatInputModule,
      ReactiveFormsModule,
      FormsModule,
      MatFormFieldModule,
      MatDatepickerModule,
      MatNativeDateModule, 
      MatSelectModule,
      MatIconModule,
      MatButtonModule,
      MatAutocompleteModule,
      MatDialogModule,
      DialogBoxModule,
      WaitModule,
      ErrorModule
    ]
  })
  export class SuiviModule {
    constructor(){}
  }