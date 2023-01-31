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
        <v-autocomplete
          :value="control.data"
          :items="controlBuilder.items"
          :loading="isLoading"
          hide-no-data
          :search-input.sync="search"
          item-text="label"
          item-value="value"
          :persistent-placeholder="labelOrientation() == 'inherit'"
          :label="labelOrientation() == 'inherit' ? computedLabel : null"
          :placeholder="placeholder"
          prepend-icon="mdi-database-search"
          return-object
          :required="control.required"
          :clearable="hover"
          @input="onChange"
        >
          <v-tooltip v-if="hint && hint != ''" slot="append-outer" top>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on" color="primary" small> mdi-information </v-icon>
            </template>
            <span class="">{{ hint }}</span>
          </v-tooltip>
        </v-autocomplete>
      </v-hover>
    </CustomControlWrapper>
  </control-wrapper>
</template>

<script lang="ts">
//@ts-nocheck
import {
  ControlElement,
  rankWith,
  JsonFormsRendererRegistryEntry,
  uiTypeIs,
} from '@jsonforms/core';
import { defineComponent } from 'vue';
import {
  rendererProps,
  RendererProps,
  useJsonFormsControl,
} from '@jsonforms/vue2';

import { default as ControlWrapper } from '../controls/ControlWrapper.vue';
import { useVuetifyControlExt } from '../composition';
import { VHover, VAutocomplete, VIcon, VTooltip } from 'vuetify/lib';
import _ from 'lodash';
import CustomControlWrapper from '../controls/CustomControlWrapper.vue';

const controlRenderer = defineComponent({
  name: 'suggest-control-renderer',
  props: {
    ...rendererProps<ControlElement>(),
  },
  data: () => ({
    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    model: null,
    search: null,
  }),

  components: {
    ControlWrapper,
    VAutocomplete,
    VHover,
    VIcon,
    VTooltip,
    CustomControlWrapper,
  },
  setup(props: RendererProps<ControlElement>) {
    let delay: any = null;
    return {
      ...useVuetifyControlExt(
        props,
        useJsonFormsControl(props),
        (value) => value || undefined
      ),
      delay,
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
  methods: {},
  watch: {
    search(query: any) {
      let oldVal: any = null;
      if (this.control.data) {
        oldVal = this.control.data.label;
      }
      if (this.delay) {
        clearTimeout(this.delay);
      }
      this.delay = setTimeout(() => {
        if (oldVal !== query) {
          this.manualHandlerDependencies(query);
        }
      }, 800);
    },
  },
});
export default controlRenderer;
export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(8, uiTypeIs('Suggest')),
};
</script>
