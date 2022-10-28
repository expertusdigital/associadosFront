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
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Status',
    path: 'status',
    icon: getIcon('eva:people-fill'),
  },

];

export default TenantConfig;

