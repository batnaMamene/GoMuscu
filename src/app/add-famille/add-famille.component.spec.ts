import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFamilleComponent } from './add-famille.component';

describe('AddFamilleComponent', () => {
  let component: AddFamilleComponent;
  let fixture: ComponentFixture<AddFamilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFamilleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFamilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
