import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { WaitComponent } from "./wait.component";

@NgModule({
    declarations: [
      WaitComponent,
    ],
    imports: [
      BrowserModule
    ],
    exports: [
      WaitComponent
    ]
  })
  export class WaitModule {
    constructor(){}
  }