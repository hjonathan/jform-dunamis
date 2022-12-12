<template>
  <div>
    <v-textarea :id="id" :value="value"> </v-textarea>
  </div>
</template>

<script lang="ts">
//@ts-nocheck
import {
  JsonFormsRendererRegistryEntry,
  rankWith,
  uiTypeIs,
} from '@jsonforms/core';
import { defineComponent, ref } from 'vue';
import { VTextarea } from 'vuetify/lib';

const DtTextAreaRenderer = defineComponent({
  name: 'dt-text-area-renderer',
  components: {
    VTextarea,
  },
  props: {},
  setup(props: any) {
    const id = ref('id');
    const value = ref('value');
    return { id, value };
  },
});

export default DtTextAreaRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: DtTextAreaRenderer,
  tester: rankWith(3, uiTypeIs('TextArea')),
  group: 'datatable',
};
</script>
