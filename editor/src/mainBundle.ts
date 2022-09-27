// import Vue from 'vue';
// import App from './App.vue';
// import router from './router/index';
// import store from './store';
// import vuetify from './plugins/vuetify';
// import './plugins';
// import VueCompositionAPI from '@vue/composition-api';

// Vue.use(VueCompositionAPI);
// Vue.config.productionTip = false;
// export default new Vue({
//   router,
//   store,
//   vuetify,
//   render: (h) => h(App),
// });

import app from './App.vue';
import router from './router/index';
import store from './store';
import vuetify from './plugins/vuetify';
import './plugins';

export { app, router, store, vuetify };
