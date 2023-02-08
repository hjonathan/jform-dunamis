<template>
  <v-expansion-panels v-model="panel" accordion multiple>
    <v-expansion-panel
      class="caption"
      v-for="(group, i) in paletteElements"
      :key="i"
    >
      <v-expansion-panel-header class="caption">{{
        group.label
      }}</v-expansion-panel-header>
      <v-expansion-panel-content elevation="0">
        <div class="vpm-drawer d-flex flex-column">
          <draggable
            v-model="group.elements"
            :group="{
              name: 'people',
              pull: 'clone',
              put: false,
            }"
            :sort="false"
            class="flex-wrap"
            elevation="0"
            :clone="clone"
          >
            <div
              v-for="(item, n) in group.elements"
              :key="n"
              class="pa-1 vpm-drawer-item-list"
            >
              <v-card
                class="d-flex pa-1"
                flat
                :hover="true"
                color="transparent"
              >
                <v-icon
                  small
                  color="accent"
                  class="pe-3 vpm-pallete-icon"
                  v-text="item.icon"
                ></v-icon>

                <v-list-item-title
                  class="vpm-drawer-list-title caption"
                  v-text="item.label"
                ></v-list-item-title>
              </v-card>
            </div>
          </draggable>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import draggable from 'vuedraggable';
import { SchemaElement } from '../../model/schema';
import store from './../../store';
import { uuid } from 'uuidv4';
export default defineComponent({
  name: 'PalletePanel',
  components: {
    draggable,
  },
  setup(props: any, context: any) {
    const enabledFields = [
      'Control',
      'Checkbox',
      'DatePicker',
      'Datetime',
      'TimePicker',
      'MultipleFile',
      'Text',
      'TextArea',
      'RichText',
      'Rating',
      'RadioGroup',
      'Suggest',
      'CheckboxGroup',
      'Dropdown',
      'Image',
      'GridControl',
      'DataTable',
      'File',
      'Submit',
      'Button',
      'NestedForm',
    ];
    const panel = ref([0, 1, 2, 3]);
    const getLabel = (schemaElement: SchemaElement): any => {
      return getLabel(schemaElement);
    };
    const paletteElements = computed({
      get() {
        return store.getters['app/palleteElements'];
      },
      set(val: any) {
        store.commit('app/SET_PALLETE_ELEMENTS', val);
      },
    });

    const editorUiSchema: any = computed({
      get() {
        return store.getters['app/uiSchema'];
      },
      set(val: any) {
        store.commit('app/SET_UI_SCHEMA', val);
      },
    });

    const clone = (element: any) => {
      const property: any = element.uiSchemaElementProvider();
      const uid = uuid();
      if (enabledFields.indexOf(element.type) != -1) {
        const cloneElement = {
          type: element.type,
          scope: `#/properties/${element.type}_${uid.split('-').shift()}`,
          options: property.uiOptions,
          uuid: uid,
          parent: editorUiSchema.value,
          uiSchemaElementProvider: element.uiSchemaElementProvider,
          ...{ elements: property?.elements || [] },
        };
        return cloneElement;
      } else {
        return {
          ...property,
          parent: editorUiSchema.value,
        };
      }
    };

    onMounted(() => {
      store.dispatch('app/getPaletteElements');
    });

    return {
      panel,
      getLabel,
      clone,
      paletteElements,
    };
  },
});
</script>

<style>
.vpm-drawer-list-title {
  cursor: pointer;
  font-weight: 500 !important;
  color: #747a80;
}

.theme--light.v-expansion-panels .v-expansion-panel {
  background-color: #f5f5f5;
  color: rgba(0, 0, 0, 0.87);
}

.v-application .blue-grey--text.text--darken-2 {
  color: #1976d2 !important;
  caret-color: #e7eef1 !important;
}
.vpm-drawer-icon {
  margin-right: 5px !important;
}

.vpm-drawer-item-list {
  font-weight: 500;
  transition: transform 400ms;
}

.vpm-drawer-item-list:hover {
  background: linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05));
  transform: scale(1.05, 1.05);
}

.vpm-pallete-icon::before {
  font-weight: 600;
}
</style>
