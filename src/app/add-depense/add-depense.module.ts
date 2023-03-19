import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AddDepenseComponent } from "./add-depense.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
    declarations: [
      AddDepenseComponent,
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
  export class AddDepenseModule {
    constructor(){}
  }