<template>
  <control-wrapper
    v-bind="controlWrapper"
    :styles="styles"
    :isFocused="isFocused"
    :appliedOptions="appliedOptions"
  >
    <v-tooltip v-if="hint && hint != ''" top>
      <template v-slot:activator="{ on }">
        <v-icon v-on="on" color="primary" small> mdi-information </v-icon>
      </template>
      <span class="">{{ hint }}</span>
    </v-tooltip>
    <v-img
      :max-height="appliedOptions.height || 150"
      :max-width="appliedOptions.width || 150"
      :src="appliedOptions.image"
    ></v-img>
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
import { defineComponent } from 'vue';
import {
  rendererProps,
  useJsonFormsControl,
  RendererProps,
} from '@jsonforms/vue2';
import { default as ControlWrapper } from '../controls/ControlWrapper.vue';
import { useVuetifyControl } from '../util';
import { DisabledIconFocus } from '../controls/directives';
import { VContainer, VImg, VIcon, VTooltip } from 'vuetify/lib';

const controlRenderer = defineComponent({
  name: 'image-control-renderer',
  components: {
    ControlWrapper,
    VContainer,
    VImg,
    VIcon,
    VTooltip,
  },
  directives: {
    DisabledIconFocus,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    return useVuetifyControl(
      useJsonFormsControl(props),
      (value) => value || undefined
    );
  },
  computed: {
    hint(): string {
      return this.control.uischema.options?.hint ?? '';
    },
  },
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  // tester: rankWith(2, and(isStringControl, optionIs('isHtmlViewer', true))),
  tester: rankWith(9, uiTypeIs('Image')),
};
</script>
