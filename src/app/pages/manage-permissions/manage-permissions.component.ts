import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';

import { UserService, User } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';

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

  users: User[] = [];
  availablePermissions: string[] = [];

  // Track user permissions changes
  userPermissionsMap: Map<number, string[]> = new Map();

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    // Only admin (id=1) can manage permissions
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser || currentUser.id !== 1) {
      this.router.navigate(['/home']);
      return;
    }

    this.loadUsers();
    this.loadAvailablePermissions();
  }

  loadUsers() {
    this.users = this.userService.getUsers();
    this.users.forEach(user => {
      this.userPermissionsMap.set(user.id, [...user.permissions]);
    });
  }

  loadAvailablePermissions() {
    this.availablePermissions = this.userService.getAvailablePermissions();
  }

  hasPermission(userId: number, permission: string): boolean {
    const permissions = this.userPermissionsMap.get(userId) || [];
    return permissions.includes(permission);
  }

  togglePermission(userId: number, permission: string) {
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
    this.userPermissionsMap.forEach((permissions, userId) => {
      this.userService.updateUserPermissions(userId, permissions);
    });

    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Los permisos se actualizaron correctamente'
    });

    this.loadUsers();
  }

  resetChanges() {
    this.loadUsers();
    this.messageService.add({
      severity: 'info',
      summary: 'Cambios cancelados',
      detail: 'Los cambios no guardados fueron descartados'
    });
  }

  getUserName(user: User): string {
    return user.name;
  }
}
