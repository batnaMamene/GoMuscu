import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-muscle-details',
  templateUrl: './muscle-details.component.html',
  styleUrls: ['./muscle-details.component.scss']
})
export class MuscleDetailsComponent implements OnInit {

  @Input() famille: any;
  @Input() exercices: any;
  constructor() { }

  ngOnInit(): void {
  }

}
