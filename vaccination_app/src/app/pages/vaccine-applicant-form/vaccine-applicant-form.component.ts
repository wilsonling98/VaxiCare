import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { vaccineApplicantService } from '../../services/vaccine_applicant.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-vaccine-applicant-form',
  standalone:true,
  imports:[CommonModule,ReactiveFormsModule],
  templateUrl: './vaccine-applicant-form.component.html',
  styleUrls: ['./vaccine-applicant-form.component.css']
})
export default class VaccinationRegistrationComponent implements OnInit {
  vaccinationApplicationForm: FormGroup;
  allergiesChecked: boolean = false;
  otherChecked: boolean = false;

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
      allergiesInfo: [{ value: '', disabled: !this.allergiesChecked }], // Initialize with disabled state
      otherInfo: [{ value: '', disabled: !this.otherChecked }], // Initialize with disabled state
    });
  }

  toggleCondition(condition: string): void {
    const medicalConditionsArray = this.vaccinationApplicationForm.get('medicalConditions') as FormArray;
    const conditionIndex = medicalConditionsArray.value.indexOf(condition);

    if (conditionIndex !== -1) {
      medicalConditionsArray.removeAt(conditionIndex);
    } else {
      medicalConditionsArray.push(this.formBuilder.control(condition));
    }
  }

  toggleAllergies(): void {
    // Toggle allergiesChecked variable
    this.allergiesChecked = !this.allergiesChecked;

    // Enable/disable and set validators for allergies info control
    const allergiesInfoControl = this.vaccinationApplicationForm.get('allergiesInfo');
    if (this.allergiesChecked) {
      allergiesInfoControl.enable();
      allergiesInfoControl.setValidators(Validators.required);
    } else {
      allergiesInfoControl.disable();
      allergiesInfoControl.clearValidators();
    }
    allergiesInfoControl.updateValueAndValidity();
  }
  

  toggleOther(): void {
    // Toggle otherChecked variable
    this.otherChecked = !this.otherChecked;

    // Enable/disable and set validators for other info control
    const otherInfoControl = this.vaccinationApplicationForm.get('otherInfo');
    if (this.otherChecked) {
      otherInfoControl.enable();
      otherInfoControl.setValidators(Validators.required);
    } else {
      otherInfoControl.disable();
      otherInfoControl.clearValidators();
    }
    otherInfoControl.updateValueAndValidity();
  }

  registerForVaccine(): void {
    if (this.vaccinationApplicationForm.valid) {
      // Check if allergies checkbox is checked
      if (this.allergiesChecked) {
        // Get the allergies info from the form control
        const allergiesInfo = this.vaccinationApplicationForm.get('allergiesInfo').value;
        // Add allergies info to medicalConditions array
        this.toggleCondition(`Allergies - ${allergiesInfo}`);
      } else {
        // Remove Allergies from medicalConditions array if not checked
        const medicalConditionsArray = this.vaccinationApplicationForm.get('medicalConditions') as FormArray;
        const allergiesIndex = medicalConditionsArray.value.indexOf('Allergies');
        if (allergiesIndex !== -1) {
          medicalConditionsArray.removeAt(allergiesIndex);
        }
      }
  
      // Check if other checkbox is checked
      if (this.otherChecked) {
        // Get the other info from the form control
        const otherInfo = this.vaccinationApplicationForm.get('otherInfo').value;
        // Add other info to medicalConditions array
        this.toggleCondition(`Other - ${otherInfo}`);
      } else {
        // Remove Other from medicalConditions array if not checked
        const medicalConditionsArray = this.vaccinationApplicationForm.get('medicalConditions') as FormArray;
        const otherIndex = medicalConditionsArray.value.indexOf('Other');
        if (otherIndex !== -1) {
          medicalConditionsArray.removeAt(otherIndex);
        }
      }
  
      console.log('Form Value:', this.vaccinationApplicationForm.value);
      // Call the service to register for vaccination
      this.vaccineApplicantService.registerVaccination(this.vaccinationApplicationForm.value).subscribe(
        response => {
          alert("Registration for vaccine appointment successful!");
          this.router.navigate(['after-register-vaccination']);
        },
        error => {
          console.error('Registration failed:', error);
        }
      );
    } else {
      alert('Form is invalid. Please check all fields.');
    }
  }
}  