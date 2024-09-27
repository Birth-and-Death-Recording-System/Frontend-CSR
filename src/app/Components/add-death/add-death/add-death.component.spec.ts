import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeathComponent } from './add-death.component';

describe('AddDeathComponent', () => {
  let component: AddDeathComponent;
  let fixture: ComponentFixture<AddDeathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDeathComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDeathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
