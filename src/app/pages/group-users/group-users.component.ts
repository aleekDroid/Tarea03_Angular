import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';

import { GroupUserService } from '../../services/group-user.service';
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
    DropdownModule
  ],
  templateUrl:'./group-users.component.html'
})
export class GroupUsersComponent implements OnInit{

  groupId!:number

  users:any[]=[]
  groupUsers:any[]=[]

  selectedUser:any

  constructor(
    private route: ActivatedRoute,
    private groupUserService: GroupUserService,
    private userService: UserService,
    public authService: AuthService,
    private router: Router
  ){}

  ngOnInit(){

    this.groupId =
      Number(this.route.snapshot.paramMap.get('id'))

    if (!this.authService.hasPermission('manage_users')) {
      this.router.navigate(['/home']);
      return;
    }

    this.users = this.userService.getUsers()

    this.loadGroupUsers()

  }

  loadGroupUsers(){

    const ids =
      this.groupUserService.getUsersByGroup(this.groupId)

    this.groupUsers =
      ids.map((id:number)=> this.userService.getUserById(id))

  }

  addUser(){

    if(!this.selectedUser) return

    this.groupUserService.addUserToGroup(
      this.groupId,
      this.selectedUser.id
    )

    this.loadGroupUsers()

    this.selectedUser=null

  }

  removeUser(user:any){

    this.groupUserService.removeUserFromGroup(
      this.groupId,
      user.id
    )

    this.loadGroupUsers()

  }

}