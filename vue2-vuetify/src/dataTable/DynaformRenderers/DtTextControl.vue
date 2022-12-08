<template>
  <div>
    <v-text-field :id="id" :value="value"> </v-text-field>
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
import { VTextField } from 'vuetify/lib';
import { useDtTextControlComposition } from './DtTextControlComp';

const DtTextControl = defineComponent({
  name: 'dt-text-control',
  components: {
    VTextField,
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
    let a = useDtTextControlComposition(props);
    return a;
  },
});

export default DtTextControl;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: DtTextControl,
  tester: rankWith(3, uiTypeIs('Text')),
};
</script>
