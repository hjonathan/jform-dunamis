<template>
  <div>
    <template v-for="(theme, index) in themes">
      <v-card hover outlined @click="setTheme(theme)" :key="index">
        <v-card>
          <v-card-text class="containerTheme">
            <div class="d-flex flex-wrap">
              <v-chip
                v-for="(key, index) in Object.keys(theme.light)"
                :key="index"
                :color="theme.light[key]"
                class="column"
              >
              </v-chip>
            </div>
            <h4>{{ theme.name }}</h4>
          </v-card-text>
        </v-card>
        <v-divider></v-divider>
      </v-card>
    </template>
  </div>
</template>
<script lang="ts">
import { VuetifyThemeVariant } from 'vuetify/types/services/theme';
import { computed, defineComponent, getCurrentInstance } from 'vue';
import { merge, cloneDeep } from 'lodash';
import store from '../../store';
import {
  getVuetify,
  getAllThemes,
  activeTheme,
  setDefaultTheme,
} from '../Composables/composableTheme';

const currentTheme = defineComponent({
  name: 'show-theme',
  setup() {
    const defaultTheme = {
      name: 'Default',
      light: {
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
      },
      dark: {
        primary: '#2196F3',
        secondary: '#424242',
        accent: '#FF4081',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
      },
      fontFamily: 'Roboto',
    };

    let vuetify = getVuetify(getCurrentInstance);

    const themes = computed(() => {
      const themes = getAllThemes(store);
      const colors = [];
      themes.forEach((element) => {
        colors.push({
          ...merge(cloneDeep(defaultTheme), {
            name: element.name,
            light: {
              primary: element.light.primary,
              secondary: element.light.secondary,
              accent: element.light.accent,
              info: element.light.info,
            },
          }),
        });
      });
      return colors;
    });

    const setTheme = (theme: {
      name: string;
      dark: VuetifyThemeVariant;
      light: VuetifyThemeVariant;
    }) => {
      const name = theme.name;
      const dark = theme.dark;
      const light = theme.light;
      let themeSelected = {
        light: light,
        dark: dark,
      };
      // set themes
      setDefaultTheme(vuetify, themeSelected);
      // also save theme name to disable selection
      vuetify.theme.currentTheme.name = name;
      activeTheme(store, name);
    };

    return {
      themes,
      setTheme,
    };
  },
});
export default currentTheme;
</script>
<style>
.containerTheme {
  padding: 12px !important;
}
</style>
