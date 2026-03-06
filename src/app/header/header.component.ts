import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MenuItem } from 'primeng/api';

import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

import { Menu } from 'primeng/menu';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MenubarModule,
    AvatarModule,
    InputTextModule,
    ButtonModule,
    MenuModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  items: MenuItem[] = [];
  userMenuItems: MenuItem[] = [];
  navItems: MenuItem[] = [];

  currentUser: any;

  @ViewChild('userMenu') userMenu!: Menu;
  @ViewChild('navMenu') navMenu!: Menu;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {

    this.currentUser = this.authService.getCurrentUser();

    this.userMenuItems = [
      {
        label: 'Cerrar sesión',
        icon: 'pi pi-sign-out',
        command: () => this.logout()
      }
    ];

    this.navItems = [
      {
        label: 'Navigation',
        items: [
          {
            label: 'Group',
            icon: 'pi pi-users',
            routerLink: ['/home/group']
          },
          {
            label: 'User',
            icon: 'pi pi-user',
            routerLink: ['/home/user']
          }
        ]
      }
    ];
  }

  toggleUserMenu(event: Event) {
    this.userMenu.toggle(event);
  }

  toggleNavMenu(event: Event) {
    this.navMenu.toggle(event);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}