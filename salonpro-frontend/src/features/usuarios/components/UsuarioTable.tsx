import { EmptyState } from '../../../components/ui/EmptyState'
import { StatusBadge } from '../../../components/ui/StatusBadge'
import type { Rol } from '../../roles/models/Rol'
import type { Usuario } from '../models/Usuario'

interface UsuarioTableProps {
    usuarios: Usuario[]
    roles: Rol[]
    onEdit: (id: number) => void
    onDelete: (usuario: Usuario) => void
    deletingId?: number | null
}

function UsuarioTable({
                          usuarios,
                          roles,
                          onEdit,
                          onDelete,
                          deletingId,
                      }: UsuarioTableProps) {
    const obtenerNombreRol = (
        rolId: number,
    ) => {
        const rol = roles.find(
            (item) =>
                item.id === rolId,
        )

        return rol
            ? rol.nombreRol
            : 'Sin rol asociado'
    }

    if (usuarios.length === 0) {
        return (
            <EmptyState
                title="No hay usuarios para mostrar"
                description="Prueba cambiando la búsqueda o los filtros."
            />
        )
    }

    return (
        <div className="table-wrapper">
            <table className="data-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
                </thead>

                <tbody>
                {usuarios.map(
                    (usuario) => (
                        <tr key={usuario.id}>
                            <td>
                                {usuario.id}
                            </td>

                            <td>
                                {usuario.nombre}{' '}
                                {usuario.apellido}
                            </td>

                            <td>
                                {usuario.email}
                            </td>

                            <td>
                                {usuario.telefono ??
                                    '—'}
                            </td>

                            <td>
                                {obtenerNombreRol(
                                    usuario.rolId,
                                )}
                            </td>

                            <td>
                                <StatusBadge
                                    active={
                                        usuario.activo
                                    }
                                />
                            </td>

                            <td className="actions-cell">
                                <button
                                    type="button"
                                    onClick={() =>
                                        onEdit(
                                            usuario.id,
                                        )
                                    }
                                >
                                    Editar
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        onDelete(
                                            usuario,
                                        )
                                    }
                                    disabled={
                                        deletingId ===
                                        usuario.id
                                    }
                                >
                                    {deletingId ===
                                    usuario.id
                                        ? 'Eliminando...'
                                        : 'Eliminar'}
                                </button>
                            </td>
                        </tr>
                    ),
                )}
                </tbody>
            </table>
        </div>
    )
}

export default UsuarioTable