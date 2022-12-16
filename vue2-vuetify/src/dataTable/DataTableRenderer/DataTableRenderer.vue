<!-- eslint-disable vue/require-v-for-key -->
<template>
  <v-card>
    <v-card-text>
      <v-data-table :headers="cHeaders" :items="control.data">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>{{ cLabel }}</v-toolbar-title>
            <!-- <validation-icon
              v-if="control.childErrors.length > 0"
              :errors="control.childErrors"
            /> -->
            <v-spacer></v-spacer>
            <v-btn color="primary" dark class="mb-2" @click="onClickNewRow">
              New Item
            </v-btn>
          </v-toolbar>
        </template>
        <template v-slot:item="props">
          <DtRowRenderer
            v-bind="{ parent: $props, row: props }"
            @onDeleteRow="onDeleteRow"
          >
          </DtRowRenderer>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
//@ts-nocheck
import {
  JsonFormsRendererRegistryEntry,
  rankWith,
  ControlElement,
  uiTypeIs,
} from '@jsonforms/core';
import { defineComponent } from 'vue';
import {
  DispatchRenderer,
  rendererProps,
  RendererProps,
  JsonForms,
} from '@jsonforms/vue2';
import {
  VCard,
  VCardTitle,
  VCardText,
  VCardActions,
  VRow,
  VCol,
  VContainer,
  VDataTable,
  VToolbar,
  VToolbarTitle,
  VDialog,
  VSpacer,
  VBtn,
  VDivider,
  VIcon,
} from 'vuetify/lib';

import { useDataTableComposition } from './DataTableComp';
import DtRowRenderer from './DTRowRenderer.vue';

const controlRenderer = defineComponent({
  name: 'data-table-in-renderer',
  components: {
    DtRowRenderer,
    DispatchRenderer,
    VCard,
    VCardTitle,
    VCardText,
    VCardActions,
    VRow,
    VCol,
    VContainer,
    VDataTable,
    VToolbar,
    VToolbarTitle,
    VDialog,
    VSpacer,
    VBtn,
    VDivider,
    JsonForms,
    VIcon,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    return useDataTableComposition(props);
  },
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(6, uiTypeIs('DataTable')),
};
</script>

<style scoped></style>
