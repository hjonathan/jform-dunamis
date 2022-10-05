import { RootState } from '../../../store/types';
import { Module } from 'vuex';
import { make } from 'vuex-pathify';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export interface ViewManagerState {
  menuBar: any;
  sideBar: any;
  statusBar: any;
  activityBar: any;
  sidePanel: any;
  mainPanel: any;
  mainPanelExtend: any;
  actionsBar: any;
}

const state: ViewManagerState = {
  // Menu Up
  menuBar: {},
  // Menu left
  activityBar: {
    active: 0,
    items: [
      {
        id: 'activity-json-forms',
        title: 'JSON Forms',
        icon: 'mdi-view-dashboard',
      },
      {
        id: 'activity-json-form-editor',
        title: 'JSON Form Editor',
        icon: 'mdi-drawing-box',
      },
      {
        id: 'activity-data-sources',
        title: 'Data Sources',
        icon: 'mdi-database',
      },
    ],
  },
  //Panel bottom
  statusBar: {},
  // Panel properties
  sideBar: {
    active: 0,
    items: [
      {
        id: 'side-bar-dashboard',
        component: 'side-bar-dashboard',
      },
      {
        id: 'side-bar-data-sources',
        component: 'side-bar-data-sources',
      },
    ],
  },
  sidePanel: {
    component: 'div',
  },
  mainPanel: {
    active: 0,
    items: [
      {
        id: 'main-dashboard',
        component: 'main-panel-dashboard',
        data: {
          reload: '1',
          form: null,
        },
      },
      {
        id: 'main-data-sources-simple-lists',
        component: 'main-panel-data-sources-simple-lists',
        data: {
          reload: '1',
        },
      },
      {
        id: 'main-data-sources-api',
        component: 'main-panel-data-sources-api',
        data: {
          reload: '1',
        },
      },
      {
        id: 'main-dashboard-templates',
        component: 'main-panel-dashboard-templates',
        data: {
          reload: '1',
        },
      },
    ],
  },
  mainPanelExtend: {
    active: -1,
    items: [
      {
        id: 'main-panel-extend-dunamis-editor',
        component: 'main-panel-extend-dunamis-editor',
        data: {
          reload: '1',
        },
      },
    ],
  },
  actionsBar: {
    active: 0,
    items: [
      {
        id: 'actions-dashboard',
        component: 'actions-bar-dashboard',
        data: {},
      },
      {
        id: 'actions-data-sources',
        component: 'actions-bar-data-sources',
        data: {},
      },
    ],
  },
};

const viewManager: Module<ViewManagerState, RootState> = {
  namespaced: true,
  state,
  ...{
    mutations: {
      ...make.mutations(state),
      ...mutations,
    },
  },
  ...{
    actions: {
      ...make.actions(state),
      ...actions,
    },
  },
  ...{
    getters: {
      ...make.getters(state),
      ...getters,
    },
  },
};

export default viewManager;
