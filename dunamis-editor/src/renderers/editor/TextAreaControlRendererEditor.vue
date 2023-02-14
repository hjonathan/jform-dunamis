<template>
  <CustomControlWrapper
    v-if="control.show"
    v-bind="{ ...control }"
    :styles="styles"
  >
    <v-textarea
      :aria-label="control.ariaLabel"
      :id="control.id + '-input'"
      :class="styles.control.input"
      :placeholder="control.placeholder"
      :persistent-placeholder="control.labelOrientation == 'inherit'"
      :label="control.labelOrientation == 'inherit' ? control.label : null"
      :hint="control.hint"
      :error-messages="control.errors"
      :value="control.data"
      :rules="control.validation"
      :rows="control.rows"
      @input="() => data"
      @change="onChange"
    >
      <v-tooltip v-if="control.hint && control.hint != ''" slot="append" top>
        <template v-slot:activator="{ on }">
          <v-icon v-on="on" color="primary" small> mdi-information </v-icon>
        </template>
        <span class="">{{ control.hint }}</span>
      </v-tooltip>
    </v-textarea>
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
import { VHover, VTextarea, VIcon, VTooltip } from 'vuetify/lib';
import DisabledIconFocus from './composables/DisabledIconFocus';
import CustomControlWrapper from '../CustomControlWrapper.vue';
import { useTextareaControlComposition } from './TextareaControlComp';

const TextareaControlRenderer = defineComponent({
  name: 'text-area-control-renderer',
  components: {
    VHover,
    VTextarea,
    VIcon,
    VTooltip,
    CustomControlWrapper,
  },
  directives: {
    DisabledIconFocus,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup: (props: RendererProps<ControlElement>) =>
    useTextareaControlComposition(props),
});

export default TextareaControlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: TextareaControlRenderer,
  tester: rankWith(2, uiTypeIs('TextArea')),
};
</script>
