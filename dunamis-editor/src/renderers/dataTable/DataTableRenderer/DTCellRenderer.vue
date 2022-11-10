<template>
  <div>CELLLLLLLLLLLLLLLLLLLll</div>
  <!-- <component v-bind:is="determinedRenderer" v-bind="renderer"></component> -->
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import maxBy from 'lodash/maxBy';
import { rendererProps, UnknownRenderer } from '@jsonforms/vue2';
import { ControlElement } from '@jsonforms/core';
import { RendererProps, useDtCellComposition } from './DTCellComp';

export default defineComponent({
  name: 'dispatch-renderer',
  props: {
    parent: { ...rendererProps<ControlElement>() },
    row: {
      expand: {
        type: Function,
      },
      index: { type: Number },
      item: Object,
      isExpanded: { type: Boolean },
      isMobile: { type: Boolean },
      isSelected: { type: Boolean },
      select: { type: Function },
      headers: Array,
    },
    cell: {
      header: { type: Object },
      value: { type: String },
    },
  },
  setup(props: RendererProps<ControlElement>) {
    return useDtCellComposition(props);
  },
  computed: {
    determinedRenderer(): any {
      const renderer = maxBy(this.renderer.renderers, (r: any) =>
        r.tester(this.renderer.uischema, this.renderer.schema)
      );
      if (
        renderer === undefined ||
        renderer.tester(this.renderer.uischema, this.renderer.schema) === -1
      ) {
        return UnknownRenderer;
      } else {
        return renderer.renderer;
      }
    },
  },
});
</script>
