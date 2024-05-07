import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-after-register-vaccination',
  standalone: true,
  imports: [],
  templateUrl: './after-register-vaccination.component.html',
  styleUrl: './after-register-vaccination.component.css'
})
export default class AfterRegisterVaccinationComponent implements OnInit {
  constructor(private router:Router) {}
  
  ngOnInit(): void {
    
  }

  viewApplicationForm():void {
    this.router.navigate(['view-vaccine-application']);
  }
}
