import type { Rol } from '../models/Rol'

export type RolCreateRequest = Omit<Rol, 'id'>
export type RolUpdateRequest = Omit<Rol, 'id'>