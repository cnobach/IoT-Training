import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

  backend_url = environment.backendServer;
  backend_port = environment.backendPort;

  getUser(id: any): Observable<any>{
    return this.http.get(`${this.backend_url}:${this.backend_port}/users/` + id, {withCredentials: true});
  }

  updateUser(body: any): Observable<any>{
    return this.http.put(`${this.backend_url}:${this.backend_port}/users/`, body, {withCredentials: true});
  }
}
