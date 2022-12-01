<template>
  <CustomControlWrapper v-bind="{ ...control }" :styles="styles">
    <v-btn
      :id="control.id + '-input'"
      :class="styles.control.input"
      :error-messages="control.errors"
      color="info"
      @click="onClick"
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
import { VHover, VBtn, VIcon, VTooltip } from 'vuetify/lib';
import { DisabledIconFocus } from '../controls/directives';
import CustomControlWrapper from '../controls/CustomControlWrapper.vue';
import { useButtonControlComposition } from './ButtonControlComp';

const ButtonControlRenderer = defineComponent({
  name: 'button-control-renderer',
  components: {
    VHover,
    VIcon,
    VTooltip,
    CustomControlWrapper,
    VBtn,
  },
  directives: {
    DisabledIconFocus,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    const vuetifyControl = useButtonControlComposition(props);
    // @ts-ignore:
    return vuetifyControl;
  },
});

export default ButtonControlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: ButtonControlRenderer,
  tester: rankWith(4, uiTypeIs('Button')),
};
</script>
