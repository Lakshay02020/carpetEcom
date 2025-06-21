import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule}  from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterModule, CommonModule],  // Use RouterOutlet to load routed components
  templateUrl: './nav-bar.page.html',
  styleUrl: './nav-bar.page.css'
})
export class NavBarPage {
  isNavOpen = false;

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }
}
