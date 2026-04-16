// src/app/services/group.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Group } from '../models/group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private apiUrl = 'http://localhost:4000/groups';

  constructor(private http: HttpClient) {}

  getGroups(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.data) 
    );
  }

  getGroupMembers(groupId: string): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/${groupId}/members`).pipe(
      map(response => response.data) 
    );
  }

  addGroup(group: Partial<Group>): Observable<any> {
    return this.http.post<any>(this.apiUrl, group).pipe(
      map(response => response.data)
    );
  }

  addUserToGroup(groupId: string, userId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${groupId}/members`, { userId }).pipe(
      map(response => response.data)
    );
  }

  removeUserFromGroup(groupId: string, userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${groupId}/members/${userId}`).pipe(
      map(response => response.data)
    );
  }

  updateGroup(group: Group): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${group.id}`, group).pipe(
      map(response => response.data)
    );
  }

  deleteGroup(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }
}