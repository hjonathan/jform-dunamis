<template>
  <CustomControlWrapper
    v-if="control.show"
    v-bind="{ ...control }"
    :styles="styles"
  >
    <v-img
      :alt="control.alt"
      :max-height="control.height"
      :max-width="control.width"
      :src="control.src"
      :disabled="control.disabled"
    >
      <v-tooltip v-if="control.hint && control.hint != ''" top>
        <template v-slot:activator="{ on }">
          <v-icon v-on="on" color="primary" small> mdi-information </v-icon>
        </template>
        <span class="">{{ control.hint }}</span>
      </v-tooltip>
    </v-img>
  </CustomControlWrapper>
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
import { rendererProps, RendererProps } from '@jsonforms/vue2';
import { VHover, VImg, VIcon, VTooltip } from 'vuetify/lib';
import DisabledIconFocus from './composables/DisabledIconFocus';
import CustomControlWrapper from '../CustomControlWrapper.vue';
import { useImageControlComposition } from './ImageControlComp';

const ImageControlRenderer = defineComponent({
  name: 'image-control-renderer',
  components: {
    VHover,
    VIcon,
    VImg,
    VTooltip,
    CustomControlWrapper,
  },
  directives: {
    DisabledIconFocus,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    return useImageControlComposition(props);
  },
});

export default ImageControlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: ImageControlRenderer,
  tester: rankWith(2, uiTypeIs('Image')),
};
</script>
