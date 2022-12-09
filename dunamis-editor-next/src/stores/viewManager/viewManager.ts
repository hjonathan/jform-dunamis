import { defineStore } from "pinia";
import actions from './actions';
export interface ViewManagerState {
  name: String;
  sideBar: any;
  statusBar: any;
  sidePanel: any;
  mainPanel: any;
  actionsBar: any;
}

export const useViewManagerStore = defineStore('viewManager', {
  state: (): ViewManagerState => ({
    name: "viewManager",
    //Panel bottom
    statusBar: {},
    // Panel properties
    sideBar: {
      active: 0,
      items: [
        {
          id: 'side-bar-pallete',
          component: 'pallete-panel',
        },
        {
          id: 'side-bar-properties',
          component: 'properties-panel',
        },
        {
          id: 'side-bar-translations',
          component: 'side-bar-i18n',
        },
        {
          id: 'side-bar-preview',
          component: 'side-bar-preview',
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
          id: 'main-editor',
          component: 'dynaform-editor',
          data: {
            reload: '1',
          },
        },
        {
          id: 'main-translations',
          component: 'main-panel-i18n',
          data: {
            locale: 'en',
            reload: '1',
            view: 'table',
          },
        },
        {
          id: 'main-preview',
          component: 'main-panel-dynaform-preview',
          data: {
            reload: '1',
            mode: 'web',
          },
        },
        {
          id: 'main-preview-device',
          component: 'main-panel-dynaform-device-preview',
          data: {
            reload: '1',
          },
        },

        {
          id: 'main-schema-editor',
          component: 'main-panel-schema-editor',
          data: {
            reload: '1',
          },
        },
        {
          id: 'main-form-rules',
          component: 'main-panel-form-rules',
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
          id: 'actions-editor',
          component: 'actions-bar-editor',
          data: {},
        },
        {
          id: 'actions-translations',
          component: 'actions-bar-translations',
          data: {},
        },
      ],
    },
  }),
  actions: {
    ...actions
  },
});