<template>
  <v-card v-if="control.visible" :class="styles.arrayList.root" elevation="0">
    <v-card-title>
      <v-toolbar flat :class="styles.arrayList.toolbar">
        <v-toolbar-title :class="styles.arrayList.label">
          Grid Label: {{ computedLabel }}</v-toolbar-title
        >
        <validation-icon
          v-if="control.childErrors.length > 0"
          :errors="control.childErrors"
        />
        <v-spacer></v-spacer>

        <v-tooltip bottom>
          <template v-slot:activator="{ on: onTooltip }">
            <v-btn
              fab
              text
              elevation="0"
              small
              :aria-label="`Add to ${control.label}`"
              v-on="onTooltip"
              :class="styles.arrayList.addButton"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          {{ `Add to ${control.label}` }}
        </v-tooltip>
      </v-toolbar>
    </v-card-title>
    <v-card-text>
      <!-- <dispatch-renderer
        :schema="control.schema"
        :uischema="foundUISchema"
        :path="composePaths(control.path, 0)"
        :enabled="control.enabled"
        :renderers="control.renderers"
        :cells="control.cells"
      /> -->
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import {
  isObjectArray,
  JsonFormsRendererRegistryEntry,
  and,
  rankWith,
  composePaths,
  ControlElement,
  findUISchema,
  UISchemaElement,
  uiTypeIs,
} from '@jsonforms/core';
import { defineComponent } from '../../util/vue';
import {
  DispatchCell,
  DispatchRenderer,
  rendererProps,
  useJsonFormsArrayControl,
  RendererProps,
} from '@jsonforms/vue2';
import { useVuetifyArrayControl } from '@jsonforms/vue2-vuetify';
import {
  VCard,
  VCardTitle,
  VCardText,
  VToolbar,
  VToolbarTitle,
  VTooltip,
  VIcon,
  VBtn,
  VSpacer,
} from 'vuetify/lib';
import draggable from 'vuedraggable';

const controlRenderer = defineComponent({
  name: 'droppable-grid-control-renderer',
  components: {
    DispatchCell,
    DispatchRenderer,
    VCard,
    VCardTitle,
    VCardText,

    VToolbar,
    VToolbarTitle,
    VTooltip,
    VIcon,
    VBtn,
    VSpacer,
    draggable,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    return {
      ...useVuetifyArrayControl(useJsonFormsArrayControl(props)),
      ...{ enabledDrag: true, dragging: false },
    };
  },
  computed: {
    foundUISchema(): UISchemaElement {
      return findUISchema(
        this.control.uischemas,
        this.control.schema,
        this.control.uischema.scope,
        this.control.path,
        undefined,
        this.control.uischema
      );
    },
  },
  methods: {
    composePaths,
  },
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(5, and(isObjectArray, uiTypeIs('GridControl'))),
};
</script>
