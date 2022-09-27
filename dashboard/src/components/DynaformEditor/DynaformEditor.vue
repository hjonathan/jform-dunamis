<template>
  <json-forms
    :renderers="renderers"
    :data="data"
    :uischema="useExportUiSchema() || {}"
    :schema="useExportSchema() || false"
    height="500"
  />
</template>

<script lang="ts">
import { JsonForms } from '@jsonforms/vue2';
import { defineComponent } from '@vue/composition-api';
import { defaultEditorRenderers } from '../../renderers/index';
import { useExportSchema } from '../../util';

export default defineComponent({
  name: 'DynaformEditor',
  props: {},
  components: {
    JsonForms,
  },
  data() {
    return {
      selection: '' as string,
      renderers: [] as any,
      data: {},
    };
  },
  mounted() {
    this.renderers = defaultEditorRenderers as any;
  },
  methods: {
    useExportSchema() {
      return useExportSchema(this.$store.get('app/editor@schema'));
    },
    useExportUiSchema() {
      return this.$store.get('app/editor@uiSchema');
    },
  },
});
</script>
