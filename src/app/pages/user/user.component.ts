import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';

import { MessageService } from 'primeng/api';

import { AuthService } from '../../services/auth.service';

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
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: any = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    age: null
  };

  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit() {

    const currentUser = this.authService.getCurrentUser();

    if (currentUser) {
      this.user = { ...currentUser };
    }

  }

  saveProfile() {

    try {

      const users = JSON.parse(localStorage.getItem('users') || '[]');

      const index = users.findIndex((u: any) => u.email === this.user.email);

      if (index !== -1) {
        users[index] = this.user;
      }

      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(this.user));

      this.messageService.add({
        severity: 'success',
        summary: 'Perfil actualizado',
        detail: 'Los cambios se guardaron correctamente'
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