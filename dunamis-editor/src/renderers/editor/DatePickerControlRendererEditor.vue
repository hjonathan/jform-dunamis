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
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            type="date"
            :id="control.id + '-input'"
            :class="styles.control.input"
            :disabled="!control.enabled"
            :autofocus="appliedOptions.focus"
            :placeholder="placeholder"
            :persistent-placeholder="labelOrientation() == 'inherit'"
            :label="labelOrientation() == 'inherit' ? computedLabel : null"
            :hint="control.description"
            :persistent-hint="persistentHint()"
            :required="control.required"
            :error-messages="control.errors"
            :value="control.data"
            @focus="isFocused = true"
            @blur="isFocused = false"
            append-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          >
            <v-tooltip v-if="hint && hint != ''" slot="append-outer" top>
              <template v-slot:activator="{ on }">
                <v-icon v-on="on" color="primary" small>
                  mdi-information
                </v-icon>
              </template>
              <span class="">{{ hint }}</span>
            </v-tooltip>
          </v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          @change="onChange"
          @input="menu = false"
          :min="control.schema.minDate"
          :max="control.schema.maxDate"
          no-title
          scrollable
        >
          <v-btn text color="primary" @click="clearDate"> Clear </v-btn>
        </v-date-picker>
      </v-menu>
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
import { defineComponent } from 'vue';
import {
  rendererProps,
  useJsonFormsControl,
  RendererProps,
} from '@jsonforms/vue2';
import { default as ControlWrapper } from '../ControlWrapper.vue';
import { useVuetifyControl } from '../util';
import {
  VTextField,
  VMenu,
  VDatePicker,
  VBtn,
  VIcon,
  VTooltip,
} from 'vuetify/lib';
import CustomControlWrapper from '../CustomControlWrapper.vue';

const controlRenderer = defineComponent({
  name: 'date-picker-control-renderer-editor',
  components: {
    ControlWrapper,
    VTextField,
    VMenu,
    VDatePicker,
    VBtn,
    VIcon,
    VTooltip,
    CustomControlWrapper,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    return {
      ...useVuetifyControl(useJsonFormsControl(props)),
      menu: false,
      date: null,
    };
  },
  computed: {
    hint(): string {
      return this.control.uischema.options?.hint ?? '';
    },
    placeholder(): string {
      return this.control.uischema.options?.placeholder ?? '';
    },
  },
  methods: {
    clearDate() {
      this.menu = false;
      this.date = null;
    },
  },
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(2, uiTypeIs('DatePicker')),
};
</script>
