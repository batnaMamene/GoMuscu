import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FamilleComponent } from '../famille/famille.component';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-edit-exercice',
  templateUrl: './edit-exercice.component.html',
  styleUrls: ['./edit-exercice.component.scss']
})
export class EditExerciceComponent implements OnInit {

  constructor(private dataService: DataService,private dialogRef: MatDialogRef<FamilleComponent>,@Inject(MAT_DIALOG_DATA) private data: any) { }

  firstFormGroup: FormGroup = new FormGroup({
    name: new FormControl(this.data.name,Validators.required),
    famille: new FormControl(this.data.famille,Validators.required),
    image: new FormControl(this.data.image,Validators.required),
  });
  secondFormGroup: FormGroup = new FormGroup({
  });
  thirdFormGroup: FormGroup = new FormGroup({
  });
  file: string = this.data.image;
  name: string = "Photos";
  primary: any[] = this.data.primary;
  secondary: any[] = this.data.secondary;
  allMuscle: any[] = [];
  allMuscleFiltered: any[] = [];
  allFamille: any[] = [];
  allFamilleFiltered: any[] = [];


  ngOnInit(): void {
    this.dataService.getData("/Muscle").subscribe(res => {
      this.allMuscle = res;
      this.allMuscleFiltered.push(res);
    });
    this.dataService.getData("/Famille").subscribe(res => {
      this.allFamille = res;
      this.allFamilleFiltered = res;
    });
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

  setValue(event: any, type: string, index: number){
    if(type === "primary")  this.primary[index] = event.option.value;
    else  this.secondary[index] = event.option.value;
  }
  
  add(){
    const famille = {
      name: this.firstFormGroup.value.name,
      famille: this.firstFormGroup.value.famille,
      image: this.file,
      primary: this.primary,
      secondary: this.secondary
    }

    this.dataService.updateData('/Exercice',this.data.id,famille);
    this.dialogRef.close();
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  increment(tab: string){
    if(tab === "primary"){
      this.primary.push("");
      this.allMuscleFiltered.push(this.allMuscle);
    }
    else {
      this.secondary.push("");
      this.allMuscleFiltered.push(this.allMuscle);
    }
  }

  decrement(tab: string){
    if(tab === "primary"){
      this.primary.pop();
      this.allMuscleFiltered.pop();
    }
    else{
      this.secondary.pop();
      this.allMuscleFiltered.pop();
    }
  }

  resetMuscle(){
    this.allMuscleFiltered = [this.allMuscle];
  }

  filter(event:any,index:number){
    const filterValue = event.target.value.toLowerCase();

    this.allMuscleFiltered[index] = this.allMuscle.filter((element: any) => {
      const name: string = element.name.toLowerCase();
      if(name.includes(filterValue))  return true;
      else  return false;
    });
  }

  filterFamille(event: any){
    const filterValue = event.target.value.toLowerCase();

    this.allFamilleFiltered = this.allFamille.filter((element: any) => {
      const name: string = element.name.toLowerCase();
      if(name.includes(filterValue))  return true;
      else  return false;
    });
  }

}
