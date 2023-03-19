import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExerciceSeanceComponent } from './add-exercice-seance.component';

describe('AddExerciceSeanceComponent', () => {
  let component: AddExerciceSeanceComponent;
  let fixture: ComponentFixture<AddExerciceSeanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExerciceSeanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExerciceSeanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
