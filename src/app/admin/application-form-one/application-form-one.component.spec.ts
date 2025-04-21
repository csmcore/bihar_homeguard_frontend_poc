import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationFormOneComponent } from './application-form-one.component';

describe('ApplicationFormOneComponent', () => {
  let component: ApplicationFormOneComponent;
  let fixture: ComponentFixture<ApplicationFormOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationFormOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationFormOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
