import { getScope, pathControlSchema } from './../../utils/scope';
const mutations = {
  SET_RULES_BY_SCOPE: (state: any, payload: any) => {
    const clone = Object.assign({}, state.editor.uiSchema);
    getScope(clone, (obj: any, key: string, value: any) => {
      if (key == 'scope' && pathControlSchema(value) == payload.scope) {
        const nRules = payload.rules;
        if (!obj.options.rules) {
          obj.options.rules = [];
        }

        obj.options.rules = obj.options.rules.concat(nRules);
      }
    });
    state.editor.uiSchema = clone;
  },
  DELETE_RULES_BY_SCOPE: (state: any, payload: any) => {
    const clone = Object.assign({}, state.editor.uiSchema);
    getScope(clone, (obj: any, key: string, value: any) => {
      if (key == 'scope' && pathControlSchema(value) == payload.scope) {
        obj.options.rules = [];
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
  SET_ACTIVE_ELEMENT: (state: any, value: any) => {
    state.editor.element = value;
  },
  SET_LANGUAGE: (state: any, value: any) => {
    state.editor.locale = value;
  },
};
export default mutations;
