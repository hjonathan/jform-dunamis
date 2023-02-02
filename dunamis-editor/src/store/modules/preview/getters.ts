import _ from 'lodash';

const getProp = (obj: any, key: string) =>
  key
    .split('.')
    .reduce((o, x) => (typeof o == 'undefined' || o === null ? o : o[x]), obj);

const getters = {
  getDataModel: (state: any) => (scope: string) => {
    const data = Object.assign(state.data);
    const auxScope = getProp(data, scope);
    return auxScope;
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
  uiSchema: (state: any) => state.uiSchema,
  schema: (state: any) => state.schema,
  data: (state: any) => state.data,
  locale: (state: any) => state.locale,
  scopesByValue: (state: any) => (scopes: Array<string>) => {
    return state.data;
  },
};
export default getters;
