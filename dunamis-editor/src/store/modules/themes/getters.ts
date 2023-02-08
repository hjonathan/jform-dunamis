/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Padding, Margin, Theme } from '@/components/CustomTheme/interface';
const getters = {
  getSummaryThemes: (state: any) => {
    const arrayTheme: Array<Theme> = [];
    for (const theme in state.themes) {
      arrayTheme.push({
        name: state.themes[theme].name,
        light: state.themes[theme].light,
      });
    }
    return arrayTheme;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getFontFamilyTheme: (state: any) => {
    const currentTheme = state.active;
    return state.themes[currentTheme].fontFamily;
  },
  getThemeSelected: (state: any) => {
    const currentTheme = state.active;
    return state.themes[currentTheme];
  },
  getPaddings: (state: any): Padding => {
    const currentTheme = state.active;
    return state.themes[currentTheme].paddings;
  },
  getMargins: (state: any): Margin => {
    const currentTheme = state.active;
    return state.themes[currentTheme].margins;
  },
  getBackgroundSource: (state: any): string => {
    const currentTheme = state.active;
    return state.themes[currentTheme].background.imgSrc;
  },
  getBackgroundColor: (state: any): string => {
    const currentTheme = state.active;
    return state.themes[currentTheme].background.color;
  },
};
export default getters;
