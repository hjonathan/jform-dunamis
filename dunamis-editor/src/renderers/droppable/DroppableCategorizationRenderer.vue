<template>
  <v-card v-if="layout.visible" :class="styles.categorization.root">
    <v-tabs v-model="activeCategory" :vertical="layout.direction == 'row'">
      <v-tab
        v-for="(element, index) in visibleCategories"
        :key="`${layout.path}-${index}`"
        @click.stop.prevent
      >
        {{ element.label }}
      </v-tab>
      <v-btn @click="addTab">
        <v-icon large> mdi-tab-plus </v-icon>
      </v-btn>
    </v-tabs>
    <v-tabs-items v-model="activeCategory" v-if="visibleCategories.length > 0">
      <v-tab-item
        v-for="(element, index) in visibleCategories"
        :key="`${layout.path}-${index}`"
      >
        <dispatch-renderer
          :key="element.uuid"
          :schema="layout.schema"
          :uischema="element"
          :path="layout.path"
          :enabled="layout.enabled"
          :renderers="customRenderers"
          :cells="layout.cells"
        />
      </v-tab-item>
    </v-tabs-items>
    <span v-else>
      No Category. Use
      <v-icon large> mdi-tab-plus </v-icon>
      to add a new tab.
    </span>
  </v-card>
</template>

<script lang="ts">
//@ts-nocheck
import {
  JsonFormsRendererRegistryEntry,
  Layout,
  rankWith,
  and,
  uiTypeIs,
  Categorization,
  Category,
  Tester,
  isVisible,
  categorizationHasCategory,
} from '@jsonforms/core';
import { defineComponent, ref } from '../../util/vue';
import {
  DispatchRenderer,
  rendererProps,
  useJsonFormsLayout,
  RendererProps,
} from '@jsonforms/vue2';
import { useAjv, useVuetifyLayout } from '../util/composition';
import { VCard, VTabs, VTab, VTabsItems, VTabItem } from 'vuetify/lib';
import { createCategory } from '../../util/generators/uiSchema';
import { entry as DroppableElementRegistration } from './DroppableElement.vue';
const layoutRenderer = defineComponent({
  name: 'droppable-categorization-renderer',
  components: {
    DispatchRenderer,
    VCard,
    VTabs,
    VTab,
    VTabsItems,
    VTabItem,
  },
  props: {
    ...rendererProps<Layout>(),
  },
  setup(props: RendererProps<Layout>) {
    const { uischema } = props;
    const activeCategory = ref(0);
    const categories = ref(uischema.elements);
    const ajv = useAjv();

    return {
      ...useVuetifyLayout(useJsonFormsLayout(props)),
      activeCategory,
      ajv,
      categories,
    };
  },
  computed: {
    visibleCategories(): (Category | Categorization)[] {
      return (this.layout.uischema as Categorization).elements.filter(
        (category: Category | Categorization) =>
          isVisible(category, this.layout.data, this.layout.path, this.ajv)
      );
    },
    customRenderers(): Array<any> {
      return this.renderers;
    },
  },
  methods: {
    addTab(event) {
      const tab = createCategory('New Tab ' + (this.categories.length + 1));
      tab.parent = this.layout.uischema;
      this.categories.push(tab);
      this.setIndex(this.categories.length - 1, event);
    },
    setIndex(value: number, event?: any) {
      event?.stopPropagation();
    },
  },
});

export default layoutRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: layoutRenderer,
  tester: rankWith(45, uiTypeIs('Categorization')),
};
</script>
