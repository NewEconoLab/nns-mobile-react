import asyncComponent from '@/components/asyncComponent';
// import redirectComponent from '@/components/redirectComponent';

export default [
  {
    component: asyncComponent(() => import('../containers/traderecord')),
    path: '/traderecord',
  },
  {
    component: asyncComponent(() => import('../containers/home/withdraw')),
    path: '/withdraw',
  },
  {
    component: asyncComponent(() => import('../containers/home/topup')),
    path: '/topup',
  },
  {
    component: asyncComponent(() => import('../containers/tutorial')),
    path: '/tutorial',
  },
  {
    component: asyncComponent(() => import('../containers/exchange')),
    path: '/exchange',
  },
  {
    component: asyncComponent(() => import('../containers/myauction/detail')),
    path: '/auction/detail',
  },
  {
    component: asyncComponent(() => import('../containers/myauction')),
    path: '/auction',
  },
  {
    component: asyncComponent(() => import('../containers/manager/detail')),
    path: '/manager/detail/:id',
  },
  {
    component: asyncComponent(() => import('../containers/manager')),
    path: '/manager',
  },
  {
    component: asyncComponent(() => import('../containers//bonus')),
    path: '/bonus',
  },
  {
    component: asyncComponent(() => import('../containers/record')),
    path: '/record',
  },
  {
    component: asyncComponent(() => import('../containers/notfound')),
    path: '/:any',
  },
  { 
    component: asyncComponent(() => import('../containers/home')),
    exact: true,
    path: '/',
  },
];

