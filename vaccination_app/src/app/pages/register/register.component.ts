import { CommonModule } from '@angular/common';
import { Component, OnInit, inject} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { confirmPasswordValidator } from '../../validators/confirm_password.validator';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export default class RegisterComponent implements OnInit {
  
  registerForm !: FormGroup;
  emailAlreadyExists: boolean = false;
  showPassword: boolean = false; // Track password visibility
  router = inject(Router);

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      isHA: ['', Validators.required] // Add a comma here
    }, {
      validator: confirmPasswordValidator('password','confirmPassword')
    });

    // Subscribe to value changes in the email input field
    this.registerForm.get('email').valueChanges.subscribe((value) => {
      if (value !== '') {
        this.checkEmailAvailability(value);
      }
    });
  }

  register(): void {
    this.authService.registerService(this.registerForm.value)
      .subscribe({
        next: res => {
          alert("User registered successfully!");
          this.registerForm.reset();
          this.router.navigate(['/login']);
        },
        error: err => {
          console.log(err);
        }
      });
  }

  checkEmailAvailability(email: string): void{
    this.authService.checkEmailAvailability(email)
      .subscribe({
        next: res => {
          this.emailAlreadyExists = !res.available;
        },
        error: err => {
          console.log(err);
        }
      });
  }
   // Toggle password visibility
   togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}



