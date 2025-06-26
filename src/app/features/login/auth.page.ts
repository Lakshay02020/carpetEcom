import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth-service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css']
})
export class LoginPage {
  
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
    // Replace with your actual signup logic
    alert(`Signup with: ${this.signupName}, ${this.signupEmail}`);
  }

  togglePanel(showSignUp: boolean) {
    this.isRightPanelActive = showSignUp;
  }
}
