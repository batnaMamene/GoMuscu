import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MatCardModule } from '@angular/material/card';
import { AlimentListComponent } from "./aliment-list.component";
import { AlimentListRoutingModule } from "./aliment-list-routing";

@NgModule({
    declarations: [
      AlimentListComponent,
    ],
    imports: [
      BrowserModule,
      AlimentListRoutingModule,
      MatCardModule
    ]
  })
  export class AlimentListModule {
    constructor(){}
  }