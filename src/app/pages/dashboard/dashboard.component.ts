import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';
import { GroupService } from '../../services/group.service';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket.model';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ChartModule,
    DropdownModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputTextarea,
    CalendarModule,
    SelectButtonModule,
    FormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  stats: any;
  statusChart: any;
  priorityChart: any;
  weeklyChart: any;
  groupChart: any;

  groups: any[] = [];
  selectedGroup: any;
  tickets: Ticket[] = [];

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
    private dashboardService: DashboardService,
    private groupService: GroupService,
    private ticketService: TicketService,
    public authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.stats = this.dashboardService.getStats();
    this.statusChart = this.dashboardService.ticketsByStatus();
    this.priorityChart = this.dashboardService.ticketsByPriority();
    this.weeklyChart = this.dashboardService.weeklyActivity();
    this.groupChart = this.dashboardService.ticketsByGroup();

    this.groups = this.groupService.getGroups();
    if (this.groups.length > 0) {
      this.selectedGroup = this.groups[0];
      this.loadTickets();
    }
  }

  loadTickets() {
    if (this.selectedGroup) {
      this.tickets = this.ticketService.getTicketsByGroup(this.selectedGroup.id);
    }
  }

  onGroupChange() {
    this.loadTickets();
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

  createTicket() {
    const newTicket: Ticket = {
      id: 0, // Will be set in service
      titulo: '',
      descripcion: '',
      estado: 'pendiente',
      prioridad: 'media',
      asignadoA: this.authService.getCurrentUser()?.name || '',
      grupoId: this.selectedGroup?.id || 1,
      fechaCreacion: new Date(),
      fechaLimite: new Date(),
      comentarios: [],
      historial: ['Ticket creado']
    };
    this.selectedTicket = newTicket;
    this.displayDialog = true;
  }

  canEditTicket(ticket: Ticket): boolean {
    const currentUser = this.authService.getCurrentUser();
    const hasEditPermission = this.authService.hasPermission('edit_ticket');
    const isAssigned = currentUser && ticket.asignadoA === currentUser.name;
    return !!hasEditPermission || !!isAssigned;
  }

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      }
    },
    layout: {
      padding: 10
    }
  };
}