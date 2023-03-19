import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { AddParamsComponent } from "./add-params.component";

@NgModule({
    declarations: [
      AddParamsComponent,
    ],
    imports: [
      BrowserModule,
      ReactiveFormsModule,
      FormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule
    ]
  })
  export class AddParamsModule {
    constructor(){}
  }