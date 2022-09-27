<template>
  <div>
    <v-text-field
      dense
      :label="data.name"
      persistent-placeholder
      class="caption"
      :value="value"
      @input="input"
      @change="change"
    >
      <v-icon small slot="append" color="secondary" @click="extendPanel">
        mdi-cog
      </v-icon>
    </v-text-field>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { dynamicPropertyDefault } from '../PropertiesPanelComp';
const LabelProp = defineComponent({
  name: 'LabelProp',
  emits: ['input', 'change'],
  props: ['value', 'config'],
  setup(props: any, context: any) {
    return {
      ...dynamicPropertyDefault(props, context),
      extendPanel() {
        context.emit('extendPanel', {
          id: 'labelConfig',
          component: 'labelPropExt',
        });
      },
    };
  },
});
export default LabelProp;
</script>
<style></style>
