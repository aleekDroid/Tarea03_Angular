import { Injectable } from '@angular/core';
import { Ticket } from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  storageKey = 'tickets';

  getTickets(): Ticket[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  saveTickets(tickets: Ticket[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(tickets));
  }

  getTicketsByGroup(groupId:number): Ticket[] {
    return this.getTickets().filter(t => t.grupoId === groupId);
  }

  createTicket(ticket: Ticket) {

    const tickets = this.getTickets();

    ticket.id = Date.now();

    tickets.push(ticket);

    this.saveTickets(tickets);

  }

  updateTicket(ticket: Ticket) {

    const tickets = this.getTickets();

    const index = tickets.findIndex(t => t.id === ticket.id);

    if(index !== -1){
      tickets[index] = ticket;
    }

    this.saveTickets(tickets);
  }

  deleteTicket(id:number){

    const tickets = this.getTickets().filter(t => t.id !== id);

    this.saveTickets(tickets);

  }

}