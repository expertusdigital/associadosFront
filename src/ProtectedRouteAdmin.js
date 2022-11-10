import { Navigate ,useRoutes} from "react-router-dom";
import AdminUsers from './pages/Admin';
import AdminAssociados from './pages/Admin/AdminAssociados';
import AdminTenants from './pages/Admin/AdminTenants';
import DashboardApp from './pages/Dashboard';
import DashboardLayout from './layouts/dashboard';
import AdminStatus from './pages/Admin/AdminStatus'
import NewwAssociados from './sections/admin/associados/index'
import AtualizarAssociado from './sections/admin/associados/AtuliazarAssociados'



export const ProtectedRouteAdmin = ({ children }) => {
      return children

};


export  function RouteAutenticateAdmin() {
  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'usuarios', element: <AdminUsers /> },
        { path: 'associados', element: <AdminAssociados /> },
        { path: 'tenants', element: <AdminTenants /> },
        { path: 'status', element: <AdminStatus /> },
        { path: 'novoassociado', element: <NewwAssociados /> },
        { path: 'atualizarassociado', element: <AtualizarAssociado /> }



      ],
    },
  ]);
}