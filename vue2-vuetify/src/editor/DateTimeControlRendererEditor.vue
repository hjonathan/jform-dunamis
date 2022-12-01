<template>
  <CustomControlWrapper v-bind="{ ...control }" :styles="styles">
    <v-text-field
      :aria-label="control.ariaLabel"
      :id="control.id + '-input'"
      :class="styles.control.input"
      :placeholder="control.placeholder"
      :persistent-placeholder="control.labelOrientation == 'inherit'"
      :label="control.labelOrientation == 'inherit' ? control.label : null"
      :hint="control.hint"
      :error-messages="control.errors"
      :value="control.data"
      :clearable="hover"
      :rules="control.validation"
      :tabindex="tabindex"
      append-icon="mdi-calendar"
      readonly
      @click.prevent.stop="show"
    >
      <v-icon slot="append" color="primary" small> mdi-calendar </v-icon>
      <v-tooltip v-if="control.hint && control.hint != ''" slot="append" top>
        <template v-slot:activator="{ on }">
          <v-icon v-on="on" color="primary" small> mdi-information </v-icon>
        </template>
        <span class="">{{ control.hint }}</span>
      </v-tooltip></v-text-field
    >
    <v-menu
      v-model="showPicker"
      :close-on-content-click="false"
      transition="scale-transition"
      :position-x="x"
      :position-y="y"
      absolute
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <v-date-picker
        v-model="date"
        @change="onChange"
        v-if="control.dataType === 'date' || control.dataType === 'date-time'"
        :max="control.maxDate"
        :min="control.minDate"
        scrollable
      >
      </v-date-picker>
      <v-time-picker
        @change="onChange"
        v-model="time"
        use-seconds
        v-if="control.dataType === 'time' || control.dataType === 'date-time'"
      ></v-time-picker>
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
  VTimePicker,
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
    VTimePicker,
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
