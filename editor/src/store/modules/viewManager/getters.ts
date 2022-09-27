import _ from 'lodash';
const getters = {
  getDataMainPanel: (state: any) => (id: string) => {
    return state.mainPanel.items[state.mainPanel.active]['data'];
  },
  getMainPanelById: (state: any) => (id: string) => {
    let it;
    const clone = _.cloneDeep(state.mainPanel.items);
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
    const clone = _.cloneDeep(state.mainPanel.items);
    for (const item of clone) {
      if (item.id == id) {
        it = item;
        break;
      }
    }
    return it.data;
  },
};
export default getters;
