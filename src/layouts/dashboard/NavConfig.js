// component
import Iconify from '../../components/Iconify';
import {getTenant_id} from '../../utils/services/auth'
// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;



var getTenantid = getTenant_id();

const TenantConfig = [
 
  {
    title: 'Associados',
    path: '/dashboard/associados',
    icon: getIcon('eva:people-fill'),
  },

];

const AdminConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Clientes',
   
    icon: getIcon('eva:pie-chart-2-fill'),
  },

  {
    title: 'Associados',
    path: '/dashboard/associados',
    icon: getIcon('eva:people-fill'),
  },

];

if(getTenantid != null && getTenantid != undefined ){

  var teste = TenantConfig;

}else{
  var teste = AdminConfig;

}

export default teste;
