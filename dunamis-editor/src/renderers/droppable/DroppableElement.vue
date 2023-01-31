<template>
  <EditorElement :wrappedElement="layout.uischema">
    <dispatch-renderer
      :schema="layout.schema"
      :uischema="customEditorUiSchema"
      :path="layout.path"
      :enabled="layout.enabled"
      :renderers="customRenderers"
      :cells="layout.cells"
    />
  </EditorElement>
</template>

<script lang="ts">
import {
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
import EditorElement from '../EditorElement.vue';
import { omit } from 'lodash';
const droppableRenderer = defineComponent({
  name: 'droppable-element',
  components: {
    DispatchRenderer,
    VContainer,
    VRow,
    VCol,
    EditorElement,
  },
  props: {
    ...rendererProps<Layout>(),
  },
  computed: {
    customRenderers(): Array<any> {
      const renderers = this.layout.renderers?.filter(
        (r) => r.renderer !== droppableRenderer
      );
      return renderers;
    },
    customEditorUiSchema() {
      const uischema: any = omit(this.layout.uischema, ['rule']);
      return uischema;
    },
  },
  setup(props: RendererProps<Layout>) {
    return useVuetifyLayout(useJsonFormsLayout(props));
  },
});

export default droppableRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: droppableRenderer,
  tester: rankWith(50, () => true),
};
</script>
