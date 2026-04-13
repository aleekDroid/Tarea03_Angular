import { Injectable } from '@angular/core';
import { TicketService } from './ticket.service';
import { UserService } from './user.service';
import { GroupService } from './group.service';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private ticketService: TicketService,
    private userService: UserService,
    private groupService: GroupService
  ) {}

  getStats(): Observable<any> {
    return forkJoin({
      groups: this.groupService.getGroups(),
      tickets: this.ticketService.getTickets(),
      users: this.userService.getUsers()
    }).pipe(
      map(({ groups, tickets, users }) => {
        const activeTickets = tickets.filter(t => t.estado !== 'finalizado');
        return {
          users: users.length,
          groups: groups.length,
          tickets: tickets.length,
          active: activeTickets.length
        };
      })
    );
  }

  ticketsByStatus(): Observable<any> {
    return this.ticketService.getTickets().pipe(
      map(tickets => {
        const statusCount = { 'pendiente': 0, 'en progreso': 0, 'revision': 0, 'finalizado': 0 };
        tickets.forEach(t => {
          if (statusCount[t.estado as keyof typeof statusCount] !== undefined) {
            statusCount[t.estado as keyof typeof statusCount]++;
          }
        });
        return {
          labels: ['Pendiente', 'En progreso', 'Revisión', 'Finalizado'],
          datasets: [{
            data: [statusCount['pendiente'], statusCount['en progreso'], statusCount['revision'], statusCount['finalizado']],
            backgroundColor: ['#f59e0b', '#3b82f6', '#8b5cf6', '#10b981']
          }]
        };
      })
    );
  }

  ticketsByPriority(): Observable<any> {
    return this.ticketService.getTickets().pipe(
      map(tickets => {
        const priorityCount = { 'alta': 0, 'media': 0, 'baja': 0 };
        tickets.forEach(t => {
          if (priorityCount[t.prioridad as keyof typeof priorityCount] !== undefined) {
            priorityCount[t.prioridad as keyof typeof priorityCount]++;
          }
        });
        return {
          labels: ['Alta', 'Media', 'Baja'],
          datasets: [{
            data: [priorityCount['alta'], priorityCount['media'], priorityCount['baja']],
            backgroundColor: ['#ef4444', '#f59e0b', '#22c55e']
          }]
        };
      })
    );
  }

  weeklyActivity(): Observable<any> {
    return this.ticketService.getTickets().pipe(
      map(tickets => {
        const labels = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];
        const dayMap = [6, 0, 1, 2, 3, 4, 5];
        const counts = [0, 0, 0, 0, 0, 0, 0];

        tickets.forEach(ticket => {
          if (!ticket.fechaCreacion) {
            return;
          }

          const createdAt = new Date(ticket.fechaCreacion);
          if (Number.isNaN(createdAt.getTime())) {
            return;
          }

          const index = dayMap[createdAt.getDay()];
          counts[index] += 1;
        });

        return {
          labels,
          datasets: [{
            label: 'Tickets creados',
            data: counts,
            borderColor: '#3b82f6',
            tension: 0.4
          }]
        };
      })
    );
  }

  ticketsByGroup(): Observable<any> {
    return forkJoin({
      groups: this.groupService.getGroups(),
      tickets: this.ticketService.getTickets()
    }).pipe(
      map(({ groups, tickets }) => {
        const groupCount = groups.map(g => {
          return tickets.filter((t: any) => (t.grupoId ?? t.grupo_id) === g.id).length;
        });
        return {
          labels: groups.map(g => g.nombre),
          datasets: [{ label: 'Tickets', data: groupCount, backgroundColor: '#6366f1' }]
        };
      })
    );
  }

  getTicketsByGroup(groupId: string) { // Cambiado de number a string
    return this.ticketService.getTickets(groupId);
  }
}