import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent {

  @ViewChild("container", { read: ViewContainerRef }) container: any;
  componentRef!: ComponentRef<any>;
  componentInstance!: any;
  scrollTop: number = 0;
  scrollLeft: number = 0;

  constructor(private dialogService: DialogService, private resolver: ComponentFactoryResolver) {
    const test = dialogService.getComponent();
    test.subscribe(res => {
      this.componentInstance = res;
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.loadComponent();
      this.setAnimation();
    },0);
  }

  ngOnDestroy(){
    window.removeEventListener("scroll", this.anim, false);
  }

  setAnimation(){
    this.scrollLeft = window.scrollX;
    this.scrollTop = window.scrollY;

    window.addEventListener("scroll",  (event) => {
      console.log(event)
      event.preventDefault();
      event.stopImmediatePropagation();
      event.stopPropagation();
    });
  }

  anim(event: Event){
    // document.documentElement.scrollTop = this.scrollTop;
    // document.documentElement.scrollLeft = this.scrollLeft;
  }

  loadComponent() {
    this.container.clear();
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(this.componentInstance);

    this.componentRef = this.container.createComponent(factory);
  }

  close(event:any){
    if(event.target.className === "allScreen"){
      this.dialogService.setClose();
    }
  }

}
