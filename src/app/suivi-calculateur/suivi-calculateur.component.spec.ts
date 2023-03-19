import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviCalculateurComponent } from './suivi-calculateur.component';

describe('SuiviCalculateurComponent', () => {
  let component: SuiviCalculateurComponent;
  let fixture: ComponentFixture<SuiviCalculateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuiviCalculateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuiviCalculateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
