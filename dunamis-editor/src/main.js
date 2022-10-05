import Dunamis from './mainBundle';
import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';

Vue.use(VueCompositionAPI);
Vue.config.productionTip = false;
new Vue({
  store: Dunamis.store,
  vuetify: Dunamis.vuetify,
  render: (h) => h(Dunamis.app),
}).$mount('#app');
