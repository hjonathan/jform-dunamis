<template>
  <v-select
    v-disabled-icon-focus
    :id="control.id + '-input'"
    :class="styles.control.input"
    :placeholder="control.placeholder"
    :hint="control.hint"
    :error-messages="control.errors"
    :required="control.required"
    :rules="control.validation"
    :tabindex="control.tabindex"
    :readonly="control.readonly"
    :aria-label="control.ariaLabel"
    :value="control.data"
    :items="control.options"
    item-text="label"
    item-value="value"
    @change="onChange"
  >
    <v-tooltip
      v-if="control.hint && control.hint != ''"
      slot="append-outer"
      top
    >
      <template v-slot:activator="{ on }">
        <v-icon v-on="on" color="primary" small> mdi-information </v-icon>
      </template>
      <span class="">{{ control.hint }}</span>
    </v-tooltip>
  </v-select>
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
import { VSelect, VTooltip, VIcon } from 'vuetify/lib';
import { useDtDropdownControlComposition } from './DtDropdownControlComp';

const DtDropdownControl = defineComponent({
  name: 'dt-dropdown-control',
  components: {
    VSelect,
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
    return useDtDropdownControlComposition(props);
  },
});

export default DtDropdownControl;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: DtDropdownControl,
  tester: rankWith(1, uiTypeIs('Dropdown')),
  group: 'dataTable',
};
</script>
