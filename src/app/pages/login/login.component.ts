import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',

  
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string = ''; 
  isLoading: boolean = false; 
  showPassword: boolean = false; 

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.loginError = ''; // Clear any previous error messages
    this.isLoading = true; // Set loading to true when submission starts

    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: () => {
          this.isLoading = false; 
          this.router.navigate(['/']); 
        },
        error: (err: HttpErrorResponse) => { 
          this.isLoading = false; 
          console.error('Login error in component:', err); 


          if (err.status === 401) {
            this.loginError = 'Wrong username or password.';
          } else if (err.status === 0) {

            this.loginError = 'Could not connect to the server. Please check your internet connection.';
          } else if (err.status >= 500 && err.status < 600) {

            this.loginError = 'A server error occurred. Please try again later.';
          } else if (err.error && typeof err.error === 'string') {

            this.loginError = `Login failed: ${err.error}`;
          } else if (err.error && typeof err.error === 'object' && err.error.message) {

            this.loginError = `Login failed: ${err.error.message}`;
          }
          else {

            this.loginError = 'An unexpected error occurred during login. Please try again.';
          }
        },
      });
    } else {
      this.isLoading = false; 
      this.loginError = 'Please enter both username and password.'; 
      console.warn('Login form invalid on submission');
    }
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }
}