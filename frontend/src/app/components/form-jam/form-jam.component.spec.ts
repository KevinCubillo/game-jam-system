import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormJamComponent } from './form-jam.component';

describe('FormJamComponent', () => {
  let component: FormJamComponent;
  let fixture: ComponentFixture<FormJamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormJamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormJamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
