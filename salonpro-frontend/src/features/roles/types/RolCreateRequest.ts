import type { Rol } from '../models/Rol'

export type RolCreateRequest = Omit<Rol, 'id'>