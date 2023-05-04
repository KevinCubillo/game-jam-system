import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',
              './../assets/css/animate.css',
              './../assets/css/flex-slider.css',
              './../assets/css/fontawesome.css',
              './../assets/css/owl.css',
              './../assets/css/templatemo-cyborg-gaming.css']
})
export class AppComponent {

  title = 'frontend';

  constructor(public authService: AuthService) { }
}

