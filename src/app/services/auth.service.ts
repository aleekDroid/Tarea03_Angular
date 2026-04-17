// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Observable, tap, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserService, User } from './user.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {}

login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
      map((response: any) => response.data), 
      tap((data: any) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('currentUser', JSON.stringify(data.user));
      })
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  }

getCurrentUser(): any | null {
    // Leemos el usuario real guardado en la sesión
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

hasPermission(permission: string): boolean {
    const user = this.getCurrentUser();
    if (user && user.permisos && Array.isArray(user.permisos)) {
      return user.permisos.includes(permission);
    }
    return false;
  }
}