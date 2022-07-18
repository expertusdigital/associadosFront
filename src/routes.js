import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import User from './pages/User';
import Login from './pages/LoginRegister/Login';
import NotFound from './pages/PageErro';
import Register from './pages/LoginRegister/Register';
import Pecas from './pages/Pecas';
import Clientes from './pages/Client';
import DashboardApp from './pages/Dashboard';
import Orcamento from './pages/Orcamento';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'clientes', element: <Clientes /> },
        { path: 'pecas', element: <Pecas /> },
        { path: 'orcamento', element: <Orcamento /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
