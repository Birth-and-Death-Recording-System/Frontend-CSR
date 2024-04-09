import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeathComponent } from './edit-death.component';

describe('EditDeathComponent', () => {
  let component: EditDeathComponent;
  let fixture: ComponentFixture<EditDeathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDeathComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditDeathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
