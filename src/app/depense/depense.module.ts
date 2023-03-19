import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MatCardModule } from '@angular/material/card';
import { DepenseComponent } from "./depense.component";
import { DepenseRoutingModule } from "./depense-routing";

@NgModule({
    declarations: [
      DepenseComponent,
    ],
    imports: [
      BrowserModule,
      DepenseRoutingModule,
      MatCardModule
    ]
  })
  export class DepenseModule {
    constructor(){}
  }