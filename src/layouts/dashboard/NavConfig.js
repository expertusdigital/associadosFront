// component
import Iconify from '../../components/Iconify';
// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;





const TenantConfig = [
 
  {
    title: 'Associados',
    path: '/dashboard/associados',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Controle de pag',
    path: 'status',
    icon: getIcon('mdi:list-status'),
  },
  {
    title: 'Relatorios',
    path: '/dashboard/relatorios',
    icon: getIcon('akar-icons:person-add'),
  },

];

export default TenantConfig;

