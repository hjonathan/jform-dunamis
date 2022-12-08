<template>
  <component :is="determinedRenderer" v-bind="{ ...$props }"></component>
</template>
<script lang="ts">
//@ts-nocheck
import { defineComponent } from 'vue';
import { rendererProps } from '@jsonforms/vue2';
import { ControlElement } from '@jsonforms/core';
import { RendererProps, useDtCellComposition } from './DTCellComp';
export default defineComponent({
  name: 'dt-cell-dispatch-renderer',
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
});
</script>
