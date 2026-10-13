import type { RolFormData } from '../types/RolFormData'

export type RolFormErrors = Partial<
    Record<keyof RolFormData, string>
>

export function validarRol(
    data: RolFormData,
): RolFormErrors {
    const errors: RolFormErrors = {}

    if (!data.nombreRol.trim()) {
        errors.nombreRol =
            'El nombre del rol es obligatorio.'
    }

    return errors
}