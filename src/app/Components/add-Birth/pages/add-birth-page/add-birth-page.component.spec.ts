import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBirthPageComponent } from './add-birth-page.component';

describe('AddBirthPageComponent', () => {
  let component: AddBirthPageComponent;
  let fixture: ComponentFixture<AddBirthPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBirthPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddBirthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
