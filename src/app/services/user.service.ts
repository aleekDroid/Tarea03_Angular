import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users = [
    { id:1, nombre:'Juan', email:'juan@mail.com'},
    { id:2, nombre:'Ana', email:'ana@mail.com'},
    { id:3, nombre:'Carlos', email:'carlos@mail.com'},
    { id:4, nombre:'Sofia', email:'sofia@mail.com'},
    { id:5, nombre:'Pedro', email:'pedro@mail.com'}
  ]

  getUsers(){
    return this.users
  }

  getUserById(id:number){
    return this.users.find(u=>u.id===id)
  }

}