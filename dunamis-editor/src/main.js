// import Dunamis from './mainBundle';
// import Vue from 'vue';
// import VueCompositionAPI from '@vue/composition-api';

// Vue.use(VueCompositionAPI);
// Vue.config.productionTip = false;
// new Vue({
//   store: Dunamis.store,
//   vuetify: Dunamis.vuetify,
//   render: (h) => h(Dunamis.app),
// }).$mount('#app');

import app from './components/layouts/default/index.vue';
import store from './store';
import vuetify from './plugins/vuetify';
import './plugins';
import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';

Vue.use(VueCompositionAPI);
Vue.config.productionTip = false;
Vue.prototype.$dunamis = store;

new Vue({
  vuetify: vuetify,
  render: (h) => h(app),
}).$mount('#app');

//export default { app, store, vuetify };
