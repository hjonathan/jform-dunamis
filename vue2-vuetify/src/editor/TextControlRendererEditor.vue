<template>
  <CustomControlWrapper v-bind="{ ...control }" :styles="styles">
    <v-text-field
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
      :tabindex="control.tabindex"
      :readonly="control.readonly"
      @change="onChange"
    >
      <v-tooltip v-if="control.hint && control.hint != ''" slot="append" top>
        <template v-slot:activator="{ on }">
          <v-icon v-on="on" color="primary" small> mdi-information </v-icon>
        </template>
        <span class="">{{ control.hint }}</span>
      </v-tooltip>
    </v-text-field>
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
import { VHover, VTextField, VCombobox, VIcon, VTooltip } from 'vuetify/lib';
import { DisabledIconFocus } from '../controls/directives';
import CustomControlWrapper from '../controls/CustomControlWrapper.vue';

import { useTextControlComposition } from './TextControlComp';

const TextControlRenderer = defineComponent({
  name: 'text-control-renderer',
  components: {
    VHover,
    VTextField,
    VCombobox,
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
  setup(props: RendererProps<ControlElement>) {
    const vuetifyControl = useTextControlComposition(props);
    // @ts-ignore:
    return vuetifyControl;
  },
});

export default TextControlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: TextControlRenderer,
  tester: rankWith(3, uiTypeIs('Text')),
};
</script>
