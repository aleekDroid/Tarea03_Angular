// src/app/services/ticket.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs'; 
import { Ticket } from '../models/ticket.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private apiUrl = `${environment.apiUrl}/api/tickets`;

  constructor(private http: HttpClient) {}

  getTickets(groupId?: string): Observable<Ticket[]> {
    let params = new HttpParams();
    if (groupId) {
      params = params.set('groupId', groupId);
    }
    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map(response => response.data)
    );
  }

  updateTicket(ticket: Ticket): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${ticket.id}`, ticket).pipe(
      map(response => response.data)
    );
  }

  getTicketsByGroup(groupId: string): Observable<Ticket[]> {
    return this.getTickets(groupId);
  }

  createTicket(ticket: Ticket): Observable<any> {
    return this.http.post<any>(this.apiUrl, ticket).pipe(
      map(response => response.data)
    );
  }

  getTicketsByAssignedUser(username: string): Observable<Ticket[]> {
    let params = new HttpParams().set('assignedUserId', username);
    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map(response => response.data)
    );
  }
}