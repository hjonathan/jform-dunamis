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
            @blur="contentSave"
          >
            {{ item[slot.value] }}</v-text-field
          >
          <v-btn
            v-else
            :key="i"
            color="gray"
            plain
            small
            class="vpm-action-editor-btn"
          >
            <v-icon color="warning" class="me-1" small
              >mdi-alphabetical-variant</v-icon
            >
            {{ item[slot.value] }}
          </v-btn>
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
import { sync } from 'vuex-pathify';
import _ from 'lodash';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { defineComponent } from '@vue/composition-api';
import MonacoEditor from '../MonacoEditor.vue';
const MainPanelI18n = defineComponent({
  name: 'MainPanelI18n',
  inject: ['bus'],
  components: { MonacoEditor },
  computed: {
    mainPanel: {
      get() {
        return this.$store.getters['viewManager/getMainPanelById'](
          'main-translations'
        );
      },
      set(value) {
        this.$store.dispatch('viewManager/setMainPanel', {
          id: 'main-translations',
          mainPanel: value,
        });
      },
    },
    view: {
      get() {
        let dt =
          this.$store.getters['viewManager/getDataMainPanelById'](
            'main-translations'
          );
        return dt.view;
      },
      set(value) {
        this.$store.dispatch('viewManager/setDataMainPanel', {
          id: 'main-translations',
          data: {
            view: value,
          },
        });
      },
    },
    locales: sync('locales'),
    headers() {
      let name = [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
      ];

      let headers: any = _.map(this.locales, (v: any, k: any) => ({
        text: v.description,
        align: 'start',
        sortable: false,
        value: v.key,
      }));

      return name.concat(headers);
    },
    dataTranslations() {
      let result: any = [],
        keys = Object.keys(this.locales);
      //Create the initial values
      _.map(this.locales.en.content, (v, k) => {
        result.push({
          name: k,
          ['en']: v.label,
        });
      });
      //Create the others languages
      for (let e of result) {
        for (let k of keys) {
          if (k != 'en') {
            e[k] = this.locales[k].content[e.name].label;
          }
        }
      }
      return result;
    },
    locale() {
      let dt =
        this.$store.getters['viewManager/getDataMainPanelById'](
          'main-translations'
        );

      return dt.locale ? dt.locale : 'en';
    },
  },
  data: function () {
    return {
      schema: null as any,
      json: false,
      key: 1,
    };
  },
  mounted() {
    this.bus.$on('translations::main-panel::save', this.saveContent);
    this.schema = monaco.editor.createModel(
      JSON.stringify(this.locales[this.locale]['content'], null, '\t'),
      'json'
    );
    this.schema.onDidChangeContent(this.contentSaveJson);
  },
  destroyed() {
    this.bus.$off('translations::main-panel::save');
  },
  methods: {
    toogleMode() {
      this.view = this.view == 'json' ? 'table' : 'json';
      //Reload the view JSON
      if (this.view == 'json') {
        this.$store.dispatch('viewManager/setDataMainPanel', {
          id: 'main-translations',
          data: {
            reload: _.random(0, 1000000),
          },
        });
      }
    },
    contentSaveJson(ev: any) {
      if (ev.versionId % 10 == 0) {
        this.contentSave();
      }
    },
    contentSave() {
      if (this.view == 'json') {
        this.$store.dispatch('locales/updateLanguage', {
          key: this.locales[this.locale].key,
          description: this.locales[this.locale].description,
          content: JSON.parse(this.schema.getValue()),
        });
      } else {
        for (const [index, value] of this.dataTranslations.entries()) {
          for (let key in value) {
            if (key != 'name') {
              this.locales[key].content[value.name]['label'] = value[key];
            }
          }
        }
        this.$store.dispatch('locales/setAll', _.cloneDeep(this.locales));
      }
    },
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
