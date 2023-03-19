import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss']
})
export class GradesComponent implements OnInit {

  @Input() note: number = 0;
  @Input() noteMax: number = 0;
  @Input() unit: string = "";

  constructor() { }

  ngOnInit(): void {
    this.note = Math.round(this.note);
    this.noteMax = Math.round(this.noteMax);

  }

}
