<template>
  <v-app-bar elevation="0">
    <upload-json ref="upload" />
    <template v-for="(action, index) in actions">
      <v-toolbar-title :key="index" v-if="action.type === 'title'">{{
        action.title
      }}</v-toolbar-title>
      <v-spacer :key="index" v-else-if="action.type === 'spacer'"></v-spacer>
      <v-btn
        :key="index"
        v-else-if="action.type === 'button-flat'"
        :class="action.class"
        :color="action.color"
        plain
        small
        @click="action.handler"
      >
        <v-icon class="me-1" small>{{ action.icon }}</v-icon>
        {{ action.title }}
      </v-btn>

      <v-tooltip v-else-if="action.type == 'button-icon'" bottom :key="index">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            x-small
            class="pa-5"
            @click="action.handler"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>{{ action.icon }}</v-icon>
          </v-btn>
        </template>

        {{ action.title }}
      </v-tooltip>

      <v-divider
        :key="index"
        v-else-if="action.type == 'divider'"
        class="mx-1"
        vertical
      ></v-divider>
    </template>
    <v-menu left bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on" x-small class="pa-5">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="n in 5" :key="n" @click="() => {}">
          <v-list-item-title>Option {{ n }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts">
//import { sync } from 'vuex-pathify';
import { useExportSchema, useExportUiSchema } from '../../util';
import store from '../../store';
import download from 'downloadjs';
import _ from 'lodash';
import uploadJson from '../Modals/uploadJson.vue';
import { defineComponent, inject, ref } from '@vue/composition-api';
export default defineComponent({
  name: 'ActionsBar',
  components: {
    uploadJson,
  },
  inject: ['bus'],
  computed: {},
  setup() {
    const bus = inject<any>('bus');
    const upload: any = ref(null);
    const formName = ref('Dunamis Form');
    const openDialog = ref(false);
    /**
     * Copy schemasfrom editor to preview
     */
    function copySchemasFromEditorToPreview() {
      store.dispatch('preview/setSchema', store.get('app/editor@schema'));
      store.dispatch('preview/setUiSchema', store.get('app/editor@uiSchema'));
      store.dispatch('preview/setLocale', store.get('app/jsonforms@locale'));
    }
    function onClickEditor() {
      let mainPanel = { id: 'main-editor' },
        sideBar = { id: 'side-bar-pallete' };
      store.dispatch('viewManager/setAllViews', {
        mainPanel,
        sideBar,
      });
    }
    function onClickPreviewBrowser() {
      let mainPanel = {
          id: 'main-preview',
          data: {
            mode: 'web',
            reload: _.random(0, 1000000),
          },
        },
        sideBar = { id: 'side-bar-preview' };
      copySchemasFromEditorToPreview();
      store.dispatch('viewManager/setAllViews', {
        mainPanel,
        sideBar,
      });
    }
    function onClickPreviewDevice() {
      let mainPanel = {
          id: 'main-preview',
          data: {
            mode: 'device',
            reload: _.random(0, 1000000),
          },
        },
        sideBar = { id: 'side-bar-preview' };
      copySchemasFromEditorToPreview();
      store.dispatch('viewManager/setAllViews', {
        mainPanel,
        sideBar,
      });
    }

    function onClickTranslations() {
      let mainPanel = { id: 'main-translations' },
        sideBar = { id: 'side-bar-translations' };
      store.dispatch('viewManager/setAllViews', {
        mainPanel,
        sideBar,
      });
    }
    function onClickSchemaEditor() {
      let mainPanel = { id: 'main-schema-editor' };
      store.dispatch('viewManager/setAllViews', {
        mainPanel,
      });
    }
    function onClickFormRules() {
      let mainPanel = { id: 'main-form-rules' };
      store.dispatch('viewManager/setAllViews', {
        mainPanel,
      });
    }
    function contentSave() {
      bus.$emit('translations::main-panel::save', {});
    }
    /**
     * Get a JSON from a schemaModel
     * @params schemaModel
     * @params type string
     */
    function getJson(schemaModel: any, type: string): any {
      if (type === 'uischema') {
        return JSON.stringify(
          schemaModel && schemaModel != ''
            ? useExportUiSchema(schemaModel)
            : '',
          null,
          2
        );
      }
      if (type === 'schema') {
        return JSON.stringify(
          schemaModel && schemaModel != '' ? useExportSchema(schemaModel) : '',
          null,
          2
        );
      }
    }

    function getCurrentTheme(): string {
      return JSON.stringify(store.getters['themes/getThemeSelected'], null, 2);
    }
    /**
     * Get a JSON with the uiSchema and Schema
     */
    function getFullJson(): any {
      let jsonUiSchema = getJson(store.get('app/editor@uiSchema'), 'uischema');
      let jsonSchema = getJson(store.get('app/editor@schema'), 'schema');
      let jsonTheme = getCurrentTheme();
      let jsonData = {
        schema: JSON.parse(jsonSchema),
        uischema: JSON.parse(jsonUiSchema),
        theme: JSON.parse(jsonTheme),
      };
      return jsonData;
    }
    /**
     * Create a file Json.
     */
    function downloadJson(): void {
      let fileName = formName,
        typeMime = 'text/plain';
      download(JSON.stringify(getFullJson()), fileName + '.json', typeMime);
    }
    function importJson(): void {
      if (upload?.value?.openDialog) {
        upload.value.openDialog();
      }
      if (openDialog.value) {
        openDialog.value = true;
      }
    }

    return {
      copySchemasFromEditorToPreview,
      importJson,
      downloadJson,
      getFullJson,
      getCurrentTheme,
      getJson,
      contentSave,
      onClickFormRules,
      onClickSchemaEditor,
      onClickTranslations,
      onClickPreviewDevice,
      onClickPreviewBrowser,
      onClickEditor,
      actions: ref([
        {
          title:
            (store.get('app/editor@information') &&
              store.get('app/editor@information').name) ||
            'Form Editor',
          type: 'title',
        },
        {
          type: 'spacer',
        },
        {
          type: 'button-flat',
          color: 'secondary',
          class: 'vpm-action-editor-btn',
          icon: 'mdi-pencil-ruler',
          handler: onClickEditor,
          title: 'Editor',
        },
        {
          type: 'button-flat',
          color: 'primary',
          class: 'vpm-action-editor-btn',
          icon: 'mdi-application-outline',
          handler: onClickPreviewBrowser,
          title: 'Browser',
        },
        {
          type: 'button-flat',
          color: 'warning',
          class: 'vpm-action-editor-btn',
          icon: 'mdi-cellphone',
          handler: onClickPreviewDevice,
          title: 'Device',
        },
        {
          type: 'spacer',
        },
        {
          type: 'button-icon',
          color: 'secondary',
          class: '',
          icon: 'mdi-vector-combine',
          handler: onClickFormRules,
          title: 'Form Rules',
        },
        {
          type: 'button-icon',
          color: 'secondary',
          class: '',
          icon: 'mdi-translate',
          handler: onClickTranslations,
          title: 'Translations',
        },
        {
          type: 'button-icon',
          color: 'secondary',
          class: '',
          icon: 'mdi-code-json',
          handler: onClickSchemaEditor,
          title: 'JSON Schema',
        },
        {
          type: 'divider',
        },
        {
          type: 'button-icon',
          color: 'warning',
          class: '',
          icon: 'mdi-content-save',
          handler: contentSave,
          title: 'Save',
        },
        {
          type: 'button-icon',
          color: 'warning',
          class: '',
          icon: 'mdi-download',
          handler: downloadJson,
          title: 'Export',
        },
        {
          type: 'button-icon',
          color: 'warning',
          class: '',
          icon: 'mdi-upload',
          handler: importJson,
          title: 'Import',
        },
      ]),
      openDialog,
      formName,
      upload,
    };
  },
});
</script>
<style>
.vpm-action-editor-btn {
  text-transform: initial;
  letter-spacing: normal;
}
</style>
