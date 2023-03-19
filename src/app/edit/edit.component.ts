import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FamilleComponent } from '../famille/famille.component';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(private dataService: DataService,
    private dialogRef: MatDialogRef<FamilleComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) { 
      this.famille = data.famille;
    }

  formGroup: any;
  famille: any;


  ngOnInit(): void {
    this.formGroup = new FormGroup({
      name: new FormControl(this.famille.name,Validators.required),
    });
  }
  
  edit(){
    const famille = {
      name: this.formGroup.value.name,
    };

    this.dataService.updateData('/Famille',this.famille.id,famille);
    this.dialogRef.close();
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

}
