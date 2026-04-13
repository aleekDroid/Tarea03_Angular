export interface Ticket {
  id: string;
  titulo: string;
  descripcion: string;
  estado: string;
  prioridad: string;
  asignadoA?: string;
  asignadoId?: string;
  grupoId: string;
  grupoNombre?: string;
  fechaCreacion: string | Date;
  fechaLimite?: string | Date; 
  comentarios?: any[];
  historial?: any[];
}