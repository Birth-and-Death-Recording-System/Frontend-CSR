import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBirthComponent } from './edit-birth.component';

describe('EditBirthComponent', () => {
  let component: EditBirthComponent;
  let fixture: ComponentFixture<EditBirthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBirthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditBirthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
