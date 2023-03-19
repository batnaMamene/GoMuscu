import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-exercice-details',
  templateUrl: './exercice-details.component.html',
  styleUrls: ['./exercice-details.component.scss']
})
export class ExerciceDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  error: boolean = false;
  show: boolean = false;
  exercice: any;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const name = params.get('name')!;
      this.dataService.getData("/Exercice").subscribe((exo:any) => {
        if(exo.length === 0)  this.error = true;
        else{
          this.show = true;
          this.exercice = exo.find((e:any) => e.name === name);
        }
      });
    })
  }

}
