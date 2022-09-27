<template>
  <control-wrapper
    v-bind="controlWrapper"
    :styles="styles"
    :isFocused="isFocused"
    :appliedOptions="appliedOptions"
  >
    <v-container>
      <editor
        :init="editorSettings"
        :value="appliedOptions.content"
        :placeholder="control.uischema.placeholder"
        v-on:onChange="this.onChangeHandler"
      />
    </v-container>
  </control-wrapper>
</template>

<script lang="ts">
//@ts-nocheck
import {
  ControlElement,
  JsonFormsRendererRegistryEntry,
  rankWith,
  uiTypeIs,
} from '@jsonforms/core';
import { defineComponent } from '@vue/composition-api';
import {
  rendererProps,
  useJsonFormsControl,
  RendererProps,
} from '@jsonforms/vue2';
import { useVuetifyControl, ControlWrapper } from '@jsonforms/vue2-vuetify';

import { VContainer } from 'vuetify/lib';
import Editor from '@tinymce/tinymce-vue';

const controlRenderer = defineComponent({
  name: 'html-viewer-control-renderer',
  components: {
    ControlWrapper,
    VContainer,
    Editor,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    return {
      ...useVuetifyControl(
        useJsonFormsControl(props),
        (value) => value || undefined
      ),
      ...{
        editorSettings: {
          inline: true,
          plugins: 'link, code, lists',
          toolbar:
            'undo redo | link | styleselect | bold italic backcolor forecolor | ' +
            'alignleft aligncenter alignright alignjustify | ' +
            'bullist numlist outdent indent | removeformat | code',
          menubar: false,
        },
      },
    };
  },
  methods: {
    onChangeHandler(e, editor) {
      this.$store.dispatch('app/updateUISchemaElementOption', {
        elementUUID: this.control.uischema.uuid,
        changedProperties: {
          content: editor.getContent(),
        },
      });
    },
  },
});

const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(5, uiTypeIs('RichText')),
};

export default controlRenderer;
export { entry };
</script>
