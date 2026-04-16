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
import { HasPermissionDirective } from '../../directives/has-permission.directive';

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
    FormsModule,
    HasPermissionDirective
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  stats = { users: 0, groups: 0, tickets: 0, active: 0 };
  statusChart: any = null;
  priorityChart: any = null;
  weeklyChart: any = null;
  groupChart: any = null;

  groups: any[] = [];
  selectedGroup: any;
  tickets: Ticket[] = [];
  users: any[] = [];

  displayDialog = false;
  selectedTicket: Ticket | null = null;
  isNewTicket = false;

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
    this.dashboardService.getStats().subscribe(data => {
      this.stats = data;
    });

    this.dashboardService.ticketsByStatus().subscribe(data => {
      this.statusChart = data;
    });

    this.dashboardService.ticketsByPriority().subscribe(data => {
      this.priorityChart = data;
    });

    this.dashboardService.weeklyActivity().subscribe(data => {
      this.weeklyChart = data;
    });

    this.dashboardService.ticketsByGroup().subscribe(data => {
      this.groupChart = data;
    });

    this.groupService.getGroups().subscribe(data => {
      this.groups = data;
      if (this.groups.length > 0) {
        this.selectedGroup = this.groups[0];
        this.loadTickets();
      }
    });

    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => console.error('Error cargando usuarios', err)
    });
  }

  loadTickets() {
    if (this.selectedGroup) {
      this.ticketService.getTicketsByGroup(this.selectedGroup.id).subscribe(data => {
        this.tickets = data;
      });
    }
  }

  onGroupChange() {
    this.loadTickets();
  }

  openTicketDialog(ticket: Ticket) {
    this.selectedTicket = { ...ticket };
    this.isNewTicket = false;
    this.displayDialog = true;
  }

  saveTicket() {
    if (!this.selectedTicket) return;

    if (!this.selectedTicket.asignadoA) {
      this.selectedTicket.asignadoA = this.authService.getCurrentUser()?.username || '';
    }

    if (this.isNewTicket || this.selectedTicket.id === '') {
      if (!this.selectedGroup) return;
      this.selectedTicket.grupoId = this.selectedGroup.id;
      this.ticketService.createTicket(this.selectedTicket).subscribe({
        next: () => {
          this.loadTickets();
          this.displayDialog = false;
          this.isNewTicket = false;
        },
        error: (err: any) => console.error('Error creando ticket', err)
      });
    } else {
      this.ticketService.updateTicket(this.selectedTicket).subscribe({
        next: () => {
          this.loadTickets();
          this.displayDialog = false;
          this.isNewTicket = false;
        },
        error: (err: any) => console.error('Error actualizando ticket', err)
      });
    }
  }

  createTicket() {
    const newTicket: Ticket = {
      id: '',
      titulo: '',
      descripcion: '',
      estado: 'pendiente',
      prioridad: 'media',
      asignadoA: this.authService.getCurrentUser()?.username || '',
      grupoId: this.selectedGroup?.id || '',
      fechaCreacion: new Date(),
      fechaLimite: new Date(),
      comentarios: [],
      historial: ['Ticket creado']
    };
    this.selectedTicket = newTicket;
    this.isNewTicket = true;
    this.displayDialog = true;
  }

  canEditTicket(ticket: Ticket): boolean {
    const currentUser = this.authService.getCurrentUser();
    const hasEditPermission = this.authService.hasPermission('edit_ticket');
    const isAssigned = currentUser && ticket.asignadoA === currentUser.username;
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