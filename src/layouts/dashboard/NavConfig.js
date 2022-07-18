// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Usuarios',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Peças',
    path: '/dashboard/pecas',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'Carros',
    path: '/dashboard/products',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'Clientes',
    path: '/dashboard/clientes',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Orçamentos',
    path: '/dashboard/orcamento',
    icon: getIcon('eva:people-fill'),
  },

];

export default navConfig;
