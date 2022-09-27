<template>
  <v-card v-if="layout.visible" elevation="2">
    <v-card-title v-if="layout.uischema" :class="styles.group.label">
      {{ layout.uischema.label }}
    </v-card-title>
    <v-card-text :class="styles.group.item">
      <component v-bind:is="determinedRenderer" v-bind="layout"></component>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
//@ts-nocheck
import {
  JsonFormsRendererRegistryEntry,
  Layout,
  rankWith,
  and,
  isLayout,
  uiTypeIs,
} from '@jsonforms/core';
import { defineComponent } from '../../util/vue';
import {
  DispatchRenderer,
  rendererProps,
  useJsonFormsLayout,
  RendererProps,
  UnknownRenderer,
} from '@jsonforms/vue2';
import { useVuetifyLayout } from '@jsonforms/vue2-vuetify';
import { VCard, VCardTitle, VCardText } from 'vuetify/lib';
import { entry as DroppableVerticalLayoutRenderer } from './DroppableVerticalLayoutRegistration.vue';
const layoutRenderer = defineComponent({
  name: 'droppable-group-renderer',
  components: {
    DispatchRenderer,
    VCard,
    VCardTitle,
    VCardText,
  },
  props: {
    ...rendererProps<Layout>(),
  },
  computed: {
    determinedRenderer(): any {
      const renderer = DroppableVerticalLayoutRenderer;
      if (renderer === undefined) {
        return UnknownRenderer;
      } else {
        return renderer.renderer;
      }
    },
  },
  setup(props: RendererProps<Layout>) {
    return useVuetifyLayout(useJsonFormsLayout(props));
  },
});

export default layoutRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: layoutRenderer,
  tester: rankWith(45, and(isLayout, uiTypeIs('Group'))),
};
</script>
