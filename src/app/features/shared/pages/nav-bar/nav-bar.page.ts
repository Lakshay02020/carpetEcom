import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth-service/auth.service';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterModule, CommonModule],  // Use RouterOutlet to load routed components
  templateUrl: './nav-bar.page.html',
  styleUrl: './nav-bar.page.css'
})
export class NavBarPage {
showLoginPopup = false;

constructor(private authService: AuthService, private router: Router) {}

handleCartClick(event: Event): void {
  console.log('Cart icon clicked');
  event.preventDefault();  // Prevent default navigation

  console.log('Checking if user is logged in:', this.authService.isLoggedIn());
  if (this.authService.isLoggedIn()) {
    this.router.navigate(['/cart', 10]);  // You can fetch userId dynamically if available
  } else {
    this.showLoginPopup = true;
    console.log('User not logged in, showing login popup');
  }
}

closePopup(): void {
  this.showLoginPopup = false;
}

goToLogin(): void {
  this.showLoginPopup = false;
  this.router.navigate(['/login']);
}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
}
