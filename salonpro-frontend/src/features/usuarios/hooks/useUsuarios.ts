import { useAsyncList } from '../../../shared/hooks/useAsyncList'
import type { Usuario } from '../models/Usuario'
import { obtenerUsuarios } from '../services/usuarioService'

export function useUsuarios() {
    return useAsyncList<Usuario>(
        obtenerUsuarios,
    )
}