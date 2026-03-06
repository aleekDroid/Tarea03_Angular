import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private USERS_KEY = 'users';
  private CURRENT_USER_KEY = 'currentUser';

  constructor() {}

  // Obtener todos los usuarios guardados
  private getUsers(): any[] {
    const users = localStorage.getItem(this.USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  // Guardar lista de usuarios
  private saveUsers(users: any[]): void {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  register(userData: any): Observable<{ success: boolean; message: string }> {

    const users = this.getUsers();

    const existingUser = users.find(u => u.email === userData.email);

    if (existingUser) {
      return of({
        success: false,
        message: 'El email ya está registrado'
      }).pipe(delay(500));
    }

    users.push(userData);
    this.saveUsers(users);

    return of({
      success: true,
      message: 'Registro exitoso. Redirigiendo al login...'
    }).pipe(delay(500));
  }

  login(email: string, password: string): Observable<{ success: boolean; message: string }> {

    const users = this.getUsers();

    const user = users.find(
      u => u.email === email && u.password === password
    );

    if (!user) {
      return of({
        success: false,
        message: 'Email o contraseña incorrectos'
      }).pipe(delay(500));
    }

    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));

    return of({
      success: true,
      message: 'Login exitoso'
    }).pipe(delay(500));
  }

  logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }

  getCurrentUser(): any {
    const user = localStorage.getItem(this.CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }
}