import app from './components/layouts/default/index.vue';
import store from './store';
import vuetify from './plugins/vuetify';
import './plugins';
import Vue from 'vue';
import VueCompositionAPI from 'vue';

Vue.use(VueCompositionAPI);
Vue.config.productionTip = false;

export default new Vue({
  store: store,
  vuetify: vuetify,
  render: (h) => h(app),
});

//export default { app, store, vuetify };
