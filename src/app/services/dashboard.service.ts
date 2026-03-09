import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  getStats() {
    return {
      users: 14,
      groups: 5,
      tickets: 46,
      active: 29
    }
  }

  ticketsByStatus() {
    return {
      labels: ['Pendiente', 'En progreso', 'Revisión', 'Finalizado'],
      datasets: [
        {
          data: [12, 10, 8, 16],
          backgroundColor: [
            '#f59e0b',
            '#3b82f6',
            '#8b5cf6',
            '#10b981'
          ]
        }
      ]
    }
  }

  ticketsByPriority() {
    return {
      labels: ['Alta', 'Media', 'Baja'],
      datasets: [
        {
          data: [9, 20, 17],
          backgroundColor: [
            '#ef4444',
            '#f59e0b',
            '#22c55e'
          ]
        }
      ]
    }
  }

  weeklyActivity() {
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
    }
  }

  ticketsByGroup() {
    return {
      labels: [
        'Frontend',
        'Backend',
        'Testing',
        'DevOps'
      ],
      datasets: [
        {
          label: 'Tickets',
          data: [12,15,9,10],
          backgroundColor: '#6366f1'
        }
      ]
    }
  }

}