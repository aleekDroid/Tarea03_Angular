import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

import { MenuItem } from 'primeng/api';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MenuModule,
    SidebarModule,
    ButtonModule,
    RippleModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  sidebarVisible = false;

  items: MenuItem[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.buildMenuItems();
  }

  buildMenuItems() {
    const baseItems: MenuItem[] = [
      {
        label: 'Group',
        icon: 'pi pi-users',
        routerLink: ['/home/group']
      },
      {
        label: 'User',
        icon: 'pi pi-user',
        routerLink: ['/home/user']
      },
      {
        label: 'Dashboard',
        icon: 'pi pi-chart-bar',
        routerLink: ['/home/dashboard']
      }
    ];

    // Agregar opciones basadas en permisos
    if (this.authService.hasPermission('create_group')) {
      baseItems.push({
        label: 'Crear Grupo',
        icon: 'pi pi-plus',
        routerLink: ['/home/group']
      });
    }

    if (this.authService.hasPermission('manage_users')) {
      baseItems.push({
        label: 'Gestionar Usuarios',
        icon: 'pi pi-users',
        routerLink: ['/home/group-users']
      });

      baseItems.push({
        label: 'Gestión de Permisos',
        icon: 'pi pi-lock',
        routerLink: ['/home/manage-permissions']
      });
    }

    this.items = [
      {
        label: 'Navigation',
        items: baseItems
      }
    ];
  }

}