import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AlimentComponent } from "./aliment.component";
import { AlimentRoutingModule } from "./aliment-routing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
    declarations: [
      AlimentComponent,
    ],
    imports: [
      BrowserModule,
      AlimentRoutingModule,
      ReactiveFormsModule,
      FormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule
    ]
  })
  export class AlimModule {
    constructor(){}
  }