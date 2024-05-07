import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-home.component.html',
  styleUrl: './patient-home.component.css'
})
export default class PatientHomeComponent implements OnInit {
  constructor(private router:Router) {}

  ngOnInit(): void {
      
  }

  registerVaccinationAppointment():void {
    this.router.navigate(['register-vaccination']);
  }
}
