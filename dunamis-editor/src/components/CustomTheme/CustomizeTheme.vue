<template>
  <v-row>
    <v-col>
      <v-text-field
        v-model="customThemeName"
        label="Name of the Theme"
        required
        @blur="updateTheme"
      >
      </v-text-field>
    </v-col>
    <v-col cols="12" sm="12" md="12">
      <v-select
        :items="selectFont"
        label="Select Font"
        v-model="fontFamily"
      ></v-select>
    </v-col>
    <v-col cols="12" sm="12" md="12">
      <span>Color Primary</span>
      <v-text-field
        v-model="color.primary"
        @change="setCustom"
        hide-details
        solo
        readonly
      >
        <template v-slot:append>
          <v-menu
            v-model="menu.primary"
            top
            nudge-bottom="105"
            nudge-left="16"
            :close-on-content-click="false"
          >
            <template v-slot:activator="{ on }">
              <div :style="swatchStyle('primary')" v-on="on" />
            </template>
            <v-card>
              <v-card-text class="pa-0">
                <v-color-picker
                  v-model="color.primary"
                  dot-size="25"
                  hide-inputs
                  flat
                  hide-mode-switch
                  swatches-max-height="200"
                ></v-color-picker>
              </v-card-text>
            </v-card>
          </v-menu>
        </template>
      </v-text-field>
    </v-col>
    <v-col cols="12" sm="12" md="12">
      <span>Color secondary</span>
      <v-text-field
        v-model="color.secondary"
        @change="setCustom"
        readonly
        hide-details
        solo
      >
        <template v-slot:append>
          <v-menu
            v-model="menu.secondary"
            top
            nudge-bottom="105"
            nudge-left="16"
            :close-on-content-click="false"
          >
            <template v-slot:activator="{ on }">
              <div :style="swatchStyle('secondary')" v-on="on" />
            </template>
            <v-card>
              <v-card-text class="pa-0">
                <v-color-picker
                  v-model="color.secondary"
                  dot-size="25"
                  hide-inputs
                  hide-mode-switch
                  swatches-max-height="200"
                ></v-color-picker>
              </v-card-text>
            </v-card>
          </v-menu>
        </template>
      </v-text-field>
    </v-col>
    <v-col cols="12" sm="12" md="12">
      <span>Color accent</span>
      <v-text-field
        v-model="color.accent"
        @change="setCustom"
        readonly
        hide-details
        solo
      >
        <template v-slot:append>
          <v-menu
            v-model="menu.accent"
            top
            nudge-bottom="105"
            nudge-left="16"
            :close-on-content-click="false"
          >
            <template v-slot:activator="{ on }">
              <div :style="swatchStyle('accent')" v-on="on" />
            </template>
            <v-card>
              <v-card-text class="pa-0">
                <v-color-picker
                  v-model="color.accent"
                  dot-size="25"
                  hide-inputs
                  hide-mode-switch
                  swatches-max-height="200"
                ></v-color-picker>
              </v-card-text>
            </v-card>
          </v-menu>
        </template>
      </v-text-field>
    </v-col>
    <v-col cols="12" sm="12" md="12">
      <span>Color error</span>
      <v-text-field
        v-model="color.error"
        @change="setCustom"
        readonly
        hide-details
        solo
      >
        <template v-slot:append>
          <v-menu
            v-model="menu.error"
            top
            nudge-bottom="105"
            nudge-left="16"
            :close-on-content-click="false"
          >
            <template v-slot:activator="{ on }">
              <div :style="swatchStyle('error')" v-on="on" />
            </template>
            <v-card>
              <v-card-text class="pa-0">
                <v-color-picker
                  v-model="color.error"
                  dot-size="25"
                  hide-inputs
                  hide-mode-switch
                  swatches-max-height="200"
                ></v-color-picker>
              </v-card-text>
            </v-card>
          </v-menu>
        </template>
      </v-text-field>
    </v-col>
    <v-col cols="12" sm="12" md="12">
      <span>Color info</span>
      <v-text-field
        v-model="color.info"
        @change="setCustom"
        readonly
        hide-details
        solo
      >
        <template v-slot:append>
          <v-menu
            v-model="menu.info"
            top
            nudge-bottom="105"
            nudge-left="16"
            :close-on-content-click="false"
          >
            <template v-slot:activator="{ on }">
              <div :style="swatchStyle('info')" v-on="on" />
            </template>
            <v-card>
              <v-card-text class="pa-0">
                <v-color-picker
                  v-model="color.info"
                  dot-size="25"
                  hide-inputs
                  hide-mode-switch
                  swatches-max-height="200"
                ></v-color-picker>
              </v-card-text>
            </v-card>
          </v-menu>
        </template>
      </v-text-field>
    </v-col>
    <v-col cols="12" sm="12" md="12">
      <span>Color sucess</span>
      <v-text-field
        v-model="color.success"
        @change="setCustom"
        readonly
        hide-details
        solo
      >
        <template v-slot:append>
          <v-menu
            v-model="menu.success"
            top
            nudge-bottom="105"
            nudge-left="16"
            :close-on-content-click="false"
          >
            <template v-slot:activator="{ on }">
              <div :style="swatchStyle('success')" v-on="on" />
            </template>
            <v-card>
              <v-card-text class="pa-0">
                <v-color-picker
                  v-model="color.success"
                  dot-size="25"
                  hide-inputs
                  hide-mode-switch
                  swatches-max-height="200"
                ></v-color-picker>
              </v-card-text>
            </v-card>
          </v-menu>
        </template>
      </v-text-field>
    </v-col>
    <v-col cols="12" sm="12" md="12">
      <span>Color warning</span>
      <v-text-field
        v-model="color.warning"
        @change="setCustom"
        readonly
        hide-details
        solo
      >
        <template v-slot:append>
          <v-menu
            v-model="menu.warning"
            top
            nudge-bottom="105"
            nudge-left="16"
            :close-on-content-click="false"
          >
            <template v-slot:activator="{ on }">
              <div :style="swatchStyle('warning')" v-on="on" />
            </template>
            <v-card>
              <v-card-text class="pa-0">
                <v-color-picker
                  v-model="color.warning"
                  dot-size="25"
                  hide-inputs
                  hide-mode-switch
                  swatches-max-height="200"
                ></v-color-picker>
              </v-card-text>
            </v-card>
          </v-menu>
        </template>
      </v-text-field>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance } from 'vue';
import store from '../../store';
import { getVuetify } from '../Composables/composableTheme';

const CustomizeTheme = defineComponent({
  name: 'customize-theme',
  setup() {
    let vuetify = getVuetify(getCurrentInstance);
    let defaultColor = {};
    const customThemeName = 'form';
    const selectFont = [
      'Roboto',
      'Comic Neue',
      'Fira Code',
      'Inconsolata',
      'Oxygen',
      'Tapestry',
      'Ubuntu',
      'Water Brush',
    ];
    const menu = {
      primary: false,
      secondary: false,
      accent: false,
      error: false,
      info: false,
      success: false,
      warning: false,
    };
    const color = computed<string>(() => {
      return store.getters['themes/getThemeSelected'].light;
    });
    const fontFamily = computed<string>({
      get(): string {
        return store.getters['themes/getFontFamilyTheme'];
      },
      set(value: string): void {
        updateTheme(value);
      },
    });
    const updateDefaultColor = (store): void => {
      return Object.assign(store.getters['themes/getThemeSelected'].light);
    };
    const swatchStyle = (type: string): Record<string, unknown> => {
      return {
        backgroundColor: color.value[type],
        cursor: 'pointer',
        height: '21px',
        width: '21px',
        borderRadius: menu[type] ? '50%' : '4px',
        transition: 'border-radius 200ms ease-in-out',
      };
    };
    const setCustom = (): void => {
      const name = customThemeName;
      const light = color.value;
      Object.keys(light).forEach((i) => {
        vuetify.theme.themes.light[i] = light[i];
      });
      vuetify.theme.currentTheme.name = name;
      updateTheme('');
    };
    const updateTheme = (font: string): void => {
      let fontFamilySelect: string =
        font !== '' ? font : Object.assign(fontFamily).value;
      store.dispatch('themes/setTheme', {
        name: customThemeName,
        light: Object.assign(color).value,
        fontFamily: fontFamilySelect,
      });
      vuetify.theme.currentTheme.name = customThemeName;
    };

    return {
      customThemeName,
      menu,
      selectFont,
      color,
      fontFamily,
      defaultColor,
      swatchStyle,
      updateDefaultColor,
      setCustom,
      updateTheme,
    };
  },
});
export default CustomizeTheme;
</script>
