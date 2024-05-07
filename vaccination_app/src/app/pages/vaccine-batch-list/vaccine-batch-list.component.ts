import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { vaccineBatchService } from '../../services/vaccine_batch.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vaccine-batch-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vaccine-batch-list.component.html',
  styleUrl: './vaccine-batch-list.component.css'
})
export default class VaccineBatchListComponent implements OnInit  {
  vaccineBatches: any[] = [];

  constructor(
    private VaccineBatchService: vaccineBatchService, // Assuming you have a service named VaccineBatchService
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllVaccineBatches();
  }

  getAllVaccineBatches(): void {
    this.VaccineBatchService.getAllVaccineBatches().subscribe(
      (batches: any[]) => {
        this.vaccineBatches = batches;
      },
      error => {
        console.error('Error fetching vaccine batches:', error);
      }
    );
  }

  viewBatchDetails(batchId: string): void {
    console.log('Navigation Array:', ['view-vaccine-batch-info', batchId]);
    // Navigate to the view-vaccine-batch-info page with the batchId
    this.router.navigate(['view-vaccine-batch-info', batchId]);
  }
}

