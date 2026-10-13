import type { Rol } from '../models/Rol'

interface RolTableProps {
    roles: Rol[]
    onEdit: (id: number) => void
    onDelete: (rol: Rol) => void
    deletingId?: number | null
}

function RolTable({
                      roles,
                      onEdit,
                      onDelete,
                      deletingId,
                  }: RolTableProps) {
    if (roles.length === 0) {
        return (
            <div className="state-card">
                No hay roles registrados.
            </div>
        )
    }

    return (
        <div className="table-wrapper">
            <table className="data-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                </tr>
                </thead>

                <tbody>
                {roles.map((rol) => (
                    <tr key={rol.id}>
                        <td>{rol.id}</td>

                        <td>{rol.nombreRol}</td>

                        <td className="actions-cell">
                            <button
                                type="button"
                                onClick={() => onEdit(rol.id)}
                            >
                                Editar
                            </button>

                            <button
                                type="button"
                                onClick={() => onDelete(rol)}
                                disabled={
                                    deletingId === rol.id
                                }
                            >
                                {deletingId === rol.id
                                    ? 'Eliminando...'
                                    : 'Eliminar'}
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default RolTable