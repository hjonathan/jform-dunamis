<template>
  <v-row>
    <v-col cols="6">
      <v-text-field
        v-model="marginTop"
        label="Margin Top"
        :rules="[rules.maxValue]"
        v-mask="inputMask"
        placeholder="0"
        persistent-placeholder
        @change="onChange"
      ></v-text-field>
    </v-col>
    <v-col cols="6">
      <v-text-field
        v-model="marginRight"
        label="Margin Right"
        :rules="[rules.maxValue]"
        v-mask="inputMask"
        placeholder="0"
        persistent-placeholder
        @change="onChange"
      ></v-text-field>
    </v-col>
    <v-col cols="6">
      <v-text-field
        v-model="marginBottom"
        label="Margin Bottom"
        :rules="[rules.maxValue]"
        v-mask="inputMask"
        placeholder="0"
        persistent-placeholder
        @change="onChange"
      ></v-text-field>
    </v-col>
    <v-col cols="6">
      <v-text-field
        v-model="marginLeft"
        label="Margin Left"
        :rules="[rules.maxValue]"
        v-mask="inputMask"
        placeholder="0"
        persistent-placeholder
        @change="onChange"
      ></v-text-field>
    </v-col>
    <v-col cols="12"><v-divider></v-divider></v-col>
    <v-col cols="6">
      <v-text-field
        v-model="paddingTop"
        label="Padding Top"
        placeholder="0"
        persistent-placeholder
        :rules="[rules.maxValue]"
        v-mask="inputMask"
        @change="margins"
      ></v-text-field>
    </v-col>
    <v-col cols="6">
      <v-text-field
        v-model="paddingRight"
        label="Padding Right"
        placeholder="0"
        persistent-placeholder
        :rules="[rules.maxValue]"
        v-mask="inputMask"
        @change="margins"
      ></v-text-field>
    </v-col>
    <v-col cols="6">
      <v-text-field
        v-model="paddingBottom"
        label="Padding Bottom"
        placeholder="0"
        persistent-placeholder
        :rules="[rules.maxValue]"
        v-mask="inputMask"
        @change="margins"
      ></v-text-field>
    </v-col>
    <v-col cols="6">
      <v-text-field
        v-model="paddingLeft"
        label="Padding Left"
        placeholder="0"
        persistent-placeholder
        :rules="[rules.maxValue]"
        v-mask="inputMask"
        @change="margins"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-text-field
        v-model="background"
        label="Background image"
        placeholder="URL image"
        persistent-placeholder
        @change="setBackground"
      >
      </v-text-field>
    </v-col>
    <v-col cols="12">
      <v-text-field
        v-model="color"
        readonly
        label="Form background color"
        persistent-placeholder
        @change="setBackgroundColor"
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
                  v-model="color"
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
//@ts-nocheck
import store from '../../store';
import { computed, defineComponent } from '@vue/composition-api';
import { mask } from '@titou10/v-mask';

const CustomForm = defineComponent({
  name: 'custom-form',
  directives: {
    mask,
  },
  setup() {
    let maxPixel = 400;
    const paddings = computed(() => {
      return store.getters['themes/getMargins'];
    });
    const margins = computed(() => {
      return store.getters['themes/getPaddings'];
    });
    const backgroundImage = computed(() => {
      return store.getters['themes/getBackground'];
    });
    const backgroundColor = computed(() => {
      return store.getters['themes/getBackgroundColor'];
    });
    return {
      maxPixel,
      background: backgroundImage.value.background,
      marginLeft: margins.value.left,
      marginTop: margins.value.top,
      marginBottom: margins.value.bottom,
      marginRight: margins.value.right,
      paddingLeft: paddings.value.left,
      paddingTop: paddings.value.top,
      paddingBottom: paddings.value.bottom,
      paddingRight: paddings.value.right,
      rules: {
        maxValue: (val) => {
          return val <= maxPixel || 'Max margin is 100';
        },
      },
      errors: '',
      inputMask: '###',
      color: backgroundColor.value.color || '#FFFFFFFF',
      menu: false,
    };
  },
  methods: {
    onChange(val: number) {
      if (val <= this.maxPixel) {
        store.dispatch('themes/updatePaddings', {
          left: this.marginLeft || 0,
          top: this.marginTop || 0,
          bottom: this.marginBottom || 0,
          right: this.marginRight || 0,
        });
      }
    },
    margins(val: number) {
      if (val <= this.maxPixel) {
        store.dispatch('themes/updateMargins', {
          left: this.paddingLeft || 0,
          top: this.paddingTop || 0,
          bottom: this.paddingBottom || 0,
          right: this.paddingRight || 0,
        });
      }
    },
    setBackground(img: string) {
      if (img !== '') {
        store.dispatch('themes/updateBackground', {
          background: this.background,
        });
      }
    },
    setBackgroundColor(color: string) {
      store.dispatch('themes/updateBackgroundColor', {
        color: this.color,
      });
    },
    swatchStyle(): Record<string, unknown> {
      const { color, menu } = this;
      return {
        backgroundColor: color,
        cursor: 'pointer',
        height: '21px',
        width: '21px',
        border: '1px solid',
        borderRadius: menu ? '50%' : '4px',
        transition: 'border-radius 200ms ease-in-out',
      };
    },
  },
});

export default CustomForm;
</script>
