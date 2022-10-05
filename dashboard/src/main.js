import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify2 from './plugins/vuetify';
import './plugins';
import VueCompositionAPI from '@vue/composition-api';

Vue.use(VueCompositionAPI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify: vuetify2,
  render: (h) => h(App),
}).$mount('#app');
