<template>
  <v-label :class="styles.label.root">
    {{ control.label }}
  </v-label>
</template>

<script lang="ts">
//@ts-nocheck
import {
  JsonFormsRendererRegistryEntry,
  Layout,
  rankWith,
  uiTypeIs,
} from '@jsonforms/core';
import { defineComponent } from '../vue';
import {
  DispatchRenderer,
  rendererProps,
  RendererProps,
} from '@jsonforms/vue2';
import { VLabel } from 'vuetify/lib';

import { useLabelControlComposition } from './LabelControlComp';

const labelControlRenderer = defineComponent({
  name: 'label-control-renderer',
  components: {
    DispatchRenderer,
    VLabel,
  },
  props: {
    ...rendererProps<Layout>(),
  },
  setup(props: RendererProps<Layout>) {
    return useLabelControlComposition(props);
  },
});

export default labelControlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: labelControlRenderer,
  tester: rankWith(3, uiTypeIs('Label')),
};
</script>
