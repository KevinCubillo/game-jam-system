import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

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

  constructor(public authService: AuthService, private router: Router) { }



  goToProfile() {
    const userId = this.authService.getUserId();
    console.log('UserId:', userId);
    if (userId) {
      this.router.navigate(['/profile', userId]);
    } else {
      // Manejar el caso en el que no hay userId.
      console.error('No user ID!');
    }
  }
}

