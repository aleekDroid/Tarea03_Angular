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
      asignadoA: 'Juan',
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
      asignadoA: 'María',
      grupoId: 1,
      fechaCreacion: new Date('2023-10-02'),
      fechaLimite: new Date('2023-10-12'),
      comentarios: ['Ya se identificaron las consultas lentas.'],
      historial: ['Asignado a María.', 'Estado cambiado a en progreso.']
    },
    {
      id: 3,
      titulo: 'Actualizar documentación',
      descripcion: 'Revisar y actualizar la documentación del API.',
      estado: 'revision',
      prioridad: 'baja',
      asignadoA: 'Carlos',
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
      asignadoA: 'Ana',
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
      asignadoA: 'Luis',
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
      asignadoA: 'María',
      grupoId: 2,
      fechaCreacion: new Date('2023-10-05'),
      fechaLimite: new Date('2023-10-10'),
      comentarios: ['Importante para seguridad.'],
      historial: ['Creado el ticket.']
    },
    {
      id: 7,
      titulo: 'Implementar API de pagos',
      descripcion: 'Desarrollar endpoints para procesamiento de pagos.',
      estado: 'en progreso',
      prioridad: 'alta',
      asignadoA: 'Luis',
      grupoId: 3,
      fechaCreacion: new Date('2023-10-06'),
      fechaLimite: new Date('2023-10-20'),
      comentarios: ['En revisión con el equipo de finanzas.'],
      historial: ['Asignado a Luis.', 'Estado a en progreso.']
    },
    {
      id: 8,
      titulo: 'Diseñar UI para dashboard',
      descripcion: 'Crear mockups y prototipos para el nuevo dashboard.',
      estado: 'revision',
      prioridad: 'media',
      asignadoA: 'Ana',
      grupoId: 4,
      fechaCreacion: new Date('2023-10-07'),
      fechaLimite: new Date('2023-10-15'),
      comentarios: ['Mockups listos para revisión.'],
      historial: ['Trabajo completado, enviado a revisión.']
    },
    {
      id: 9,
      titulo: 'Configurar CI/CD',
      descripcion: 'Automatizar despliegues con pipelines.',
      estado: 'finalizado',
      prioridad: 'alta',
      asignadoA: 'Carlos',
      grupoId: 5,
      fechaCreacion: new Date('2023-09-25'),
      fechaLimite: new Date('2023-10-05'),
      comentarios: ['Pipelines funcionando correctamente.'],
      historial: ['Configurado y probado.', 'Marcado como finalizado.']
    },
    {
      id: 10,
      titulo: 'Optimizar base de datos',
      descripcion: 'Indexar tablas y mejorar queries.',
      estado: 'pendiente',
      prioridad: 'media',
      asignadoA: 'María',
      grupoId: 3,
      fechaCreacion: new Date('2023-10-08'),
      fechaLimite: new Date('2023-10-18'),
      comentarios: ['Esperando análisis de rendimiento.'],
      historial: ['Creado el ticket.']
    },
    {
      id: 11,
      titulo: 'Implementar logging avanzado',
      descripcion: 'Agregar logs detallados para debugging.',
      estado: 'en progreso',
      prioridad: 'media',
      asignadoA: 'Ana',
      grupoId: 2,
      fechaCreacion: new Date('2023-10-09'),
      fechaLimite: new Date('2023-10-22'),
      comentarios: ['Logs básicos implementados.'],
      historial: ['Asignado a Ana.', 'Estado a en progreso.']
    },
    {
      id: 12,
      titulo: 'Crear tests unitarios',
      descripcion: 'Desarrollar suite de tests para componentes críticos.',
      estado: 'pendiente',
      prioridad: 'alta',
      asignadoA: 'Laura',
      grupoId: 1,
      fechaCreacion: new Date('2023-10-10'),
      fechaLimite: new Date('2023-10-25'),
      comentarios: ['Necesario para calidad del código.'],
      historial: ['Creado el ticket.']
    },
    {
      id: 13,
      titulo: 'Migrar a nueva versión de framework',
      descripcion: 'Actualizar el proyecto a la última versión.',
      estado: 'revision',
      prioridad: 'baja',
      asignadoA: 'Diego',
      grupoId: 4,
      fechaCreacion: new Date('2023-10-11'),
      fechaLimite: new Date('2023-10-20'),
      comentarios: ['Migración completada, esperando pruebas.'],
      historial: ['Trabajo completado, enviado a revisión.']
    },
    {
      id: 14,
      titulo: 'Implementar búsqueda avanzada',
      descripcion: 'Agregar filtros y búsqueda en la interfaz.',
      estado: 'finalizado',
      prioridad: 'media',
      asignadoA: 'Carmen',
      grupoId: 5,
      fechaCreacion: new Date('2023-09-30'),
      fechaLimite: new Date('2023-10-10'),
      comentarios: ['Búsqueda funcionando correctamente.'],
      historial: ['Implementado y probado.', 'Marcado como finalizado.']
    },
    {
      id: 15,
      titulo: 'Refactorizar código legacy',
      descripcion: 'Limpiar y optimizar código antiguo.',
      estado: 'pendiente',
      prioridad: 'baja',
      asignadoA: 'Ana',
      grupoId: 2,
      fechaCreacion: new Date('2023-10-12'),
      fechaLimite: new Date('2023-10-28'),
      comentarios: ['Mejorará mantenibilidad.'],
      historial: ['Creado el ticket.']
    },
    {
      id: 16,
      titulo: 'Agregar soporte multiidioma',
      descripcion: 'Implementar internacionalización.',
      estado: 'en progreso',
      prioridad: 'media',
      asignadoA: 'María',
      grupoId: 3,
      fechaCreacion: new Date('2023-10-13'),
      fechaLimite: new Date('2023-10-30'),
      comentarios: ['Traducciones en progreso.'],
      historial: ['Asignado a María.', 'Estado a en progreso.']
    },
    {
      id: 17,
      titulo: 'Auditar seguridad de la aplicación',
      descripcion: 'Revisar vulnerabilidades y aplicar parches.',
      estado: 'pendiente',
      prioridad: 'alta',
      asignadoA: 'Juan',
      grupoId: 1,
      fechaCreacion: new Date('2023-10-14'),
      fechaLimite: new Date('2023-10-21'),
      comentarios: ['Crítico para la seguridad.'],
      historial: ['Creado el ticket.']
    },
    {
      id: 18,
      titulo: 'Optimizar imágenes y assets',
      descripcion: 'Comprimir y optimizar recursos estáticos.',
      estado: 'revision',
      prioridad: 'baja',
      asignadoA: 'Pedro',
      grupoId: 4,
      fechaCreacion: new Date('2023-10-15'),
      fechaLimite: new Date('2023-10-25'),
      comentarios: ['Optimización completada.'],
      historial: ['Trabajo completado, enviado a revisión.']
    },
    {
      id: 19,
      titulo: 'Implementar cache distribuido',
      descripcion: 'Agregar Redis para mejorar rendimiento.',
      estado: 'finalizado',
      prioridad: 'media',
      asignadoA: 'María',
      grupoId: 2,
      fechaCreacion: new Date('2023-10-01'),
      fechaLimite: new Date('2023-10-15'),
      comentarios: ['Cache funcionando.'],
      historial: ['Implementado y probado.', 'Marcado como finalizado.']
    },
    {
      id: 20,
      titulo: 'Crear manual de usuario',
      descripcion: 'Documentar funcionalidades para usuarios finales.',
      estado: 'pendiente',
      prioridad: 'baja',
      asignadoA: 'Diego',
      grupoId: 5,
      fechaCreacion: new Date('2023-10-16'),
      fechaLimite: new Date('2023-11-01'),
      comentarios: ['Ayudará a los usuarios.'],
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
