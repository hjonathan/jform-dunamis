import _ from 'lodash';
const mutations = {
  SET_FORMS: (state: any, payload: any) => {
    state.forms = payload;
  },
  ADD_FORM: (state: any, payload: any) => {
    state.forms.push(payload);
  },
};
export default mutations;
