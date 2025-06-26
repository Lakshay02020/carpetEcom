import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { NavBarPage } from '../app/features/shared/pages/nav-bar/nav-bar.page'; 

import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavBarPage, RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {

  showNavbar = true;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.showNavbar = !event.urlAfterRedirects.includes('/login');
    });
  }
}
