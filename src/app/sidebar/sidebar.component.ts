import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

import { MenuItem } from 'primeng/api';

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

  items: MenuItem[] | undefined;

  ngOnInit() {

    this.items = [
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

}