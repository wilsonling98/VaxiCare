import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineApplicantFormComponent } from './vaccine-applicant-form.component';

describe('VaccineApplicantFormComponent', () => {
  let component: VaccineApplicantFormComponent;
  let fixture: ComponentFixture<VaccineApplicantFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaccineApplicantFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VaccineApplicantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
