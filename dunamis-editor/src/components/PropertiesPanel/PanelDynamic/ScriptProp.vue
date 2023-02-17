<template>
  <div>
    <v-input fluid>
      {{ data.name }}
    </v-input>
    <monaco-editor
      theme="'vs-dark'"
      :options="{ minimap: { enabled: false }, fontSize: 10 }"
      height="10vh"
      width="95%"
      :language="`json`"
      :value="value"
      @input="input"
      @change="change"
    ></monaco-editor>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { setSchema } from '../../FormRules/IfThenComponent/ThenComposition';
import MonacoEditor from '../../MonacoEditor.vue';
import { dynamicPropertyDefault } from '../PropertiesPanelComp';

const scriptProp = defineComponent({
  name: 'scriptProp',
  emits: ['input', 'change'],
  props: ['value', 'config'],
  components: {
    MonacoEditor,
  },
  setup<P, U>(props: P, context: U) {
    const script = ref(setSchema('Insert Code Here'));
    return { script, ...dynamicPropertyDefault(props, context) };
  },
});

export default scriptProp;
</script>
