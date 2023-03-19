import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MatCardModule } from '@angular/material/card';
import { PlanningRoutingModule } from "./planning-routing";
import { PlanningComponent } from "./planning.component";
import { ErrorModule } from "../error/error.module";
import { WaitModule } from "../wait/wait.module";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatTabsModule} from '@angular/material/tabs';
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTooltipModule } from "@angular/material/tooltip";
import { AddExerciceSeanceModule } from "./add-exercice-seance/add-exercice-seance.module";
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { DialogBoxModule } from "../shared/dialog-box/dialog-box.module";


@NgModule({
    declarations: [
      PlanningComponent,
    ],
    imports: [
      BrowserModule,
      PlanningRoutingModule,
      MatCardModule,
      ErrorModule,
      WaitModule,
      MatIconModule,
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      ReactiveFormsModule,
      FormsModule,
      MatAutocompleteModule,
      DragDropModule,
      MatTabsModule,
      MatSelectModule,
      MatDatepickerModule,
      MatDialogModule,
      MatTooltipModule,
      AddExerciceSeanceModule,
      MatBottomSheetModule,
      DialogBoxModule
    ]
  })
  export class PlanningModule {
    constructor(){}
  }