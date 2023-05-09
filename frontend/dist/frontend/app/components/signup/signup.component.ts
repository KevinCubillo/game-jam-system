import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/models/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: User = { email: '', password: '' };
  successMessage: string = '';
  errorMessage: string = '';
  emailError: string = '';

  clearError() {
    this.emailError = '';
  }

  constructor(private authservice: AuthService, private router: Router) { }
  

  ngOnInit() {
  }

  signUp() {
    if (this.validateEmail(this.user.email)) {
    this.authservice.signUp(this.user)
    .subscribe(
    res => {
      console.log(res);
      localStorage.setItem('token', res.token);
      localStorage.setItem('successMessage', 'Welcome, successful login.');
      this.router.navigate(['/private']);
    },
    err => {
    console.log(err);
      this.errorMessage = 'The email is already in use.';
    }
    );
    } else {
      this.errorMessage = 'Please enter a valid email address.';
    }
    }
  
  

  validateEmail(email: string): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}

