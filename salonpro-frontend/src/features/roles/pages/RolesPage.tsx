import { useState } from 'react'
import { describirError } from '../../../api/apiClient'
import { ConfirmDialog } from '../../../components/ui/ConfirmDialog'
import { EmptyState } from '../../../components/ui/EmptyState'
import { Pagination } from '../../../components/ui/Pagination'
import { SearchInput } from '../../../components/ui/SearchInput'
import RolForm from '../components/RolForm'
import RolTable from '../components/RolTable'
import { useRoles } from '../hooks/useRoles'
import type { Rol } from '../models/Rol'
import {
    eliminarRol,
    obtenerRolPorId,
} from '../services/rolService'

function RolesPage() {
    const {
        data: roles,
        setData: setRoles,
        loading: cargando,
        error,
        setError,
        reload,
    } = useRoles()

    const [rolSeleccionado, setRolSeleccionado] =
        useState<Rol | null>(null)

    const [search, setSearch] =
        useState('')

    const [page, setPage] =
        useState(1)

    const [pageSize, setPageSize] =
        useState(5)

    const [
        rolPendienteEliminar,
        setRolPendienteEliminar,
    ] = useState<Rol | null>(null)

    const [cargandoDetalle, setCargandoDetalle] =
        useState(false)

    const [eliminandoId, setEliminandoId] =
        useState<number | null>(null)

    const [mostrarFormulario, setMostrarFormulario] =
        useState(false)

    const [successMessage, setSuccessMessage] =
        useState('')

    const showSuccess = (
        message: string,
    ) => {
        setSuccessMessage(message)

        window.setTimeout(() => {
            setSuccessMessage('')
        }, 2500)
    }

    const handleEditar = async (
        id: number,
    ) => {
        setCargandoDetalle(true)
        setError('')
        setSuccessMessage('')

        try {
            const rol =
                await obtenerRolPorId(id)

            setRolSeleccionado(rol)
            setMostrarFormulario(true)
        } catch (err) {
            setError(
                describirError(
                    err,
                    'No se pudo cargar el rol.',
                ),
            )
        } finally {
            setCargandoDetalle(false)
        }
    }

    const handleSolicitarEliminar = (
        rol: Rol,
    ) => {
        setRolPendienteEliminar(rol)
        setError('')
        setSuccessMessage('')
    }

    const handleCancelarEliminar = () => {
        if (eliminandoId !== null) {
            return
        }

        setRolPendienteEliminar(null)
    }

    const handleConfirmarEliminar =
        async () => {
            if (!rolPendienteEliminar) {
                return
            }

            const rol =
                rolPendienteEliminar

            setEliminandoId(rol.id)
            setError('')

            try {
                await eliminarRol(rol.id)

                setRoles((prev) =>
                    prev.filter(
                        (item) =>
                            item.id !== rol.id,
                    ),
                )

                if (
                    rolSeleccionado?.id ===
                    rol.id
                ) {
                    setRolSeleccionado(null)
                    setMostrarFormulario(false)
                }

                setRolPendienteEliminar(null)

                showSuccess(
                    'Rol eliminado correctamente.',
                )
            } catch (err) {
                setError(
                    describirError(
                        err,
                        'No se pudo eliminar el rol.',
                    ),
                )
            } finally {
                setEliminandoId(null)
            }
        }

    const handleGuardado = () => {
        reload()
        setRolSeleccionado(null)

        showSuccess(
            'Rol guardado correctamente.',
        )
    }

    const handleCancelarEdicion = () => {
        setRolSeleccionado(null)
    }

    const handleNuevoRol = () => {
        setRolSeleccionado(null)
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

    const handlePageSizeChange = (
        value: string,
    ) => {
        setPageSize(Number(value))
        setPage(1)
    }

    const rolesOrdenados = [
        ...roles,
    ].sort(
        (a, b) => a.id - b.id,
    )

    const rolesFiltrados =
        rolesOrdenados.filter((rol) =>
            rol.nombreRol
                .toLowerCase()
                .includes(
                    search
                        .trim()
                        .toLowerCase(),
                ),
        )

    const totalPages = Math.max(
        1,
        Math.ceil(
            rolesFiltrados.length /
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

    const rolesVisibles =
        rolesFiltrados.slice(
            start,
            start + pageSize,
        )

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
                        GESTIÓN DE ROLES
                    </p>

                    <h1>Roles</h1>

                    <p>
                        Administra los roles
                        disponibles en SalonPro.
                    </p>
                </div>

                <button
                    type="button"
                    className="btn-primary"
                    onClick={handleNuevoRol}
                >
                    {mostrarFormulario
                        ? 'Cerrar formulario'
                        : '+ Nuevo rol'}
                </button>
            </div>

            {cargando && (
                <div className="state-card">
                    Cargando roles...
                </div>
            )}

            {cargandoDetalle && (
                <div className="state-card">
                    Cargando detalle del rol...
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
                    {mostrarFormulario && (
                        <RolForm
                            rol={rolSeleccionado}
                            onGuardado={handleGuardado}
                            onCancelarEdicion={
                                handleCancelarEdicion
                            }
                        />
                    )}

                    <div className="filter-row">
                        <SearchInput
                            value={search}
                            onChange={handleSearchChange}
                            placeholder="Buscar rol"
                        />

                        <label className="field">
              <span className="field__label">
                Cantidad
              </span>

                            <select
                                value={String(pageSize)}
                                onChange={(event) =>
                                    handlePageSizeChange(
                                        event.target.value,
                                    )
                                }
                            >
                                {opcionesPageSize.map(
                                    (option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ),
                                )}
                            </select>
                        </label>
                    </div>

                    {rolesVisibles.length === 0 ? (
                        <EmptyState
                            title="No hay roles para mostrar"
                            description="Prueba cambiando la búsqueda."
                        />
                    ) : (
                        <RolTable
                            roles={rolesVisibles}
                            onEdit={handleEditar}
                            onDelete={
                                handleSolicitarEliminar
                            }
                            deletingId={
                                eliminandoId
                            }
                        />
                    )}

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
                            rolPendienteEliminar !==
                            null
                        }
                        title="Eliminar rol"
                        message={
                            rolPendienteEliminar
                                ? `¿Seguro que deseas eliminar el rol "${rolPendienteEliminar.nombreRol}"?`
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

export default RolesPage