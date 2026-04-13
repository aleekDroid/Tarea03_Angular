export interface Group {
  id: string; // ¡Cambio clave! Ya no es number
  nombre: string;
  descripcion?: string;
  creador_id?: string;
  creador_nombre?: string;
  creado_en?: string | Date;
  categoria?: string;
  nivel?: string;
  miembros?: number;
  tickets?: number;
}