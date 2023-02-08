<template>
  <div>
    <v-container>
      <v-btn
        class="vpm-action-editor-btn float-end"
        plain
        small
        :color="view != 'json' ? 'primary' : 'warning'"
        @click="toogleMode"
      >
        <v-icon small class="me-1">{{
          view != 'json' ? 'mdi-code-json' : 'mdi-table'
        }}</v-icon>
        {{ view != 'json' ? 'JSON' : 'Table' }}
      </v-btn>
    </v-container>
    <v-container v-if="view != 'json'">
      <v-data-table :headers="headers" :items="dataTranslations">
        <template
          v-for="(slot, i) in headers"
          v-slot:[`item.${slot.value}`]="{ item }"
        >
          <v-text-field
            v-if="slot.value != 'name'"
            :key="i"
            dense
            single-line
            class="vpm-item-list caption"
            :label="slot.value"
            v-model="item[slot.value]"
            @change="contentSave"
          >
            {{ item[slot.value] }}</v-text-field
          >
          <v-text-field
            v-else
            prepend-icon="mdi-alphabetical-variant"
            :key="i"
            dense
            single-line
            class="vpm-item-list caption"
            :label="slot.value"
            v-model="item[slot.value]"
            @change="contentSave"
          >
            {{ item[slot.value] }}</v-text-field
          >
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="addRow(item)"> mdi-plus </v-icon>
          <v-icon small @click="deleteRow(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-container>
    <v-container v-else>
      <monaco-editor
        :key="key"
        :theme="$vuetify.theme.dark ? 'vs-dark' : 'vs'"
        height="100vh"
        :options="{ minimap: { enabled: false }, fontSize: 11 }"
        :language="`json`"
        v-model="schema"
      ></monaco-editor>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MonacoEditor from '../MonacoEditor.vue';

import { usePaneli18n } from './mainPaneli18nComp';
const MainPanelI18n = defineComponent({
  name: 'MainPanelI18n',
  inject: ['bus'],
  components: { MonacoEditor },
  setup(props: any) {
    return usePaneli18n(props);
  },
});
export default MainPanelI18n;
</script>
<style>
.vpm-action-editor-btn {
  text-transform: initial;
  letter-spacing: normal;
}
</style>
