import _ from 'lodash';
const mutations = {
  SET_SCHEMA: (state: any, value: any) => {
    state.schema = value;
  },
  SET_UI_SCHEMA: (state: any, value: any) => {
    state.uiSchema = value;
  },
  SET_LOCALE: (state: any, value: any) => {
    state.locale = value;
  },
  SET_DATA: (state: any, value: any) => {
    state.data = value;
  },
};
export default mutations;
