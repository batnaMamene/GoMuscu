import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { BrowserModule } from "@angular/platform-browser";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { LigneInfosComponent } from "./ligne-infos.component";

@NgModule({
    declarations: [
      LigneInfosComponent,
    ],
    imports: [
      BrowserModule,
      FontAwesomeModule,
      MatInputModule,
      MatIconModule,
      MatCardModule
    ],
    exports: [
      LigneInfosComponent
    ]
  })
  export class LigneInfosModule {
    constructor(){}
  }