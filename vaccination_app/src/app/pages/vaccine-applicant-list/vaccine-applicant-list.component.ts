import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { vaccineApplicantService } from '../../services/vaccine_applicant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vaccine-applicant-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vaccine-applicant-list.component.html',
  styleUrl: './vaccine-applicant-list.component.css'
})
export default class VaccineApplicantListComponent implements OnInit {
  vaccineApplicants: any[] = [];

  constructor(
    private vaccineApplicantService: vaccineApplicantService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllVaccineApplicants();
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

  viewApplicantDetails(applicantId: string): void {
    console.log('Navigation Array:', ['view-vaccine-applicant-info', applicantId]);
    // Navigate to the view-vaccine-applicant-info page with the applicantId
    this.router.navigate(['view-vaccine-applicant-info', applicantId]);
  }
  



  markVaccinationAdministered(event: Event, applicantId: string): void {
    // Prevent the click event from propagating to the list item
    event.stopPropagation();

    const confirmation = window.confirm('Are you sure you want to mark the vaccination as administered? This action cannot be undone.');

    if (confirmation) {
      // Call the service to mark vaccination as administered for the specified applicantId
      this.vaccineApplicantService.confirmVaccinationAdministered(applicantId).subscribe(
        response => {
          alert('Vaccination marked as administered.');
          // Set the appointmentConfirmed property to true
          const index = this.vaccineApplicants.findIndex(applicant => applicant._id === applicantId);
          if (index !== -1) {
            this.vaccineApplicants[index].appointmentConfirmed = true;
            console.log('Appointment confirmed:', this.vaccineApplicants[index].appointmentConfirmed);
          }
          // Reload the list of vaccine applicants or update local state if needed
          this.getAllVaccineApplicants();
        },
        error => {
          alert('Failed to mark vaccination as administered.');
          console.error('Failed to mark vaccination as administered:', error);
          // Handle error
        }
      );
    } else {
      alert('Marking vaccination as administered is cancelled.');
      // Handle cancellation
    }
  }
}