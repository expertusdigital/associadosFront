import { Navigate ,useRoutes} from "react-router-dom";
import AdminUsers from './pages/Admin';
import DashboardApp from './pages/Dashboard';
import DashboardLayout from './layouts/dashboard';


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

      ],
    },
  ]);
}