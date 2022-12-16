<template>
  <div>
    <v-text-field
      :aria-label="control.ariaLabel"
      :id="control.id + '-input'"
      :class="styles.control.input"
      :placeholder="control.placeholder"
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
  </div>
</template>
<script lang="ts">
//@ts-nocheck
import {
  ControlElement,
  JsonFormsRendererRegistryEntry,
  rankWith,
  uiTypeIs,
} from '@jsonforms/core';
import { rendererProps } from '@jsonforms/vue2';
import { defineComponent } from 'vue';
import {
  VTextField,
  VTooltip,
  VIcon,
  VMenu,
  VDatePicker,
  VTimePicker,
} from 'vuetify/lib';
import { useDtDatetimeControlComposition } from './DtDatetimeControlComp';

const DtDatetimeControl = defineComponent({
  name: 'dt-datetime-control',
  components: {
    VTextField,
    VTooltip,
    VIcon,
    VMenu,
    VDatePicker,
    VTimePicker,
  },
  props: {
    parent: { ...rendererProps<ControlElement>() },
    row: {
      expand: {
        type: Function,
      },
      index: { type: Number },
      item: Object,
      isExpanded: { type: Boolean },
      isMobile: { type: Boolean },
      isSelected: { type: Boolean },
      select: { type: Function },
      headers: Array,
    },
    cell: {
      header: { type: Object },
      value: { type: String },
    },
  },
  setup(props: any) {
    return useDtDatetimeControlComposition(props);
  },
});

export default DtDatetimeControl;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: DtDatetimeControl,
  tester: rankWith(1, uiTypeIs('Datetime')),
  group: 'dataTable',
};
</script>
