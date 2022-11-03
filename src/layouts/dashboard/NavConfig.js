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
    title: 'Novo Associado',
    path: '/dashboard/novoassociado',
    icon: getIcon('akar-icons:person-add'),
  },
  {
    title: 'Status',
    path: 'status',
    icon: getIcon('mdi:list-status'),
  },

];

export default TenantConfig;

