export interface Ticket {

  id: number

  titulo: string
  descripcion: string

  estado: 'pendiente' | 'en progreso' | 'revision' | 'finalizado'

  prioridad: 'baja' | 'media' | 'alta'

  asignadoA: string

  grupoId: number

  fechaCreacion: Date
  fechaLimite: Date

  comentarios: string[]

  historial: string[]

}