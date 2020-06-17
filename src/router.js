import Vue from 'vue'
import Router from 'vue-router';
//import AuthRequired from "@/utils/AuthRequired";
Vue.use(Router);
const routes = [
  {
    path: '/',
    name: 'dashboard',
    //beforeEnter: AuthRequired,
    component: () => import(/* webpackChunkName: "create" */ '@/views/Dashboard.vue')
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import(/* webpackChunkName: "work" */ './views/Orders.vue')
  },
  {
    path: '/neworder',
    name: 'neworder',
    component: () => import(/* webpackChunkName: "work" */ './views/PlaceOrder.vue')
  },
  {
    path: '/funds',
    name: 'funds',
    component: () => import(/* webpackChunkName: "work" */ './views/Funds.vue')
  },
  {
    path: '/addfunds',
    name: 'addfunds',
    component: () => import(/* webpackChunkName: "work" */ './views/AddFunds.vue')
  },
  {
    path: '/transactions',
    name: 'transactions',
    component: () => import(/* webpackChunkName: "play" */ './views/Transactions.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import(/* webpackChunkName: "develop" */ './views/Settings.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    component: () => import(/* webpackChunkName: "categories" */ './views/Categories.vue')
  },
  {
    path: '/updates',
    name: 'updates',
    component: () => import(/* webpackChunkName: "updates" */ './views/Updates.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */ './views/Profile.vue')
  },
];

const router = new Router({
  routes: routes,
  //mode: 'history',
  base: process.env.BASE_URL,
});

// router.beforeEach((to, from, next) => {
//   const apikye = getApi();
//   const publicPages = ['/settings'];
//   const authRequired = publicPages.includes(to.path);
//   if (authRequired && !loggedIn) {
//     //Vue.$swal('Please enter ApiKey');
//     next('/settings');
//   } else {
//     next();
//   }
// });

export default router;