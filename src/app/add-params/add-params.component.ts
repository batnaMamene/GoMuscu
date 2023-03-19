import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HomeComponent } from '../home/home.component';
import { Params } from '../model/params';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-add-params',
  templateUrl: './add-params.component.html',
  styleUrls: ['./add-params.component.scss']
})
export class AddParamsComponent implements OnInit {

  constructor(private dataService: DataService) { }

  formGroup: FormGroup = new FormGroup({
    name: new FormControl("",Validators.required),
    poids: new FormControl("",Validators.required),
    MG: new FormControl("",Validators.required),
    coefLip: new FormControl("",Validators.required),
    coefProt: new FormControl("",Validators.required),
    act: new FormControl("",Validators.required),
  });

  ngOnInit(): void {
    this.formGroup.get("poids")?.setValidators(this.validateNumber);
    this.formGroup.get("MG")?.setValidators(this.validateNumber);
    this.formGroup.get("coefLip")?.setValidators(this.validateNumber);
    this.formGroup.get("coefProt")?.setValidators(this.validateNumber);
    this.formGroup.get("act")?.setValidators(this.validateNumber);
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

  addParams(){
    const params: Params = {
      name: this.formGroup.value.name,
      poids: Number(this.formGroup.value.poids),
      MG: Number(this.formGroup.value.MG),
      coefLip: Number(this.formGroup.value.coefLip),
      coefProt: Number(this.formGroup.value.coefProt),
      act: Number(this.formGroup.value.act),
    }

    this.dataService.addData("/Params",params);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }


}
