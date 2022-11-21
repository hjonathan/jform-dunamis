<template>
  <v-textarea
    dense
    auto-grow
    rows="2"
    class="caption"
    persistent-placeholder
    :name="data.id"
    :label="data.name"
    :value="value"
    @input="input"
    @change="change"
  ></v-textarea>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { dynamicPropertyDefault } from '../PropertiesPanelComp';
const TextareaProp = defineComponent({
  name: 'TextareaProp',
  emits: ['input', 'change'],
  props: ['value', 'config'],
  setup(props: any, context: any) {
    return dynamicPropertyDefault(props, context);
  },
});
export default TextareaProp;
</script>
<style></style>
