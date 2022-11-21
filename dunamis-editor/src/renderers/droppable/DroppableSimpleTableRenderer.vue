<template>
  <v-container justify-space-around align-content-center>
    <v-row no-gutters>
      <v-simple-table class="array-container flex">
        <tbody>
          <draggable
            :class="draggableClass"
            :value="[]"
            group="people"
            @change="handleChange"
            :key="'draggable' + uischema.uuid"
            :sort="true"
            :disabled="!enabledDrag"
            @start="dragging = true"
            @end="dragging = false"
            tag="tr"
          >
            <td v-for="(element, index) in uischema.elements" :key="index">
              <dispatch-renderer
                :key="element.uuid"
                updateItemIndex
                :schema="useJsonForm.layout.value.schema"
                :uischema="element"
                :path="useJsonForm.layout.value.path"
                :enabled="useJsonForm.layout.value.enabled"
                :renderers="customRenderers"
                :cells="useJsonForm.layout.value.cells"
              />
            </td>
          </draggable>
        </tbody>
      </v-simple-table>
    </v-row>
    <!-- </div> -->
  </v-container>
</template>
<script lang="ts">
//@ts-nocheck
import { Uri } from 'monaco-editor/esm/vs/editor/editor.api';
import { getMonacoModelForUri } from '../../core/jsonSchemaValidation';
import { useExportUiSchema } from '../../util';
import draggable from 'vuedraggable';
import {
  uiTypeIs,
  JsonFormsRendererRegistryEntry,
  Layout,
  rankWith,
} from '@jsonforms/core';
import { defineComponent } from 'vue';
import {
  DispatchRenderer,
  rendererProps,
  useJsonFormsLayout,
  RendererProps,
} from '@jsonforms/vue2';
import { useVuetifyLayout } from '@jsonforms/vue2-vuetify';
import { VContainer, VRow, VCol } from 'vuetify/lib';
import { entry as DroppableElementRegistration } from './DroppableElement.vue';
import { createControl, tryFindByUUID } from '../../util';
import { buildSchemaTree } from '../../model/schema';
import _ from 'lodash';
import store from '../../store';

const droppableRenderer = defineComponent({
  name: 'droppable-simple-table-renderer',
  components: {
    DispatchRenderer,
    VContainer,
    VRow,
    VCol,
    draggable,
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
  computed: {
    draggableClass(): string {
      return 'dragArea  ' + this.useJsonForm.styles.horizontalLayout.item;
    },
    customRenderers(): Array<any> {
      return (
        this.renderers && [...this.renderers, DroppableElementRegistration]
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
    handleChange(evt) {
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
          const parent = this.editorSchemaModel.properties.get(this.path);
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
      this.setEditorUiSchema(this.editorUiSchemaModel);
    },
    /**
     * Update uiSchema in app/editor
     */
    setEditorUiSchema(schemaModel): void {
      const modelUri = Uri.parse('json://core/specification/uischema.json');
      getMonacoModelForUri(
        modelUri,
        JSON.stringify(useExportUiSchema(schemaModel), null, 2)
      );
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

export default droppableRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: droppableRenderer,
  tester: rankWith(45, uiTypeIs('TableLayout')),
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
