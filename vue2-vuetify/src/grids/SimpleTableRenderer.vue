<template>
  <v-container justify-space-around align-content-center>
    <v-row no-gutters>
      <v-simple-table>
        <thead v-if="useJsonForm.layout.value.schema.type === 'object'">
          <tr>
            <th scope="col"></th>
            <th
              v-for="(element, index) in uischema.elements"
              :key="`${useJsonForm.layout.value.path}-header-${index}`"
              scope="col"
            >
              {{ title(element.scope) }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, i) in useJsonForm.layout.value.data"
            :key="`${useJsonForm.layout.value.path.path}-${i}`"
            :class="useJsonForm.styles.arrayList.item"
          >
            <td>
              {{ i }}
            </td>
            <td v-for="(element, index) in uischema.elements" :key="index">
              <dispatch-renderer
                :key="element.uuid"
                :schema="useJsonForm.layout.value.schema"
                :uischema="element"
                :path="useJsonForm.layout.value.path"
                :enabled="useJsonForm.layout.value.enabled"
                :renderers="useJsonForm.layout.value.renderers"
                :cells="useJsonForm.layout.value.cells"
              />
            </td>
            <td
              :class="
                useJsonForm.appliedOptions.showSortButtons
                  ? 'fixed-cell'
                  : 'fixed-cell-small'
              "
            >
              <v-tooltip bottom>
                <template v-slot:activator="{ on: onTooltip }">
                  <v-btn
                    v-on="onTooltip"
                    fab
                    text
                    elevation="0"
                    small
                    aria-label="Delete"
                    :class="useJsonForm.styles.arrayList.itemDelete"
                    @click.native="removeItemsClick($event, [i])"
                  >
                    <v-icon class="notranslate">mdi-delete</v-icon>
                  </v-btn>
                </template>
                Delete
              </v-tooltip>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-row>
  </v-container>
</template>
<script lang="ts">
//@ts-nocheck
import {
  uiTypeIs,
  JsonFormsRendererRegistryEntry,
  Layout,
  rankWith,
  JsonSchema,
} from '@jsonforms/core';
import { defineComponent } from 'vue';
import {
  DispatchRenderer,
  rendererProps,
  useJsonFormsLayout,
  RendererProps,
} from '@jsonforms/vue2';
import { useVuetifyLayout } from '../util';
import {
  VContainer,
  VRow,
  VCol,
  VSimpleTable,
  VTooltip,
  VBtn,
  VIcon,
} from 'vuetify/lib';
import _ from 'lodash';

const droppableRenderer = defineComponent({
  name: 'simple-table-renderer',
  components: {
    DispatchRenderer,
    VContainer,
    VRow,
    VCol,
    VSimpleTable,
    VTooltip,
    VBtn,
    VIcon,
  },

  props: {
    ...rendererProps<Layout>(),
  },
  setup(props: RendererProps<Layout>) {
    return {
      useJsonForm: useVuetifyLayout(useJsonFormsLayout(props)),
      enabledDrag: true,
      dragging: false,
    };
  },

  methods: {
    /**
     * Update Index in uischema
     */
    updateItemIndex(item: any) {
      const auxElement = this.uischema.elements.splice(item.oldIndex, 1);
      this.uischema.elements.splice(item.newIndex, 0, auxElement[0]);
    },
    getValidColumnProps(scopedSchema: JsonSchema) {
      if (
        scopedSchema.type === 'object' &&
        typeof scopedSchema.properties === 'object'
      ) {
        return Object.keys(scopedSchema.properties).filter(
          (prop) => scopedSchema.properties![prop].type !== 'array'
        );
      }
      // primitives
      return [''];
    },
    title(prop: string) {
      return prop.split('/').pop();
    },
    removeItemsClick(event: Event): void {
      event.stopPropagation();
    },
  },
});

export default droppableRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: droppableRenderer,
  tester: rankWith(4, uiTypeIs('TableLayout')),
};
</script>
<style scoped>
.dragArea {
  height: 80px;
}

.fixed-cell {
  width: 150px;
  height: 50px;
  padding-left: 0 !important;
  padding-right: 0 !important;
  text-align: center;
}

.fixed-cell-small {
  width: 50px;
  height: 50px;
  padding-left: 0 !important;
  padding-right: 0 !important;
  text-align: center;
}

.array-container tbody tr td {
  border-bottom: none !important;
}

.array-container tbody tr td .container {
  padding: 0;
  margin: 0;
}
</style>
