const actions = {
    setActiveActivityBar: ({ commit }: any, data: any) => {
        commit('SET_ACTIVE_ACTIVITY_BAR', data);
    },
    setAllViews: ({ commit }: any, data: any) => {
        commit('SET_ALL_VIEWS', data);
    },
    setDataMainPanel: ({ commit }: any, data: any) => {
        commit('SET_DATA_MAIN_PANEL', data);
    },
    setMainPanel: ({ commit }: any, data: any) => {
        commit('SET_MAIN_PANEL', data);
    }
};
export default actions;
