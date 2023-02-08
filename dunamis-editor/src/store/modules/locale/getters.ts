import _ from 'lodash';
const getters = {
  getSummaryLocales: (state: any) => () => {
    return _.map(state, (value, key) => {
      return {
        text: value.description + ' - ' + value.key,
        value: value.key,
      };
    });
  },
  getLocalesKeys: (state: any) => {
    return Object.keys(state);
  },
  getLocales: (state: any) => {
    return state;
  },
  getLocalesArray: (state: any) => {
    const locales = [];
    for (const key in state) {
      locales.push({
        value: key,
        text: state[key].description,
      });
    }
    return locales;
  },
};
export default getters;
