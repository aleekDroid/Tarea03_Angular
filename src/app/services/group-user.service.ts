import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupUserService {

  private STORAGE_KEY = 'group_users';

  constructor() {

    if (!localStorage.getItem(this.STORAGE_KEY)) {

      const initialData = {
        1: [1,2,3],
        2: [2,4]
      };

      localStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify(initialData)
      );

    }

  }

  private getData(): any {

    return JSON.parse(
      localStorage.getItem(this.STORAGE_KEY) || '{}'
    );

  }

  private saveData(data:any) {

    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify(data)
    );

  }

  getUsersByGroup(groupId:number){

    const data = this.getData();

    return data[groupId] || [];

  }

  addUserToGroup(groupId:number,userId:number){

    const data = this.getData();

    if(!data[groupId]){
      data[groupId] = [];
    }

    if(!data[groupId].includes(userId)){
      data[groupId].push(userId);
    }

    this.saveData(data);

  }

  removeUserFromGroup(groupId:number,userId:number){

    const data = this.getData();

    data[groupId] =
      (data[groupId] || []).filter(
        (id:number)=> id !== userId
      );

    this.saveData(data);

  }

}