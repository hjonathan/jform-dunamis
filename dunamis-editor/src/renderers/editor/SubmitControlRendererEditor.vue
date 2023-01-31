<template>
  <CustomControlWrapper v-bind="{ ...control }" :styles="styles">
    <v-btn
      :id="control.id + '-input'"
      :class="styles.control.input"
      :error-messages="control.errors"
      @click="onSubmit"
    >
      {{ control.label }}
    </v-btn>
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

import CustomControlWrapper from '../CustomControlWrapper.vue';
import { VBtn } from 'vuetify/lib';
import { useSubmitControlComposition } from './SubmitControlComp';

const SubmitControlRenderer = defineComponent({
  name: 'submit-control-renderer',
  components: {
    VHover,
    VCheckbox,
    VIcon,
    VTooltip,
    CustomControlWrapper,
    VBtn,
  },

  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    const vuetifyControl = useSubmitControlComposition(props);
    // @ts-ignore:
    return vuetifyControl;
  },
});

export default SubmitControlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: SubmitControlRenderer,
  tester: rankWith(3, uiTypeIs('Submit')),
};
</script>
