<template>
  <control-wrapper
    v-bind="controlWrapper"
    :styles="styles"
    :isFocused="isFocused"
    :appliedOptions="appliedOptions"
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
          :placeholder="appliedOptions.placeholder"
          :label="computedLabel"
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
        ></v-text-field>
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
  </control-wrapper>
</template>

<script lang="ts">
//@ts-nocheck
import {
  ControlElement,
  JsonFormsRendererRegistryEntry,
  rankWith,
  isDateControl,
} from '@jsonforms/core';
import { defineComponent } from '../vue';
import {
  rendererProps,
  useJsonFormsControl,
  RendererProps,
} from '@jsonforms/vue2';
import { default as ControlWrapper } from './ControlWrapper.vue';
import { useVuetifyControl } from '../util';
import { VTextField, VMenu, VDatePicker, VBtn } from 'vuetify/lib';

const controlRenderer = defineComponent({
  name: 'date-control-renderer',
  components: {
    ControlWrapper,
    VTextField,
    VMenu,
    VDatePicker,
    VBtn,
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
    setDefault(): string {
      return '1992-01-29';
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
  tester: rankWith(2, isDateControl),
};
</script>
