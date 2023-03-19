import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MatCardModule } from '@angular/material/card';
import { ShowFamilleComponent } from "./show-famille.component";
import { ShowFamilleRoutingModule } from "./show-famille-routing";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MuscleDetailsComponent } from "../muscle-details/muscle-details.component";
import { WaitModule } from "../wait/wait.module";
import { ErrorModule } from "../error/error.module";

@NgModule({
    declarations: [
      ShowFamilleComponent,
      MuscleDetailsComponent
    ],
    imports: [
      BrowserModule,
      ShowFamilleRoutingModule,
      MatCardModule,
      MatIconModule,
      MatButtonModule,
      MatTooltipModule,
      WaitModule,
      ErrorModule
    ]  
  })
  export class ShowFamilleModule {
    constructor(){}
  }