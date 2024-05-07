import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { vaccineApplicantService } from '../../services/vaccine_applicant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-latest-vaccine-applicant-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-latest-vaccine-applicant-info.component.html',
  styleUrl: './view-latest-vaccine-applicant-info.component.css'
})
export default class ViewLatestVaccineApplicantInfoComponent implements OnInit {
  vaccinationApplicationForm: FormGroup;
  latestApplicantInfo$: Observable<any>;

  constructor(private formBuilder: FormBuilder, private vaccineApplicantService: vaccineApplicantService,private router:Router) {}

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

    // Fetch latest applicant info on component initialization
    this.latestApplicantInfo$ = this.getLatestAddedApplicant();
  }

  getLatestAddedApplicant(): Observable<any> {
    return this.vaccineApplicantService.getLatestAddedApplicant();
  }

  goBack(): void {
    // Navigate back to the home page
    this.router.navigate(['/pt-home']);
  }
}
