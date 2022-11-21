<template>
  <div>
    <v-list dense color="grey lighten-5" :key="key">
      <v-subheader>TRANSLATIONS</v-subheader>
      <v-list-item-group v-model="selectedLocale" color="gray">
        <v-list-item
          v-for="(item, i) in locales"
          :key="i"
          class="vpm-sidebar-i18n-list"
        >
          <div
            class="vpm-sidebar-i18n-title grey--text text--darken-1"
            plain
            small
          >
            <v-icon class="me-1" small>mdi-translate</v-icon>
            {{ item.description + ' - ' + item.key }}
          </div>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-list dense color="grey lighten-5">
      <v-list-item class="" dense>
        <v-subheader>Select new language </v-subheader>
      </v-list-item>
      <v-list-item dense>
        <v-combobox
          v-model="select"
          :items="codes"
          dense
          outlined
          class="caption"
        ></v-combobox>
      </v-list-item>
      <v-list-item class="float-end" dense>
        <v-btn
          class="vpm-action-editor-btn"
          color="primary"
          plain
          small
          @click="newLanguage"
        >
          <v-icon class="me-1" small>mdi-plus-circle</v-icon>
          Add
        </v-btn>
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts">
import _ from 'lodash';
import { defineComponent } from 'vue';
import languages from '../../api/languages';
import store from '../../store';
const SideBarI18n = defineComponent({
  name: 'SideBarI18n',
  components: {},
  computed: {
    codes(): any {
      return _.map(this.iso.languages, (v: any, k: any) => ({
        text: `${v} - ${k}`,
        key: k,
        label: v,
      }));
    },
    locales: {
      get() {
        return store.getters['locales/locales'];
      },
      set(val: any) {
        store.commit('locales/SET_LOCALES', val);
      },
    },
    itemsMainPanel: {
      get() {
        return store.getters['viewManager/mainPanelItems'];
      },
      set(val: any) {
        store.commit('viewManager/SET_MAIN_PANEL_ITEMS', val);
      },
    },
    activeMainPanel: {
      get() {
        return store.getters['viewManager/mainPanelActive'];
      },
      set(val: any) {
        store.commit('viewManager/SET_MAIN_PANEL_ACTIVE', val);
      },
    },
    locale: {
      get() {
        let dt: any = this.getDataMainPanel();
        return dt['locale'] ? dt['locale'] : {};
      },
      set(value) {
        let data: any = {
          locale: value,
        };
        if (this.getDataMainPanel()['view'] == 'json') {
          data.reload = _.random(0, 1000000);
        }
        this.setDataMainPanel(data);
      },
    },
    selectedLocale: {
      get() {
        let en: any = Object.keys(this.locales),
          index: any = en.indexOf(this.locale);
        this.localesKeys = en;
        return index == -1 ? 0 : index;
      },
      set(value) {
        this.locale = this.localesKeys[value];
      },
    },
  },
  data() {
    return {
      key: 1,
      select: null as any,
      localesKeys: [],
    };
  },
  setup(props: any) {
    return {
      iso: languages,
    };
  },
  methods: {
    /**
     * Add new language to store
     */
    newLanguage() {
      this.locales[this.select.key] = {
        key: this.select.key,
        description: this.select.label,
        content: _.cloneDeep(this.locales['en'].content),
      };
      this.key++;
      this.setDataMainPanel({
        reload: _.random(0, 1000000),
      });
    },
    setDataMainPanel(data: any) {
      store.dispatch('viewManager/setDataMainPanel', {
        id: 'main-translations',
        data,
      });
    },
    getDataMainPanel(): any {
      return store.getters['viewManager/getDataMainPanelById'](
        'main-translations'
      );
    },
  },
});
export default SideBarI18n;
</script>

<style>
.vpm-sidebar-i18n-title {
  text-transform: initial;
  letter-spacing: normal;
  font-size: 0.75rem;
  font-weight: 500;
}

.text-h5 {
  color: white;
}
</style>
