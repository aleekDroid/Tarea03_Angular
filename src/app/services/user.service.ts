// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

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
  private apiUrl = `${environment.apiUrl}/api/users`;

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
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.data) 
    );
  }

  getAvailablePermissions(): string[] {
    return [...this.availablePermissions];
  }

  updateUserPermissions(userId: string, permisos: string[]): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${userId}/permissions`, { permisos }).pipe(
      map(response => response.data)
    );
  }
}