import { AppState } from './types';
import { RootState } from '../types';
import { Module } from 'vuex';
import { createAjv, extendedVuetifyRenderers } from '@jsonforms/vue2-vuetify';
import mutationsEditor from './editor/mutations';
import actionsEditor from './editor/actions';
import gettersEditor from './editor/getters';

const ajv = createAjv({ useDefaults: true });
const state: AppState = {
  editor: {
    name: '',
    paletteElements: [],
    uiSchema: undefined,
    schema: undefined,
    settings: false,
    selectedElement: '',
    element: {
      selected: '',
      edit: 0,
    },
  },
  jsonforms: {
    readonly: false,
    validationMode: 'ValidateAndShow',
    config: {
      restrict: true,
      trim: false,
      showUnfocusedDescription: false,
      hideRequiredAsterisk: true,
    },
    renderers: extendedVuetifyRenderers,
    cells: extendedVuetifyRenderers,
    ajv,
    locale: 'en',
  },
  data: {},
  monaco: {
    schemaModel: undefined,
    uischemaModel: undefined,
    dataModel: undefined,
    dataVariables: undefined,
  },
};
// make all mutations
const mutations = {
  ...mutationsEditor,
};
// const actions = make.actions(state);
const actions = {
  // automatically create only `setItems()` action
  ...actionsEditor,
};

const getters = {
  ...gettersEditor,
};

const app: Module<AppState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

export default app;
