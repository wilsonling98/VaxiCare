import { Component, OnInit, inject} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;
  emailIsValid = true;
  passwordIsValid = true;
  category = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Enable login button when both email and password fields are valid
  get isLoginButtonEnabled(): boolean {
    return this.loginForm.valid;
  }

  // Login logic
// Login logic
login(): void {
  if (this.emailIsValid && this.passwordIsValid) {
    const userIDInput = prompt('Please enter your userID:');
    if (userIDInput !== null) {
      this.authService.login({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
        userID: userIDInput
      }).subscribe(
        (res: any) => {
          alert('Login successful');
          this.authService.setCurrentUser(res);
          
          // Call fetchUserCategory to get the user's category
          this.authService.fetchUserCategory(userIDInput).subscribe(
            (response: any) => {
              if (response && response.category) {
                const category: string = response.category;
                this.category = category;
                // Redirect user based on category
                if (category === 'HA') {
                  this.router.navigate(['/ha-home']);
                } else if (category === 'PT') {
                  this.router.navigate(['/pt-home']);
                } else {
                  alert('Invalid category: ' + category); // Display the received category for debugging
                }
              } else {
                console.error('Invalid response format:', response);
                alert('Invalid response format. Please try again.');
              }
            },
            err => {
              console.error('Error fetching user category:', err);
              alert('Error fetching user category. Please try again.');
            }
          );
        },
        err => {
          alert('Login failed: ' + err.error.message);
        }
      );
    } else {
      alert('User cancelled the userID input.');
    }
  } else {
    alert('Please enter a valid email and password.');
  }
}



  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}

