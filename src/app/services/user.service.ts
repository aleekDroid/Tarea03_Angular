// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: string; 
  email: string;
  username: string;
  nombre_completo: string;
  permisos_globales?: string[]; 
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3002/users';

  // Esta lista se queda para construir las columnas de la tabla
  private availablePermissions: string[] = [
    'view',
    'move_kanban',
    'create_group',
    'manage_users',
    'edit_ticket',
    'edit_profile'
  ];

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getAvailablePermissions(): string[] {
    return [...this.availablePermissions];
  }

  updateUserPermissions(userId: string, permisos: string[]): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${userId}/permissions`, { permisos });
  }
}