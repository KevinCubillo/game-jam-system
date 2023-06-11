import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSiteComponent } from './form-site.component';

describe('FormSiteComponent', () => {
  let component: FormSiteComponent;
  let fixture: ComponentFixture<FormSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
