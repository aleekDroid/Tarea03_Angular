import { Injectable } from '@angular/core';
import { Ticket } from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private fakeTickets: Ticket[] = [
    {
      id: 1,
      titulo: 'Implementar login seguro',
      descripcion: 'Agregar autenticación de dos factores al sistema de login.',
      estado: 'pendiente',
      prioridad: 'alta',
      asignadoA: 'Juan Pérez',
      grupoId: 1,
      fechaCreacion: new Date('2023-10-01'),
      fechaLimite: new Date('2023-10-08'),
      comentarios: ['Necesita revisión de seguridad.'],
      historial: ['Creado el ticket.']
    },
    {
      id: 2,
      titulo: 'Optimizar consultas de base de datos',
      descripcion: 'Mejorar el rendimiento de las consultas en el módulo de reportes.',
      estado: 'en progreso',
      prioridad: 'media',
      asignadoA: 'María García',
      grupoId: 1,
      fechaCreacion: new Date('2023-10-02'),
      fechaLimite: new Date('2023-10-12'),
      comentarios: ['Ya se identificaron las consultas lentas.'],
      historial: ['Asignado a María García.', 'Estado cambiado a en progreso.']
    },
    {
      id: 3,
      titulo: 'Actualizar documentación',
      descripcion: 'Revisar y actualizar la documentación del API.',
      estado: 'revision',
      prioridad: 'baja',
      asignadoA: 'Carlos López',
      grupoId: 1,
      fechaCreacion: new Date('2023-10-03'),
      fechaLimite: new Date('2023-10-08'),
      comentarios: ['Documentación casi lista para revisión.'],
      historial: ['Trabajo completado, enviado a revisión.']
    },
    {
      id: 4,
      titulo: 'Corregir bug en formulario',
      descripcion: 'El formulario de registro no valida correctamente los emails.',
      estado: 'finalizado',
      prioridad: 'alta',
      asignadoA: 'Ana Rodríguez',
      grupoId: 1,
      fechaCreacion: new Date('2023-09-28'),
      fechaLimite: new Date('2023-10-05'),
      comentarios: ['Bug corregido y probado.'],
      historial: ['Bug identificado.', 'Corregido y probado.', 'Marcado como finalizado.']
    },
    {
      id: 5,
      titulo: 'Agregar notificaciones push',
      descripcion: 'Implementar notificaciones push para eventos importantes.',
      estado: 'pendiente',
      prioridad: 'media',
      asignadoA: 'Luis Martínez',
      grupoId: 1,
      fechaCreacion: new Date('2023-10-04'),
      fechaLimite: new Date('2023-10-18'),
      comentarios: ['Esperando aprobación del diseño.'],
      historial: ['Creado el ticket, esperando asignación.']
    },
    // Add more for other groups if needed
    {
      id: 6,
      titulo: 'Revisar permisos de usuario',
      descripcion: 'Auditar y ajustar permisos de acceso.',
      estado: 'pendiente',
      prioridad: 'alta',
      asignadoA: 'Sofia Ramirez',
      grupoId: 2,
      fechaCreacion: new Date('2023-10-05'),
      fechaLimite: new Date('2023-10-10'),
      comentarios: ['Importante para seguridad.'],
      historial: ['Creado el ticket.']
    }
  ];

  getTicketsByGroup(groupId: number): Ticket[] {
    return this.fakeTickets.filter(t => t.grupoId === groupId);
  }

  updateTicket(ticket: Ticket): void {
    const index = this.fakeTickets.findIndex(t => t.id === ticket.id);
    if (index !== -1) {
      this.fakeTickets[index] = ticket;
    }
  }

  createTicket(ticket: Ticket): void {
    const nextId = Math.max(0, ...this.fakeTickets.map(t => t.id)) + 1;
    this.fakeTickets.push({ ...ticket, id: nextId });
  }

  deleteTicket(id: number): void {
    this.fakeTickets = this.fakeTickets.filter(t => t.id !== id);
  }

}
