// component
import Iconify from '../../components/Iconify';


const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;



const AdminConfig = [

  {
    title: 'Usuarios',
    path: 'usuarios',
    icon: getIcon('akar-icons:people-group'),
  },
  {
    title: 'Clientes',
    path: 'tenants',
    icon: getIcon('akar-icons:person'),
  },
  {
    title: 'Associados',
    path: 'associados',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Novo Associado',
    path: 'novoassociado',
    icon: getIcon('akar-icons:person-add'),
  },
  {
    title: 'Status',
    path: 'status',
    icon: getIcon('mdi:list-status')
  }

];

 


export default AdminConfig;