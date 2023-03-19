import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animations',
  templateUrl: './animations.component.html',
  styleUrls: ['./animations.component.scss'],
  animations: [
    trigger('openCloseDiv', [
      state('hidden', style({
        opacity: '0',
        width:"0%"
      })),
      state('hiddenFast', style({
        opacity: '1',
        width:"100%"
      })),
      state('showed', style({
        width:"100%",
        opacity: '1'
      })),
      transition('* => showed', [
        animate('1s ease-in')
      ]),
      transition('* => hidden', [
        animate('1s ease-in')
      ]),
      transition('* => hiddenFast', [
        animate('0s')
      ]),
    ]),
    trigger('openCloseResult', [
      state('hidden', style({
        opacity: '0',
        transform: 'scaleX(0)',
        width:"0%",
        height:"100%",
      })),
      state('half-showed', style({
        width:"41vw",
        height:"100%",
        opacity: '1'
      })),
      state('showed', style({
        transform: 'scaleX(1)',
        opacity: '1'
      })),
      transition('* => showed', [
        animate('1s ease-in')
      ]),
      transition('* => hidden', [
        animate('1s ease-in')
      ]),
      transition('* => half-showed', [
        animate('1s ease-in')
      ]),
    ]),
  ]
})
export class AnimationsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
