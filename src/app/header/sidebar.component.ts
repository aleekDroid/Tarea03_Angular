import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarModule, ButtonModule, MenuModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  sidebarVisible: boolean = false;

  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-fw pi-home',
      routerLink: ['/home']
    },
    {
      label: 'Usuarios',
      icon: 'pi pi-fw pi-users'
    },
    {
      label: 'Productos',
      icon: 'pi pi-fw pi-shopping-cart'
    },
    {
      label: 'Reportes',
      icon: 'pi pi-fw pi-chart-bar'
    },
    {
      label: 'Configuración',
      icon: 'pi pi-fw pi-cog'
    }
  ];

  toggleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
