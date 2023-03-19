import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MuscleDetailsComponent } from "../muscle-details/muscle-details.component";

@NgModule({
    declarations: [
      MuscleDetailsComponent,
    ],
    imports: [
      BrowserModule,
      MatCardModule,
      MatIconModule,
      MatButtonModule,
      MatTooltipModule,
    ]
  })
  export class MuscleDetailsModule {
    constructor(){}
  }