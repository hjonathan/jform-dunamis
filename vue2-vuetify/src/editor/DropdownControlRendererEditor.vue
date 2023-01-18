<template>
  <CustomControlWrapper v-bind="{ ...control }" :styles="styles">
    <v-select
      v-disabled-icon-focus
      :id="control.id + '-input'"
      :class="styles.control.input"
      :placeholder="control.placeholder"
      :persistent-placeholder="control.labelOrientation == 'inherit'"
      :label="control.labelOrientation == 'inherit' ? control.label : null"
      :hint="control.hint"
      :error-messages="control.errors"
      :required="control.required"
      :rules="control.validation"
      :tabindex="control.tabindex"
      :readonly="control.readonly"
      :aria-label="control.ariaLabel"
      :value="control.data"
      :items="control.options"
      item-text="label"
      item-value="value"
      @change="onChange"
    >
      <v-tooltip
        v-if="control.hint && control.hint != ''"
        slot="append-outer"
        top
      >
        <template v-slot:activator="{ on }">
          <v-icon v-on="on" color="primary" small> mdi-information </v-icon>
        </template>
        <span class="">{{ control.hint }}</span>
      </v-tooltip>
    </v-select>
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
import { VHover, VSelect, VIcon, VTooltip } from 'vuetify/lib';
import { DisabledIconFocus } from '../controls/directives';
import CustomControlWrapper from '../controls/CustomControlWrapper.vue';

import { useDropdownControlComposition } from './DropdownControlComp';

const DropdownControlRenderer = defineComponent({
  name: 'dropdown-control-renderer',
  components: {
    VHover,
    VSelect,
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
    useDropdownControlComposition(props),
});

export default DropdownControlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: DropdownControlRenderer,
  tester: rankWith(3, uiTypeIs('Dropdown')),
};
</script>
