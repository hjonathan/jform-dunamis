import _ from 'lodash';
import { scope, pathControlSchema } from './../../utils/scope';
const mutations = {
  SET_SCOPE_RULES: (state: any, payload: any) => {
    const clone = _.cloneDeep(state.editor.uiSchema);
    scope(clone, (obj: any, key: string, value: any) => {
      if (key == 'scope' && pathControlSchema(value) == payload.scope) {
        obj.rule = payload.rule;
      }
    });
    state.editor.uiSchema = clone;
  },
  SET_PALLETE_ELEMENTS: (state: any, value: any) => {
    state.editor.paletteElements = value;
  },
  SET_SCHEMA: (state: any, value: any) => {
    state.editor.schema = value;
  },
  SET_UI_SCHEMA: (state: any, value: any) => {
    state.editor.uiSchema = value;
  },
  REMOVE_UISCHEMA_ELEMENT: (state: any, value: any) => {
    state.editor.uiSchema = value;
  },
  REMOVE_SCHEMA_ELEMENT: (state: any, value: any) => {
    state.editor.schema = value;
  },
  SET_INFORMATION: (state: any, value: any) => {
    state.editor.information = value;
  },
};
export default mutations;
