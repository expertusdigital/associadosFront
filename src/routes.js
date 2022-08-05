import { Navigate, useRoutes , Routes, Route} from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/LoginRegister/Login';
import NotFound from './pages/PageErro';
import Associados from './pages/Associados';
import DashboardApp from './pages/Dashboard';
import {ProtectedRoute,RouteAutenticate} from './ProtectedRoute'



export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <RouteAutenticate />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
// ----------------------------------------------------------------------




