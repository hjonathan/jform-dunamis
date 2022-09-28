import Vue from 'vue';
import Router from 'vue-router';
import DefaultLayout from '../layouts/index.vue';

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  scrollBehavior: (to, _, savedPosition) => {
    if (to.hash) return { selector: to.hash };
    if (savedPosition) return savedPosition;

    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'Default',
          component: DefaultLayout,
        },
      ],
    },
  ],
});
