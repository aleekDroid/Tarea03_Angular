import { Injectable } from '@angular/core';
import { Group } from '../models/group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private STORAGE_KEY = 'groups';

  constructor() {
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      const initialData: Group[] = [
        { id: 1, nombre: 'Angular Devs', categoria: 'Frontend', nivel: 'Avanzado', autor: 'Admin', miembros: 10, tickets: 5 },
        { id: 2, nombre: 'Node Masters', categoria: 'Backend', nivel: 'Intermedio', autor: 'Admin', miembros: 8, tickets: 2 }
      ];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(initialData));
    }
  }

  getGroups(): Group[] {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
  }

  saveGroups(groups: Group[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(groups));
  }

  addGroup(group: Group) {
    const groups = this.getGroups();
    groups.push(group);
    this.saveGroups(groups);
  }

  updateGroup(updated: Group) {
    const groups = this.getGroups().map(g => g.id === updated.id ? updated : g);
    this.saveGroups(groups);
  }

  deleteGroup(id: number) {
    const groups = this.getGroups().filter(g => g.id !== id);
    this.saveGroups(groups);
  }
}