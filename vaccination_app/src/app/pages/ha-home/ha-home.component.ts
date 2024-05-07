import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-ha-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './ha-home.component.html',
  styleUrl: './ha-home.component.css'
})
export default class HAHomeComponent implements OnInit {

  constructor(private router: Router) {} // Inject Router in the constructor

  ngOnInit(): void {
      
  }
  
  viewAllVaccineBatches(): void {
    // Navigate to the page displaying all vaccine batches
    this.router.navigate(['/view-vaccine-batch-list']);
  }
}
