import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-add-exercice-seance',
  templateUrl: './add-exercice-seance.component.html',
  styleUrls: ['./add-exercice-seance.component.scss']
})
export class AddExerciceSeanceComponent implements OnInit {

  constructor(private dataService: DataService, private bottomSheetRef: MatBottomSheetRef) { }
  allFamilles: any[] = [];
  allFamillesFiltered: any[] = [];
  allExercices: any[] = [];
  allExercicesFiltered: any[] = [];
  allFamilleExercices: any[] = [];

  formGroup: FormGroup = new FormGroup({
    famille: new FormControl("",Validators.required),
    exercice: new FormControl("",Validators.required),
  });
  
  ngOnInit(): void {
    this.dataService.getData("/Famille").subscribe(res => {
      this.allFamilles = res;
      this.allFamillesFiltered = res;
    });
    this.dataService.getData("/Exercice").subscribe(res => {
      this.allExercices = res;
    });
  }

  filterFamille(event: any){
    const filterValue = event.target.value.toLowerCase();

    this.allFamillesFiltered = this.allFamilles.filter((element: any) => {
      const name: string = element.name.toLowerCase();
      if(name.includes(filterValue))  return true;
      else  return false;
    });

  }

  setExercicesFamille(event: any){
    const filterValue = event.option.value;

    this.allFamilleExercices = this.allExercices.filter((element: any) => {
      const name: string = element.famille;
      if(name === filterValue)  return true;
      else  return false;
    });

    this.allExercicesFiltered = this.allFamilleExercices;
  }

  filterExercices(event: any){
    const filterValue = event.target.value.toLowerCase();

    this.allExercicesFiltered = this.allFamilleExercices.filter((element: any) => {
      const name: string = element.name.toLowerCase();
      if(name.includes(filterValue))  return true;
      else  return false;
    });
  }

  sendExercice(){
    this.bottomSheetRef.dismiss(this.formGroup.value.exercice);
  }

}
