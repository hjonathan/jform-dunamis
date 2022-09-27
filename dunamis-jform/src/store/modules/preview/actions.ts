const actions = {
  setSchema: ({ commit }: any, data: any) => {
    commit('SET_SCHEMA', data);
  },
  setUiSchema: ({ commit }: any, data: any) => {
    commit('SET_UI_SCHEMA', data);
  },
  setLocale: ({ commit }: any, data: any) => {
    commit('SET_LOCALE', data);
  },
};
export default actions;
