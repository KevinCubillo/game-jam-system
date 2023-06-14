import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
    constructor(private http:HttpClient) { }

    private url: string = "http://localhost:3000/";
    

    public createSite(site: any): Observable<{ user: User }> {
      return this.http.post<{ user: User }>(this.url + "sites", site);
    }
    
    public getSite() {
      return this.http.get(this.url + "sites");
    }


    public getSiteById(id: string) {
      return this.http.get(this.url + "sites/" + id);
    }
  
    public updateSite(id: string, site: any) {
      console.log(site);
      console.log(id);
      return this.http.put(this.url + "sites/" + id, site);
    }
  
    public deleteSite(id: string) {
      return this.http.delete(this.url + "sites/" + id);
      
    }

    public getUsersByRoleAndSite(siteId: string, roles: string[]): Observable<User[]> {
      const url = `${this.url}sites/${siteId}/users`;
      return this.http.post<User[]>(url, roles);
    }
   
  }
  
