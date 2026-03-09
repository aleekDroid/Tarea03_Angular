import { Component } from '@angular/core';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
selector:'app-group-users',
standalone:true,
imports:[TableModule,ButtonModule],
templateUrl:'./group-users.component.html'
})
export class GroupUsersComponent{

users:any[]=[]

}