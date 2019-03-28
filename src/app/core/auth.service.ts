import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API_URL = 'http://localhost:3001';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  authenticate(userName: string, password: string) {
    return this.http.post(API_URL + '/login', { email: userName, senha: password}, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), observe: 'response'})
  }
}
