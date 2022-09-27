<template>
  <v-card class="pb-6" elevation="0" color="transparent">
    <div class="caption">Items</div>
    <div class="d-flex justify-end">
      <v-btn
        class="vpm-action-editor-btn"
        color="primary"
        plain
        small
        @click="extendPanel"
      >
        <v-icon class="me-1" small>mdi-cog</v-icon>
        Settings
      </v-btn>
    </div>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { dynamicPropertyDefault } from '../PropertiesPanelComp';

const ItemProp = defineComponent({
  name: 'ItemProp',
  emits: ['input', 'change', 'extendPanel'],
  props: ['value', 'config'],
  setup(props: any, context: any) {
    return {
      ...dynamicPropertyDefault(props, context),
      extendPanel() {
        context.emit('extendPanel', {
          id: 'items',
          component: 'itemsPropExt',
        });
      },
    };
  },
});
export default ItemProp;
</script>
<style>
.vpm-action-editor-btn {
  text-transform: initial;
  letter-spacing: normal;
}
</style>
