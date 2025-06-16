import { Component } from '@angular/core';
import { RouterModule}  from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterModule],  // Use RouterOutlet to load routed components
  templateUrl: './nav-bar.page.html',
  styleUrl: './nav-bar.page.css'
})
export class NavBarPage {

}
