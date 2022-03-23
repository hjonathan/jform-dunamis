<template>
  <control-wrapper
    v-bind="controlWrapper"
    :styles="styles"
    :isFocused="isFocused"
    :appliedOptions="appliedOptions"
  >
    <v-label :for="control.id + '-input'">{{ computedLabel }}</v-label>
    <v-radio-group
      :id="control.id + '-input'"
      :class="styles.control.input"
      :disabled="!control.enabled"
      :autofocus="appliedOptions.focus"
      :placeholder="appliedOptions.placeholder"
      :hint="control.description"
      :persistent-hint="persistentHint()"
      :required="control.required"
      :error-messages="control.errors"
      row
      :value="control.data"
      @change="onChange"
      @focus="isFocused = true"
      @blur="isFocused = false"
    >
      <v-radio
        v-for="o in controlBuilder.items"
        :key="o.value"
        :label="o.label"
        :value="o.value"
      ></v-radio>
    </v-radio-group>
  </control-wrapper>
</template>

<script lang="ts">
import {
  ControlElement,
  JsonFormsRendererRegistryEntry,
  rankWith,
  uiTypeIs,
} from '@jsonforms/core';
import { defineComponent } from '../vue';
import {
  rendererProps,
  useJsonFormsEnumControl,
  RendererProps,
} from '@jsonforms/vue2';
import { default as ControlWrapper } from '../controls/ControlWrapper.vue';
import { useVuetifyControlExt } from '../composition';
import { VRadioGroup, VRadio, VLabel } from 'vuetify/lib';

const controlRenderer = defineComponent({
  name: 'radio-group-control-renderer',
  components: {
    ControlWrapper,
    VRadioGroup,
    VRadio,
    VLabel,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    return useVuetifyControlExt(
      props,
      useJsonFormsEnumControl(props),
      (value) => value || undefined
    );
  },
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(2, uiTypeIs('RadioGroup')),
};
</script>