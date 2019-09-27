import App from './App';
import {
  asyncHome,
  NotFound,
  asyncCart,
} from './pages';

// const productPath = //:(/.*(\.html)$/)/;

export default [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: asyncHome,
        // loadData: ({currency}) => [
        //   homeAction.fetchIfNeeded(currency)
        // ]
      },
      {
        path: '/checkout/cart',
        exact: true,
        component: asyncCart
      },
      {
        component: NotFound
      }
    ]
  }
];
