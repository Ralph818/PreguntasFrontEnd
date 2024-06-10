import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  myAppUrl: string;
  myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = "http://localhost:33107";
    this.myApiUrl = "/api/Login";
   }

   login (usuario: Usuario): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, usuario);
   }

   setLocalStorage(data: any): void{
    localStorage.setItem('token', data);
   }

   getToken(): string | null{
    return localStorage.getItem('token');
   }

   getTokenDecoded(): any{
    const helper = new JwtHelperService();

    const decodedToken = helper.decodeToken(this.getToken()!);
    return decodedToken;
   }

   removeLocalStorage(): void {
    localStorage.removeItem('token');
   }
}