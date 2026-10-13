import { useEffect, useState } from 'react'
import { describirError } from '../../../api/apiClient'
import type { Rol } from '../../roles/models/Rol'
import type { Usuario } from '../models/Usuario'
import {
    actualizarUsuario,
    crearUsuario,
} from '../services/usuarioService'
import type { UsuarioFormData } from '../types/UsuarioFormData'
import { validarUsuario } from '../utils/usuarioValidation'

interface UsuarioFormProps {
    roles: Rol[]
    usuario?: Usuario | null
    onGuardado?: () => void
    onCancelarEdicion?: () => void
}

const formularioInicial: UsuarioFormData = {
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    password: '',
    rolId: '',
}

function UsuarioForm({
                         roles,
                         usuario,
                         onGuardado,
                         onCancelarEdicion,
                     }: UsuarioFormProps) {
    const [formData, setFormData] =
        useState<UsuarioFormData>(formularioInicial)

    const [errors, setErrors] =
        useState<Record<string, string>>({})

    const [mensaje, setMensaje] = useState('')
    const [errorGeneral, setErrorGeneral] = useState('')
    const [guardando, setGuardando] = useState(false)
    const [mostrarPassword, setMostrarPassword] =
        useState(false)

    const editando = usuario != null

    useEffect(() => {
        if (usuario) {
            setFormData({
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email,
                telefono: usuario.telefono ?? '',
                password: '',
                rolId: String(usuario.rolId),
            })
        } else {
            setFormData(formularioInicial)
        }

        setErrors({})
        setMensaje('')
        setErrorGeneral('')
        setMostrarPassword(false)
    }, [usuario])

    const handleChange = (
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>,
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
            validarUsuario(formData)

        if (editando) {
            delete nuevosErrores.password
        }

        setErrors(nuevosErrores)

        if (Object.keys(nuevosErrores).length > 0) {
            return
        }

        setGuardando(true)

        try {
            if (usuario) {
                await actualizarUsuario(
                    usuario.id,
                    {
                        rolId: Number(formData.rolId),
                        nombre: formData.nombre.trim(),
                        apellido: formData.apellido.trim(),
                        email: formData.email
                            .trim()
                            .toLowerCase(),
                        telefono:
                            formData.telefono.trim() || null,
                    },
                )

                setMensaje(
                    'Usuario actualizado correctamente.',
                )
            } else {
                await crearUsuario({
                    rolId: Number(formData.rolId),
                    nombre: formData.nombre.trim(),
                    apellido: formData.apellido.trim(),
                    email: formData.email
                        .trim()
                        .toLowerCase(),
                    passwordHash: formData.password,
                    telefono:
                        formData.telefono.trim() || null,
                })

                setMensaje(
                    'Usuario creado correctamente.',
                )

                setFormData(formularioInicial)
            }

            onGuardado?.()
        } catch (err) {
            setErrorGeneral(
                describirError(
                    err,
                    editando
                        ? 'No se pudo actualizar el usuario.'
                        : 'No se pudo crear el usuario.',
                ),
            )
        } finally {
            setGuardando(false)
        }
    }

    const handleLimpiar = () => {
        if (usuario) {
            setFormData({
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email,
                telefono: usuario.telefono ?? '',
                password: '',
                rolId: String(usuario.rolId),
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
                    ? `Editar usuario #${usuario.id}`
                    : 'Nuevo usuario'}
            </h2>

            <div className="form-grid">
                <div>
                    <label htmlFor="nombre">
                        Nombre
                    </label>

                    <input
                        id="nombre"
                        name="nombre"
                        type="text"
                        value={formData.nombre}
                        onChange={handleChange}
                        disabled={guardando}
                    />

                    {errors.nombre && (
                        <p className="field-error">
                            {errors.nombre}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="apellido">
                        Apellido
                    </label>

                    <input
                        id="apellido"
                        name="apellido"
                        type="text"
                        value={formData.apellido}
                        onChange={handleChange}
                        disabled={guardando}
                    />

                    {errors.apellido && (
                        <p className="field-error">
                            {errors.apellido}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="email">
                        Correo electrónico
                    </label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={guardando}
                    />

                    {errors.email && (
                        <p className="field-error">
                            {errors.email}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="telefono">
                        Teléfono
                    </label>

                    <input
                        id="telefono"
                        name="telefono"
                        type="text"
                        value={formData.telefono}
                        onChange={handleChange}
                        disabled={guardando}
                    />

                    {errors.telefono && (
                        <p className="field-error">
                            {errors.telefono}
                        </p>
                    )}
                </div>

                {!editando && (
                    <div>
                        <label htmlFor="password">
                            Contraseña
                        </label>

                        <input
                            id="password"
                            name="password"
                            type={
                                mostrarPassword
                                    ? 'text'
                                    : 'password'
                            }
                            value={formData.password}
                            onChange={handleChange}
                            disabled={guardando}
                        />

                        {errors.password && (
                            <p className="field-error">
                                {errors.password}
                            </p>
                        )}

                        <label>
                            <input
                                type="checkbox"
                                checked={mostrarPassword}
                                onChange={(event) =>
                                    setMostrarPassword(
                                        event.target.checked,
                                    )
                                }
                            />
                            Mostrar contraseña
                        </label>
                    </div>
                )}

                <div>
                    <label htmlFor="rolId">
                        Rol
                    </label>

                    <select
                        id="rolId"
                        name="rolId"
                        value={formData.rolId}
                        onChange={handleChange}
                        disabled={guardando}
                    >
                        <option value="">
                            Seleccione un rol
                        </option>

                        {roles.map((rol) => (
                            <option
                                key={rol.id}
                                value={rol.id}
                            >
                                {rol.nombreRol}
                            </option>
                        ))}
                    </select>

                    {errors.rolId && (
                        <p className="field-error">
                            {errors.rolId}
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
                            ? 'Actualizar usuario'
                            : 'Crear usuario'}
                </button>
            </div>
        </form>
    )
}

export default UsuarioForm