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
      :return-object="true"
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
      <v-radio
        v-for="o in controlBuilder.items"
        :key="o.value"
        :label="o.label"
        :value="o.value"
      ></v-radio>
      <v-tooltip v-if="hint && hint != ''" slot="append" top>
        <template v-slot:activator="{ on }">
          <v-icon v-on="on" color="primary" small> mdi-information </v-icon>
        </template>
        <span class="">{{ hint }}</span>
      </v-tooltip>
    </v-radio-group>
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
import { default as ControlWrapper } from '../controls/ControlWrapper.vue';
import { useVuetifyControlExt } from '../composition';
import { VRadioGroup, VRadio, VLabel, VIcon, VTooltip } from 'vuetify/lib';

const controlRenderer = defineComponent({
  name: 'radio-group-control-renderer',
  components: {
    ControlWrapper,
    VRadioGroup,
    VRadio,
    VLabel,
    VIcon,
    VTooltip,
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
        return this.control.schema?.enum;
      } else if (this.control.uischema.options?.items) {
        return this.control.uischema.options?.items;
      } else {
        return [];
      }
    },
  },
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(2, uiTypeIs('RadioGroup')),
};
</script>
