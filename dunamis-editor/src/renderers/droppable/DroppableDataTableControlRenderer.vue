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
            :animation="200"
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
                updateItemIndex
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
import { createControl, tryFindByUUID } from '../../util';
import { buildSchemaTree } from '../../model/schema';
import { doFindByScope } from '../../util';
import { entry as DroppableElementRegistration } from './DroppableElement.vue';
import _ from 'lodash';
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
        'DateTime',
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

          store.dispatch('app/addColumnToDataTable', {
            column: newElement,
            variableColumn: evt.added.element.scope.split('/').pop(),
            parentUUID: this.uischema.linkedSchemaElement,
          });

          //Update parent in newElement
          // store.dispatch('app/updateParentUiSchemaElement', {
          //   elementUUID: evt.added.element.uuid,
          //   parentUUID: this.uischema.uuid,
          //   linkedSchemaElement: newElement.uuid,
          // });
        }
      } else {
        console.log('update index');
      }
    },
    handleChange1(evt) {
      if (evt.added) {
        if (
          evt.added.element &&
          (evt.added.element.type === 'Control' ||
            evt.added.element.type === 'Checkbox' ||
            evt.added.element.type === 'DatePicker' ||
            evt.added.element.type === 'DateTime' ||
            evt.added.element.type === 'TimePicker' ||
            evt.added.element.type === 'MultipleFile' ||
            evt.added.element.type === 'Text' ||
            evt.added.element.type === 'TextArea' ||
            evt.added.element.type === 'RichText' ||
            evt.added.element.type === 'Rating' ||
            evt.added.element.type === 'RadioGroup' ||
            evt.added.element.type === 'Suggest' ||
            evt.added.element.type === 'CheckboxGroup' ||
            evt.added.element.type === 'Dropdown' ||
            evt.added.element.type === 'Image' ||
            evt.added.element.type === 'GridControl' ||
            evt.added.element.type === 'File' ||
            evt.added.element.type === 'Submit')
        ) {
          //here update the schema
          const property = evt.added.element.uiSchemaElementProvider();
          const newElement = buildSchemaTree(property.control);
          const parent = this.editorSchemaModel.properties.get(
            this.control.path
          );
          store.dispatch('app/addPropertyToSchema', {
            schemaElement: newElement,
            elementUUID: parent.items.uuid,
            indexOrProp: property.variable,
          });

          // Here uischema
          const schemaElement = tryFindByUUID(
            store.getters['app/schema'],
            newElement.uuid
          );
          const element = this.findElementSchema(
            store.getters['app/schema'],
            schemaElement
          );
          // store.dispatch('locales/addProperty', {
          //   property: element.key,
          // });

          schemaElement.options = property.uiOptions;
          const newUIElement = createControl(
            schemaElement,
            evt.added.element.type
          );
          for (let item of parent.linkedUISchemaElements) {
            store.dispatch('app/addScopedElementToTable', {
              uiSchemaElement: newUIElement,
              layoutUUID: item,
              index: evt.added.newIndex,
              schemaUUID: evt.added.element.uuid,
              schemaElement,
            });
          }
        } else {
          let provider = evt.added.element.uiSchemaElementProvider();
          store.dispatch('app/addUnscopedElementToLayout', {
            uiSchemaElement: provider,
            layoutUUID: this.uischema.uuid,
            index: evt.added.newIndex,
          });
        }
      }
      if (evt.moved) {
        this.updateItemIndex(evt.moved);
      }
    },
    /**
     * Update Index in uischema
     */
    updateItemIndex(item: any) {
      const auxElement = this.uischema.elements.splice(item.oldIndex, 1);
      this.uischema.elements.splice(item.newIndex, 0, auxElement[0]);
      //   this.setEditorUiSchema(this.editorUiSchemaModel);
    },
    findElementSchema(schemaGlobal, schemaLocal) {
      let ele;
      for (const [key, value] of schemaGlobal.properties) {
        if (_.isEqual(value, schemaLocal)) {
          ele = {
            key: key,
            value: value,
          };
        }
      }
      return ele;
    },
  },
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(6, and(isObjectArray, uiTypeIs('DataTableControl'))),
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
