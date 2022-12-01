<template>
  <CustomControlWrapper v-bind="{ ...control }" :styles="styles">
    <v-radio-group
      :id="control.id + '-input'"
      :class="styles.control.input"
      :placeholder="control.placeholder"
      :hint="control.hint"
      :error-messages="control.errors"
    >
      <v-checkbox
        v-for="o in control.options"
        v-model="control.data"
        :key="o.value"
        :label="o.label"
        :value="o.value"
        @change="onChange"
        dense
        :hide-details="true"
        :readonly="control.readonly"
      >
      </v-checkbox>
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
import { VHover, VRadioGroup, VCheckbox, VIcon, VTooltip } from 'vuetify/lib';
import { DisabledIconFocus } from '../controls/directives';
import CustomControlWrapper from '../controls/CustomControlWrapper.vue';

import { useCheckgroupControlComposition } from './CheckgroupControlComp';

const CheckgroupControlRenderer = defineComponent({
  name: 'checkgroup-control-renderer',
  components: {
    VHover,
    VRadioGroup,
    VCheckbox,
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
    const vuetifyControl = useCheckgroupControlComposition(props);
    // @ts-ignore:
    return vuetifyControl;
  },
});

export default CheckgroupControlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: CheckgroupControlRenderer,
  tester: rankWith(4, uiTypeIs('CheckboxGroup')),
};
</script>
