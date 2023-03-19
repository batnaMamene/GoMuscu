import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HomeComponent } from '../home/home.component';
import { Aliment } from '../model/aliment';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-aliment',
  templateUrl: './aliment.component.html',
  styleUrls: ['./aliment.component.scss']
})
export class AlimentComponent implements OnInit {

  constructor(private dataService: DataService) { }

  formGroup: FormGroup = new FormGroup({
    name: new FormControl("",Validators.required),
    type: new FormControl("",Validators.required),
    glucides: new FormControl("",Validators.required),
    lipides: new FormControl("",Validators.required),
    proteines: new FormControl("",Validators.required),
    fibres: new FormControl(""),
    calories: new FormControl("",Validators.required),
    IG: new FormControl(""),
  });

  ngOnInit(): void {
    this.formGroup.get("glucides")?.setValidators(this.validateNumber);
    this.formGroup.get("lipides")?.setValidators(this.validateNumber);
    this.formGroup.get("proteines")?.setValidators(this.validateNumber);
    this.formGroup.get("fibres")?.setValidators(this.validateNumber);
    this.formGroup.get("calories")?.setValidators(this.validateNumber);
    this.formGroup.get("IG")?.setValidators(this.validateNumber);
  }

  validateNumber(ctrl: AbstractControl) : ValidationErrors | null{
    const val = ctrl.value;
      if (Number.isNaN(Number(val))) {
        return {
          atLeastOneRequired: true
        }
      }
      return null;
  }

  addAliment(){
    const aliment: Aliment = {
      name: this.formGroup.value.name,
      type: this.formGroup.value.type,
      glucides: Number(this.formGroup.value.glucides),
      lipides: Number(this.formGroup.value.lipides),
      proteines: Number(this.formGroup.value.proteines),
      calories: Number(this.formGroup.value.calories),
      fibres: Number(this.formGroup.value.fibres),
      IG: Number(this.formGroup.value.IG)
    }

    this.dataService.addData('/Aliment',aliment);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

}
