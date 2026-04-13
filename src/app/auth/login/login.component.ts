// src/app/auth/login/login.component.ts
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
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

login(): void {
    if (!this.email || !this.password) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor completa todos los campos' });
      return;
    }

    this.loading = true;

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.loading = false;
        
        // ¡La clave! NestJS devuelve el token. Si lo tenemos, entramos.
        if (response.token) {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Bienvenido al sistema', life: 2000 });
          
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1500);
        }
      },
      error: (err: any) => {
        this.loading = false;
        const mensajeReal = err.error?.message || 'Error de conexión con el servidor';
        this.messageService.add({ severity: 'error', summary: 'Error', detail: mensajeReal });
      }
    });
  }
}