import _ from 'lodash';
const custom = 'form';
const mutations = {
  SET_ADD_THEME: (state: any, payload: any) => {
    state.themes.push(payload);
  },
  SET_ACTIVE_THEME: (state: any, payload: string) => {
    state.active = payload;
  },
  SET_UPDATE_THEME: (state: any, payload: any) => {
    let customTheme;
    if (payload) {
      customTheme = _.merge(_.cloneDeep(state.themes[state.active]), payload);
    } else {
      customTheme = _.cloneDeep(state.themes['Default']);
    }
    if (!state.themes[custom]) {
      state.themes = { ...state.themes, form: customTheme };
      state.active = custom;
    } else {
      state.themes[custom] = customTheme;
      state.active = custom;
    }
  },
  UPDATE_PADDINGS: (state: any, payload: any) => {
    if (!state.themes[custom]) {
      const customTheme = _.cloneDeep(state.themes[state.active]);
      customTheme.paddings = payload;
      state.themes = { ...state.themes, form: customTheme };
      state.active = custom;
    } else {
      state.themes[custom].paddings = payload;
      state.active = custom;
    }
  },
  UPDATE_MARGINS: (state: any, payload: any) => {
    if (!state.themes[custom]) {
      const customTheme = _.cloneDeep(state.themes[state.active]);
      customTheme.margins = payload;
      state.themes = { ...state.themes, form: customTheme };
      state.active = custom;
    } else {
      state.themes[custom].margins = payload;
      state.active = custom;
    }
  },
  UPDATE_BACKGROUND: (state: any, payload: any) => {
    if (!state.themes[custom]) {
      const customTheme = _.cloneDeep(state.themes[state.active]);
      customTheme.background.imgSrc = payload;
      state.themes = { ...state.themes, form: customTheme };
      state.active = custom;
    } else {
      state.themes[custom].background.imgSrc = payload;
      state.active = custom;
    }
  },
  UPDATE_BACKGROUND_COLOR: (state: any, payload: any) => {
    if (!state.themes[custom]) {
      const customTheme = _.cloneDeep(state.themes[state.active]);
      customTheme.background.color = payload;
      state.themes = { ...state.themes, form: customTheme };
      state.active = custom;
    } else {
      state.themes[custom].background.color = payload;
      state.active = custom;
    }
  },
};
export default mutations;
