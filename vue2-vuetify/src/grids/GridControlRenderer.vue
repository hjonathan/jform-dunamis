<template>
  <v-card v-if="control.visible" :class="styles.arrayList.root" elevation="0">
    <v-card-title>
      <v-toolbar flat :class="styles.arrayList.toolbar">
        <v-toolbar-title :class="styles.arrayList.label">{{
          computedLabel
        }}</v-toolbar-title>
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
              :disabled="
                !control.enabled ||
                (appliedOptions.restrict &&
                  arraySchema !== undefined &&
                  arraySchema.maxItems !== undefined &&
                  control.data.length >= arraySchema.maxItems)
              "
              @click="addButtonClick"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          {{ `Add to ${control.label}` }}
        </v-tooltip>
      </v-toolbar>
    </v-card-title>
    <v-card-text>
      <v-container justify-space-around align-content-center>
        <v-row justify="center">
          <v-simple-table class="array-container flex">
            <thead v-if="control.schema.type === 'object'">
              <tr>
                <th
                  v-if="control.enabled"
                  :class="
                    appliedOptions.showSortButtons
                      ? 'fixed-cell'
                      : 'fixed-cell-small'
                  "
                  scope="col"
                ></th>
                <th
                  v-for="(column, index) in control.uischema.options.columns"
                  :key="`${control.path}-header-${index}`"
                  scope="col"
                >
                  {{ title(column.scope.split('/').pop()) }}
                </th>
                <th
                  v-if="control.enabled"
                  :class="
                    appliedOptions.showSortButtons
                      ? 'fixed-cell'
                      : 'fixed-cell-small'
                  "
                  scope="col"
                ></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(element, index) in control.data"
                :key="`${control.path}-${index}`"
                :class="styles.arrayList.item"
              >
                <td>
                  {{ index }}
                </td>
                <td
                  v-for="(column, colIndex) in control.uischema.options.columns"
                  :key="
                    composePaths(
                      composePaths(control.path, `${index}`),
                      colIndex
                    )
                  "
                >
                  <dispatch-renderer
                    :schema="control.schema"
                    :uischema="column"
                    :path="composePaths(control.path, `${index}`)"
                    :enabled="control.enabled"
                    :renderers="control.renderers"
                    :cells="control.cells"
                  />
                </td>
                <td
                  v-if="control.enabled"
                  :class="
                    appliedOptions.showSortButtons
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
                        :class="styles.arrayList.itemDelete"
                        :disabled="
                          !control.enabled ||
                          (appliedOptions.restrict &&
                            arraySchema !== undefined &&
                            arraySchema.minItems !== undefined &&
                            control.data.length <= arraySchema.minItems)
                        "
                        @click.native="removeItemsClick($event, [index])"
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
          <div class="text-center">
            <v-pagination
              v-model="page"
              :length="10"
              prev-icon="mdi-menu-left"
              next-icon="mdi-menu-right"
            ></v-pagination>
          </div>
        </v-row>
      </v-container>
      <v-container v-if="noData" :class="styles.arrayList.noData">
        No data
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
//@ts-nocheck
import {
  JsonFormsRendererRegistryEntry,
  rankWith,
  composePaths,
  createDefaultValue,
  ControlElement,
  JsonSchema,
  Resolve,
  uiTypeIs,
} from '@jsonforms/core';
import startCase from 'lodash/startCase';
import { defineComponent } from '../vue';
import {
  DispatchCell,
  DispatchRenderer,
  rendererProps,
  useJsonFormsArrayControl,
  RendererProps,
} from '@jsonforms/vue2';
import { useVuetifyArrayControl } from '../util';
import {
  VCard,
  VCardTitle,
  VCardText,
  VRow,
  VCol,
  VContainer,
  VToolbar,
  VToolbarTitle,
  VTooltip,
  VIcon,
  VBtn,
  VAvatar,
  VSpacer,
  VSimpleTable,
  VPagination,
} from 'vuetify/lib';
import { ValidationIcon, ValidationBadge } from '../controls/components/index';

const controlRenderer = defineComponent({
  name: 'array-control-renderer',
  components: {
    DispatchCell,
    DispatchRenderer,
    VCard,
    VCardTitle,
    VCardText,
    VAvatar,
    VRow,
    VCol,
    VToolbar,
    VToolbarTitle,
    VTooltip,
    VIcon,
    VBtn,
    VSpacer,
    VContainer,
    ValidationIcon,
    ValidationBadge,
    VSimpleTable,
    VPagination,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    return {
      ...useVuetifyArrayControl(useJsonFormsArrayControl(props)),
      ...{
        page: 1,
      },
    };
  },
  computed: {
    arraySchema(): JsonSchema | undefined {
      return Resolve.schema(
        this.control.rootSchema,
        this.control.uischema.scope,
        this.control.rootSchema
      );
    },
    noData(): boolean {
      return !this.control.data || this.control.data.length === 0;
    },
  },

  methods: {
    composePaths,
    createDefaultValue,
    addButtonClick() {
      this.addItem(
        this.control.path,
        createDefaultValue(this.control.schema)
      )();
    },
    moveUpClick(event: Event, toMove: number): void {
      event.stopPropagation();
      this.moveUp?.(this.control.path, toMove)();
    },
    moveDownClick(event: Event, toMove: number): void {
      event.stopPropagation();
      this.moveDown?.(this.control.path, toMove)();
    },
    removeItemsClick(event: Event, toDelete: number[]): void {
      event.stopPropagation();
      this.removeItems?.(this.control.path, toDelete)();
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
      return this.control.schema.properties?.[prop]?.title ?? startCase(prop);
    },

    resolveUiSchema(propName: string) {
      return this.control.schema.properties
        ? this.controlWithoutLabel(`#/properties/${propName}`)
        : this.controlWithoutLabel('#');
    },
    controlWithoutLabel(scope: string): ControlElement {
      return { type: 'Control', scope: scope, label: false };
    },
  },
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(3, uiTypeIs('GridControl')),
};
</script>

<style scoped>
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
