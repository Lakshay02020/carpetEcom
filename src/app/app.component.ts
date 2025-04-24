import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule}  from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],  // Use RouterOutlet to load routed components
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // Corrected to styleUrls (note the plural form)
})
export class AppComponent {
  title = 'carpetEcom';
}
