import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuscleDetailsComponent } from './muscle-details.component';

describe('MuscleDetailsComponent', () => {
  let component: MuscleDetailsComponent;
  let fixture: ComponentFixture<MuscleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MuscleDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MuscleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
