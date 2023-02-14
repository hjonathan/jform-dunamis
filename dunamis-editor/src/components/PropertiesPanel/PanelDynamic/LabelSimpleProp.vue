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
    </v-text-field>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { dynamicPropertyDefault } from '../PropertiesPanelComp';
const LabelSimpleProp = defineComponent({
  name: 'LabelSimpleProp',
  emits: ['input', 'change'],
  props: ['value', 'config'],
  setup(props: any, context: any) {
    return {
      ...dynamicPropertyDefault(props, context),
    };
  },
});
export default LabelSimpleProp;
</script>
<style></style>
