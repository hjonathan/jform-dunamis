/* eslint-disable */
import Vue from 'vue';
import App from './layouts/default/index.vue'
/*import router from './router';
import store from './store';*/
//import vuetify from './plugins/vuetify';
//import MainPanel from './DataSources/MainPanelDataSourcesApi.vue';
import VueCompositionAPI from '@vue/composition-api';

Vue.use(VueCompositionAPI);
//Vue.use(vuetify);
Vue.config.productionTip = false;

new Vue({
  /*router,
  store,*/
  //vuetify: vuetify,
  render: (h) => h(App),
}).$mount('#app');
