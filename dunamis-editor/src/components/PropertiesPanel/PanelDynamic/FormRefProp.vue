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
      console.log('input', v);
      context.emit('input', v);
    };
    const change = (value: any) => {
      console.log('change', value);
      context.emit('change', value);
      // if (
      //   typeof value === 'object' &&
      //   !Array.isArray(value) &&
      //   value !== null
      // ) {
      //   context.emit('change', value.id);
      // } else {
      //   context.emit('change', value);
      // }
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
