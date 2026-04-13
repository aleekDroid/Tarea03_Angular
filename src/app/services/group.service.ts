import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../models/group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private apiUrl = 'http://localhost:3004/groups'; // La URL de tu nuevo microservicio

  constructor(private http: HttpClient) {}

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.apiUrl);
  }

  getGroupMembers(groupId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${groupId}/members`);
  }

  addGroup(group: Partial<Group>): Observable<any> {
    return this.http.post(this.apiUrl, group);
  }

  addUserToGroup(groupId: string, userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${groupId}/members`, { userId });
  }

  removeUserFromGroup(groupId: string, userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${groupId}/members/${userId}`);
  }

  updateGroup(group: Group): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${group.id}`, group);
  }

  deleteGroup(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}