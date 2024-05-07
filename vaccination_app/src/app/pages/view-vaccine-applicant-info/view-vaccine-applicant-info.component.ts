import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { vaccineApplicantService } from '../../services/vaccine_applicant.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-vaccine-applicant-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-vaccine-applicant-info.component.html',
  styleUrl: './view-vaccine-applicant-info.component.css'
})
export default class ViewVaccineApplicantInfoComponent implements OnInit {
  vaccinationApplicationForm: FormGroup;
  applicantInfo$: Observable<any>;
  applicantId: string;
  vaccineApplicants: any[] = [];

  constructor(
    private formBuilder: FormBuilder, 
    private vaccineApplicantService: vaccineApplicantService,
    private router:Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.vaccinationApplicationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      ICNumber: ['', Validators.required],
      countryCode: ['+1'],
      contactNumber: ['', Validators.required],
      gender: [''],
      appointmentDate: ['', Validators.required],
      medicalConditions: this.formBuilder.array([]),
      allergiesInfo: [{ value: '', disabled: true }],
      otherInfo: [{ value: '', disabled: true }],
    });

    this.route.params.subscribe(params => {
      const applicantId = params['id'];
      if (applicantId) {
        this.applicantId = applicantId;
        this.applicantInfo$ = this.getVaccineApplicantById(applicantId);
      }
    });
  }

  getAllVaccineApplicants(): void {
    this.vaccineApplicantService.getAllVaccineApplicants().subscribe(
      (applicants: any[]) => {
        this.vaccineApplicants = applicants;
      },
      error => {
        console.error('Error fetching vaccine applicants:', error);
      }
    );
  }

  getVaccineApplicantById(applicantId: string): Observable<any> {
    return this.vaccineApplicantService.getVaccineApplicantById(applicantId);
  }

  confirmVaccinationAppointment(): void {
    const confirmation = window.confirm('Are you sure you want to confirm the vaccination appointment? This action cannot be undone.');
  
    if (confirmation) {
      console.log('Confirmation received. Proceeding to confirm vaccination appointment.');
      console.log('Applicant ID:', this.applicantId);
  
      this.vaccineApplicantService.confirmVaccineAppointment(this.applicantId).subscribe(
        response => {
          alert('Vaccine applicant appointment is confirmed.');
          console.log('Confirmation response:', response);
  
          // Fetch the updated applicant's information
          this.getVaccineApplicantById(this.applicantId).subscribe(
            updatedApplicant => {
              console.log('Updated applicant:', updatedApplicant);
  
              // Update the appointmentConfirmed property of the corresponding applicant
              if (updatedApplicant) {
                updatedApplicant.appointmentConfirmed = true;
                console.log('Appointment confirmed:', updatedApplicant.appointmentConfirmed);
              } else {
                console.log('No applicant found with ID:', this.applicantId);
              }
            },
            error => {
              console.error('Failed to fetch updated applicant:', error);
            }
          );
  
          // Navigate back to the vaccine applicant list
          console.log('Navigating back to the vaccine applicant list.');
          this.router.navigate(['view-vaccine-applicant-list']);
        },
        error => {
          alert('Failed to confirm vaccine appointment.');
          console.error('Failed to confirm appointment:', error);
          // Handle error
        }
      );
    } else {
      alert('Confirm vaccine appointment for applicant is cancelled.');
      // Handle cancellation
    }
  }
}  
