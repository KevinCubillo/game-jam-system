import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError,switchMap } from 'rxjs/operators';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL: string = "http://localhost:3000";

  constructor(private http: HttpClient, private router: Router) {}
  signUp(user: { email: string; password: string, nombre: string }): Observable<any> {

    return this.http.post<any>(this.URL + '/userExists', user).pipe(
      catchError((err) => {
        if (err.status === 409) {
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

  
  //get user id
  getUserId() {
    return localStorage.getItem('userId');
}

  getUserDetails(userId: string): Observable<User> {
    return this.http.get<User>(`${this.URL}/users/${userId}`);
  }

  updateUser(user: User): Observable<User> {
    const userId = localStorage.getItem('userId')
    return this.http.put<User>(`${this.URL}/users/${userId}`, user);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.URL}/users`);
  }

  updateRole(userId: string, role: string, siteID: string): Observable<User> {
    console.log("llamando a updateRole");
    console.log(userId, role, siteID);
    
    const requestBody = {
      role: role,
      siteID: siteID
    };
    
    return this.http.put<User>(`${this.URL}/users/${userId}/role`, requestBody);
  }
  
  

}
