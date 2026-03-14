import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  permissions: string[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [
    {
      id: 1,
      email: 'admin@gmail.com',
      password: 'admin123',
      name: 'Admin',
      permissions: ['view', 'move_kanban', 'create_group', 'manage_users', 'edit_ticket', 'edit_profile']
    },
    {
      id: 2,
      email: 'practicante@gmail.com',
      password: 'practicante123',
      name: 'Practicante',
      permissions: ['view', 'edit_profile']
    },
    {
      id: 3,
      email: 'empleado@gmail.com',
      password: 'empleado123',
      name: 'Empleado',
      permissions: ['view', 'move_kanban', 'edit_profile']
    },
    {
      id: 4,
      email: 'empleado2@gmail.com',
      password: 'empleado2123',
      name: 'Empleado (Crea Grupos)',
      permissions: ['view', 'move_kanban', 'create_group', 'edit_profile']
    },
    {
      id: 5,
      email: 'usuario1@gmail.com',
      password: 'usuario123',
      name: 'Usuario 1',
      permissions: ['view', 'edit_profile']
    },
    {
      id: 6,
      email: 'usuario2@gmail.com',
      password: 'usuario123',
      name: 'Usuario 2',
      permissions: ['view', 'edit_profile']
    },
    {
      id: 7,
      email: 'usuario3@gmail.com',
      password: 'usuario123',
      name: 'Usuario 3',
      permissions: ['view', 'move_kanban', 'edit_profile']
    },
    {
      id: 8,
      email: 'usuario4@gmail.com',
      password: 'usuario123',
      name: 'Usuario 4',
      permissions: ['view', 'edit_profile']
    },
    {
      id: 9,
      email: 'usuario5@gmail.com',
      password: 'usuario123',
      name: 'Usuario 5',
      permissions: ['view', 'move_kanban', 'edit_profile']
    },
    {
      id: 10,
      email: 'usuario6@gmail.com',
      password: 'usuario123',
      name: 'Usuario 6',
      permissions: ['view', 'edit_profile']
    },
    {
      id: 11,
      email: 'usuario7@gmail.com',
      password: 'usuario123',
      name: 'Usuario 7',
      permissions: ['view', 'edit_profile']
    },
    {
      id: 12,
      email: 'usuario8@gmail.com',
      password: 'usuario123',
      name: 'Usuario 8',
      permissions: ['view', 'edit_profile']
    },
    {
      id: 13,
      email: 'usuario9@gmail.com',
      password: 'usuario123',
      name: 'Usuario 9',
      permissions: ['view', 'move_kanban', 'edit_profile']
    },
    {
      id: 14,
      email: 'usuario10@gmail.com',
      password: 'usuario123',
      name: 'Usuario 10',
      permissions: ['view', 'edit_profile']
    }
  ];

  private currentUser: User | null = null;

  getUsers(): User[] {
    return this.users;
  }

  getUserById(id: number): User | undefined {
    return this.users.find(u => u.id === id);
  }

  getUserByEmail(email: string): User | undefined {
    return this.users.find(u => u.email === email);
  }

  login(email: string, password: string): Observable<{ success: boolean; message: string; user?: User }> {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.currentUser = user;
      return of({ success: true, message: 'Login exitoso', user }).pipe(delay(500));
    } else {
      return of({ success: false, message: 'Email o contraseña incorrectos' }).pipe(delay(500));
    }
  }

  logout(): void {
    this.currentUser = null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  hasPermission(permission: string): boolean {
    return this.currentUser ? this.currentUser.permissions.includes(permission) : false;
  }

  register(userData: { email: string; password: string; name: string }): Observable<{ success: boolean; message: string }> {
    const existing = this.users.find(u => u.email === userData.email);
    if (existing) {
      return of({ success: false, message: 'El email ya está registrado' }).pipe(delay(500));
    }
    const newUser: User = {
      id: this.users.length + 1,
      email: userData.email,
      password: userData.password,
      name: userData.name,
      permissions: ['view', 'edit_profile'] // Default permissions
    };
    this.users.push(newUser);
    return of({ success: true, message: 'Registro exitoso' }).pipe(delay(500));
  }
}