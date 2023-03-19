import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { AnimationsComponent } from "./animations.component";

@NgModule({
    declarations: [
      AnimationsComponent,
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
  export class AnimationsModule {
    constructor(){}
  }