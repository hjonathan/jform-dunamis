import { RootState } from '../../../store/types';
import { Module } from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export interface PreviewState {
  locale: string;
  data: any;
  uiSchema: any;
  schema: any;
}

const state: PreviewState = {
  locale: 'en',
  data: {},
  uiSchema: {},
  schema: {},
};

const preview: Module<PreviewState, RootState> = {
  namespaced: true,
  state,
  ...{
    mutations: {
      ...mutations,
    },
  },
  ...{
    actions: {
      ...actions,
    },
  },
  ...{
    getters: {
      ...getters,
    },
  },
};

export default preview;
