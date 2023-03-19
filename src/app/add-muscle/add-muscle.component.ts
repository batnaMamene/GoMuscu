import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FamilleComponent } from '../famille/famille.component';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-add-muscle',
  templateUrl: './add-muscle.component.html',
  styleUrls: ['./add-muscle.component.scss']
})
export class AddMuscleComponent implements OnInit {

  constructor(private dataService: DataService,private dialogRef: MatDialogRef<FamilleComponent>,@Inject(MAT_DIALOG_DATA) private data: any) { }

  formGroup: FormGroup = new FormGroup({
    name: new FormControl("",Validators.required),
  });
  famille: string = "";


  ngOnInit(): void {
    this.famille = this.data.famille;
  }
  
  add(){
    const muscle = {
      name: this.formGroup.value.name,
      famille: this.famille
    }

    
    this.dataService.addData('/Muscle',muscle);
    this.dialogRef.close();
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

}
