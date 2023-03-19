import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { GradesComponent } from "./grades.component";

@NgModule({
    declarations: [
      GradesComponent,
    ],
    imports: [
      BrowserModule,
    ],
    exports: [
      GradesComponent
    ]
  })
  export class GradesModule {
    constructor(){}
  }