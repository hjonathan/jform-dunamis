<template>
  <div>
    <dispatch-renderer
      v-if="control.uischema"
      :visible="control.visible"
      :enabled="control.enabled"
      :schema="control.schema"
      :uischema="control.uischema"
      :path="control.path"
      :renderers="control.renderers"
      :cells="control.cells"
    />
    <div v-else></div>
  </div>
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
  RendererProps,
  DispatchRenderer,
} from '@jsonforms/vue2';
import { VHover, VTextField, VCombobox, VIcon, VTooltip } from 'vuetify/lib';
import CustomControlWrapper from '../CustomControlWrapper.vue';
import { useNestedFormComposition } from './NestedFormComp';
import DisabledIconFocus from './composables/DisabledIconFocus';

const NestedFormRenderer = defineComponent({
  name: 'nested-form-renderer',
  components: {
    VHover,
    VTextField,
    VCombobox,
    VIcon,
    VTooltip,
    CustomControlWrapper,
    DispatchRenderer,
  },
  directives: {
    DisabledIconFocus,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup: (props: RendererProps<ControlElement>) => {
    return useNestedFormComposition(props);
  },
});

export default NestedFormRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: NestedFormRenderer,
  tester: rankWith(3, uiTypeIs('NestedForm')),
};
</script>
