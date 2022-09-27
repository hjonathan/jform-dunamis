<template>
  <v-card class="mx-auto me-2" elevation="0">
    <v-subheader
      >{{ view == 'schema' ? 'SCHEMA' : 'UI SCHEMA' }}
      <v-spacer></v-spacer>
      <v-btn
        class="vpm-action-editor-btn float-end"
        plain
        small
        :color="view != 'schema' ? 'primary' : 'warning'"
        @click="toogleMode"
      >
        <v-icon small class="mt-1 me-1"> mdi-code-json </v-icon>
        {{ view != 'schema' ? 'Schema' : 'UI Schema' }}
      </v-btn>
    </v-subheader>

    <v-row>
      <v-col>
        <monaco-editor
          v-if="view == 'schema'"
          :theme="$vuetify.theme.dark ? 'vs-dark' : 'vs'"
          height="70vh"
          :language="`json`"
          v-model="schema"
        ></monaco-editor>
        <monaco-editor
          v-else
          :theme="$vuetify.theme.dark ? 'vs-dark' : 'vs'"
          height="70vh"
          :language="`json`"
          v-model="uiSchema"
        ></monaco-editor>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { sync } from 'vuex-pathify';
import { Uri } from 'monaco-editor/esm/vs/editor/editor.api';
import { computed, defineComponent, reactive, ref } from '@vue/composition-api';
import MonacoEditor from '../MonacoEditor.vue';
import { getMonacoModelForUri } from '../../core/jsonSchemaValidation';
import { useExportSchema, useExportUiSchema } from '../../util';

const MainPanelSchemaEditor = defineComponent({
  name: 'MainPanelSchemaEditor',
  inject: ['bus'],
  components: { MonacoEditor },
  computed: {},
  watch: {
    /*monacoUiSchemaModel(): void {
      this.setMonacoUiSchema(this.monacoUiSchemaModel);
    },
    monacoSchemaModel(): void {
      this.setMonacoSchema(this.monacoSchemaModel);
    },*/
  },
  setup(props: any) {
    const uiUri = Uri.parse('json://core/specification/uischema.json');
    const uri = Uri.parse('json://core/specification/schema.json');
    let jsonSchema = computed(sync('app/editor@schema'));
    let jsonUiSchema = computed(sync('app/editor@uiSchema'));
    let setSchema: any = (schemaModel: any, uri: any) => {
      return getMonacoModelForUri(
        uri,
        JSON.stringify(
          schemaModel && schemaModel != '' ? useExportSchema(schemaModel) : '',
          null,
          2
        )
      );
    };

    let setUiSchema: any = (schemaModel: any, uri: any) => {
      return getMonacoModelForUri(
        uri,
        JSON.stringify(
          schemaModel && schemaModel != ''
            ? useExportUiSchema(schemaModel)
            : '',
          null,
          2
        )
      );
    };
    let schema = reactive(setSchema(jsonSchema.value, uri));
    let uiSchema = reactive(setUiSchema(jsonUiSchema.value, uiUri));
    let view = ref('schema');

    return {
      jsonSchema,
      jsonUiSchema,
      schema,
      uiSchema,
      view,
    };
  },
  methods: {
    toogleMode() {
      this.view = this.view == 'schema' ? 'uiSchema' : 'schema';
    },
  },
});
export default MainPanelSchemaEditor;
</script>
<style></style>
