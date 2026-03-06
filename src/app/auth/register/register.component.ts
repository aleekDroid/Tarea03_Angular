import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';

import { MessageService } from 'primeng/api';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  nombres: string = '';
  apellidoPaterno: string = '';
  apellidoMaterno: string = '';

  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  telefono: string = '';
  direccion: string = '';
  edad: number | null = null;

  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  register(): void {

    if (
      !this.nombres ||
      !this.apellidoPaterno ||
      !this.apellidoMaterno ||
      !this.email ||
      !this.password ||
      !this.confirmPassword ||
      !this.telefono ||
      !this.direccion ||
      !this.edad
    ) {

      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor completa todos los campos'
      });

      return;
    }

    if (this.password !== this.confirmPassword) {

      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Las contraseñas no coinciden'
      });

      return;
    }

    const user = {

      nombres: this.nombres,
      apellidoPaterno: this.apellidoPaterno,
      apellidoMaterno: this.apellidoMaterno,

      email: this.email,
      password: this.password,

      telefono: this.telefono,
      direccion: this.direccion,
      edad: this.edad

    };

    this.loading = true;

    this.authService.register(user).subscribe({

      next: (response) => {

        this.loading = false;

        if (response.success) {

          this.messageService.add({
            severity: 'success',
            summary: 'Registro exitoso',
            detail: response.message,
            life: 2500
          });

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);

        } else {

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: response.message
          });

        }

      },

      error: () => {

        this.loading = false;

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ocurrió un error en el registro'
        });

      }

    });

  }

}