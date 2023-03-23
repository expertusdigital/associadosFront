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
    title: 'Pag. Pendentes',
    path: 'status',
    icon: getIcon('material-symbols:rotate-right-rounded'),
  },
  {
    title: 'Pag. Efetuados',
    path: '/dashboard/relatorios',
    icon: getIcon('game-icons:confirmed'),
  },

];

export default TenantConfig;

