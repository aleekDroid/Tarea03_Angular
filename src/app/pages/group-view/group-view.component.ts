import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { DragDropModule, CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket.model';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-group-view',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    SelectButtonModule,
    FormsModule,
    CardModule,
    DragDropModule,
    DialogModule,
    InputTextModule,
    InputTextarea,
    CalendarModule
  ],
  templateUrl: './group-view.component.html'
})
export class GroupViewComponent implements OnInit {

  groupId!: number

  tickets: Ticket[] = [];

  filteredTickets: Ticket[] = [];

  pendientes: Ticket[] = [];
  enProgreso: Ticket[] = [];
  revision: Ticket[] = [];
  finalizados: Ticket[] = [];

  viewMode = 'list'

  options = [
    { label: 'Lista', value: 'list' },
    { label: 'Kanban', value: 'kanban' }
  ]

  filters = [
    { label: 'Todos', value: 'all' },
    { label: 'Mis tickets', value: 'mine' },
    { label: 'Sin asignar', value: 'unassigned' },
    { label: 'Prioridad alta', value: 'high' }
  ];

  selectedFilter = 'all';

  displayDialog = false;
  selectedTicket: Ticket | null = null;

  prioridades = [
    { label: 'Baja', value: 'baja' },
    { label: 'Media', value: 'media' },
    { label: 'Alta', value: 'alta' }
  ];

  estados = [
    { label: 'Pendiente', value: 'pendiente' },
    { label: 'En progreso', value: 'en progreso' },
    { label: 'Revisión', value: 'revision' },
    { label: 'Finalizado', value: 'finalizado' }
  ];

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService,
    public authService: AuthService,
    private userService: UserService
  ) { }

  loadTickets() {

    this.tickets = this.ticketService.getTicketsByGroup(this.groupId)

    this.applyFilter();

    this.separarTickets()

  }

  separarTickets() {

    this.pendientes = this.filteredTickets.filter(t => t.estado === 'pendiente')

    this.enProgreso = this.filteredTickets.filter(t => t.estado === 'en progreso')

    this.revision = this.filteredTickets.filter(t => t.estado === 'revision')

    this.finalizados = this.filteredTickets.filter(t => t.estado === 'finalizado')

  }

  ngOnInit() {

    this.groupId = Number(this.route.snapshot.paramMap.get('id'))

    this.loadTickets()

  }

  onDrop(event: CdkDragDrop<Ticket[]>) {
    if (!this.authService.hasPermission('move_kanban')) return;

    if (event.previousContainer === event.container) {
      // Same list, do nothing or reorder if needed
      return;
    } else {
      // Transfer to new list
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      // Update the ticket's estado
      const ticket = event.container.data[event.currentIndex];
      const estadoMap: Record<string, Ticket['estado']> = {
        pendientes: 'pendiente',
        enProgreso: 'en progreso',
        revision: 'revision',
        finalizados: 'finalizado'
      };

      const newEstado = estadoMap[event.container.id];
      if (newEstado) {
        ticket.estado = newEstado;
        this.ticketService.updateTicket(ticket);
      }
    }
  }

  applyFilter() {
    const currentUser = this.authService.getCurrentUser();
    switch (this.selectedFilter) {
      case 'mine':
        this.filteredTickets = this.tickets.filter(t => currentUser && t.asignadoA === currentUser.name);
        break;
      case 'unassigned':
        this.filteredTickets = this.tickets.filter(t => !t.asignadoA);
        break;
      case 'high':
        this.filteredTickets = this.tickets.filter(t => t.prioridad === 'alta');
        break;
      default:
        this.filteredTickets = [...this.tickets];
    }
  }

  onFilterChange() {
    this.applyFilter();
    this.separarTickets();
  }

  openTicketDialog(ticket: Ticket) {
    this.selectedTicket = { ...ticket };
    this.displayDialog = true;
  }

  saveTicket() {
    if (this.selectedTicket) {
      this.ticketService.updateTicket(this.selectedTicket);
      this.loadTickets();
      this.displayDialog = false;
    }
  }

  canEditTicket(ticket: Ticket): boolean {
    const currentUser = this.authService.getCurrentUser();
    const hasEditPermission = this.authService.hasPermission('edit_ticket');
    const isAssigned = currentUser && ticket.asignadoA === currentUser.name;
    return !!hasEditPermission || !!isAssigned;
  }
}