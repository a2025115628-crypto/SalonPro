import { useEffect, useState } from 'react'
import { describirError } from '../../../api/apiClient'
import type { Rol } from '../models/Rol'
import {
    actualizarRol,
    crearRol,
} from '../services/rolService'
import type { RolFormData } from '../types/RolFormData'
import { validarRol } from '../utils/rolValidation'

interface RolFormProps {
    rol?: Rol | null
    onGuardado?: () => void
    onCancelarEdicion?: () => void
}

const formularioInicial: RolFormData = {
    nombreRol: '',
}

function RolForm({
                     rol,
                     onGuardado,
                     onCancelarEdicion,
                 }: RolFormProps) {
    const [formData, setFormData] =
        useState<RolFormData>(formularioInicial)

    const [errors, setErrors] =
        useState<Record<string, string>>({})

    const [mensaje, setMensaje] = useState('')
    const [errorGeneral, setErrorGeneral] =
        useState('')
    const [guardando, setGuardando] =
        useState(false)

    const editando = rol != null

    useEffect(() => {
        if (rol) {
            setFormData({
                nombreRol: rol.nombreRol,
            })
        } else {
            setFormData(formularioInicial)
        }

        setErrors({})
        setMensaje('')
        setErrorGeneral('')
    }, [rol])

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const { name, value } = event.target

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault()

        setMensaje('')
        setErrorGeneral('')

        const nuevosErrores =
            validarRol(formData)

        setErrors(nuevosErrores)

        if (Object.keys(nuevosErrores).length > 0) {
            return
        }

        setGuardando(true)

        try {
            const payload = {
                nombreRol:
                    formData.nombreRol.trim(),
            }

            if (rol) {
                await actualizarRol(
                    rol.id,
                    payload,
                )

                setMensaje(
                    'Rol actualizado correctamente.',
                )
            } else {
                await crearRol(payload)

                setMensaje(
                    'Rol creado correctamente.',
                )

                setFormData(formularioInicial)
            }

            onGuardado?.()
        } catch (err) {
            setErrorGeneral(
                describirError(
                    err,
                    editando
                        ? 'No se pudo actualizar el rol.'
                        : 'No se pudo crear el rol.',
                ),
            )
        } finally {
            setGuardando(false)
        }
    }

    const handleLimpiar = () => {
        if (rol) {
            setFormData({
                nombreRol: rol.nombreRol,
            })
        } else {
            setFormData(formularioInicial)
        }

        setErrors({})
        setMensaje('')
        setErrorGeneral('')
    }

    return (
        <form
            className="entity-form"
            onSubmit={handleSubmit}
        >
            <h2>
                {editando
                    ? `Editar rol #${rol.id}`
                    : 'Nuevo rol'}
            </h2>

            <div className="form-grid">
                <div className="form-span-2">
                    <label htmlFor="nombreRol">
                        Nombre del rol
                    </label>

                    <input
                        id="nombreRol"
                        name="nombreRol"
                        type="text"
                        value={formData.nombreRol}
                        onChange={handleChange}
                        disabled={guardando}
                    />

                    {errors.nombreRol && (
                        <p className="field-error">
                            {errors.nombreRol}
                        </p>
                    )}
                </div>
            </div>

            {mensaje && (
                <p className="form-success">
                    {mensaje}
                </p>
            )}

            {errorGeneral && (
                <p className="field-error">
                    {errorGeneral}
                </p>
            )}

            <div className="form-actions">
                <button
                    type="button"
                    className="btn-secondary"
                    onClick={handleLimpiar}
                    disabled={guardando}
                >
                    Limpiar
                </button>

                {editando && (
                    <button
                        type="button"
                        className="btn-secondary"
                        onClick={onCancelarEdicion}
                        disabled={guardando}
                    >
                        Cancelar edición
                    </button>
                )}

                <button
                    type="submit"
                    className="btn-primary"
                    disabled={guardando}
                >
                    {guardando
                        ? 'Guardando...'
                        : editando
                            ? 'Actualizar rol'
                            : 'Crear rol'}
                </button>
            </div>
        </form>
    )
}

export default RolForm