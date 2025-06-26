import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth-service/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.css']
})
export class AuthPage {
  
  // Login form
  loginEmail = '';
  loginPassword = '';
  
  // Signup form
  signupName = '';
  signupEmail = '';
  signupPassword = '';
  
  errorMessage = '';
  
  isRightPanelActive = false;

  constructor(private authService: AuthService, private router: Router) {}

  handleLogin() {
    this.authService.login({ email: this.loginEmail, password: this.loginPassword })
      .subscribe({
        next: (res) => {
          this.authService.saveToken(res.token);
          this.router.navigate(['/']);
        },
        error: () => {
          this.errorMessage = 'Invalid email or password';
        }
      });
  }

  handleSignup() {
    this.authService.signup({ 
        name: this.signupName, 
        email: this.signupEmail, 
        password: this.signupPassword 
    }).subscribe({
    next: (res) => {
      this.authService.saveToken(res.token);
      this.router.navigate(['/']);
    },
    error: () => {
      this.errorMessage = 'Signup failed. Please try again.';
    }
  });
  }

  togglePanel(showSignUp: boolean) {
    this.isRightPanelActive = showSignUp;
    this.errorMessage = '';
  }
}
