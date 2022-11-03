import { Navigate ,useRoutes} from "react-router-dom";
import { getTenant_id } from "./utils/services/auth";
import Associados from './pages/Associados';
import DashboardApp from './pages/Dashboard';
import DashboardLayout from './layouts/dashboard';
import Profile from './pages/Profile';
import StatusAssociados from './pages/Associados/StatusAssociados'
import NewwAssociados from './sections/associados'
import AtualizarAssociado from './sections/associados/AtuliazarAssociados'



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
        { path: 'status', element: <StatusAssociados /> },
        { path: 'profile', element: <Profile /> },
        { path: 'novoassociado', element: <NewwAssociados /> },
        { path: 'atualizarassociado/:id', element: <AtualizarAssociado /> },

      ],
    },
  ]);
}