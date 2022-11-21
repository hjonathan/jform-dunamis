<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-y
  >
    <template v-slot:activator="{ on }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on: onTooltip }">
          <v-btn large icon dark v-on="{ ...on, ...onTooltip }">
            <v-icon size="30">mdi-palette</v-icon>
          </v-btn>
        </template>
        Theme Colors
      </v-tooltip>
    </template>
    <v-toolbar flat>
      <v-toolbar-title>Theme Colors</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn icon @click="menu = false">
          <v-icon>$close</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-divider />
    <v-card class="overflow-y-auto" style="max-height: 600px">
      <v-card-text>
        <v-card
          class="my-2"
          :disabled="$vuetify.theme.currentTheme.name === theme.name"
          @click="setTheme(theme)"
          hover
          outlined
          v-for="(theme, index) in themes"
          :key="index"
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold">
                {{ theme.name }}</v-list-item-title
              >
            </v-list-item-content>
            <v-list-item-action>
              <v-avatar
                color="success"
                size="30"
                v-if="$vuetify.theme.currentTheme.name === theme.name"
              >
                <v-icon>mdi-check</v-icon>
              </v-avatar>
            </v-list-item-action>
          </v-list-item>
          <div class="my-2">
            <v-chip
              class="mx-1"
              label
              :color="theme.dark[key]"
              v-for="(key, index) in Object.keys(theme.dark)"
              :key="index"
            >
              {{ key }}</v-chip
            >
          </div>
          <div class="my-2">
            <v-chip
              class="mx-1"
              label
              :color="theme.light[key]"
              v-for="(key, index) in Object.keys(theme.light)"
              :key="index"
            >
              {{ key }}</v-chip
            >
          </div>
        </v-card>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import { VuetifyThemeVariant } from 'vuetify/types/services/theme';
import merge from 'lodash/merge';
import cloneDeep from 'lodash/cloneDeep';
import { defineComponent } from 'vue';
import store from '../store';

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

export default defineComponent({
  name: 'ThemeChanger',
  data: () => ({
    menu: false,
  }),
  computed: {
    themes(): any {
      return this.setThemes();
    },
  },
  methods: {
    setThemes(): any {
      const themes: any = store.getters['themes/getSummaryThemes'];
      const colors: any = [];
      colors.push(defaultTheme);
      themes.forEach((element: any) => {
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
    },
    setTheme(theme: {
      name: string;
      dark: VuetifyThemeVariant;
      light: VuetifyThemeVariant;
    }) {
      // close menu
      this.menu = false;
      const name = theme.name;
      const dark = theme.dark;
      const light = theme.light;
      // set themes
      Object.keys(dark).forEach((i) => {
        this.$vuetify.theme.themes.dark[i] = dark[i];
      });
      Object.keys(light).forEach((i) => {
        this.$vuetify.theme.themes.light[i] = light[i];
      });
      // also save theme name to disable selection
      this.$vuetify.theme.currentTheme.name = name;
      store.dispatch('themes/activeTheme', name);
    },
  },
});
</script>
<style scoped></style>
