import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

import { MessageService } from 'primeng/api';

import { AuthService } from '../../services/auth.service';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    InputNumberModule,
    TableModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: any = {
    id: '',
    username: '',
    permisos: [] as string[]
  };

  assignedTickets: any[] = [];

  constructor(
    private authService: AuthService,
    private ticketService: TicketService,
    private messageService: MessageService
  ) {}

  ngOnInit() {

    const currentUser = this.authService.getCurrentUser();

    if (currentUser) {
      this.user = {
        id: currentUser.id ?? '',
        username: currentUser.username ?? '',
        permisos: currentUser.permisos ?? []
      };
      this.ticketService.getTicketsByAssignedUser(currentUser.id).subscribe(data => {
        this.assignedTickets = data;
      });
    }

  }

  saveProfile() {

    try {
      localStorage.setItem('currentUser', JSON.stringify(this.user));

      this.messageService.add({
        severity: 'success',
        summary: 'Perfil actualizado',
        detail: 'Los cambios locales se guardaron correctamente'
      });

    } catch (error) {

      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudieron guardar los cambios'
      });

    }

  }

}