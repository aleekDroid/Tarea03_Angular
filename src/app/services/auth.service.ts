import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STATIC_USER = {
    email: 'admin@gmail.com',
    password: 'admin123'
  };

  constructor() {}

  register(email: string, password: string): Observable<{ success: boolean; message: string }> {
    // Simular registro exitoso sin validar con BD
    return of({
      success: true,
      message: 'Registro exitoso. Redirigiendo al login...'
    }).pipe(delay(500));
  }

  login(email: string, password: string): Observable<{ success: boolean; message: string }> {
    // Validar contra credenciales estáticas
    if (email === this.STATIC_USER.email && password === this.STATIC_USER.password) {
      const user = { email, isAuthenticated: true };
      localStorage.setItem('currentUser', JSON.stringify(user));
      return of({
        success: true,
        message: 'Login exitoso'
      }).pipe(delay(500));
    }

    return of({
      success: false,
      message: 'Email o contraseña incorrectos'
    }).pipe(delay(500));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }
}
