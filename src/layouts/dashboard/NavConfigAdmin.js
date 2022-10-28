// component
import Iconify from '../../components/Iconify';


const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;



const AdminConfig = [

  {
    title: 'Usuarios',
    path: 'usuarios',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Clientes',
    path: 'tenants',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Associados',
    path: 'associados',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Status',
    path: 'status',
    icon: getIcon('eva:pie-chart-2-fill'),
  }

];

 


export default AdminConfig;