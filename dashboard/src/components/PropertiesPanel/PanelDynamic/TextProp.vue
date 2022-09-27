<template>
  <v-text-field
    :readonly="readOnly"
    dense
    :label="data.name"
    persistent-placeholder
    class="caption"
    :value="value"
    :type="inputType"
    :min="min"
    :rules="rules"
    @input="input"
    @change="change"
  ></v-text-field>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { dynamicPropertyDefault } from '../PropertiesPanelComp';
const TextProp = defineComponent({
  name: 'TextProp',
  emits: ['input', 'change'],
  props: ['value', 'config'],
  setup(props: any, context: any) {
    let inputType = ref(props.config.options.inputType || 'text');
    let min = ref(props.config.options.min || 1);
    let readOnly = ref(props.config.options.readOnly || false);
    const rules = ref(props.config.rules || []);
    return {
      ...dynamicPropertyDefault(props, context),
      inputType,
      min,
      readOnly,
      rules,
    };
  },
});
export default TextProp;
</script>
<style></style>
