import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditExerciceComponent } from './edit-exercice.component';


describe('EditExerciceComponent', () => {
  let component: EditExerciceComponent;
  let fixture: ComponentFixture<EditExerciceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditExerciceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExerciceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
