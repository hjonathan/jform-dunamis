<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="text-h5">User Profile</span>
      </v-card-title>
      <v-card-text>
        <v-file-input
          v-model="file"
          accept=".json"
          label="File input"
          @change="readFile"
          ref="file-input"
          dense
          outlined
          persistent-placeholder
        ></v-file-input>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Cancel
        </v-btn>
        <v-btn color="blue darken-1" text @click="uploadFile"> Upload </v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar v-model="showToast" color="red" :timeout="timeout">
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="showToast = false">
          <v-icon> mdi-close-circle </v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <!--
      TODO Drag & Drop
      DO NOT Remove this code
    <v-card
      @drop.prevent="onDrop($event)"
      @dragover.prevent="dragover = true"
      @dragenter.prevent="dragover = true"
      @dragleave.prevent="dragover = false"
      :class="{ 'grey lighten-2': dragover }"
    >
      <v-card-text>
        <v-row class="d-flex flex-column" dense align="center" justify="center">
          <v-file-input
            prepend-icon="mdi-cloud-upload"
            class="iconInput"
            :class="[dragover ? 'mt-5 mb-8' : 'mt-6 mb-6']"
            @change="readFile"
            hide-input
          >
          </v-file-input>
          <p>Drop your file(s) here, or click to select them.</p>
        </v-row>
        <v-virtual-scroll
          v-if="uploadedFiles.length > 0"
          :items="uploadedFiles"
          item-height="50"
        >
          <template v-slot:default="{ item }">
            <v-list-item :key="item.name">
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.name }}
                  <span class="ml-3 text--secondary">
                    {{ item.size }} bytes</span
                  >
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
          </template>
        </v-virtual-scroll>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="closeDialog" icon>
          <v-icon id="close-button">mdi-close</v-icon>
        </v-btn>
        <v-btn icon @click.stop="submit">
          <v-icon id="upload-button">mdi-upload</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    -->
  </v-dialog>
</template>
<script>
import { defineComponent } from '@vue/composition-api';
import _ from 'lodash';
import { setDefaultTheme } from '../Composables/composableTheme';

const UploadJson = defineComponent({
  name: 'upload-json',
  setup() {
    const defaultTheme = {
      name: 'Default',
      light: {
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
      },
      fontFamily: 'Roboto',
      paddings: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      margins: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      background: {
        imgSrc: '',
        color: '#FFFFFF',
      },
    };

    function openDialog() {
      this.file = [];
      this.uploadedFile = [];
      this.contentFile = '';
      this.dialog = true;
    }
    function closeDialog() {
      this.dialog = false;
    }
    function readFile(file) {
      this.uploadedFile = [];
      this.uploadedFile.push(file);
    }
    function uploadFile() {
      try {
        const reader = new FileReader();
        reader.onload = this.handleFileLoad;
        reader.readAsText(this.uploadedFile[0]);
      } catch (e) {
        this.message = 'Please, select a file';
        this.showToast = true;
      }
    }
    function handleFileLoad(event) {
      this.contentFile = event.target.result;
      const schemaUpload = JSON.parse(this.contentFile)['schema'] || '';
      const uiSchemaUpload = JSON.parse(this.contentFile)['uischema'] || '';
      const themeUpload = JSON.parse(this.contentFile)['theme'] || '';
      if (schemaUpload !== '' && uiSchemaUpload !== '') {
        this.$store.dispatch('app/setSchema', {
          schema: schemaUpload,
        });
        this.$store.dispatch('app/setUiSchema', {
          uiSchema: uiSchemaUpload,
        });
        this.$store.dispatch('locales/setSchema', {
          properties: _.keys(schemaUpload.properties),
        });
        if (themeUpload !== '') {
          this.$store.set('themes/updateTheme', themeUpload);
          setDefaultTheme(this.$vuetify, themeUpload);
        } else {
          setDefaultTheme(this.$vuetify, defaultTheme);
        }
        this.dialog = false;
      } else {
        this.message = 'Json format not valid.';
        this.showToast = true;
      }
    }
    function onDrop(e) {
      this.dragover = false;
      if (this.uploadedFile.length > 0) this.uploadedFile = [];
      this.uploadedFile.push(e.dataTransfer.files[0]);
    }
    return {
      file: [],
      uploadedFiles: [],
      contentFile: '',
      dialog: false,
      dragover: false,
      showToast: false,
      message: '',
      timeout: 2000,
      openDialog,
      closeDialog,
      readFile,
      uploadFile,
      handleFileLoad,
      onDrop,
    };
  },
  methods: {},
});
export default UploadJson;
</script>
<style scoped>
.v-virtual-scroll {
  overflow: hidden;
}
</style>
<style>
.iconInput .v-icon {
  font-size: 100px;
}
</style>
