import { apiFetch } from '../../../api/apiClient'
import type { Usuario } from '../models/Usuario'
import type { UsuarioCreateRequest } from '../types/UsuarioCreateRequest'
import type { UsuarioUpdateRequest } from '../types/UsuarioUpdateRequest'

export function obtenerUsuarios(
    signal?: AbortSignal,
): Promise<Usuario[]> {
    return apiFetch<Usuario[]>('/usuarios', {
        signal,
    })
}

export function obtenerUsuarioPorId(
    id: number,
    signal?: AbortSignal,
): Promise<Usuario> {
    return apiFetch<Usuario>(
        `/usuarios/${id}`,
        {
            signal,
        },
    )
}

export function crearUsuario(
    data: UsuarioCreateRequest,
): Promise<Usuario> {
    return apiFetch<Usuario>('/usuarios', {
        method: 'POST',
        body: JSON.stringify(data),
    })
}

export function actualizarUsuario(
    id: number,
    data: UsuarioUpdateRequest,
): Promise<Usuario> {
    return apiFetch<Usuario>(
        `/usuarios/${id}`,
        {
            method: 'PUT',
            body: JSON.stringify(data),
        },
    )
}

export function eliminarUsuario(
    id: number,
): Promise<void> {
    return apiFetch<void>(
        `/usuarios/${id}`,
        {
            method: 'DELETE',
        },
    )
}