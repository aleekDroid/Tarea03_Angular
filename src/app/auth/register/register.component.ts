import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  nombres = '';
  apellidoPaterno = '';
  apellidoMaterno = '';
  email = '';
  password = '';
  confirmPassword = '';
  telefono = '';
  direccion = '';
  edad: any = '';

  loading = false;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService // Inyectamos tu servicio para conectar con Render
  ) {}

  register() {
    this.loading = true;

    /* 1. VALIDACIÓN CAMPOS VACÍOS */
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
      this.error('Todos los campos son obligatorios');
      return;
    }

    /* 2. VALIDAR QUE NOMBRES Y APELLIDOS NO TENGAN ESPACIOS */
    const noSpacesRegex = /^[^\s]+$/;
    if (!noSpacesRegex.test(this.nombres)) {
      this.error('El nombre no puede contener espacios');
      return;
    }
    if (!noSpacesRegex.test(this.apellidoPaterno)) {
      this.error('El apellido paterno no puede contener espacios');
      return;
    }
    if (!noSpacesRegex.test(this.apellidoMaterno)) {
      this.error('El apellido materno no puede contener espacios');
      return;
    }

    /* 3. VALIDAR TELÉFONO (10 números exactos) */
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(this.telefono)) {
      this.error('El teléfono debe tener exactamente 10 números');
      return;
    }

    /* 4. VALIDAR EDAD ENTERA */
    if (!Number.isInteger(Number(this.edad))) {
      this.error('La edad debe ser un número entero');
      return;
    }

    /* 5. VALIDAR PASSWORD */
    if (this.password !== this.confirmPassword) {
      this.error('Las contraseñas no coinciden');
      return;
    }

    /* 6. CREAR JSON PARA EL BACKEND (NEON POSTGRES) */
    // Juntamos los nombres para el campo 'nombre_completo' que pide la BD
    const nombreCompleto = `${this.nombres} ${this.apellidoPaterno} ${this.apellidoMaterno}`.trim();
    
    // Creamos un username automático usando lo que está antes del @ en el correo
    const usernameGenerado = this.email.split('@')[0];

    const newUser = {
      email: this.email,
      username: usernameGenerado,
      password: this.password,
      nombre_completo: nombreCompleto
    };

    /* 7. ENVIAR DATOS A RENDER (NUBE) */
    this.authService.register(newUser).subscribe({
      next: (respuesta) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Registro exitoso',
          detail: 'La cuenta fue creada correctamente en la base de datos'
        });

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1200);
        
        this.loading = false;
      },
      error: (err) => {
        // Mostramos el error exacto que nos devuelva NestJS o la Base de Datos
        const mensajeError = err.error?.data?.error || 'No se pudo conectar con el servidor';
        this.error('Error: ' + mensajeError);
      }
    });
  }

  error(msg: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: msg
    });
    this.loading = false;
  }
}