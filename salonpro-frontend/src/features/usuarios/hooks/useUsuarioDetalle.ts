import { useEffect, useState } from 'react'
import { describirError } from '../../../api/apiClient'
import { isAbortError } from '../../../shared/utils/isAbortError'
import type { Usuario } from '../models/Usuario'
import { obtenerUsuarioPorId } from '../services/usuarioService'

interface DetalleState {
    id: number | null
    usuario: Usuario | null
    error: string
    estado: 'idle' | 'success' | 'error'
}

export function useUsuarioDetalle(
    usuarioId: number | null,
) {
    const [detalle, setDetalle] =
        useState<DetalleState>({
            id: null,
            usuario: null,
            error: '',
            estado: 'idle',
        })

    useEffect(() => {
        if (usuarioId === null) {
            return
        }

        const controller =
            new AbortController()

        let ignore = false

        const cargarUsuario = async () => {
            try {
                const data =
                    await obtenerUsuarioPorId(
                        usuarioId,
                        controller.signal,
                    )

                if (!ignore) {
                    setDetalle({
                        id: usuarioId,
                        usuario: data,
                        error: '',
                        estado: 'success',
                    })
                }
            } catch (err) {
                if (
                    !ignore &&
                    !isAbortError(err)
                ) {
                    setDetalle({
                        id: usuarioId,
                        usuario: null,
                        error: describirError(
                            err,
                            'No se pudo cargar el usuario.',
                        ),
                        estado: 'error',
                    })
                }
            }
        }

        void cargarUsuario()

        return () => {
            ignore = true
            controller.abort()
        }
    }, [usuarioId])

    const loading =
        usuarioId !== null &&
        detalle.id !== usuarioId

    const usuario =
        usuarioId !== null &&
        detalle.id === usuarioId &&
        detalle.estado === 'success'
            ? detalle.usuario
            : null

    const error =
        usuarioId !== null &&
        detalle.id === usuarioId &&
        detalle.estado === 'error'
            ? detalle.error
            : ''

    return {
        usuario,
        loading,
        error,
    }
}