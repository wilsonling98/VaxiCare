import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineApplicantListComponent } from './vaccine-applicant-list.component';

describe('VaccineApplicantListComponent', () => {
  let component: VaccineApplicantListComponent;
  let fixture: ComponentFixture<VaccineApplicantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaccineApplicantListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VaccineApplicantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
