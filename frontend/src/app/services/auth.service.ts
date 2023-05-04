import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError,switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private router: Router) {}
  signUp(user: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(this.URL + '/userExists', user).pipe(
      catchError((err) => {
        if (err.status === 409) {
          // Email already exists
          throw new Error('El correo electrónico ya está en uso.');
        } else {
          throw err;
        }
      }),
      switchMap(() => this.http.post<any>(this.URL + '/signup', user))
    );
  }

  signIn(user: { email: string; password: string }) {
    return this.http.post<any>(this.URL + '/signin', user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }
}

