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
    private messageService: MessageService
  ) {}

  register() {

    this.loading = true;

    /* VALIDACIÓN CAMPOS VACÍOS */

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

    /* VALIDAR QUE NOMBRES Y APELLIDOS NO TENGAN ESPACIOS */

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

    /* VALIDAR TELÉFONO (10 números exactos) */

    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(this.telefono)) {
      this.error('El teléfono debe tener exactamente 10 números');
      return;
    }

    /* VALIDAR EDAD ENTERA */

    if (!Number.isInteger(Number(this.edad))) {
      this.error('La edad debe ser un número entero');
      return;
    }

    /* VALIDAR PASSWORD */

    if (this.password !== this.confirmPassword) {
      this.error('Las contraseñas no coinciden');
      return;
    }

    /* VALIDAR EMAIL DUPLICADO */

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const exists = users.find((u: any) => u.email === this.email);

    if (exists) {
      this.error('Ya existe una cuenta con este correo');
      return;
    }

    /* CREAR USUARIO */

    const newUser = {
      nombres: this.nombres,
      apellidoPaterno: this.apellidoPaterno,
      apellidoMaterno: this.apellidoMaterno,
      email: this.email,
      password: this.password,
      telefono: this.telefono,
      direccion: this.direccion,
      edad: Number(this.edad)
    };

    users.push(newUser);

    localStorage.setItem('users', JSON.stringify(users));

    this.messageService.add({
      severity: 'success',
      summary: 'Registro exitoso',
      detail: 'La cuenta fue creada correctamente'
    });

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1200);

    this.loading = false;
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