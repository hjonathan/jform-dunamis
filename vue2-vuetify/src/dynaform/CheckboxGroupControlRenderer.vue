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
        :return-object="true"
        row
        @focus="isFocused = true"
        @blur="isFocused = false"
      >
        <div v-if="orientation === 'vertical'">
          <v-row v-for="o in controlBuilder.items" :key="o.value">
            <v-col class="pa-0">
              <v-checkbox
                class="shrink pb-0 mb-0 pt-0 mt-0"
                v-model="data"
                :label="o.label"
                :value="o.value"
                @change="onChange"
              ></v-checkbox>
            </v-col>
          </v-row>
        </div>
        <div v-else>
          <v-row>
            <v-col
              class="pa-0"
              v-for="o in controlBuilder.items"
              :key="o.value"
            >
              <v-checkbox
                v-model="data"
                :label="o.label"
                :value="o.value"
                @change="onChange"
              ></v-checkbox>
            </v-col>
          </v-row>
        </div>

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
import {
  VRadioGroup,
  VCheckbox,
  VLabel,
  VRow,
  VCol,
  VIcon,
  VTooltip,
} from 'vuetify/lib';
import { reactive } from 'vue';
import CustomControlWrapper from '../controls/CustomControlWrapper.vue';

const controlRenderer = defineComponent({
  name: 'checkbox-group-control-renderer',
  components: {
    ControlWrapper,
    VRadioGroup,
    VCheckbox,
    VLabel,
    VRow,
    VCol,
    VIcon,
    VTooltip,
    CustomControlWrapper,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    let input: any = useVuetifyControlExt(
      props,
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
  tester: rankWith(2, uiTypeIs('CheckboxGroup')),
};
</script>
