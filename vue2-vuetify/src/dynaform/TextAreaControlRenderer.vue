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
          @input="transform(textValue)"
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
import { defineComponent, ref } from '../vue';
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
  name: 'text-area-control-renderer',
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
    let textValue = ref('');
    return {
      ...useVuetifyControl(
        useJsonFormsControl(props),
        (value) => value || undefined
      ),
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
        let transformToApply =
          this.control.uischema.options?.textTransform ?? '';
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
