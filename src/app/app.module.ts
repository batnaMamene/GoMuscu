import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FamilleModule } from './famille/famille.module';
import { ShowFamilleModule } from './show-famille/show-famille.module';
import { AddFamilleModule } from './add-famille/add-famille.module';
import { CalculateurModule } from './calculateur/calculateur.module';
import { DepenseModule } from './depense/depense.module';
import { AlimModule } from './aliment/aliment.module';
import { ExerciceModule } from './exercice/exercice.module';
import { AlimentListModule } from './aliment-list/aliment-list.module';
import { PlanningModule } from './planning/planning.module';
import { AddExerciceModule } from './add-exercice/add-exercice.module';
import { AddDepenseModule } from './add-depense/add-depense.module';
import { AddParamsModule } from './add-params/add-params.module';
import { SuiviModule } from './suivi/suivi.module';
import { SuiviCalculateurModule } from './suivi-calculateur/suivi-calculateur.module';
import { EditModule } from './edit/edit.module';
import { AddMuscleModule } from './add-muscle/add-params.module';
import { ExerciceDetailsModule } from './exercice-details/exercice-details.module';
import { EditExerciceModule } from './edit-exercice/edit-exercice.module';
import { AnimationsModule } from './animations/animations.module';
import { WaitModule } from './wait/wait.module';
import { ErrorModule } from './error/error.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HomeModule,
    FamilleModule,
    AddFamilleModule,
    AppRoutingModule,
    ShowFamilleModule,
    CalculateurModule,
    DepenseModule,
    ExerciceModule,
    AlimentListModule,
    PlanningModule,
    AddExerciceModule,
    AddDepenseModule,
    AddParamsModule,
    SuiviModule,
    SuiviCalculateurModule,
    EditModule,
    AddMuscleModule,
    EditExerciceModule,
    AnimationsModule,
    WaitModule,
    ErrorModule,
    AngularFireModule.initializeApp(environment.firebase),
    ExerciceDetailsModule,
    BrowserAnimationsModule,
    AlimModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
