import _ from 'lodash';
const getters = {
  getDataModel: (state: any) => (scope: string) => {
    return state.data[scope];
  },
  getMultipleData: (state: any) => (array: any) => {
    const res: any = {};
    array.forEach((el: any) => {
      if (
        _.isObject(state.data[el]) &&
        state.data[el]['value'] &&
        state.data[el]['label']
      ) {
        res[el] = state.data[el]['value'] || '';
      } else {
        res[el] = state.data[el] || '';
      }
    });

    return res;
  },
};
export default getters;
