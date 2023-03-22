import { Navigate ,useRoutes} from "react-router-dom";
import { getTenant_id } from "./utils/services/auth";


import DashboardLayout from './layouts/dashboard';
import NewwAssociados from './sections/associados'
import AtualizarAssociado from './sections/associados/AtuliazarAssociados'


import Associados from './pages/Client/Associados';
import Profile from './pages/Client/Profile';
import Relatorios from './pages/Client/Relatorios';
import StatusAssociados from './pages/Client/Associados/StatusAssociados'


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
       
        { path: 'associados', element: <Associados /> },
        { path: 'status', element: <StatusAssociados /> },
        { path: 'profile', element: <Profile /> },
        { path: 'novoassociado', element: <NewwAssociados /> },
        { path: 'relatorios', element: <Relatorios/>},
        { path: 'atualizarassociado/:id', element: <AtualizarAssociado /> },

      ],
    },
  ]);
}