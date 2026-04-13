import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket.model';

@Injectable({ providedIn: 'root' })
export class TicketService {
  // Apuntamos DIRECTAMENTE al microservicio Fastify de tickets
  private apiUrl = 'http://localhost:3003/tickets';

  constructor(private http: HttpClient) {}

  getTickets(groupId?: string): Observable<Ticket[]> {
    let params = new HttpParams();
    if (groupId) {
      params = params.set('groupId', groupId);
    }
    return this.http.get<Ticket[]>(this.apiUrl, { params });
  }

  // Esta es la pieza clave que hace el PATCH para guardar los cambios
  updateTicket(ticket: Ticket): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${ticket.id}`, ticket);
  }
  // Renombramos esto para que el dashboard no marque error
  getTicketsByGroup(groupId: string): Observable<Ticket[]> {
    return this.getTickets(groupId);
  }

  createTicket(ticket: Ticket): Observable<any> {
    return this.http.post(this.apiUrl, ticket);
  }

  getTicketsByAssignedUser(username: string): Observable<Ticket[]> {
    let params = new HttpParams().set('assignedUserId', username);
    return this.http.get<Ticket[]>(this.apiUrl, { params });
  }
}