import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { vaccineBatchService } from '../../services/vaccine_batch.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-vaccine-batch-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './vaccine-batch-form.component.html',
  styleUrl: './vaccine-batch-form.component.css'
})
export default class VaccineBatchFormComponent implements OnInit {
  vaccineBatchForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private VaccineBatchService: vaccineBatchService,private router:Router) {}

  ngOnInit(): void {
    this.vaccineBatchForm = this.formBuilder.group({
      batchNumber: ['', Validators.required],
      vaccineName: ['', Validators.required],
      manufacturingDate: ['', Validators.required],
      expiryDate: ['', Validators.required],
      dosingInformation: ['', Validators.required],
    });
  }

  recordNewVaccineBatch():void {
    if(this.vaccineBatchForm.valid) { 
      console.log('Form Value:', this.vaccineBatchForm.value);

      this.VaccineBatchService.registerVaccineBatch(this.vaccineBatchForm.value).subscribe(
        response => {
          alert('Register new vaccine record batch successfully executed!');
          this.router.navigate(['after-register-new-vaccine-batch']);
        },
        error => {
          console.error('Registration failed:', error);
        }
      );
  
    }
  }

  viewAllVaccineBatches(): void {
    // Navigate to the page displaying all vaccine batches
    this.router.navigate(['/view-vaccine-batch-list']);
  }
}
