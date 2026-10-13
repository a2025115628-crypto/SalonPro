import { Route, Routes } from 'react-router'
import MainLayout from '../layouts/MainLayout'
import DashboardPage from '../pages/DashboardPage'
import NotFoundPage from '../pages/NotFoundPage'
import AcercaPage from '../pages/AcercaPage'
import UsuariosPage from '../features/usuarios/pages/UsuariosPage'
import RolesPage from '../features/roles/pages/RolesPage'

export default function AppRouter() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="usuarios" element={<UsuariosPage />} />
                <Route path="roles" element={<RolesPage />} />
                <Route path="acerca" element={<AcercaPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    )
}