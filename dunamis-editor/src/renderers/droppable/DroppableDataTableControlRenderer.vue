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
      <v-row no-gutters>
        <v-row>
          <draggable
            :class="draggableClass"
            :list="uischema.elements"
            group="people"
            :key="'draggable' + uischema.uuid"
            :sort="true"
            drag-class="drag-ghost"
            ghost-class="ghost"
            chosen-class="chosen-ghost"
            handle=".drag-icon"
            :animation="400"
            @change="handleChange"
          >
            <!-- <td v-for="(element, index) in uischema.elements" :key="index"> -->
            <v-col
              v-for="(element, index) in uischema.elements"
              :key="`${index}`"
              no-gutters
            >
              <dispatch-renderer
                :key="element.uuid"
                :schema="control.schema"
                :uischema="element"
                :path="control.path"
                :enabled="control.enabled"
                :renderers="customRenderers"
                :cells="control.cells"
              />
            </v-col>
          </draggable>
        </v-row>

        <v-tooltip
          v-if="control.uischema.hint && control.uischema.hint != ''"
          top
        >
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" color="primary" small> mdi-information </v-icon>
          </template>
          <span class="">{{ control.uischema.hint }}</span>
        </v-tooltip>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
//@ts-nocheck
import {
  isObjectArray,
  JsonFormsRendererRegistryEntry,
  and,
  rankWith,
  composePaths,
  ControlElement,
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
import { buildSchemaTree } from '../../model/schema';
import { entry as DroppableElementRegistration } from './DroppableElement.vue';
import store from '../../store';
const controlRenderer = defineComponent({
  name: 'droppable-data-table-control-renderer',
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
    customRenderers(): Array<any> {
      return (
        this.renderers && [...this.renderers, DroppableElementRegistration]
      );
    },
    draggableClass(): string {
      return 'drag-area row ' + this.styles.horizontalLayout.item;
    },
    editorUiSchemaModel: {
      get() {
        return store.getters['app/uiSchema'];
      },
      set(val: any) {
        store.commit('app/SET_UI_SCHEMA', val);
      },
    },
    editorSchemaModel: {
      get() {
        return store.getters['app/schema'];
      },
      set(val: any) {
        store.commit('app/SET_SCHEMA', val);
      },
    },
  },
  methods: {
    composePaths,
    handleChange(evt: any) {
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
        'DataTableControl',
        'File',
        'Submit',
      ];
      if (evt.added && evt.added.element) {
        if (enabledFields.indexOf(evt.added.element.type) !== -1) {
          //here update the schema
          const property = evt.added.element.uiSchemaElementProvider();
          const newElement = buildSchemaTree(property.control);

          // Update parent in column field
          store.dispatch('app/updateParentUiSchemaElement', {
            elementUUID: evt.added.element.uuid,
            parentUUID: this.uischema.uuid,
            linkedSchemaElement: newElement.uuid,
          });

          store.dispatch('app/addColumnToDataTable', {
            column: newElement,
            variableColumn: evt.added.element.scope.split('/').pop(),
            parentUUID: this.uischema.linkedSchemaElement,
          });
        }
      }

      if (evt.removed) {
        store.dispatch('app/removeColumnDataTable', {
          parentUUID: this.uischema.linkedSchemaElement,
          variableColumn: evt.removed.element.scope.split('/').pop(),
        });
      }
    },
  },
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(6, and(isObjectArray, uiTypeIs('DataTable'))),
};
</script>
<style scoped>
.drag-area {
  min-height: 80px;
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
