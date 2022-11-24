<template>
  <CustomControlWrapper v-bind="{ ...controlX }" :styles="styles">
    <v-hover v-slot="{ hover }">
      <v-text-field
        v-disabled-icon-focus
        :aria-label="controlX.ariaLabel"
        :id="control.id + '-input'"
        :class="styles.control.input"
        :disabled="!control.enabled"
        :placeholder="controlX.placeholder"
        :persistent-placeholder="controlX.labelOrientation == 'inherit'"
        :label="controlX.labelOrientation == 'inherit' ? controlX.label : null"
        :hint="controlX.hint"
        :error-messages="control.errors"
        :value="controlX.data"
        :clearable="hover"
        :rules="controlX.validation"
        :tabindex="tabindex"
        @input="() => data"
        @change="onChange"
      >
        <v-tooltip
          v-if="controlX.hint && controlX.hint != ''"
          slot="append"
          top
        >
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" color="primary" small> mdi-information </v-icon>
          </template>
          <span class="">{{ controlX.hint }}</span>
        </v-tooltip>
      </v-text-field>
    </v-hover>
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
