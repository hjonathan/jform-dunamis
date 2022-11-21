<template>
  <v-card v-if="control.visible" :class="styles.arrayList.root" elevation="0">
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="control.data"
        :items-per-page="appliedOptions.perPage || 10"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>{{ computedLabel }}</v-toolbar-title>
            <validation-icon
              v-if="control.childErrors.length > 0"
              :errors="control.childErrors"
            />
            <v-spacer></v-spacer>

            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  New Item
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <json-forms
                    :data="subData"
                    :schema="control.schema"
                    :uischema="foundUISchema"
                    :renderers="control.renderers"
                    @change="onChange"
                  />
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="addItemClick">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.index="{ item }">
          {{ control.data.indexOf(item) + 1 }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
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
  composePaths,
  createDefaultValue,
  ControlElement,
  JsonSchema,
  uiTypeIs,
  findUISchema,
  UISchemaElement,
  mapStateToArrayControlProps,
} from '@jsonforms/core';
import startCase from 'lodash/startCase';
import { defineComponent } from '../vue';
import {
  DispatchCell,
  DispatchRenderer,
  rendererProps,
  RendererProps,
  JsonForms,
  JsonFormsChangeEvent,
  useControl,
  ControlProps,
} from '@jsonforms/vue2';
import {
  useVuetifyArrayControl,
  mapDispatchToArrayControlPropsEx,
} from '../util';
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
import { ValidationIcon, ValidationBadge } from '../controls/components/index';
import { isEqual } from 'lodash';

const useJsonFormsTableControl = (props: ControlProps) => {
  return useControl(
    props,
    mapStateToArrayControlProps,
    mapDispatchToArrayControlPropsEx
  );
};
const controlRenderer = defineComponent({
  name: 'data-table-control-renderer',
  components: {
    DispatchCell,
    DispatchRenderer,
    VCard,
    VCardTitle,
    VCardText,
    VCardActions,
    VRow,
    VCol,

    VContainer,
    ValidationIcon,
    ValidationBadge,

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
    return {
      ...useVuetifyArrayControl(useJsonFormsTableControl(props)),
      ...{
        page: 1,
        subData: {},
        editedIndex: -1,
        dialog: false,
        dialogDelete: false,

        // headers: [
        //   // {
        //   //   text: 'Messages',
        //   //   align: 'start',
        //   //   sortable: false,
        //   //   value: 'message',
        //   // },
        //   // { text: 'Date', value: 'date' },
        //   { text: 'Actions', value: 'actions', sortable: false },
        // ],
      },
    };
  },
  computed: {
    formTitle(): string {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    },
    headers() {
      const headers: any = [];
      headers.push({
        value: 'index',
        text: '#',
      });
      for (const property in this.control.schema.properties) {
        headers.push({
          text: property,
          value: property,
        });
      }
      headers.push({
        text: 'Actions',
        value: 'actions',
        sortable: false,
      });
      return headers;
    },
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

  created() {},
  methods: {
    composePaths,
    createDefaultValue,
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.subData = {};
        this.editedIndex = -1;
      });
    },
    addItemClick() {
      if (this.editedIndex > -1) {
        this.updateItem?.(this.control.path, this.editedIndex, this.subData)();
      } else {
        this.addItem(this.control.path, this.subData)();
      }
      this.close();
    },

    deleteItem(item: any): void {
      const toDelete = this.control.data?.indexOf(item);
      this.removeItems?.(this.control.path, [toDelete])();
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

    onChange(event: JsonFormsChangeEvent): void {
      if (!isEqual(event.data, this.subData)) {
        this.subData = event.data;
      }
    },
    editItem(item: any) {
      this.editedIndex = this.control.data?.indexOf(item);
      this.subData = Object.assign({}, item);
      this.dialog = true;
    },
  },
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(3, uiTypeIs('DataTableControl')),
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
