
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
    }
};
export default mutations;
