const actions = {
  addTheme: ({ commit }: any, data: any) => {
    commit('ADD_THEME', data);
  },
  setTheme: ({ commit }: any, data: any) => {
    commit('SET_UPDATE_THEME', data);
  },
  updateTheme: ({ commit }: any, data: any) => {
    commit('ADD_THEME', data);
  },
  updatePaddings: ({ commit }: any, data: any) => {
    commit('UPDATE_PADDINGS', data);
  },
  updateMargins: ({ commit }: any, data: any) => {
    commit('UPDATE_MARGINS', data);
  },
  updateBackground: ({ commit }: any, data: any) => {
    commit('UPDATE_BACKGROUND', data);
  },
  updateBackgroundColor: ({ commit }: any, data: any) => {
    commit('UPDATE_BACKGROUND_COLOR', data);
  },
};
export default actions;
