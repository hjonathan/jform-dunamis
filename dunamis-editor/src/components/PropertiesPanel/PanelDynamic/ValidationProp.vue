<template>
  <v-card class="pb-6" elevation="0" color="transparent">
    <div class="caption">Validations</div>
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
import { defineComponent, ref } from 'vue';
import { dynamicPropertyDefault } from '../PropertiesPanelComp';
const ValidationProp = defineComponent({
  name: 'ValidationProp',
  emits: ['input', 'change'],
  props: ['value', 'config'],
  setup(props: any, context: any) {
    return {
      ...dynamicPropertyDefault(props, context),
      extendPanel() {
        context.emit('extendPanel', {
          id: 'validation',
          component: 'validationPropExt',
        });
      },
    };
  },
});
export default ValidationProp;
</script>
<style></style>
