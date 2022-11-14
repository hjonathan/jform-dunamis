<template>
  <div>
    <v-text-field :id="id" :value="value"> </v-text-field>
  </div>
</template>

<script lang="ts">
import {
  JsonFormsRendererRegistryEntry,
  rankWith,
  uiTypeIs,
} from '@jsonforms/core';
import { defineComponent, ref } from '@vue/composition-api';
import { VTextField } from 'vuetify/lib';

const DtTextRenderer = defineComponent({
  name: 'dt-text-renderer',
  components: {
    VTextField,
  },
  props: {},
  setup(props: any) {
    const id = ref('id');
    const value = ref('value');
    return { id, value };
  },
});

export default DtTextRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: DtTextRenderer,
  tester: rankWith(3, uiTypeIs('Text')),
};
</script>
