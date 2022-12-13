<template>
  <v-checkbox
    :id="control.id + '-input'"
    :aria-label="control.ariaLabel"
    :class="styles.control.input"
    :hint="control.hint"
    :rules="control.validation"
    :tabindex="control.tabindex"
    v-model="control.data"
    :readonly="control.readonly"
    @change="onChange"
  >
    <v-tooltip v-if="control.hint && control.hint != ''" slot="append" top>
      <template v-slot:activator="{ on }">
        <v-icon v-on="on" color="primary" small> mdi-information </v-icon>
      </template>
      <span class="">{{ control.hint }}</span>
    </v-tooltip>
  </v-checkbox>
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
import { VCheckbox, VTooltip, VIcon } from 'vuetify/lib';
import { useDtCheckboxControlComposition } from './DtCheckboxControlComp';

const DtCheckboxControl = defineComponent({
  name: 'dt-checkbox-control',
  components: {
    VCheckbox,
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
    return useDtCheckboxControlComposition(props);
  },
});

export default DtCheckboxControl;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: DtCheckboxControl,
  tester: rankWith(1, uiTypeIs('Checkbox')),
  group: 'dataTable',
};
</script>
