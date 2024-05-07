import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { vaccineBatchService } from '../../services/vaccine_batch.service';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-recorded-batch',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './view-recorded-batch.component.html',
  styleUrl: './view-recorded-batch.component.css'
})
export default class ViewRecordedBatchComponent implements OnInit {
  vaccineBatchForm: FormGroup;
  latestRecordedBatchInfo$: Observable<any>;

  constructor(private formBuilder: FormBuilder, private VaccineBatchService: vaccineBatchService,private router:Router) {}

  ngOnInit(): void {
    this.vaccineBatchForm = this.formBuilder.group({
      batchNumber: ['', Validators.required],
      vaccineName: ['', Validators.required],
      manufacturingDate: ['', Validators.required],
      expiryDate: ['', Validators.required],
      dosingInfo: ['', Validators.required],
    });

    this.latestRecordedBatchInfo$=this.getLatestRecordedBatch();
  }

  getLatestRecordedBatch(): Observable<any> {
    return this.VaccineBatchService.getLatestRecordedVaccineBatch();
  }

  goBack(): void {
    // Navigate back to the home page
    this.router.navigate(['/ha-home']);
  }

  viewAllVaccineBatches(): void {
    // Navigate to the page displaying all vaccine batches
    this.router.navigate(['/view-vaccine-batch-list']);
  }
}
