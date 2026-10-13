import { MetricCard } from '../components/ui/MetricCard'
import { useRoles } from '../features/roles/hooks/useRoles'
import { useUsuarios } from '../features/usuarios/hooks/useUsuarios'

function DashboardPage() {
    const roles = useRoles()
    const usuarios = useUsuarios()

    const loading =
        roles.loading ||
        usuarios.loading

    const error =
        roles.error ||
        usuarios.error

    const totalRoles =
        roles.data.length

    const totalUsuarios =
        usuarios.data.length

    const usuariosActivos =
        usuarios.data.filter(
            (usuario) => usuario.activo,
        ).length

    const usuariosInactivos =
        usuarios.data.filter(
            (usuario) => !usuario.activo,
        ).length

    if (loading) {
        return (
            <section className="feature-page">
                <div className="state-card">
                    Cargando dashboard...
                </div>
            </section>
        )
    }

    if (error) {
        return (
            <section className="feature-page">
                <div
                    className="state-card error"
                    role="alert"
                >
                    {error}
                </div>
            </section>
        )
    }

    return (
        <section className="feature-page">
            <div className="page-heading">
                <div>
                    <p className="eyebrow">
                        SALONPRO
                    </p>

                    <h1>Dashboard</h1>

                    <p>
                        Resumen general del sistema.
                    </p>
                </div>
            </div>

            <div className="dashboard-metrics">
                <MetricCard
                    label="Roles"
                    value={totalRoles}
                    helper="Roles registrados"
                />

                <MetricCard
                    label="Usuarios"
                    value={totalUsuarios}
                    helper="Usuarios registrados"
                />

                <MetricCard
                    label="Usuarios activos"
                    value={usuariosActivos}
                    helper="Usuarios habilitados"
                />

                <MetricCard
                    label="Usuarios inactivos"
                    value={usuariosInactivos}
                    helper="Usuarios deshabilitados"
                />
            </div>
        </section>
    )
}

export default DashboardPage