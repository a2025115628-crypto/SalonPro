import type { UsuarioFormData } from '../types/UsuarioFormData'

export type UsuarioFormErrors = Partial<
    Record<keyof UsuarioFormData, string>
>

export function validarUsuario(
    data: UsuarioFormData,
): UsuarioFormErrors {
    const errors: UsuarioFormErrors = {}

    if (!data.nombre.trim()) {
        errors.nombre = 'El nombre es obligatorio.'
    }

    if (!data.apellido.trim()) {
        errors.apellido = 'El apellido es obligatorio.'
    }

    if (!data.password) {
        errors.password = 'La contraseña es obligatoria.'
    }

    if (!data.rolId) {
        errors.rolId = 'Debe seleccionar un rol.'
    }

    if (!data.email.trim()) {
        errors.email = 'El email es obligatorio.'
    } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
    ) {
        errors.email =
            'El email no tiene un formato válido.'
    }

    if (
        data.telefono &&
        data.telefono.replace(/\D/g, '').length < 7
    ) {
        errors.telefono =
            'El teléfono debe tener al menos 7 dígitos.'
    }

    return errors
}