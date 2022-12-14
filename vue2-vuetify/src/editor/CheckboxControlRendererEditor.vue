<template>
  <CustomControlWrapper v-bind="{ ...control }" :styles="styles">
    <v-hover v-slot="{}">
      <v-checkbox
        :id="control.id + '-input'"
        :aria-label="control.ariaLabel"
        :class="styles.control.input"
        :label="control.labelOrientation == 'inherit' ? control.label : null"
        :hint="control.hint"
        :rules="control.validation"
        :tabindex="control.tabindex"
        v-model="control.data"
        :readonly="control.readonly"
        @change="onChange"
      >
        <v-tooltip v-if="control.hint && control.hint != ''" slot="append" top>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" color="primary" small> mdi-information </v-icon>
          </template>
          <span class="">{{ control.hint }}</span>
        </v-tooltip>
      </v-checkbox>
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
import { VHover, VCheckbox, VIcon, VTooltip } from 'vuetify/lib';
import { DisabledIconFocus } from '../controls/directives';
import CustomControlWrapper from '../controls/CustomControlWrapper.vue';

import { useCheckboxControlComposition } from './CheckboxControlComp';

const CheckboxControlRenderer = defineComponent({
  name: 'checkbox-control-renderer',
  components: {
    VHover,
    VCheckbox,
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
    const vuetifyControl = useCheckboxControlComposition(props);
    // @ts-ignore:
    return vuetifyControl;
  },
});

export default CheckboxControlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: CheckboxControlRenderer,
  tester: rankWith(3, uiTypeIs('Checkbox')),
};
</script>
