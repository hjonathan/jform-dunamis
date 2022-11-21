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
        <v-textarea
          v-disabled-icon-focus
          :id="control.id + '-input'"
          :class="styles.control.input"
          :disabled="!control.enabled"
          :rows="rows"
          :autofocus="appliedOptions.focus"
          :placeholder="placeholder"
          :persistent-placeholder="labelOrientation() == 'inherit'"
          :label="labelOrientation() == 'inherit' ? computedLabel : null"
          :hint="control.hint"
          :persistent-hint="persistentHint()"
          :required="control.required"
          :error-messages="control.errors"
          :value="textValue"
          :maxlength="
            appliedOptions.restrict ? control.schema.maxLength : undefined
          "
          :size="
            appliedOptions.trim && control.schema.maxLength !== undefined
              ? control.schema.maxLength
              : undefined
          "
          :clearable="hover"
          multi-line
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
        </v-textarea>
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
  useJsonFormsControl,
  RendererProps,
} from '@jsonforms/vue2';
import { default as ControlWrapper } from '../controls/ControlWrapper.vue';
import { useVuetifyControl } from '../util';
import { VHover, VTextarea, VTooltip, VIcon } from 'vuetify/lib';
import { DisabledIconFocus } from '../controls/directives';
import CustomControlWrapper from '../controls/CustomControlWrapper.vue';

const controlRenderer = defineComponent({
  name: 'text-area-control-renderer-editor',
  components: {
    ControlWrapper,
    VHover,
    VTextarea,
    VTooltip,
    VIcon,
    CustomControlWrapper,
  },
  directives: {
    DisabledIconFocus,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    return useVuetifyControl(
      useJsonFormsControl(props),
      (value) => value || undefined
    );
  },
  computed: {
    textValue(): string {
      let defaultValue = this.control.uischema.options?.defaultValue ?? '';
      let transformToApply = this.control.uischema.options?.textTransform ?? '';
      switch (transformToApply) {
        case 'lowercase':
          return defaultValue.toLowerCase();
        case 'uppercase':
          return defaultValue.toUpperCase();
        case 'capital':
          return defaultValue.charAt(0).toUpperCase() + defaultValue.slice(1);
        case 'title': {
          const arr = defaultValue.split(' ');
          for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
          }
          return arr.join(' ');
        }
        default:
          return defaultValue ?? '';
      }
    },
    hint(): string {
      return this.control.uischema.options?.hint ?? '';
    },
    placeholder(): string {
      return this.control.uischema.options?.placeholder ?? '';
    },
    rows(): string | number {
      return this.control.uischema.options?.rows ?? 2;
    },
  },
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(2, uiTypeIs('TextArea')),
};
</script>
