// component
import Iconify from '../../components/Iconify';


const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;



const AdminConfig = [


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
    title: 'Controle de pag',
    path: 'status',
    icon: getIcon('mdi:list-status')
  },
  {
    title: 'Relatorios',
    path: 'relatorios',
    icon: getIcon('mdi:list-status')
  }

];

 


export default AdminConfig;