import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { NavBarPage } from '../app/features/shared/pages/nav-bar/nav-bar.page'; 

import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { PromotionStripPage } from './features/shared/pages/promotion-strip/promotion-strip.page';
import { FooterComponent } from './features/shared/pages/footer/footer.page';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavBarPage, RouterOutlet, PromotionStripPage, FooterComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  showNavbar = true;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.showNavbar = !event.urlAfterRedirects.includes('/login');
    });
  }
}
