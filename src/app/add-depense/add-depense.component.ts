import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HomeComponent } from '../home/home.component';
import { Depense } from '../model/depense';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-add-depense',
  templateUrl: './add-depense.component.html',
  styleUrls: ['./add-depense.component.scss']
})
export class AddDepenseComponent implements OnInit {
  file: any;
  name: string = "Image";

  constructor(private dataService: DataService) { }

  formGroup: FormGroup = new FormGroup({
    name: new FormControl("",Validators.required),
    met: new FormControl("",Validators.required),
    img: new FormControl("",Validators.required)
  });

  ngOnInit(): void {
    this.formGroup.get("met")?.setValidators(this.validateNumber);
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

  setImage(event: any) {
    if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();

        reader.onload = (_event: any) => {
            this.file =  _event.target.result;
            this.name = event.target.files[0].name;
        };
        reader.readAsDataURL(event.target.files[0]);
    }
  }

  addDepense(){
    const depense: Depense = {
      sport: this.formGroup.value.name,
      MET: Number(this.formGroup.value.met),
      image: this.file
    }

    this.dataService.addData("/Depense",depense);
  }

}
