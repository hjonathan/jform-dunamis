import { app, vuetify, store } from './mainBundle';
import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';

Vue.use(VueCompositionAPI);
Vue.config.productionTip = false;
new Vue({
  store,
  vuetify,
  render: (h) => h(app),
}).$mount('#app');
