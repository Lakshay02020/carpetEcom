import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule}  from '@angular/router';
import { NavBarPage } from "./features/shared/pages/nav-bar/nav-bar.page";
import { FooterComponent } from './features/shared/pages/footer/footer.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, NavBarPage, FooterComponent],  // Use RouterOutlet to load routed components
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // Corrected to styleUrls (note the plural form)
})
export class AppComponent {
  title = 'carpetEcom';
}
