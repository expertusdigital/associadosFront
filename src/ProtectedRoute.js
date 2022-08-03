import { Navigate ,useRoutes} from "react-router-dom";
import { getTenant_id } from "./utils/services/auth";
import Associados from './pages/Associados';
import DashboardApp from './pages/Dashboard';
import DashboardLayout from './layouts/dashboard';
import Profile from './pages/Profile';

export const ProtectedRoute = ({ children }) => {

  var tenantId = getTenant_id();
    console.log(tenantId)
    if(tenantId != null){
      return children
    }
    
   return <Navigate to="/" />;
};


export  function RouteAutenticate() {
  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'associados', element: <Associados /> },
        { path: 'profile', element: <Profile /> },
      ],
    },
  ]);
}