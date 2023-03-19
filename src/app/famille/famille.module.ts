import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FamilleRoutingModule } from "./famille-routing";
import { MatCardModule } from '@angular/material/card';
import { FamilleComponent } from "./famille.component";
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatListModule } from "@angular/material/list";
import { WaitModule } from "../wait/wait.module";
import { ErrorModule } from "../error/error.module";
import { DialogBoxModule } from "../shared/dialog-box/dialog-box.module";


@NgModule({
    declarations: [
      FamilleComponent,
    ],
    imports: [
      BrowserModule,
      FamilleRoutingModule,
      MatCardModule,
      MatDialogModule,
      MatButtonModule,
      MatIconModule,
      MatExpansionModule,
      MatListModule,
      WaitModule,
      ErrorModule,
      DialogBoxModule
    ]
  })
  export class FamilleModule {
    constructor(){}
  }