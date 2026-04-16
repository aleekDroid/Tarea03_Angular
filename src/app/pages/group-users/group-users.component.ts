import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HasPermissionDirective } from '../../directives/has-permission.directive';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';

import { GroupService } from '../../services/group.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector:'app-group-users',
  standalone:true,
  imports:[
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    HasPermissionDirective
  ],
  templateUrl:'./group-users.component.html'
})
export class GroupUsersComponent implements OnInit {

  groupId!: string; 

  users: any[] = [];
  groupUsers: any[] = [];

  selectedUser: any;

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService, 
    private userService: UserService,
    public authService: AuthService,
    private router: Router
  ){}

  ngOnInit(){
    // Tomamos el ID como texto
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.groupId = id;
    }

    if (!this.authService.hasPermission('manage_users')) {
      this.router.navigate(['/home']);
      return;
    }

    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data; 
      },
      error: (err) => console.error('Error cargando usuarios', err)
    });

    this.loadGroupUsers();
  }

  loadGroupUsers(){
    // Llamada real al microservicio
    this.groupService.getGroupMembers(this.groupId).subscribe({
      next: (members) => {
        this.groupUsers = members;
      },
      error: (err) => console.error('Error cargando miembros', err)
    });
  }

  addUser(){
    if(!this.selectedUser) return;

    // Llamada de red para agregar usuario
    this.groupService.addUserToGroup(this.groupId, this.selectedUser.id).subscribe({
      next: () => {
        this.loadGroupUsers(); 
        this.selectedUser = null;
      },
      error: (err) => console.error('Error al agregar usuario', err)
    });
  }

  removeUser(user: any){
    // Llamada de red para remover usuario
    this.groupService.removeUserFromGroup(this.groupId, user.id).subscribe({
      next: () => {
        this.loadGroupUsers(); 
      },
      error: (err) => console.error('Error al remover usuario', err)
    });
  }
}