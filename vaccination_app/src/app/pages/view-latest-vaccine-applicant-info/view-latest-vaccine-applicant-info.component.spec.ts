import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLatestVaccineApplicantInfoComponent } from './view-latest-vaccine-applicant-info.component';

describe('ViewLatestVaccineApplicantInfoComponent', () => {
  let component: ViewLatestVaccineApplicantInfoComponent;
  let fixture: ComponentFixture<ViewLatestVaccineApplicantInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewLatestVaccineApplicantInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewLatestVaccineApplicantInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
