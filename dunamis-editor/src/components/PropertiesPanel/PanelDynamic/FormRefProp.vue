<template>
  <div>
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { dynamicPropertyDefault } from '../PropertiesPanelComp';
const FormRefProp = defineComponent({
  name: 'FormRefProp',
  emits: ['input', 'change'],
  props: ['value', 'config'],
  setup(props: any, context: any) {
    const data = ref(props.config);
    const input = (v: any) => {
      context.emit('input', v);
    };
    const change = (value: any) => {
      context.emit('change', value);
    };
    const twoBind = (value: any) => {
      context.emit('input', value);
      context.emit('change', value);
    };
    return {
      data,
      input,
      change,
      twoBind,
      val: ref(props.config.items.find((el) => el.id == props.value)),
    };
  },
});
export default FormRefProp;
</script>
<style></style>
