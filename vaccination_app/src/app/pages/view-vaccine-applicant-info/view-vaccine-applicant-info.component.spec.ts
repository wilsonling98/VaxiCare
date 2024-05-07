import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVaccineApplicantInfoComponent } from './view-vaccine-applicant-info.component';

describe('ViewVaccineApplicantInfoComponent', () => {
  let component: ViewVaccineApplicantInfoComponent;
  let fixture: ComponentFixture<ViewVaccineApplicantInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewVaccineApplicantInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewVaccineApplicantInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
