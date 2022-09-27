import _ from 'lodash';
const getters = {
  getSimpleLists: (state: any) => {
    return state.lists;
  },
  getApis: (state: any) => {
    return state.apis;
  },
};
export default getters;
