<template>
  <draggable
    :class="draggableClass"
    :list="uischema.elements"
    group="people"
    @change="handleChange"
    drag-class="drag-ghost"
    ghost-class="ghost"
    chosen-class="chosen-ghost"
    handle=".drag-icon"
    :animation="200"
  >
    <v-row
      v-for="(element, index) in uischema.elements"
      :key="`${useJsonForm.layout.value.path}-${index}`"
      no-gutters
    >
      <v-col cols="12" :class="useJsonForm.styles.verticalLayout.item">
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
      </v-col>
    </v-row>
  </draggable>
</template>

<script lang="ts">
//@ts-nocheck
import { Uri } from 'monaco-editor/esm/vs/editor/editor.api';
import { getMonacoModelForUri } from '../../core/jsonSchemaValidation';
import { useExportUiSchema } from '../../util';
import draggable from 'vuedraggable';
import {
  uiTypeIs,
  Layout,
  rankWith,
  JsonFormsRendererRegistryEntry,
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
import { createControl, tryFindByUUID, doFindByScope } from '../../util';
import { buildSchemaTree } from '../../model/schema';
import _ from 'lodash';
import store from '../../store';

const droppableRenderer = defineComponent({
  name: 'dropable-vertical-layout-renderer',
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
    };
  },
  computed: {
    draggableClass(): string {
      return 'dragArea list-group py-8';
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
  },
  methods: {
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
        'Button',
      ];
      const enabledLayouts = ['HorizontalLayout'];
      if (evt.added && evt.added.element) {
        if (enabledFields.indexOf(evt.added.element.type) !== -1) {
          //here update the schema
          const property = evt.added.element.uiSchemaElementProvider();
          const newElement = buildSchemaTree(property.control);
          //Verify if the scope has been created
          let elementSchema = doFindByScope(
            store.getters['app/schema'],
            evt.added.element.scope.split('/').pop()
          );
          //Add new element to schema
          if (!elementSchema) {
            store.dispatch('app/addPropertyToSchema', {
              schemaElement: newElement,
              parentUUID: this.schema.uuid,
              variable: evt.added.element.scope.split('/').pop(),
            });
          }
          //Update parent in newElement
          store.dispatch('app/updateParentUiSchemaElement', {
            elementUUID: evt.added.element.uuid,
            parentUUID: this.uischema.uuid,
            linkedSchemaElement: newElement.uuid,
          });
        }
        if (enabledLayouts.indexOf(evt.added.element.type) !== -1) {
          store.dispatch('app/updateParentUiSchemaElement', {
            elementUUID: evt.added.element.uuid,
            parentUUID: this.uischema.uuid,
            linkedSchemaElement: null,
          });
        }
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
  tester: rankWith(45, uiTypeIs('VerticalLayout')),
};
</script>
<style>
.drag-ghost {
  transform: scale(0.95);
}

.drag-ghost .editor-element {
  display: none;
}

.chosen-ghost {
  transform: scale(0.95);
}

.chosen-ghost .editor-element {
  display: none;
}
</style>
