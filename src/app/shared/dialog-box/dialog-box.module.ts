import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { DialogBoxComponent } from "./dialog-box.component";

@NgModule({
    declarations: [
      DialogBoxComponent,
    ],
    imports: [
      BrowserModule,
    ],
    exports: [
      DialogBoxComponent
    ]
  })
  export class DialogBoxModule {
    constructor(){}
  }