<template>
  <component v-bind:is="determinedCell" v-bind="cell"></component>
</template>

<script lang="ts">
//@ts-nocheck
import { defineComponent } from 'vue';
import UnknownRenderer from './UnknownRenderer.vue';
import maxBy from 'lodash/maxBy';
import {
  rendererProps,
  useJsonFormsDispatchCell,
  RendererProps,
} from '../jsonFormsCompositions';
import { ControlElement } from '@jsonforms/core';

export default defineComponent({
  name: 'dispatch-cell',
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    return useJsonFormsDispatchCell(props);
  },
  computed: {
    determinedCell(): any {
      const cell = maxBy(this.cell.cells, (r: any) =>
        r.tester(this.cell.uischema, this.cell.schema)
      );
      if (
        cell === undefined ||
        cell.tester(this.cell.uischema, this.cell.schema) === -1
      ) {
        return UnknownRenderer;
      } else {
        return cell.cell;
      }
    },
  },
});
</script>
