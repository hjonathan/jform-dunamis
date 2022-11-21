<template>
  <control-wrapper
    v-bind="controlWrapper"
    :styles="styles"
    :isFocused="isFocused"
    :appliedOptions="appliedOptions"
  >
    <v-hover v-slot="{ hover }">
      <v-combobox
        v-if="suggestions !== undefined"
        v-disabled-icon-focus
        :id="control.id + '-input'"
        :class="styles.control.input"
        :disabled="!control.enabled"
        :autofocus="appliedOptions.focus"
        :placeholder="appliedOptions.placeholder"
        :label="computedLabel"
        :hint="control.description"
        :persistent-hint="persistentHint()"
        :required="control.required"
        :error-messages="control.errors"
        :maxlength="
          appliedOptions.restrict ? control.schema.maxLength : undefined
        "
        :counter="
          control.schema.maxLength !== undefined
            ? control.schema.maxLength
            : undefined
        "
        :clearable="hover"
        :value="control.data"
        :items="suggestions"
        hide-no-data
        @change="onChange"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
      <v-text-field
        v-else
        v-disabled-icon-focus
        :id="control.id + '-input'"
        :class="styles.control.input"
        :disabled="!control.enabled"
        :autofocus="appliedOptions.focus"
        :placeholder="appliedOptions.placeholder"
        :label="computedLabel"
        :hint="control.description"
        :persistent-hint="persistentHint()"
        :required="control.required"
        :error-messages="control.errors"
        :value="control.data"
        :maxlength="
          appliedOptions.restrict ? control.schema.maxLength : undefined
        "
        :counter="
          control.schema.maxLength !== undefined
            ? control.schema.maxLength
            : undefined
        "
        :clearable="hover"
        :rules="validationRegExp"
        @change="onChange"
        @focus="isFocused = true"
        @blur="isFocused = false"
        v-mask="inputMask"
      />
    </v-hover>
  </control-wrapper>
</template>

<script lang="ts">
//@ts-nocheck
import {
  ControlElement,
  JsonFormsRendererRegistryEntry,
  rankWith,
  isStringControl,
} from '@jsonforms/core';
import { defineComponent } from '../vue';
import {
  rendererProps,
  useJsonFormsControl,
  RendererProps,
} from '@jsonforms/vue2';
import { default as ControlWrapper } from './ControlWrapper.vue';
import { useVuetifyControl } from '../util';
import { VHover, VTextField, VCombobox } from 'vuetify/lib';
import { DisabledIconFocus } from './directives';
import isArray from 'lodash/isArray';
import every from 'lodash/every';
import isString from 'lodash/isString';
import { mask } from '@titou10/v-mask';

const controlRenderer = defineComponent({
  name: 'string-control-renderer',
  components: {
    ControlWrapper,
    VHover,
    VTextField,
    VCombobox,
  },
  directives: {
    DisabledIconFocus,
    mask,
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
    inputMask(): any {
      const mask = this.control.uischema.options?.mask || '';
      if (mask && typeof mask !== 'string') {
        //This section only works with the example
        //TODO this must work with all type of custom mask
        return {
          mask: mask ? mask.mask : '',
          tokens: {
            F: {
              pattern: new RegExp(mask.tokens['F'].pattern.replaceAll('/', '')),
              transform: eval(mask.tokens['F'].transform) || '',
            },
            G: {
              pattern: new RegExp(mask.tokens['G'].pattern.replaceAll('/', '')),
              transform: eval(mask.tokens['G'].transform) || '',
            },
          },
        };
      }
      return {
        mask: mask,
      };
    },
    suggestions(): string[] | undefined {
      const suggestions = this.control.uischema.options?.suggestion;

      if (
        suggestions === undefined ||
        !isArray(suggestions) ||
        !every(suggestions, isString)
      ) {
        // check for incorrect data
        return undefined;
      }
      return suggestions;
    },
    validationRegExp(): any {
      return [
        (value: string) => {
          const pattern = new RegExp(
            this.control.uischema.options?.validation?.replaceAll('/', '')
          );
          return (
            pattern.test(value) ||
            this.control.uischema.options?.validationMessage
          );
        },
      ];
    },
  },
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(1, isStringControl),
};
</script>
