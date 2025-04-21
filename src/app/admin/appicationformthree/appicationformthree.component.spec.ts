import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppicationformthreeComponent } from './appicationformthree.component';

describe('AppicationformthreeComponent', () => {
  let component: AppicationformthreeComponent;
  let fixture: ComponentFixture<AppicationformthreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppicationformthreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppicationformthreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
