import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { AddMuscleComponent } from "./add-muscle.component";
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
    declarations: [
      AddMuscleComponent,
    ],
    imports: [
      BrowserModule,
      ReactiveFormsModule,
      FormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatTooltipModule
    ]
  })
  export class AddMuscleModule {
    constructor(){}
  }