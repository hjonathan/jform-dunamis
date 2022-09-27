import { RootState } from './../../../store/types';
import { Module } from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export interface LocalesState {
  en: any;
}

const state: LocalesState = {
  en: {
    key: 'en',
    description: 'English',
    content: {},
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
