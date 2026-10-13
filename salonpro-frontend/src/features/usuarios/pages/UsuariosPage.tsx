import { useState } from 'react'
import { describirError } from '../../../api/apiClient'
import { ConfirmDialog } from '../../../components/ui/ConfirmDialog'
import { Pagination } from '../../../components/ui/Pagination'
import { SearchInput } from '../../../components/ui/SearchInput'
import { SelectFilter } from '../../../components/ui/SelectFilter'
import { useRoles } from '../../roles/hooks/useRoles'
import UsuarioForm from '../components/UsuarioForm'
import UsuarioTable from '../components/UsuarioTable'
import { useUsuarioDetalle } from '../hooks/useUsuarioDetalle'
import { useUsuarios } from '../hooks/useUsuarios'
import type { Usuario } from '../models/Usuario'
import { eliminarUsuario } from '../services/usuarioService'

function UsuariosPage() {
    const {
        data: usuarios,
        setData: setUsuarios,
        loading: cargandoUsuarios,
        error: errorUsuarios,
        setError: setErrorUsuarios,
        reload: reloadUsuarios,
    } = useUsuarios()

    const {
        data: roles,
        loading: cargandoRoles,
        error: errorRoles,
    } = useRoles()

    const [
        usuarioIdSeleccionado,
        setUsuarioIdSeleccionado,
    ] = useState<number | null>(null)

    const {
        usuario: usuarioSeleccionado,
        loading: cargandoDetalle,
        error: errorDetalle,
    } = useUsuarioDetalle(
        usuarioIdSeleccionado,
    )

    const [search, setSearch] =
        useState('')

    const [rolFiltro, setRolFiltro] =
        useState('')

    const [
        estadoFiltro,
        setEstadoFiltro,
    ] = useState('all')

    const [page, setPage] =
        useState(1)

    const [pageSize, setPageSize] =
        useState(5)

    const [
        usuarioPendienteEliminar,
        setUsuarioPendienteEliminar,
    ] = useState<Usuario | null>(null)

    const [
        eliminandoId,
        setEliminandoId,
    ] = useState<number | null>(null)

    const [
        mostrarFormulario,
        setMostrarFormulario,
    ] = useState(false)

    const [
        successMessage,
        setSuccessMessage,
    ] = useState('')

    const cargando =
        cargandoUsuarios ||
        cargandoRoles

    const error =
        errorUsuarios ||
        errorRoles ||
        errorDetalle

    const showSuccess = (
        message: string,
    ) => {
        setSuccessMessage(message)

        window.setTimeout(() => {
            setSuccessMessage('')
        }, 2500)
    }

    const handleEditar = (
        id: number,
    ) => {
        setErrorUsuarios('')
        setSuccessMessage('')

        setUsuarioIdSeleccionado(id)
        setMostrarFormulario(true)
    }

    const handleSolicitarEliminar = (
        usuario: Usuario,
    ) => {
        setUsuarioPendienteEliminar(
            usuario,
        )

        setErrorUsuarios('')
        setSuccessMessage('')
    }

    const handleCancelarEliminar =
        () => {
            if (eliminandoId !== null) {
                return
            }

            setUsuarioPendienteEliminar(
                null,
            )
        }

    const handleConfirmarEliminar =
        async () => {
            if (
                !usuarioPendienteEliminar
            ) {
                return
            }

            const usuario =
                usuarioPendienteEliminar

            setEliminandoId(usuario.id)
            setErrorUsuarios('')

            try {
                await eliminarUsuario(
                    usuario.id,
                )

                setUsuarios((prev) =>
                    prev.filter(
                        (item) =>
                            item.id !==
                            usuario.id,
                    ),
                )

                if (
                    usuarioIdSeleccionado ===
                    usuario.id
                ) {
                    setUsuarioIdSeleccionado(
                        null,
                    )

                    setMostrarFormulario(
                        false,
                    )
                }

                setUsuarioPendienteEliminar(
                    null,
                )

                showSuccess(
                    'Usuario eliminado correctamente.',
                )
            } catch (err) {
                setErrorUsuarios(
                    describirError(
                        err,
                        'No se pudo eliminar el usuario.',
                    ),
                )
            } finally {
                setEliminandoId(null)
            }
        }

    const handleGuardado = () => {
        reloadUsuarios()

        setUsuarioIdSeleccionado(
            null,
        )

        showSuccess(
            'Usuario guardado correctamente.',
        )
    }

    const handleCancelarEdicion =
        () => {
            setUsuarioIdSeleccionado(
                null,
            )
        }

    const handleNuevoUsuario =
        () => {
            setUsuarioIdSeleccionado(
                null,
            )

            setSuccessMessage('')

            setMostrarFormulario(
                (prev) => !prev,
            )
        }

    const handleSearchChange = (
        value: string,
    ) => {
        setSearch(value)
        setPage(1)
    }

    const handleRolChange = (
        value: string,
    ) => {
        setRolFiltro(value)
        setPage(1)
    }

    const handleEstadoChange = (
        value: string,
    ) => {
        setEstadoFiltro(value)
        setPage(1)
    }

    const handlePageSizeChange = (
        value: string,
    ) => {
        setPageSize(Number(value))
        setPage(1)
    }

    const usuariosOrdenados = [
        ...usuarios,
    ].sort(
        (a, b) => a.id - b.id,
    )

    const usuariosFiltrados =
        usuariosOrdenados.filter(
            (usuario) => {
                const term =
                    search
                        .trim()
                        .toLowerCase()

                const nombreCompleto =
                    `${usuario.nombre} ${usuario.apellido}`
                        .toLowerCase()

                const matchesText =
                    !term ||
                    usuario.nombre
                        .toLowerCase()
                        .includes(term) ||
                    usuario.apellido
                        .toLowerCase()
                        .includes(term) ||
                    nombreCompleto.includes(
                        term,
                    ) ||
                    usuario.email
                        .toLowerCase()
                        .includes(term) ||
                    (
                        usuario.telefono ?? ''
                    )
                        .toLowerCase()
                        .includes(term)

                const matchesRol =
                    rolFiltro === '' ||
                    usuario.rolId ===
                    Number(rolFiltro)

                const matchesEstado =
                    estadoFiltro === 'all' ||
                    (
                        estadoFiltro ===
                        'active' &&
                        usuario.activo
                    ) ||
                    (
                        estadoFiltro ===
                        'inactive' &&
                        !usuario.activo
                    )

                return (
                    matchesText &&
                    matchesRol &&
                    matchesEstado
                )
            },
        )

    const totalPages = Math.max(
        1,
        Math.ceil(
            usuariosFiltrados.length /
            pageSize,
        ),
    )

    const paginaActual =
        Math.min(
            page,
            totalPages,
        )

    const start =
        (paginaActual - 1) *
        pageSize

    const usuariosVisibles =
        usuariosFiltrados.slice(
            start,
            start + pageSize,
        )

    const usuariosActivos =
        usuarios.filter(
            (usuario) =>
                usuario.activo,
        ).length

    const usuariosInactivos =
        usuarios.filter(
            (usuario) =>
                !usuario.activo,
        ).length

    const opcionesRol = [
        {
            value: '',
            label: 'Todos los roles',
        },
        ...roles.map((rol) => ({
            value: String(rol.id),
            label: rol.nombreRol,
        })),
    ]

    const opcionesEstado = [
        {
            value: 'all',
            label: 'Todos',
        },
        {
            value: 'active',
            label: 'Activos',
        },
        {
            value: 'inactive',
            label: 'Inactivos',
        },
    ]

    const opcionesPageSize = [
        {
            value: '5',
            label: '5 por página',
        },
        {
            value: '10',
            label: '10 por página',
        },
        {
            value: '20',
            label: '20 por página',
        },
    ]

    return (
        <section className="feature-page">
            <div className="page-heading">
                <div>
                    <p className="eyebrow">
                        GESTIÓN DE USUARIOS
                    </p>

                    <h1>Usuarios</h1>

                    <p>
                        Administra los usuarios
                        registrados en SalonPro.
                    </p>
                </div>

                <button
                    type="button"
                    className="btn-primary"
                    onClick={
                        handleNuevoUsuario
                    }
                >
                    {mostrarFormulario
                        ? 'Cerrar formulario'
                        : '+ Nuevo usuario'}
                </button>
            </div>

            {cargando && (
                <div className="state-card">
                    Cargando datos...
                </div>
            )}

            {cargandoDetalle && (
                <div className="state-card">
                    Cargando detalle del
                    usuario...
                </div>
            )}

            {error && (
                <div className="state-card error">
                    {error}
                </div>
            )}

            {successMessage && (
                <div className="state-card">
                    {successMessage}
                </div>
            )}

            {!cargando && (
                <>
                    <div className="stats-grid">
                        <article className="stat-card">
                            <span>Total</span>

                            <strong>
                                {usuarios.length}
                            </strong>
                        </article>

                        <article className="stat-card">
                            <span>Activos</span>

                            <strong>
                                {usuariosActivos}
                            </strong>
                        </article>

                        <article className="stat-card">
                            <span>Inactivos</span>

                            <strong>
                                {usuariosInactivos}
                            </strong>
                        </article>
                    </div>

                    {mostrarFormulario &&
                        !cargandoDetalle && (
                            <UsuarioForm
                                roles={roles}
                                usuario={
                                    usuarioSeleccionado
                                }
                                onGuardado={
                                    handleGuardado
                                }
                                onCancelarEdicion={
                                    handleCancelarEdicion
                                }
                            />
                        )}

                    <div className="filter-row">
                        <SearchInput
                            value={search}
                            onChange={
                                handleSearchChange
                            }
                            placeholder="Buscar por nombre, apellido, email o teléfono"
                        />

                        <SelectFilter
                            label="Rol"
                            value={rolFiltro}
                            options={opcionesRol}
                            onChange={
                                handleRolChange
                            }
                        />

                        <SelectFilter
                            label="Estado"
                            value={estadoFiltro}
                            options={
                                opcionesEstado
                            }
                            onChange={
                                handleEstadoChange
                            }
                        />

                        <SelectFilter
                            label="Cantidad"
                            value={String(
                                pageSize,
                            )}
                            options={
                                opcionesPageSize
                            }
                            onChange={
                                handlePageSizeChange
                            }
                        />
                    </div>

                    <UsuarioTable
                        usuarios={
                            usuariosVisibles
                        }
                        roles={roles}
                        onEdit={handleEditar}
                        onDelete={
                            handleSolicitarEliminar
                        }
                        deletingId={
                            eliminandoId
                        }
                    />

                    <Pagination
                        page={paginaActual}
                        totalPages={
                            totalPages
                        }
                        onPageChange={
                            setPage
                        }
                    />

                    <ConfirmDialog
                        open={
                            usuarioPendienteEliminar !==
                            null
                        }
                        title="Eliminar usuario"
                        message={
                            usuarioPendienteEliminar
                                ? `¿Seguro que deseas eliminar a ${usuarioPendienteEliminar.nombre} ${usuarioPendienteEliminar.apellido}?`
                                : ''
                        }
                        confirming={
                            eliminandoId !== null
                        }
                        onConfirm={
                            handleConfirmarEliminar
                        }
                        onCancel={
                            handleCancelarEliminar
                        }
                    />
                </>
            )}
        </section>
    )
}

export default UsuariosPage