<template>
  <div :class="styles.label.root">
    <span class="display-1">{{ control.content }}</span>
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

const TitleControlRenderer = defineComponent({
  name: 'title-control-renderer',
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

export default TitleControlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: TitleControlRenderer,
  tester: rankWith(5, uiTypeIs('Title')),
};
</script>
