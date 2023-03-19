import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor() { }

  component!: BehaviorSubject<Function>;
  close: Subject<boolean> = new Subject();

  setComponent(component: Function){
    this.component = new BehaviorSubject(component);
  }
  getComponent(){
    return this.component.asObservable();
  }

  setClose(){
    this.close.next(true);
  }
  getClose(){
    return this.close.asObservable();
  }
}
