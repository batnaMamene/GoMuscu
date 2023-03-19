import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ProgressBarComponent } from "./progress-bar.component";

@NgModule({
    declarations: [
      ProgressBarComponent
    ],
    imports: [
      BrowserModule,
      MatCardModule,
      MatIconModule,
      MatButtonModule,
      MatTooltipModule,    
    ],
    exports: [
      ProgressBarComponent
    ]
  })
  export class ProgressBarModule {
    constructor(){}
  }