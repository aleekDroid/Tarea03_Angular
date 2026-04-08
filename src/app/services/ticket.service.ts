import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from '../models/ticket.model';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private apiUrl = 'http://localhost:3003/tickets'; // O el puerto del API Gateway si lo usas

  constructor(private http: HttpClient) {}

  getTickets(groupId?: string) {
    let params = new HttpParams();
    if (groupId) params = params.set('groupId', groupId);
    return this.http.get<Ticket[]>(this.apiUrl, { params });
  }
}