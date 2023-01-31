<template>
  <v-card v-if="control.visible" :class="styles.arrayList.root" elevation="0">
    <v-card-text>
      ajsdjaksdjaskl
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
import {
  JsonFormsRendererRegistryEntry,
  rankWith,
  composePaths,
  createDefaultValue,
  ControlElement,
  uiTypeIs,
  findUISchema,
  mapStateToArrayControlProps,
} from '@jsonforms/core';
import { defineComponent } from 'vue';
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
import { isEqual } from 'lodash';
import {
  mapDispatchToArrayControlPropsEx,
  useVuetifyArrayControl,
} from '@jsonforms/vue2-vuetify';
import { computed, ref } from 'vue';
import Vue from 'vue';

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
    //Refs
    const editedIndex = ref(-1);
    const dialog = ref(false);
    const subData = ref({});

    const vuetifyControl = useVuetifyArrayControl(
      useJsonFormsTableControl(props)
    );

    //Computed
    const formTitle = computed(() => {
      return editedIndex.value === -1 ? 'New Item' : 'Edit Item';
    });
    const foundUISchema = computed(() => {
      return findUISchema(
        vuetifyControl.control.value.uischemas,
        vuetifyControl.control.value.schema,
        vuetifyControl.control.value.uischema.scope,
        vuetifyControl.control.value.path,
        undefined,
        vuetifyControl.control.value.uischema
      );
    });

    const headers = computed(() => {
      const h: any = [];
      h.push({
        value: 'index',
        text: '#',
      });
      for (const property in vuetifyControl.control.value?.schema.properties) {
        h.push({
          text: property,
          value: property,
        });
      }
      h.push({
        text: 'Actions',
        value: 'actions',
        sortable: false,
      });
      return h;
    });

    //METHODS
    const close = () => {
      dialog.value = false;
      Vue.nextTick(() => {
        subData.value = {};
        editedIndex.value = -1;
      });
    };

    const addItemClick = () => {
      if (editedIndex.value > -1) {
        vuetifyControl.updateItem?.(
          vuetifyControl.control.value.path,
          editedIndex.value,
          subData.value
        )();
      } else {
        vuetifyControl.addItem(
          vuetifyControl.control.value.path,
          subData.value
        )();
      }
      close();
    };

    const deleteItem = (item: any): void => {
      const toDelete = vuetifyControl.control.value.data?.indexOf(item);
      vuetifyControl.removeItems?.(vuetifyControl.control.value.path, [
        toDelete,
      ])();
    };

    const onChange = (event: JsonFormsChangeEvent) => {
      if (!isEqual(event.data, subData.value)) {
        subData.value = event.data;
      }
    };

    const editItem = (item: any) => {
      editedIndex.value = vuetifyControl.control.value.data?.indexOf(item);
      subData.value = Object.assign({}, item);
      dialog.value = true;
    };

    let res = {
      ...vuetifyControl,
      ...{
        //Refs
        dialog,
        subData,
        editedIndex,

        page: 1,

        dialogDelete: false,
        headers,
        formTitle,
        foundUISchema,
        //Methods
        composePaths,
        createDefaultValue,
        close,
        addItemClick,
        deleteItem,
        onChange,
        editItem,
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
    return res;
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
