import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-after-record-new-vaccine-batch',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './after-record-new-vaccine-batch.component.html',
  styleUrl: './after-record-new-vaccine-batch.component.css'
})
export default class AfterRecordNewVaccineBatchComponent implements OnInit {
  constructor(private router:Router) {}

  ngOnInit(): void {
      
  }

  viewAllVaccineBatches(): void {
    // Navigate to the page displaying all vaccine batches
    this.router.navigate(['/view-vaccine-batch-list']);
  }
}
