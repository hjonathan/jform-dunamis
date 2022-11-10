<template>
  <div>
    <v-text-field :id="id" :value="value"> </v-text-field>
  </div>
</template>

<script lang="ts">
import {
  ControlElement,
  JsonFormsRendererRegistryEntry,
  rankWith,
  uiTypeIs,
} from '@jsonforms/core';
import { defineComponent, ref } from '../vue';
import {
  rendererProps,
  useJsonFormsControl,
  RendererProps,
} from '@jsonforms/vue2';

import { VTextField } from 'vuetify/lib';

const GridTextControlRenderer = defineComponent({
  name: 'grid-text-control-renderer',
  components: {
    VTextField,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    const id = ref('id');
    const value = ref('value');
    return { id, value };
  },
});

export default GridTextControlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: GridTextControlRenderer,
  tester: rankWith(3, uiTypeIs('GridText')),
};
</script>
