<template>
  <v-combobox
    :items="data.items"
    :label="data.name"
    outlined
    persistent-placeholder
    class="caption"
    dense
    :value="val"
    @input="input"
    @change="change"
  ></v-combobox>
</template>

<script lang="ts">
//@ts-nocheck
import { defineComponent, ref } from '@vue/composition-api';
import { dynamicPropertyDefault } from '../PropertiesPanelComp';
const DropdownProp = defineComponent({
  name: 'DropdownProp',
  emits: ['input', 'change', 'visible'],
  props: ['value', 'config'],
  setup(props: any, context: any) {
    return {
      ...dynamicPropertyDefault(props, context),
      val: ref(props.config.items.find((el) => el.id == props.value)),
    };
  },
});
export default DropdownProp;
</script>
<style></style>
