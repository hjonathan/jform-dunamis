<template>
  <CustomControlWrapper
    v-if="control.show"
    v-bind="{ ...control }"
    :styles="styles"
  >
    <v-radio-group
      :id="control.id + '-input'"
      :class="styles.control.input"
      :placeholder="control.placeholder"
      :hint="control.hint"
      :error-messages="control.errors"
      :rules="control.validation"
      v-model="control.data"
    >
      <v-radio
        v-for="o in control.options"
        :key="o.value"
        :label="o.label"
        :value="o.value"
        :disabled="control.disabled"
        :readonly="control.readonly"
        @change="onChange"
        dense
      ></v-radio>
      <template v-slot:label>
        <div>
          {{ control.labelOrientation == 'inherit' ? control.label : null }}
        </div>
      </template>

      <v-tooltip v-if="control.hint && control.hint != ''" slot="append" top>
        <template v-slot:activator="{ on }">
          <v-icon v-on="on" color="primary" small> mdi-information </v-icon>
        </template>
        <span class="">{{ control.hint }}</span>
      </v-tooltip>
    </v-radio-group>
  </CustomControlWrapper>
</template>

<script lang="ts">
//@ts-nocheck
import {
  ControlElement,
  JsonFormsRendererRegistryEntry,
  rankWith,
  uiTypeIs,
} from '@jsonforms/core';
import { defineComponent } from 'vue';
import { rendererProps, RendererProps } from '@jsonforms/vue2';
import { VHover, VRadioGroup, VRadio, VIcon, VTooltip } from 'vuetify/lib';
import { DisabledIconFocus } from '../controls/directives';
import CustomControlWrapper from '../controls/CustomControlWrapper.vue';

import { useRadiogroupControlComposition } from './RadiogroupControlComp';

const RadiogroupControlRenderer = defineComponent({
  name: 'radiogroup-control-renderer',
  components: {
    VHover,
    VRadioGroup,
    VRadio,
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
  setup: (props: RendererProps<ControlElement>) =>
    useRadiogroupControlComposition(props),
});

export default RadiogroupControlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: RadiogroupControlRenderer,
  tester: rankWith(4, uiTypeIs('RadioGroup')),
};
</script>
