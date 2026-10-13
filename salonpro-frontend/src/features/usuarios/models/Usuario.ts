export interface Usuario {
    id: number
    rolId: number
    nombre: string
    apellido: string
    email: string
    telefono: string | null
    activo: boolean
    fechaCreacion: string
}