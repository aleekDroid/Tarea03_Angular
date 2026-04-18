// src/app/pages/group/group.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { Group } from '../../models/group.model';
import { GroupService } from '../../services/group.service';
import { HasPermissionDirective } from '../../directives/has-permission.directive';

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
    OverlayPanelModule,
    HasPermissionDirective
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
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.loadGroups();
  }

  emptyGroup(): Group {
    return {
      id: '',
      nombre: '',
      categoria: '',
      nivel: '',
      creador_nombre: '',
      miembros: 0,
      tickets: 0
    };
  }

  loadGroups() {
    this.groupService.getGroups().subscribe(data => {
      this.groups = data;
    });
  }

  openNew() {
    if (!this.authService.hasPermission('create_group')) return;
    this.selectedGroup = this.emptyGroup();
    this.groupDialog = true;
  }

  editGroup(group: Group) {
    this.selectedGroup = { ...group };
    this.groupDialog = true;
  }

  saveGroup() {
    if (!this.selectedGroup.nombre) return;

    if (this.selectedGroup.id === '') {
      if (!this.authService.hasPermission('create_group')) return;
      
      this.groupService.addGroup(this.selectedGroup).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Grupo creado', detail: 'El grupo fue creado correctamente' });
          this.groupDialog = false;
          this.loadGroups(); 
        },
        error: (err: any) => console.error('Error creando grupo', err)
      });

    } else {
      
      this.groupService.updateGroup(this.selectedGroup).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Grupo actualizado', detail: 'El grupo fue actualizado' });
          this.groupDialog = false;
          this.loadGroups();
        },
        error: (err: any) => console.error('Error actualizando grupo', err)
      });
    }
  }

  deleteGroup(group: Group) {
    if (!this.authService.hasPermission('create_group')) return;

    this.groupService.deleteGroup(group.id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'warn', summary: 'Grupo eliminado', detail: 'El grupo fue eliminado' });
        this.loadGroups();
      },
      error: (err: any) => console.error('Error eliminando grupo', err)
    });
  }

  openGroupTickets(group: any) {

    this.router.navigate(['/home/group-view', group.id])

  }

  manageGroup(group: any) {

    this.router.navigate(['/home/group-users', group.id])

  }
}