export interface UsuarioUpdateRequest {
    rolId: number
    nombre: string
    apellido: string
    email: string
    telefono?: string | null
}