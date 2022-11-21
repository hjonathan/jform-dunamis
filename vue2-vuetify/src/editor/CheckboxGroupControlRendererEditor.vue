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
      <v-radio-group
        :id="control.id + '-input'"
        :class="styles.control.input"
        :disabled="!control.enabled"
        :autofocus="appliedOptions.focus"
        :placeholder="placeholder"
        :hint="control.description"
        :persistent-hint="persistentHint()"
        :required="control.required"
        :error-messages="control.errors"
        :value="control.data"
        @change="onChange"
        @focus="isFocused = true"
        @blur="isFocused = false"
      >
        <v-checkbox
          v-for="o in control.options"
          v-model="data"
          :key="o.value"
          :label="o.label"
          :value="o.value"
          @change="onChange"
        >
        </v-checkbox>

        <v-tooltip v-if="hint && hint != ''" slot="append" top>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" color="primary" small> mdi-information </v-icon>
          </template>
          <span class="">{{ hint }}</span>
        </v-tooltip>
      </v-radio-group>
    </CustomControlWrapper>
  </control-wrapper>
</template>

<script lang="ts">
//@ts-nocheck
import {
  ControlElement,
  JsonFormsRendererRegistryEntry,
  or,
  rankWith,
  uiTypeIs,
} from '@jsonforms/core';
import { defineComponent } from '../vue';
import {
  rendererProps,
  useJsonFormsEnumControl,
  RendererProps,
} from '@jsonforms/vue2';
import { useVuetifyControl } from '../util';
import { default as ControlWrapper } from '../controls/ControlWrapper.vue';
import { VRadioGroup, VCheckbox, VLabel, VIcon, VTooltip } from 'vuetify/lib';
import { reactive } from 'vue';
import CustomControlWrapper from '../controls/CustomControlWrapper.vue';

const controlRenderer = defineComponent({
  name: 'checkbox-group-control-renderer-editor',
  components: {
    ControlWrapper,
    VRadioGroup,
    VCheckbox,
    VLabel,
    VIcon,
    VTooltip,
    CustomControlWrapper,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    let input: any = useVuetifyControl(
      useJsonFormsEnumControl(props),
      (value) => {
        return value || undefined;
      }
    );
    input.data = reactive([]);
    return input;
  },
  computed: {
    hint(): string {
      return this.control.uischema.options?.hint ?? '';
    },
    placeholder(): string {
      return this.control.uischema.options?.placeholder ?? '';
    },
    orientation(): string {
      return this.control.uischema.options?.orientation ?? '';
    },
  },
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(2, or(uiTypeIs('CheckboxGroup'))),
};
</script>
