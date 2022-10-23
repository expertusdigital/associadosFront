import { Navigate, useRoutes , Routes, Route} from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/LoginRegister/Login';
import Register from './pages/LoginRegister/Register';
import NotFound from './pages/PageErro';
import Associados from './pages/Associados';
import DashboardApp from './pages/Dashboard';
import {ProtectedRoute,RouteAutenticate} from './ProtectedRoute'
import {ProtectedRouteAdmin,RouteAutenticateAdmin} from './ProtectedRouteAdmin'

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";



export default function Router() {

  
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Register" element={<Register />} />
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
      <Route
        path="/admin/*"
        element={
          <ProtectedRouteAdmin>
            <RouteAutenticateAdmin />
          </ProtectedRouteAdmin>
        }
      />
    </Routes>
  );
}
// ----------------------------------------------------------------------




