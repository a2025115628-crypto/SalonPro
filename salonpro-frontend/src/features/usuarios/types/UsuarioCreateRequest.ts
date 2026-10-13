export interface UsuarioCreateRequest {
    rolId: number
    nombre: string
    apellido: string
    email: string
    passwordHash: string
    telefono?: string | null
}