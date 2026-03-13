import { Injectable } from '@angular/core';
import { TicketService } from './ticket.service';
import { UserService } from './user.service';
import { GroupService } from './group.service';
import { Ticket } from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private ticketService: TicketService,
    private userService: UserService,
    private groupService: GroupService
  ) {}

  getStats() {
    const users = this.userService.getUsers();
    const groups = this.groupService.getGroups();
    const allTickets: Ticket[] = (this.ticketService as any).fakeTickets || [];
    const activeTickets = allTickets.filter((t: Ticket) => t.estado !== 'finalizado');

    return {
      users: users.length,
      groups: groups.length,
      tickets: allTickets.length,
      active: activeTickets.length
    };
  }

  ticketsByStatus() {
    const allTickets: Ticket[] = (this.ticketService as any).fakeTickets || [];
    const statusCount = {
      'pendiente': 0,
      'en progreso': 0,
      'revision': 0,
      'finalizado': 0
    };
    allTickets.forEach((t: Ticket) => {
      statusCount[t.estado as keyof typeof statusCount]++;
    });

    return {
      labels: ['Pendiente', 'En progreso', 'Revisión', 'Finalizado'],
      datasets: [
        {
          data: [statusCount['pendiente'], statusCount['en progreso'], statusCount['revision'], statusCount['finalizado']],
          backgroundColor: [
            '#f59e0b',
            '#3b82f6',
            '#8b5cf6',
            '#10b981'
          ]
        }
      ]
    };
  }

  ticketsByPriority() {
    const allTickets: Ticket[] = (this.ticketService as any).fakeTickets || [];
    const priorityCount = {
      'alta': 0,
      'media': 0,
      'baja': 0
    };
    allTickets.forEach((t: Ticket) => {
      priorityCount[t.prioridad as keyof typeof priorityCount]++;
    });

    return {
      labels: ['Alta', 'Media', 'Baja'],
      datasets: [
        {
          data: [priorityCount['alta'], priorityCount['media'], priorityCount['baja']],
          backgroundColor: [
            '#ef4444',
            '#f59e0b',
            '#22c55e'
          ]
        }
      ]
    };
  }

  weeklyActivity() {
    // Keep hardcoded for now
    return {
      labels: ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'],
      datasets: [
        {
          label: 'Tickets creados',
          data: [3,5,7,4,6,2,1],
          borderColor: '#3b82f6',
          tension: 0.4
        }
      ]
    };
  }

  ticketsByGroup() {
    const groups = this.groupService.getGroups();
    const allTickets: Ticket[] = (this.ticketService as any).fakeTickets || [];
    const groupCount = groups.map(g => {
      const count = allTickets.filter((t: Ticket) => t.grupoId === g.id).length;
      return count;
    });

    return {
      labels: groups.map(g => g.nombre),
      datasets: [
        {
          label: 'Tickets',
          data: groupCount,
          backgroundColor: '#6366f1'
        }
      ]
    };
  }

  getTicketsByGroup(groupId: number) {
    return this.ticketService.getTicketsByGroup(groupId);
  }
}