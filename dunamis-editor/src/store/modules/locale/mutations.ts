import _ from 'lodash';
const mutations = {
  ADD_PROPERTY: (state: any, payload: any) => {
    _.map(state, (value, key) => {
      value['content'][payload.property] = {
        label: null,
        description: null,
      };
    });
  },
  ADD_LANGUAGE: (state: any, payload: any) => {
    state[payload.key] = payload;
  },
  UPDATE_PROPERTY: (state: any, payload: any) => {
    _.map(state, (value, key) => {
      _.map(value.content, (val, property, obj) => {
        if (property == payload.oldProperty) {
          obj[payload.newProperty] = obj[payload.oldProperty];
          delete obj[payload.oldProperty];
        }
      });
    });
  },
  SET_SCHEMA: (state: any, payload: any) => {
    _.map(state, (value, key) => {
      value['content'] = {};
    });
    _.forEach(payload.properties, (prop) => {
      _.map(state, (value, key) => {
        value['content'][prop] = {
          label: null,
          description: null,
        };
      });
    });
  },
  SET_ALL: (state: any, payload: any) => {
    for (const key in payload) {
      state[key] = payload[key];
    }
  },
  SET_LOCALES: (state: any, payload: any) => {
    for (const key in payload) {
      state[key] = payload[key];
    }
  },
};
export default mutations;
