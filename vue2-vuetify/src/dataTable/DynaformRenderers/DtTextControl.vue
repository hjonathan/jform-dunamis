<template>
  <v-text-field
    :aria-label="control.ariaLabel"
    :id="control.id + '-input'"
    :class="styles.control.input"
    :placeholder="control.placeholder"
    :error-messages="control.errors"
    :value="control.data"
    :rules="control.validation"
    :tabindex="control.tabindex"
    :readonly="control.readonly"
    @change="onChange"
  >
    <v-tooltip v-if="control.hint && control.hint != ''" slot="append" top>
      <template v-slot:activator="{ on }">
        <v-icon v-on="on" color="primary" small> mdi-information </v-icon>
      </template>
      <span class="">{{ control.hint }}</span>
    </v-tooltip>
  </v-text-field>
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
import { VTextField, VTooltip, VIcon } from 'vuetify/lib';
import { useDtTextControlComposition } from './DtTextControlComp';

const DtTextControl = defineComponent({
  name: 'dt-text-control',
  components: {
    VTextField,
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
    return useDtTextControlComposition(props);
  },
});

export default DtTextControl;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: DtTextControl,
  tester: rankWith(1, uiTypeIs('Text')),
  group: 'dataTable',
};
</script>
