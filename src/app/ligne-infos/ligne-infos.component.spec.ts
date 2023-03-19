import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigneInfosComponent } from './ligne-infos.component';

describe('LigneInfosComponent', () => {
  let component: LigneInfosComponent;
  let fixture: ComponentFixture<LigneInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LigneInfosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LigneInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
