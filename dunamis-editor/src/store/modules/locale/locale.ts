import { RootState } from './../../../store/types';
import { Module } from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export interface LocalesState {
  en: any;
  es: any;
}

const state: LocalesState = {
  en: {
    key: 'en',
    description: 'English',
    content: {
      ID_FIELD: 'Field',
      ID_NAME: 'Name',
    },
  },
  es: {
    key: 'es',
    description: 'Español',
    content: {
      ID_FIELD: 'Campo',
      ID_NAME: 'Nombre',
    },
  },
};

const locales: Module<LocalesState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

export default locales;
