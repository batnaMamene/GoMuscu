import { Component } from '@angular/core';
import { DataService } from './shared/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GoMuscu';

  show: boolean = false;
  error: boolean = false;

  constructor(private dataService: DataService){}

  ngOnInit(){
    this.dataService.getData('/Params').subscribe(res => {
      if(res.length === 0)  this.error = true;
      else  this.show = true;
    });
  }
}
