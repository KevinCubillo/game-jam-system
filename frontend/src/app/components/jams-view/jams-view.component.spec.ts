import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JamsViewComponent } from './jams-view.component';

describe('JamsViewComponent', () => {
  let component: JamsViewComponent;
  let fixture: ComponentFixture<JamsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JamsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JamsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
