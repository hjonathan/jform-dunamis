import _ from 'lodash';
const mutations = {
  ADD_SIMPLE_LIST: (state: any, payload: any) => {
    state.lists.push(payload);
  },
  ADD_API: (state: any, payload: any) => {
    state.apis.push(payload);
  },
  UPDATE_API: (state: any, payload: any) => {
    const index = state.apis.findIndex((o: any) => {
      return o.id == payload.id;
    });
    state.apis[index] = payload;
  },
  SET_SIMPLE_LISTS: (state: any, payload: any) => {
    state.lists = payload;
  },
  SET_APIS: (state: any, payload: any) => {
    state.apis = payload;
  },
};
export default mutations;
