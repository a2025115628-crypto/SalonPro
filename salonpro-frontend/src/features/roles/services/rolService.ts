import { apiFetch } from '../../../api/apiClient'
import type { Rol } from '../models/Rol'
import type {
    RolCreateRequest,
    RolUpdateRequest,
} from '../types/RolRequests'

export function obtenerRoles(
    signal?: AbortSignal,
): Promise<Rol[]> {
    return apiFetch<Rol[]>('/roles', {
        signal,
    })
}

export function obtenerRolPorId(
    id: number,
    signal?: AbortSignal,
): Promise<Rol> {
    return apiFetch<Rol>(
        `/roles/${id}`,
        {
            signal,
        },
    )
}

export function crearRol(
    data: RolCreateRequest,
): Promise<Rol> {
    return apiFetch<Rol>('/roles', {
        method: 'POST',
        body: JSON.stringify(data),
    })
}

export function actualizarRol(
    id: number,
    data: RolUpdateRequest,
): Promise<Rol> {
    return apiFetch<Rol>(`/roles/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    })
}

export function eliminarRol(
    id: number,
): Promise<void> {
    return apiFetch<void>(`/roles/${id}`, {
        method: 'DELETE',
    })
}