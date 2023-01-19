<template>
  <v-label v-if="control.show" :class="styles.label.root">
    {{ control.content }}

    <v-tooltip v-if="control.hint && control.hint != ''" slot="append" top>
      <template v-slot:activator="{ on }">
        <v-icon v-on="on" color="primary" small> mdi-information </v-icon>
      </template>
      <span class="">{{ control.hint }}</span>
    </v-tooltip>
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
import { VLabel, VTooltip, VIcon } from 'vuetify/lib';

import { useLabelControlComposition } from './LabelControlComp';

const labelControlRenderer = defineComponent({
  name: 'label-control-renderer',
  components: {
    DispatchRenderer,
    VLabel,
    VTooltip,
    VIcon,
  },
  props: {
    ...rendererProps<Layout>(),
  },
  setup: (props: RendererProps<Layout>) => useLabelControlComposition(props),
});

export default labelControlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: labelControlRenderer,
  tester: rankWith(5, uiTypeIs('Label')),
};
</script>
