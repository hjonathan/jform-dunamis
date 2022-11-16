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
        <v-combobox
          v-if="suggestions !== undefined"
          v-disabled-icon-focus
          :id="control.id + '-input'"
          :class="styles.control.input"
          :disabled="!control.enabled"
          :autofocus="appliedOptions.focus"
          :placeholder="placeholder"
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
          :counter="
            control.schema.maxLength !== undefined
              ? control.schema.maxLength
              : undefined
          "
          :clearable="hover"
          :rules="validationRegExp"
          @input="transform(textValue)"
          @change="onChange"
          @focus="isFocused = true"
          @blur="isFocused = false"
          v-mask="inputMask"
        >
          <v-tooltip v-if="hint && hint != ''" slot="append" top>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on" color="primary" small> mdi-information </v-icon>
            </template>
            <span class="">{{ hint }}</span>
          </v-tooltip>
        </v-text-field>
      </v-hover>
    </CustomControlWrapper>
  </control-wrapper>
</template>

<script lang="ts">
import {
  ControlElement,
  JsonFormsRendererRegistryEntry,
  rankWith,
  uiTypeIs,
} from '@jsonforms/core';
import { defineComponent, ref } from '../vue';
import {
  rendererProps,
  useJsonFormsControl,
  RendererProps,
} from '@jsonforms/vue2';
import { default as ControlWrapper } from '../controls/ControlWrapper.vue';
import { useVuetifyControl } from '../util';
import { VHover, VTextField, VCombobox, VIcon, VTooltip } from 'vuetify/lib';
import { DisabledIconFocus } from '../controls/directives';
import isArray from 'lodash/isArray';
import every from 'lodash/every';
import isString from 'lodash/isString';
import { mask } from '@titou10/v-mask';
import CustomControlWrapper from '../controls/CustomControlWrapper.vue';

const TextControlRenderer = defineComponent({
  name: 'text-control-renderer',
  components: {
    ControlWrapper,
    VHover,
    VTextField,
    VCombobox,
    VIcon,
    VTooltip,
    CustomControlWrapper,
  },
  directives: {
    DisabledIconFocus,
    mask,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    let textValue = ref('');
    const vuetifyControl = useVuetifyControl(
      useJsonFormsControl(props),
      (value) => value || undefined
    );
    // @ts-ignore:
    return {
      ...vuetifyControl,
      textValue,
    };
  },
  mounted() {
    this.textValue = this.control.data
      ? this.transform(this.control.data)
      : this.transform(this.control.uischema.options?.defaultValue) || '';
  },
  methods: {
    transform(text: string) {
      if (text) {
        let transformToApply = this.textTransform;
        switch (transformToApply) {
          case 'lowercase':
            text = text.toLowerCase();
            break;
          case 'uppercase':
            text = text.toUpperCase();
            break;
          case 'capital':
            text = text.charAt(0).toUpperCase() + text.slice(1);
            break;
          case 'title': {
            const arr = text.split(' ');
            for (var i = 0; i < arr.length; i++) {
              arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
            }
            text = arr.join(' ');
            break;
          }
          default:
            text = text ?? '';
            break;
        }
      }

      return text;
    },
  },
  computed: {
    textTransform(): string {
      return this.control.uischema.options?.textTransform ?? '';
    },
    hint(): string {
      return this.control.uischema.options?.hint ?? '';
    },
    placeholder(): string {
      return this.control.uischema.options?.placeholder ?? '';
    },
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
    validationRegExp() {
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

export default TextControlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: TextControlRenderer,
  tester: rankWith(3, uiTypeIs('Text')),
};
</script>
