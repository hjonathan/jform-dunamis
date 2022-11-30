<template>
  <CustomControlWrapper v-bind="{ ...control }" :styles="styles">
    <v-menu
      ref="menu"
      v-model="control.menu"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          :id="control.id + '-input'"
          :class="styles.control.input"
          :placeholder="control.placeholder"
          :persistent-placeholder="control.labelOrientation == 'inherit'"
          :label="control.labelOrientation == 'inherit' ? control.label : null"
          :hint="control.hint"
          :rules="control.validation"
          append-icon="mdi-calendar"
          readonly
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker> </v-date-picker>
      <!-- <v-time-picker
        v-model="time"
        v-if="inputFormat === 'time' || inputFormat === 'date-time'"
        @input="inputFormat !== 'date-time' ? (menu = false) : (menu = true)"
      ></v-time-picker> -->
    </v-menu>
  </CustomControlWrapper>
</template>

<script lang="ts">
//@ts-nocheck
import {
  ControlElement,
  JsonFormsRendererRegistryEntry,
  rankWith,
  uiTypeIs,
} from '@jsonforms/core';
import { defineComponent } from 'vue';
import { rendererProps, RendererProps } from '@jsonforms/vue2';
import {
  VHover,
  VTextField,
  VIcon,
  VTooltip,
  VMenu,
  VDatePicker,
} from 'vuetify/lib';
import { DisabledIconFocus } from '../controls/directives';
import CustomControlWrapper from '../controls/CustomControlWrapper.vue';

import { useDatetimeControlComposition } from './DatetimeControlComp';

const DatetimeControlRenderer = defineComponent({
  name: 'datetime-control-renderer',
  components: {
    VHover,
    VMenu,
    VIcon,
    VTooltip,
    VDatePicker,
    VTextField,
    CustomControlWrapper,
  },
  directives: {
    DisabledIconFocus,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    const vuetifyControl = useDatetimeControlComposition(props);
    // @ts-ignore:
    return vuetifyControl;
  },
});

export default DatetimeControlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: DatetimeControlRenderer,
  tester: rankWith(3, uiTypeIs('Datetime')),
};
</script>
