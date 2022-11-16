<template>
  <control-wrapper
    v-bind="controlWrapper"
    :styles="styles"
    :isFocused="isFocused"
    :appliedOptions="appliedOptions"
  >
    <CustomControlWrapper
      v-bind="{ getLabelOrientation, computedLabel, getLabelCols }"
    >
      <v-hover v-slot="{ hover }">
        <v-combobox
          v-if="suggestions !== undefined"
          v-disabled-icon-focus
          :id="control.id + '-input'"
          :class="styles.control.input"
          :disabled="!control.enabled"
          :autofocus="appliedOptions.focus"
          :placeholder="computedPlaceholder"
          :label="computedLabel"
          :hint="control.description"
          :persistent-hint="persistentHint()"
          :required="control.required"
          :error-messages="control.errors"
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
          :placeholder="computedPlaceholder"
          :persistent-placeholder="getLabelOrientation() == 'inherit'"
          :label="getLabelOrientation() == 'inherit' ? computedLabel : null"
          :hint="computedHint"
          :persistent-hint="persistentHint()"
          :required="control.required"
          :error-messages="control.errors"
          :value="data"
          :clearable="hover"
          :rules="validationRegExp"
          @input="transform(data)"
          @change="onChange"
          @focus="isFocused = true"
          @blur="isFocused = false"
          v-mask="inputMask"
        >
          <v-tooltip
            v-if="computedHint && computedHint != ''"
            slot="append"
            top
          >
            <template v-slot:activator="{ on }">
              <v-icon v-on="on" color="primary" small> mdi-information </v-icon>
            </template>
            <span class="">{{ computedHint }}</span>
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
import { defineComponent } from '../vue';
import { rendererProps, RendererProps } from '@jsonforms/vue2';
import { default as ControlWrapper } from '../controls/ControlWrapper.vue';
import { VHover, VTextField, VCombobox, VIcon, VTooltip } from 'vuetify/lib';
import { DisabledIconFocus } from '../controls/directives';
import { mask } from '@titou10/v-mask';
import CustomControlWrapper from '../controls/CustomControlWrapper.vue';

import { useTextControlComposition } from './TextControlComp';

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
    const vuetifyControl = useTextControlComposition(props);
    // @ts-ignore:
    return vuetifyControl;
  },
  mounted() {},
  methods: {},
  computed: {
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
