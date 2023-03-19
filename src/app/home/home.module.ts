import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HomeRoutingModule } from "./home-routing";
import { HomeComponent } from "./home.component";
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from "@angular/material/dialog";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatTabsModule } from "@angular/material/tabs";
import { WaitModule } from "../wait/wait.module";
import { ErrorModule } from "../error/error.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { GradesModule } from "../shared/grades/grades.module";
import { ProgressBarModule } from "../shared/progress-bar/progress-bar.module";
import { MatExpansionModule } from "@angular/material/expansion";
import { DialogBoxModule } from "../shared/dialog-box/dialog-box.module";

@NgModule({
    declarations: [
      HomeComponent,
    ],
    imports: [
      BrowserModule,
      HomeRoutingModule,
      MatCardModule,
      MatDialogModule,
      ReactiveFormsModule,
      FormsModule,
      MatSelectModule,
      MatButtonModule,
      MatInputModule,
      MatTabsModule,
      WaitModule,
      ErrorModule,
      FontAwesomeModule,
      GradesModule,
      ProgressBarModule,
      MatExpansionModule,
      DialogBoxModule
    ]
  })
  export class HomeModule {
    constructor(){}
  }