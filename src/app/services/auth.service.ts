import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService, User } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService: UserService) {}

  register(userData: any): Observable<{ success: boolean; message: string }> {
    return this.userService.register(userData);
  }

  login(email: string, password: string): Observable<{ success: boolean; message: string }> {
    return this.userService.login(email, password);
  }

  logout(): void {
    this.userService.logout();
  }

  getCurrentUser(): User | null {
    return this.userService.getCurrentUser();
  }

  isAuthenticated(): boolean {
    return this.userService.isAuthenticated();
  }

  hasPermission(permission: string): boolean {
    return this.userService.hasPermission(permission);
  }
}