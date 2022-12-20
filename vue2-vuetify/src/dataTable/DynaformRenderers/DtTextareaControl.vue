<template>
  <v-textarea
    :aria-label="control.ariaLabel"
    :id="control.id + '-input'"
    :class="styles.control.input"
    :placeholder="control.placeholder"
    :error-messages="control.errors"
    :value="control.data"
    :rules="control.validation"
    :tabindex="control.tabindex"
    :readonly="control.readonly"
    :rows="control.rows"
    @change="onChange"
  >
    <v-tooltip v-if="control.hint && control.hint != ''" slot="append" top>
      <template v-slot:activator="{ on }">
        <v-icon v-on="on" color="primary" small> mdi-information </v-icon>
      </template>
      <span class="">{{ control.hint }}</span>
    </v-tooltip>
  </v-textarea>
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
import { VTextarea, VTooltip, VIcon } from 'vuetify/lib';
import { useDtTextareaControlComposition } from './DtTextareaControlComp';

const DtTextareaControl = defineComponent({
  name: 'dt-text-control',
  components: {
    VTextarea,
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
    return useDtTextareaControlComposition(props);
  },
});

export default DtTextareaControl;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: DtTextareaControl,
  tester: rankWith(1, uiTypeIs('TextArea')),
  group: 'dataTable',
};
</script>
