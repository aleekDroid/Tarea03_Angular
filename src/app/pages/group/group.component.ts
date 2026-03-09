import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { MenuModule } from 'primeng/menu';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { Group } from '../../models/group.model';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    ToastModule,
    TagModule,
    MenuModule
  ],
  providers: [MessageService],
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  groups: Group[] = [];
  groupDialog = false;

  selectedGroup: Group = this.emptyGroup();

  constructor(
    private groupService: GroupService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadGroups();
  }

  emptyGroup(): Group {
    return {
      id: 0,
      nombre: '',
      categoria: '',
      nivel: '',
      autor: '',
      miembros: 0,
      tickets: 0
    };
  }

  loadGroups() {
    this.groups = this.groupService.getGroups();
  }

  openNew() {
    this.selectedGroup = this.emptyGroup();
    this.groupDialog = true;
  }

  editGroup(group: Group) {
    this.selectedGroup = { ...group };
    this.groupDialog = true;
  }

  saveGroup() {

    if (!this.selectedGroup.nombre) return;

    if (this.selectedGroup.id === 0) {
      this.selectedGroup.id = Date.now();
      this.groupService.addGroup(this.selectedGroup);

      this.messageService.add({
        severity: 'success',
        summary: 'Grupo creado',
        detail: 'El grupo fue creado correctamente'
      });

    } else {

      this.groupService.updateGroup(this.selectedGroup);

      this.messageService.add({
        severity: 'success',
        summary: 'Grupo actualizado',
        detail: 'El grupo fue actualizado'
      });
    }

    this.groupDialog = false;
    this.loadGroups();
  }

  deleteGroup(group: Group) {

    this.groupService.deleteGroup(group.id);

    this.messageService.add({
      severity: 'warn',
      summary: 'Grupo eliminado',
      detail: 'El grupo fue eliminado'
    });

    this.loadGroups();
  }

  getGroupMenu(group: any) {

    return [

      {
        label: 'Ver Tickets',
        icon: 'pi pi-ticket',
        command: () => this.openGroupTickets(group)
      },

      {
        label: 'Gestionar Usuarios',
        icon: 'pi pi-users',
        command: () => this.manageGroup(group)
      }

    ]

  }

  openGroupTickets(group: any) {

    this.router.navigate(['/home/group-view', group.id])

  }

  manageGroup(group: any) {

    this.router.navigate(['/home/group-users', group.id])

  }
}