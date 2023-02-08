import { Theme } from './../CustomTheme/interface';

export function getVuetify(currentInstance: any): any {
  const instance = currentInstance();
  if (!instance) {
    throw new Error(`useVuetify should be called in setup().`);
  }
  return instance.proxy.$vuetify;
}

export function setDefaultTheme(vuetify: any, theme: any): void {
  Object.keys(theme.light).forEach((i) => {
    vuetify.theme.themes.light[i] = theme.light[i];
  });
  Object.keys(theme.dark).forEach((i) => {
    vuetify.theme.themes.dark[i] = theme.dark[i];
  });
  vuetify.theme.currentTheme.name = theme.name;
}

export function getAllThemes(store: any): Array<Theme> {
  return store.getters['themes/getSummaryThemes'];
}

export function activeTheme(store: any, name: string): void {
  store.dispatch('themes/setActiveTheme', name);
}
