import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';

import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-manage-permissions',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    CheckboxModule,
    ButtonModule,
    CardModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './manage-permissions.component.html',
  styleUrls: ['./manage-permissions.component.css']
})
export class ManagePermissionsComponent implements OnInit {

  users: any[] = [];
  availablePermissions: string[] = [];

  permissionLabels: Map<string, string> = new Map([
    ['view', 'Ver'],
    ['move_kanban', 'Mover Kanban'],
    ['create_group', 'Crear Grupo'],
    ['manage_users', 'Gestionar Usuarios'],
    ['edit_ticket', 'Editar Ticket'],
    ['edit_profile', 'Editar Perfil']
  ]);

  // Ahora el mapa guarda llaves de tipo string (UUIDs)
  userPermissionsMap: Map<string, string[]> = new Map();

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    // Seguridad Real: Revisamos el permiso, no un ID quemado
    if (!this.authService.hasPermission('manage_users')) {
      this.router.navigate(['/home']);
      return;
    }

    this.loadAvailablePermissions();
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.userPermissionsMap.clear();
        this.users.forEach(user => {
          // Extraemos los permisos reales que vienen del backend
          const permisos = user.permisos_globales || [];
          this.userPermissionsMap.set(user.id, [...permisos]);
        });
      },
      error: (err) => console.error('Error al cargar usuarios', err)
    });
  }

  loadAvailablePermissions() {
    this.availablePermissions = this.userService.getAvailablePermissions();
  }

  hasPermission(userId: string, permission: string): boolean {
    const permissions = this.userPermissionsMap.get(userId) || [];
    return permissions.includes(permission);
  }

  togglePermission(userId: string, permission: string) {
    const permissions = this.userPermissionsMap.get(userId) || [];
    const index = permissions.indexOf(permission);

    if (index > -1) {
      permissions.splice(index, 1);
    } else {
      permissions.push(permission);
    }

    this.userPermissionsMap.set(userId, permissions);
  }

  savePermissions() {
    const peticiones: Observable<any>[] = [];

    // Empaquetamos todos los cambios en un arreglo de peticiones HTTP
    this.userPermissionsMap.forEach((permissions, userId) => {
      peticiones.push(this.userService.updateUserPermissions(userId, permissions));
    });

    if (peticiones.length > 0) {
      // forkJoin dispara todas las peticiones al mismo tiempo y espera a que terminen
      forkJoin(peticiones).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Los permisos se actualizaron en la base de datos'
          });
          this.loadUsers(); // Recargamos para ver los datos frescos
        },
        error: (err) => {
          console.error(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudieron guardar los permisos'
          });
        }
      });
    }
  }

  resetChanges() {
    this.loadUsers();
    this.messageService.add({
      severity: 'info',
      summary: 'Cambios cancelados',
      detail: 'Los cambios no guardados fueron descartados'
    });
  }

  getUserName(user: any): string {
    return user.nombre_completo || user.username;
  }

  getPermissionLabel(permission: string): string {
    return this.permissionLabels.get(permission) || permission;
  }
}