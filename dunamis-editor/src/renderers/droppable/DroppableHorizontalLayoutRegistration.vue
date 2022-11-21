<template>
  <v-row no-gutters>
    <draggable
      :class="draggableClass"
      :list="uischema.elements"
      group="people"
      :key="'draggable' + uischema.uuid"
      drag-class="drag-ghost"
      ghost-class="ghost"
      chosen-class="chosen-ghost"
      handle=".drag-icon"
      :animation="200"
      @change="handleChange"
    >
      <v-col
        v-for="(element, index) in uischema.elements"
        :key="`${layout.path}-${index}`"
        no-gutters
        :cols="cols ? cols[index] : null"
      >
        <dispatch-renderer
          :key="element.uuid"
          :schema="layout.schema"
          :uischema="element"
          :path="layout.path"
          :enabled="layout.enabled"
          :renderers="customRenderers"
          :cells="layout.cells"
        />
      </v-col>
    </draggable>
  </v-row>
</template>
<script lang="ts">
//@ts-nocheck
import { Uri } from 'monaco-editor/esm/vs/editor/editor.api';
import { getMonacoModelForUri } from '../../core/jsonSchemaValidation';
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
import { doFindByScope, useExportUiSchema } from '../../util';
import { buildSchemaTree } from '../../model/schema';
import _ from 'lodash';
import store from '../../store';

const droppableRenderer = defineComponent({
  name: 'droppable-horizontal-layout-renderer',
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
      ...useVuetifyLayout(useJsonFormsLayout(props)),
      enabledDrag: true,
      dragging: false,
    };
  },
  computed: {
    draggableClass(): string {
      return 'drag-area row ' + this.styles.horizontalLayout.item;
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
      if (evt.added) {
        if (
          evt.added.element &&
          enabledFields.indexOf(evt.added.element.type) !== -1
        ) {
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
  tester: rankWith(45, uiTypeIs('HorizontalLayout')),
};
</script>
<style scoped>
.drag-area {
  min-height: 80px;
}

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
