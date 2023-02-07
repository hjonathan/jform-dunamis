import { ref, Ref, computed, onMounted, triggerRef } from 'vue';
import store from '../../store';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import _ from 'lodash';
import uuid from 'uuid';

export const usePaneli18n = (props: any): any => {
  const schema: any = ref(null);
  //const dataTranslations: Ref<Array<any>> = ref([]);
  const json: Ref<boolean> = ref(false);
  const key: Ref<number> = ref(1);

  const mainPanel = computed<any>({
    get() {
      return store.getters['viewManager/getMainPanelById']('main-translations');
    },
    set(value) {
      store.dispatch('viewManager/setMainPanel', {
        id: 'main-translations',
        mainPanel: value,
      });
    },
  });
  const view = computed<any>({
    get() {
      const dt =
        store.getters['viewManager/getDataMainPanelById']('main-translations');
      return dt.view;
    },
    set(value) {
      store.dispatch('viewManager/setDataMainPanel', {
        id: 'main-translations',
        data: {
          view: value,
        },
      });
    },
  });
  const locales = computed<any>({
    get() {
      return store.getters['locales/getLocales'];
    },
    set(val: any) {
      store.commit('locales/SET_LOCALES', val);
    },
  });
  const headers = computed<any>(() => {
    const name = [
      {
        text: 'Name',
        align: 'start',
        sortable: false,
        value: 'name',
      },
    ];
    const auxHeaders: any = _.map(locales.value, (v: any, k: any) => ({
      text: v.description,
      align: 'start',
      sortable: false,
      value: v.key,
    }));
    return name.concat(auxHeaders, {
      text: 'Actions',
      align: 'start',
      sortable: false,
      value: 'actions',
    });
  });
  const locale = computed<any>(() => {
    const dt =
      store.getters['viewManager/getDataMainPanelById']('main-translations');
    return dt.locale ? dt.locale : 'en';
  });
  const dataTranslations = computed<any>({
    get() {
      const result: any = [],
        keys = Object.keys(locales.value);
      //Create the initial values
      _.map(locales.value.en.content, (v, k) => {
        result.push({
          name: k,
          ['en']: v,
        });
      });
      //Create the others languages
      for (const e of result) {
        for (const k of keys) {
          if (k != 'en') {
            e[k] = locales.value[k].content[e.name];
          }
        }
      }
      return result;
    },
    set(val: any) {
      const auxLocales = _.cloneDeep(locales.value),
        auxClon = _.cloneDeep(val);
      for (const key in auxLocales) {
        auxLocales[key].content = {};
      }
      auxClon.forEach((el: any) => {
        for (const key in el) {
          if (key !== 'name') {
            auxLocales[key].content[el.name] = el[key];
          }
        }
      });
      locales.value = auxLocales;
    },
  });

  const contentSaveJson = (ev: any) => {
    if (ev.versionId % 10 == 0) {
      contentSave();
    }
  };
  const contentSave = () => {
    if (view.value == 'json') {
      store.dispatch('locales/updateLanguage', {
        key: locales.value[locale.value].key,
        description: locales.value[locale.value].description,
        content: JSON.parse(schema.value.getValue()),
      });
    }
    if (view.value === 'table') {
      const auxLocales = _.cloneDeep(locales.value),
        auxClon = _.cloneDeep(dataTranslations.value);
      for (const key in auxLocales) {
        auxLocales[key].content = {};
      }
      auxClon.forEach((el: any) => {
        for (const key in el) {
          if (key !== 'name') {
            auxLocales[key].content[el.name] = el[key];
          }
        }
      });
      locales.value = auxLocales;
    }
  };
  const toogleMode = () => {
    view.value = view.value == 'json' ? 'table' : 'json';
    //Reload the view JSON
    if (view.value == 'json') {
      store.dispatch('viewManager/setDataMainPanel', {
        id: 'main-translations',
        data: {
          reload: _.random(0, 1000000),
        },
      });
    }
  };
  const addRow = (item: any) => {
    const auxData = dataTranslations.value.reduce((acc, val) => {
      acc.push(val);
      val === item && acc.push(generateRecord(val, 'name'));
      return acc;
    }, []);
    dataTranslations.value = auxData;
  };
  const deleteRow = (item: any) => {
    const auxClon = _.cloneDeep(dataTranslations.value);
    auxClon.splice(dataTranslations.value.lastIndexOf(item), 1);
    dataTranslations.value = auxClon;
  };
  onMounted(() => {
    schema.value = monaco.editor.createModel(
      JSON.stringify(locales.value[locale.value]['content'], null, '\t'),
      'json'
    );
    schema.value.onDidChangeContent(contentSaveJson);
  });

  return {
    schema,
    json,
    key,
    mainPanel,
    view,
    locales,
    headers,
    locale,
    dataTranslations,
    contentSave,
    contentSaveJson,
    toogleMode,
    addRow,
    deleteRow,
  };
};

const generateRecord = (val: any, field: string) => {
  const aux = Object.assign({}, val);
  for (const key in aux) {
    aux[key] = '';
  }
  aux[field] = uuid();
  return aux;
};
