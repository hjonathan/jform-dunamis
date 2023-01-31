<template>
  <v-autocomplete
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
  </v-autocomplete>
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
import { VAutocomplete, VTooltip, VIcon } from 'vuetify/lib';
import { useDtSuggestControlComposition } from './DtSuggestControlComp';

const DtSuggestControl = defineComponent({
  name: 'dt-suggest-control',
  components: {
    VAutocomplete,
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
    return useDtSuggestControlComposition(props);
  },
});

export default DtSuggestControl;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: DtSuggestControl,
  tester: rankWith(1, uiTypeIs('Suggest')),
  group: 'dataTable',
};
</script>