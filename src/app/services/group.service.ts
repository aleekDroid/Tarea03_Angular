import { Injectable } from '@angular/core';
import { Group } from '../models/group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private groups: Group[] = [
    { id: 1, nombre: 'Desarrollo Frontend', categoria: 'Frontend', nivel: 'Avanzado', autor: 'Admin', miembros: 10, tickets: 5 },
    { id: 2, nombre: 'Desarrollo Backend', categoria: 'Backend', nivel: 'Intermedio', autor: 'Admin', miembros: 8, tickets: 2 },
    { id: 3, nombre: 'Testing', categoria: 'QA', nivel: 'Intermedio', autor: 'Admin', miembros: 6, tickets: 3 },
    { id: 4, nombre: 'DevOps', categoria: 'Infraestructura', nivel: 'Avanzado', autor: 'Admin', miembros: 4, tickets: 4 },
    { id: 5, nombre: 'Diseño', categoria: 'UI/UX', nivel: 'Básico', autor: 'Admin', miembros: 5, tickets: 1 }
  ];

  getGroups(): Group[] {
    return this.groups;
  }

  getGroupById(id: number): Group | undefined {
    return this.groups.find(g => g.id === id);
  }

  addGroup(group: Group): void {
    const newId = Math.max(...this.groups.map(g => g.id)) + 1;
    this.groups.push({ ...group, id: newId });
  }

  updateGroup(updated: Group): void {
    const index = this.groups.findIndex(g => g.id === updated.id);
    if (index !== -1) {
      this.groups[index] = updated;
    }
  }

  deleteGroup(id: number): void {
    this.groups = this.groups.filter(g => g.id !== id);
  }
}