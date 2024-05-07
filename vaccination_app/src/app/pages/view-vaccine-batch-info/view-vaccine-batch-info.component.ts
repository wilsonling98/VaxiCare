import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { vaccineBatchService } from '../../services/vaccine_batch.service';

@Component({
  selector: 'app-view-vaccine-batch-info',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './view-vaccine-batch-info.component.html',
  styleUrl: './view-vaccine-batch-info.component.css'
})
export default class VaccineBatchDetailsComponent implements OnInit {
  vaccineBatch: any = {}; // Initialize vaccineBatch object

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private VaccineBatchService: vaccineBatchService // Inject VaccineBatchService
  ) { }

  ngOnInit(): void {
    // Get the vaccine batch ID from the route parameter
    const batchId = this.route.snapshot.paramMap.get('id');
    // Call the service method to fetch the vaccine batch details
    this.getVaccineBatchDetails(batchId);
  }

  getVaccineBatchDetails(batchId: string): void {
    this.VaccineBatchService.getVaccineBatchById(batchId).subscribe(
      (batch: any) => {
        this.vaccineBatch = batch;
      },
      error => {
        console.error('Error fetching vaccine batch details:', error);
      }
    );
  }

  viewAllVaccineBatches(): void {
    // Navigate to the page displaying all vaccine batches
    this.router.navigate(['/view-vaccine-batch-list']);
  }
}
