import { cloneDeep } from 'lodash';
const getters = {
  getDataMainPanel: (state: any) => (id: string) => {
    return state.mainPanel.items[state.mainPanel.active]['data'];
  },
  getMainPanelById: (state: any) => (id: string) => {
    let it;
    const clone = cloneDeep(state.mainPanel.items);
    for (const item of clone) {
      if (item.id == id) {
        it = item;
        break;
      }
    }
    return it;
  },
  getDataMainPanelById: (state: any) => (id: string) => {
    let it;
    const clone = cloneDeep(state.mainPanel.items);
    for (const item of clone) {
      if (item.id == id) {
        it = item;
        break;
      }
    }
    return it.data;
  },
  actionsBarItems: (state: any) => state.actionsBar.items,
  actionsBarActive: (state: any) => state.actionsBar.active,
  sideBarItems: (state: any) => state.sideBar.items,
  sideBarActive: (state: any) => state.sideBar.active,
  mainPanelItems: (state: any) => state.mainPanel.items,
  mainPanelActive: (state: any) => state.mainPanel.active,
};
export default getters;
