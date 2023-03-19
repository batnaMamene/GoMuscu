import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFamilleComponent } from './show-famille.component';

describe('ShowFamilleComponent', () => {
  let component: ShowFamilleComponent;
  let fixture: ComponentFixture<ShowFamilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowFamilleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFamilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
