<template>
  <v-radio-group
    :id="control.id + '-input'"
    :class="styles.control.input"
    :placeholder="control.placeholder"
    :hint="control.hint"
    :error-messages="control.errors"
  >
    <v-checkbox
      v-for="o in control.options"
      multiple
      v-model="control.data"
      :key="o.value"
      :label="o.label"
      :value="o.value"
      @change="onChange"
      dense
      :rules="control.validation"
      :hide-details="true"
      :readonly="control.readonly"
    >
    </v-checkbox>

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
import { VCheckbox, VRadioGroup, VTooltip, VIcon } from 'vuetify/lib';
import { useDtCheckgroupControlComposition } from './DtCheckgroupControlComp';

const DtCheckgroupControl = defineComponent({
  name: 'dt-checkboxgroup-control',
  components: {
    VCheckbox,
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
    return useDtCheckgroupControlComposition(props);
  },
});

export default DtCheckgroupControl;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: DtCheckgroupControl,
  tester: rankWith(1, uiTypeIs('CheckboxGroup')),
  group: 'dataTable',
};
</script>