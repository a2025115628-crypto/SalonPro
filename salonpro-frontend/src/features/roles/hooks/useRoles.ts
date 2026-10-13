import { useAsyncList } from '../../../shared/hooks/useAsyncList'
import type { Rol } from '../models/Rol'
import { obtenerRoles } from '../services/rolService'

export function useRoles() {
    return useAsyncList<Rol>(
        obtenerRoles,
    )
}