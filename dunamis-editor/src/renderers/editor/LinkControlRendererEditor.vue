<template>
  <CustomControlWrapper v-bind="{ ...control }" :styles="styles">
    <v-label :class="styles.label.root">
      <a :href="control.href" class="text-decoration-none">{{
        control.content
      }}</a>

      <v-tooltip v-if="control.hint && control.hint != ''" slot="append" top>
        <template v-slot:activator="{ on }">
          <v-icon v-on="on" color="primary" small> mdi-information </v-icon>
        </template>
        <span class="">{{ control.hint }}</span>
      </v-tooltip>
    </v-label>
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
import { VHover, VLabel, VIcon, VTooltip } from 'vuetify/lib';

import CustomControlWrapper from '../CustomControlWrapper.vue';

import { useLinkControlComposition } from './LinkControlComp';

const LinkControlRenderer = defineComponent({
  name: 'link-control-renderer',
  components: {
    VHover,
    VLabel,
    VIcon,
    VTooltip,
    CustomControlWrapper,
  },

  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    return useLinkControlComposition(props);
  },
});

export default LinkControlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: LinkControlRenderer,
  tester: rankWith(5, uiTypeIs('Link')),
};
</script>
