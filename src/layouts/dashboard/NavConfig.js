// component
import Iconify from '../../components/Iconify';
import {getTenant_id} from '../../utils/services/auth'
// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;



var getTenantid = getTenant_id();

const AdminConfig = [
  {
    title: 'Home',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },

  {
    title: 'Associados',
    path: '/dashboard/associados',
    icon: getIcon('eva:people-fill'),
  },

];

const TenantConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },

  {
    title: 'Associados',
    path: '/dashboard/associados',
    icon: getIcon('eva:people-fill'),
  },

];

if(getTenantid != null && getTenantid != undefined ){

  var teste = AdminConfig;

}else{
  var teste = TenantConfig;

}

export default teste;
