<template>
  <tr>
    <td v-for="header in rHeaders" :key="header.value">
      <span v-if="header.value != 'actions'">
        <DtCellRenderer
          v-bind="{
            ...$props,
            cell: { header, value: row.item[header.value] },
          }"
        >
        </DtCellRenderer>
      </span>
      <span v-else>
        <v-icon small @click="onDelete"> mdi-delete </v-icon>
      </span>
    </td>
  </tr>
</template>

<script lang="ts">
//@ts-nocheck
import { ControlElement } from '@jsonforms/core';
import { defineComponent } from 'vue';
import { rendererProps } from '@jsonforms/vue2';
import { useDtRowComposition, RendererProps } from './DTRowComp';
import DtCellRenderer from './DTCellRenderer.vue';
import { VIcon } from 'vuetify/lib';

const DtRowRenderer = defineComponent({
  name: 'dt-row-renderer',
  components: {
    DtCellRenderer,
    VIcon,
  },
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
  },
  setup(props: RendererProps<ControlElement>, { emit }) {
    return useDtRowComposition(props, emit);
  },
});

export default DtRowRenderer;
</script>
