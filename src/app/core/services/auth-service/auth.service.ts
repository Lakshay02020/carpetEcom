import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.authApi}`; 

  constructor(private http: HttpClient) { }

  login(credentials: { email: string, password: string }) {
    return this.http.post<{ token: string, userId: string }>(`${this.apiUrl}/login`, credentials);
  }

  signup(data: { name: string, email: string, password: string }) {
    return this.http.post<{ token: string, userId: string }>(`${this.apiUrl}/register`, data);
  }
  
  saveToken(token: string) {
    localStorage.setItem('jwtToken', token);
  }

  saveUserId(userId: string) {
    localStorage.setItem('userId', userId);
  }
  
  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }
  
  logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userId');
  }

  isLoggedIn(): boolean {
    
    return !!this.getToken();
  }
}
