<template>
  <v-radio-group
    :id="control.id + '-input'"
    :class="styles.control.input"
    :placeholder="control.placeholder"
    :hint="control.hint"
    :error-messages="control.errors"
    :rules="control.validation"
    v-model="control.data"
  >
    <v-radio
      v-for="o in control.options"
      :key="o.value"
      :label="o.label"
      :value="o.value"
      :readonly="control.readonly"
      @change="onChange"
      dense
    ></v-radio>
    <v-tooltip v-if="control.hint && control.hint != ''" slot="append" top>
      <template v-slot:activator="{ on }">
        <v-icon v-on="on" color="primary" small> mdi-information </v-icon>
      </template>
      <span class="">{{ control.hint }}</span>
    </v-tooltip>
  </v-radio-group>
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
import { VRadio, VRadioGroup, VTooltip, VIcon } from 'vuetify/lib';
import { useDtRadiogroupControlComposition } from './DtRadiogroupControlComp';

const DtRadiogroupControl = defineComponent({
  name: 'dt-radiogroup-control',
  components: {
    VRadio,
    VRadioGroup,
    VTooltip,
    VIcon,
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
    return useDtRadiogroupControlComposition(props);
  },
});

export default DtRadiogroupControl;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: DtRadiogroupControl,
  tester: rankWith(1, uiTypeIs('RadioGroup')),
  group: 'dataTable',
};
</script>