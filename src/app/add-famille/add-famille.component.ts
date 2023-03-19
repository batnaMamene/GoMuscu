import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FamilleComponent } from '../famille/famille.component';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-add-famille',
  templateUrl: './add-famille.component.html',
  styleUrls: ['./add-famille.component.scss']
})
export class AddFamilleComponent implements OnInit {

  constructor(private dataService: DataService) { }

  formGroup: FormGroup = new FormGroup({
    name: new FormControl("",Validators.required),
    image: new FormControl("",Validators.required),
    zone: new FormControl("",Validators.required),
    schema: new FormControl("",Validators.required),
  });
  file: string = "";
  name: string = "Image";
  fileSchema: string = "";
  schema: string = "Schema";
  zone: string = "";


  ngOnInit(): void {}

  setImage(event: any,type:string) {
    if(type === "image"){
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();

        reader.onload = (_event: any) => {
            this.file =  _event.target.result;
            this.name = event.target.files[0].name;
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    } else{
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();

        reader.onload = (_event: any) => {
            this.fileSchema =  _event.target.result;
            this.schema = event.target.files[0].name;
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }
    
  }
  
  add(){
    const famille = {
      name: this.formGroup.value.name,
      image: this.fileSchema,
      schema: this.file,
      zone: this.zone
    }

    this.dataService.addData('/Famille',famille);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  setZone(zone:string){
    this.zone = zone;
  }

}
