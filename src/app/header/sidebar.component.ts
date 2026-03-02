import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  menuItems: MenuItem[] = [
    {
      label: 'Group',
      icon: 'pi pi-fw pi-users',
      routerLink: ['/home/group']
    },
    {
      label: 'User',
      icon: 'pi pi-fw pi-user',
      routerLink: ['/home/user']
    }
  ];

  appVersion = '4.1';
}
