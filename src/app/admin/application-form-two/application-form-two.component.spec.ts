import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationFormTwoComponent } from './application-form-two.component';

describe('ApplicationFormTwoComponent', () => {
  let component: ApplicationFormTwoComponent;
  let fixture: ComponentFixture<ApplicationFormTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationFormTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationFormTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
