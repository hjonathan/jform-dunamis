import { RootState } from '../../../store/types';
import { Module } from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import defaultThemes from './defaultThemes.json';

export interface ThemeState {
  themes: any;
  active: string;
}
const state: ThemeState = {
  themes: defaultThemes,
  active: 'Default',
};
const themes: Module<ThemeState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

export default themes;
