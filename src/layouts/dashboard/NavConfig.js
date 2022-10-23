// component
import Iconify from '../../components/Iconify';
import {getTenant_id} from '../../utils/services/auth'
// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;



var getTenantid = getTenant_id();
console.log(getTenantid)

const TenantConfig = [
 
  {
    title: 'teste',
    path: '/dashboard/associados',
    icon: getIcon('eva:people-fill'),
  },

];

const AdminConfig = [

  {
    title: 'Usuarios',
    path: 'usuarios',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Clientes',
    path: '#',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Associados',
    path: '#',
    icon: getIcon('eva:pie-chart-2-fill'),
  }

];

if(getTenantid != null && getTenantid != undefined && getTenantid == "admin" ){

   var teste = TenantConfig;



}else{
  var teste = AdminConfig;


}
console.log(teste)
export default teste;

