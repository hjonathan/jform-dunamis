<template>
  <v-card
    no-gutters
    height="auto"
    width="100%"
    color="transparent"
    elevation="0"
  >
    <component
      :key="itemsMainPanel[activeMainPanel]['data']['reload']"
      v-bind:is="itemsMainPanel[activeMainPanel]['component']"
    />
  </v-card>
</template>

<script lang="ts">
import { createLayout } from '../../../util';
import DynaformEditor from '../../DynaformEditor/DynaformEditor.vue';
import MainPanelI18n from '../../i18n/mainPanelI18n.vue';
import MainPanelDynaformPreview from '../../DynaformPreview/mainPanelDynaformPreview.vue';

import MainPanelSchemaEditor from '../../SchemaEditor/mainPanelSchemaEditor.vue';
import MainPanelFormRules from '../../FormRules/MainPanelFormRules.vue';
import { defineComponent } from 'vue';
import store from '../../../store';

export default defineComponent({
  name: 'mainPanel',
  props: {},
  components: {
    DynaformEditor,
    MainPanelI18n,
    MainPanelDynaformPreview,
    MainPanelSchemaEditor,
    MainPanelFormRules,
  },
  data() {
    return {
      data: {},
    };
  },
  mounted() {
    store.dispatch('app/setSchema', {
      schema: {
        type: 'object',
        title: 'Dynaform',
        properties: {},
      },
    });
    store.dispatch('app/setUiSchema', {
      uiSchema: createLayout('VerticalLayout'),
    });
  },
  computed: {
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
  },
  methods: {},
});
</script>
