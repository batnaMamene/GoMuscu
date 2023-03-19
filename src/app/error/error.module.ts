import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ErrorComponent } from "./error.component";

@NgModule({
    declarations: [
      ErrorComponent,
    ],
    imports: [
      BrowserModule
    ],
    exports: [
      ErrorComponent
    ]
  })
  export class ErrorModule {
    constructor(){}
  }