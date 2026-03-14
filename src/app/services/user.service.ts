import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  apellido?: string;
  telefono?: string;
  edad?: number;
  direccion?: string;
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
      email: 'juan.perez@gmail.com',
      password: 'usuario123',
      name: 'Juan',
      apellido: 'Pérez',
      telefono: '555-1234',
      edad: 28,
      direccion: 'Calle Ficticia 123, Ciudad',
      permissions: ['view', 'edit_profile']
    },
    {
      id: 6,
      email: 'maria.garcia@gmail.com',
      password: 'usuario123',
      name: 'María',
      apellido: 'García',
      telefono: '555-5678',
      edad: 32,
      direccion: 'Avenida Imaginaria 456, Ciudad',
      permissions: ['view', 'edit_profile']
    },
    {
      id: 7,
      email: 'carlos.lopez@gmail.com',
      password: 'usuario123',
      name: 'Carlos',
      apellido: 'López',
      telefono: '555-9012',
      edad: 25,
      direccion: 'Plaza Central 789, Ciudad',
      permissions: ['view', 'move_kanban', 'edit_profile']
    },
    {
      id: 8,
      email: 'ana.rodriguez@gmail.com',
      password: 'usuario123',
      name: 'Ana',
      apellido: 'Rodríguez',
      telefono: '555-3456',
      edad: 29,
      direccion: 'Boulevard Nuevo 101, Ciudad',
      permissions: ['view', 'edit_profile']
    },
    {
      id: 9,
      email: 'luis.martinez@gmail.com',
      password: 'usuario123',
      name: 'Luis',
      apellido: 'Martínez',
      telefono: '555-7890',
      edad: 35,
      direccion: 'Calle Antigua 202, Ciudad',
      permissions: ['view', 'move_kanban', 'edit_profile']
    },
    {
      id: 10,
      email: 'sofia.ramirez@gmail.com',
      password: 'usuario123',
      name: 'Sofía',
      apellido: 'Ramírez',
      telefono: '555-1111',
      edad: 27,
      direccion: 'Avenida Moderna 303, Ciudad',
      permissions: ['view', 'edit_profile']
    },
    {
      id: 11,
      email: 'pedro.sanchez@gmail.com',
      password: 'usuario123',
      name: 'Pedro',
      apellido: 'Sánchez',
      telefono: '555-2222',
      edad: 31,
      direccion: 'Plaza Vieja 404, Ciudad',
      permissions: ['view', 'edit_profile']
    },
    {
      id: 12,
      email: 'laura.fernandez@gmail.com',
      password: 'usuario123',
      name: 'Laura',
      apellido: 'Fernández',
      telefono: '555-3333',
      edad: 26,
      direccion: 'Calle Nueva 505, Ciudad',
      permissions: ['view', 'edit_profile']
    },
    {
      id: 13,
      email: 'diego.gonzalez@gmail.com',
      password: 'usuario123',
      name: 'Diego',
      apellido: 'González',
      telefono: '555-4444',
      edad: 30,
      direccion: 'Boulevard Antiguo 606, Ciudad',
      permissions: ['view', 'move_kanban', 'edit_profile']
    },
    {
      id: 14,
      email: 'carmen.torres@gmail.com',
      password: 'usuario123',
      name: 'Carmen',
      apellido: 'Torres',
      telefono: '555-5555',
      edad: 33,
      direccion: 'Avenida Clásica 707, Ciudad',
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