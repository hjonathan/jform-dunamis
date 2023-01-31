<template>
  <div :class="styles.label.root">
    <span class="title">{{ control.content }}</span>
    <v-tooltip v-if="control.hint && control.hint != ''" slot="append" top>
      <template v-slot:activator="{ on }">
        <v-icon v-on="on" color="primary" small> mdi-information </v-icon>
      </template>
      <span class="">{{ control.hint }}</span>
    </v-tooltip>
  </div>
</template>

<script lang="ts">
//@ts-nocheck
import {
  JsonFormsRendererRegistryEntry,
  Layout,
  rankWith,
  uiTypeIs,
} from '@jsonforms/core';
import { defineComponent } from 'vue';
import {
  DispatchRenderer,
  rendererProps,
  RendererProps,
} from '@jsonforms/vue2';
import { VLabel, VTooltip, VIcon } from 'vuetify/lib';
import { useLabelControlComposition } from './LabelControlComp';

const SubtitleControlRenderer = defineComponent({
  name: 'subtitle-control-renderer',
  components: {
    DispatchRenderer,
    VLabel,
    VTooltip,
    VIcon,
  },
  props: {
    ...rendererProps<Layout>(),
  },
  setup(props: RendererProps<Layout>) {
    return useLabelControlComposition(props);
  },
});

export default SubtitleControlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: SubtitleControlRenderer,
  tester: rankWith(5, uiTypeIs('Subtitle')),
};
</script>
