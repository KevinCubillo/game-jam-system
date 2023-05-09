import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JamService {

  constructor(private http:HttpClient) { }

  private url: string = "http://localhost:3000/";

  public createJam(jam: any) {
    return this.http.post(this.url + "jams", jam);
  }

  public getJam() {
    return this.http.get(this.url + "jams");
  }

  public getJamById(id: number) {
    return this.http.get(this.url + "jams/" + id);
  }

  public updateJam(id: number, jam: any) {
    return this.http.put(this.url + "jams/" + id, jam);
  }

  public deleteJam(id: number) {
    return this.http.delete(this.url + "jams/" + id);
  }

}
