export function setDefaultTheme(vuetify: any, theme: any): void {
  Object.keys(theme.light).forEach((i) => {
    vuetify.theme.themes.light[i] = theme.light[i];
  });
  vuetify.theme.currentTheme.name = theme.name;
}
