/**
 * Vuetify Vue CLI Preset
 *
 * store/index.js
 *
 * vuex documentation: https://vuex.vuejs.org/
 */

// Vue
import Vue from 'vue';
import Vuex from 'vuex';
import { RootState } from './types';

// Modules
// https://vuex.vuejs.org/guide/modules.html
import * as modules from './modules';

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  state: {
    version: '0.0.1',
  },
  modules,
});

// A reusable const for making root commits and dispatches
// https://vuex.vuejs.org/guide/modules.html#accessing-global-assets-in-namespaced-modules
export const ROOT_DISPATCH = Object.freeze({ root: true });
