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
      <v-hover v-slot="{ hover }">
        <v-select
          v-disabled-icon-focus
          :id="control.id + '-input'"
          :class="styles.control.input"
          :disabled="!control.enabled"
          :autofocus="appliedOptions.focus"
          :placeholder="placeholder"
          :persistent-placeholder="labelOrientation() == 'inherit'"
          :label="labelOrientation() == 'inherit' ? computedLabel : null"
          :return-object="true"
          :hint="control.description"
          :persistent-hint="persistentHint()"
          :required="control.required"
          :error-messages="control.errors"
          :clearable="hover"
          :value="control.data"
          :items="controlBuilder.items"
          item-text="label"
          item-value="value"
          @input="onChange"
          @focus="isFocused = true"
          @blur="isFocused = false"
        >
          <v-tooltip v-if="hint && hint != ''" slot="append-outer" top>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on" color="primary" small> mdi-information </v-icon>
            </template>
            <span class="">{{ hint }}</span>
          </v-tooltip>
        </v-select>
      </v-hover>
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
  useJsonFormsEnumControl,
  RendererProps,
} from '@jsonforms/vue2';
import { default as ControlWrapper } from './../controls/ControlWrapper.vue';
import { VSelect, VHover, VIcon, VTooltip } from 'vuetify/lib';
import { DisabledIconFocus } from './../controls/directives';
import { useVuetifyControlExt } from '../composition';
import CustomControlWrapper from '../controls/CustomControlWrapper.vue';

const controlRenderer = defineComponent({
  name: 'dropdown-control-renderer',
  components: {
    ControlWrapper,
    VSelect,
    VHover,
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
    return useVuetifyControlExt(
      props,
      useJsonFormsEnumControl(props),
      (value) => value || undefined
    );
  },
  computed: {
    hint(): string {
      return this.control.uischema.options?.hint ?? '';
    },
    placeholder(): string {
      return this.control.uischema.options?.placeholder ?? '';
    },
    items(): string[] {
      if (this.control.schema.enum) {
        return this.control.schema?.enum ?? [];
      } else if (this.control.uischema.options?.items) {
        return this.control.uischema.options?.items ?? [];
      } else {
        return [];
      }
    },
  },
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(1, uiTypeIs('Dropdown')),
};
</script>
