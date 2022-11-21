<template>
  <control-wrapper
    v-bind="controlWrapper"
    :styles="styles"
    :isFocused="isFocused"
    :appliedOptions="appliedOptions"
  >
    <CustomControlWrapper
      v-bind="{ labelOrientation, computedLabel, labelCols }"
    >
      <v-checkbox
        :id="control.id + '-input'"
        :class="styles.control.input"
        :disabled="!control.enabled"
        :autofocus="appliedOptions.focus"
        :placeholder="placeholder"
        :persistent-placeholder="labelOrientation() == 'inherit'"
        :label="labelOrientation() == 'inherit' ? computedLabel : null"
        :hint="control.description"
        :persistent-hint="persistentHint()"
        :required="control.required"
        :error-messages="control.errors"
        :indeterminate="control.data === undefined"
        :value="control.data"
        :input-value="checkedDefault"
        @change="onChange"
        @focus="isFocused = true"
        @blur="isFocused = false"
      >
        <v-tooltip v-if="hint && hint != ''" slot="append" top>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" color="primary" small> mdi-information </v-icon>
          </template>
          <span class="">{{ hint }}</span>
        </v-tooltip>
      </v-checkbox>
    </CustomControlWrapper>
  </control-wrapper>
</template>

<script lang="ts">
//@ts-nocheck
import {
  ControlElement,
  JsonFormsRendererRegistryEntry,
  rankWith,
  uiTypeIs,
} from '@jsonforms/core';
import { defineComponent } from '../vue';
import {
  rendererProps,
  useJsonFormsControl,
  RendererProps,
} from '@jsonforms/vue2';
import { default as ControlWrapper } from '../controls/ControlWrapper.vue';
import { useVuetifyControl } from '../util';
import { VCheckbox, VIcon, VTooltip } from 'vuetify/lib';
import CustomControlWrapper from '../controls/CustomControlWrapper.vue';

const controlRenderer = defineComponent({
  name: 'checkbox-control-renderer-editor',
  components: {
    VCheckbox,
    VIcon,
    VTooltip,
    ControlWrapper,
    CustomControlWrapper,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    return useVuetifyControl(
      useJsonFormsControl(props),
      (newValue) => newValue || false
    );
  },
  computed: {
    hint(): string {
      return this.control.uischema.options?.hint ?? '';
    },
    placeholder(): string {
      return this.control.uischema.options?.placeholder ?? '';
    },
    checkedDefault(): boolean {
      return this.control.uischema.options?.checkedDefault ?? false;
    },
  },
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(1, uiTypeIs('Checkbox')),
};
</script>
