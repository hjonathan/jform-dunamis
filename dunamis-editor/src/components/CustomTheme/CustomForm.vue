<template>
  <v-row>
    <v-col cols="6">
      <v-text-field
        v-model="margins.top"
        label="Margin Top"
        :rules="[rules.maxValue]"
        v-mask="inputMask"
        placeholder="0"
        persistent-placeholder
        @change="onMargins"
      ></v-text-field>
    </v-col>
    <v-col cols="6">
      <v-text-field
        v-model="margins.right"
        label="Margin Right"
        :rules="[rules.maxValue]"
        v-mask="inputMask"
        placeholder="0"
        persistent-placeholder
        @change="onMargins"
      ></v-text-field>
    </v-col>
    <v-col cols="6">
      <v-text-field
        v-model="margins.bottom"
        label="Margin Bottom"
        :rules="[rules.maxValue]"
        v-mask="inputMask"
        placeholder="0"
        persistent-placeholder
        @change="onMargins"
      ></v-text-field>
    </v-col>
    <v-col cols="6">
      <v-text-field
        v-model="margins.left"
        label="Margin Left"
        :rules="[rules.maxValue]"
        v-mask="inputMask"
        placeholder="0"
        persistent-placeholder
        @change="onMargins"
      ></v-text-field>
    </v-col>
    <v-col cols="12"><v-divider></v-divider></v-col>
    <v-col cols="6">
      <v-text-field
        v-model="paddings.top"
        label="Padding Top"
        placeholder="0"
        persistent-placeholder
        :rules="[rules.maxValue]"
        v-mask="inputMask"
        @change="onPaddings"
      ></v-text-field>
    </v-col>
    <v-col cols="6">
      <v-text-field
        v-model="paddings.right"
        label="Padding Right"
        placeholder="0"
        persistent-placeholder
        :rules="[rules.maxValue]"
        v-mask="inputMask"
        @change="onPaddings"
      ></v-text-field>
    </v-col>
    <v-col cols="6">
      <v-text-field
        v-model="paddings.bottom"
        label="Padding Bottom"
        placeholder="0"
        persistent-placeholder
        :rules="[rules.maxValue]"
        v-mask="inputMask"
        @change="onPaddings"
      ></v-text-field>
    </v-col>
    <v-col cols="6">
      <v-text-field
        v-model="paddings.left"
        label="Padding Left"
        placeholder="0"
        persistent-placeholder
        :rules="[rules.maxValue]"
        v-mask="inputMask"
        @change="onPaddings"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-text-field
        v-model="backgroundImage"
        label="Background image"
        placeholder="URL image"
        persistent-placeholder
      >
      </v-text-field>
    </v-col>
    <v-col cols="12">
      <v-text-field
        v-model="colorText"
        readonly
        label="Form background color"
        persistent-placeholder
        @blur="updateBackgroudColor"
      >
        <template v-slot:append>
          <v-menu
            v-model="menu"
            top
            nudge-bottom="105"
            nudge-left="16"
            :close-on-content-click="false"
          >
            <template v-slot:activator="{ on }">
              <div :style="swatchStyle()" v-on="on" />
            </template>
            <v-card>
              <v-card-text class="pa-0">
                <v-color-picker
                  @mousemove.stop
                  v-model="color"
                  dot-size="25"
                  hide-inputs
                  hide-mode-switch
                  swatches-max-height="200"
                  @input="changeColor"
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
import store from '../../store';
import { computed, defineComponent, ref } from 'vue';
import { mask } from '@titou10/v-mask';

const CustomForm = defineComponent({
  name: 'custom-form',
  directives: {
    mask,
  },
  setup() {
    let maxPixel = 400,
      menu = false,
      color = '#FFFFFF00',
      colorText = ref('');

    const paddings = computed(() => {
      return store.getters['themes/getMargins'];
    });
    const margins = computed(() => {
      return store.getters['themes/getPaddings'];
    });
    const backgroundImage = computed({
      get(): string {
        return store.getters['themes/getBackground'];
      },
      set(val: string): void {
        setBackground(val);
      },
    });
    const backgroundColor = computed({
      get(): string {
        color = store.getters['themes/getBackgroundColor'];
        colorText.value = color;
        return color;
      },
      set(newColor: string): void {
        store.dispatch('themes/updateBackgroundColor', newColor);
      },
    });

    const changeColor = (val: string) => {
      colorText.value = val;
    };
    const updateBackgroudColor = (val: any) => {
      setBackgroundColor(val.currentTarget.value);
    };
    const onMargins = (val: number) => {
      if (val <= maxPixel) {
        store.dispatch('themes/updatePaddings', {
          bottom: margins.value.bottom || 0,
          left: margins.value.left || 0,
          right: margins.value.right || 0,
          top: margins.value.top || 0,
        });
      }
    };
    const onPaddings = (val: number) => {
      if (val <= maxPixel) {
        store.dispatch('themes/updateMargins', {
          left: paddings.value.left || 0,
          top: paddings.value.top || 0,
          bottom: paddings.value.bottom || 0,
          right: paddings.value.right || 0,
        });
      }
    };
    const swatchStyle = (): Record<string, unknown> => {
      return {
        backgroundColor: backgroundColor.value,
        cursor: 'pointer',
        height: '21px',
        width: '21px',
        border: '1px solid',
        borderRadius: menu ? '50%' : '4px',
        transition: 'border-radius 200ms ease-in-out',
      };
    };
    const setBackgroundColor = (color: string): void => {
      backgroundColor.value = color;
    };
    const setBackground = (img: string) => {
      if (img !== '') {
        store.dispatch('themes/updateBackground', img);
      }
    };

    return {
      maxPixel,
      paddings,
      margins,
      backgroundColor,
      backgroundImage,
      rules: {
        maxValue: (val) => {
          return val <= maxPixel || 'Max margin is 400';
        },
      },
      errors: '',
      inputMask: '###',
      color,
      colorText,
      menu: false,
      onMargins,
      onPaddings,
      swatchStyle,
      setBackgroundColor,
      changeColor,
      updateBackgroudColor,
      setBackground,
    };
  },
  methods: {},
});

export default CustomForm;
</script>
