<template>
  <v-card v-if="layout.visible" elevation="2">
    <v-card-text>
      <component v-bind:is="determinedRenderer" v-bind="layout"></component>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
//@ts-nocheck
import {
  uiTypeIs,
  JsonFormsRendererRegistryEntry,
  Layout,
  rankWith,
} from '@jsonforms/core';
import { defineComponent } from 'vue';
import {
  rendererProps,
  useJsonFormsLayout,
  RendererProps,
  UnknownRenderer,
} from '@jsonforms/vue2';
import { useVuetifyLayout } from '@jsonforms/vue2-vuetify';
import { VContainer, VRow, VCol } from 'vuetify/lib';
import EditorElement from '../EditorElement.vue';
import { entry as DroppableVerticalLayoutRenderer } from './DroppableVerticalLayoutRegistration.vue';
const droppableRenderer = defineComponent({
  name: 'droppable-category-renderer',
  components: {
    VContainer,
    VRow,
    VCol,
    EditorElement,
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

export default droppableRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: droppableRenderer,
  tester: rankWith(45, uiTypeIs('Category')),
};
</script>
