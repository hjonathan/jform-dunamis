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
  uiSchema: (state: any) => state.uiSchema,
  schema: (state: any) => state.schema,
  data: (state: any) => state.data,
  locale: (state: any) => state.locale,
  scopesByValue: (state: any) => (scopes: Array<string>) => {
    // eslint-disable-next-line prefer-const
    let response: any = {};
    scopes.forEach((scope) => {
      response[scope] = state.data[scope];
    });

    return response;
  },
};
export default getters;
