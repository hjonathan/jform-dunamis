import { RootState } from '../../../store/types';
import { Module } from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import defaultThemes from './defaultThemes.json';

export interface DashboardState {
  forms: any;
}
const state: DashboardState = {
  forms: [],
};
const dashboard: Module<DashboardState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

export default dashboard;
