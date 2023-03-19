import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  constructor() { }

  @Input() pourcentage: number = 0;
  percent: string = '';

  ngOnInit(): void {
    this.percent = Math.round(this.pourcentage * 100).toString() + '%';
  }

  ngOnChanges(){
    this.percent = Math.round(this.pourcentage * 100).toString() + '%';
  }

}
