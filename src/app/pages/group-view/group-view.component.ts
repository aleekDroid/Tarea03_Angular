import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { SelectButtonModule } from 'primeng/selectbutton';

import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-group-view',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    SelectButtonModule,
    FormsModule,
    CardModule
  ],
  templateUrl: './group-view.component.html'
})
export class GroupViewComponent implements OnInit {

  groupId!: number

  tickets: any[] = [];

  pendientes: any[] = [];
  enProgreso: any[] = [];
  revision: any[] = [];
  finalizados: any[] = [];

  viewMode = 'list'

  options = [
    { label: 'Lista', value: 'list' },
    { label: 'Kanban', value: 'kanban' }
  ]

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService
  ) { }

  loadTickets() {

    this.tickets = this.ticketService.getTicketsByGroup(this.groupId)

    this.separarTickets()

  }

  separarTickets() {

    this.pendientes = this.tickets.filter(t => t.estado === 'pendiente')

    this.enProgreso = this.tickets.filter(t => t.estado === 'en progreso')

    this.revision = this.tickets.filter(t => t.estado === 'revision')

    this.finalizados = this.tickets.filter(t => t.estado === 'finalizado')

  }

  ngOnInit() {

    this.groupId = Number(this.route.snapshot.paramMap.get('id'))

    this.loadTickets()

  }

}