<template>
  <v-card elevation="0" class="fill-height" color="transparent">
    <v-scroll-y-transition mode="out-in">
      <v-row class="pa-2 fill-height" justify="space-between">
        <v-col
          style="min-width: 100px; max-width: 100%"
          class="flex-grow-1 flex-shrink-0"
          cols="5"
        >
          <Templates @preview="previewTemplate" />
        </v-col>

        <v-col
          cols="7"
          style="min-width: 100px"
          class="flex-grow-0 flex-shrink-1 justify-center"
        >
          <div
            tabindex="-1"
            class="v-stepper__step subtitle-2 v-stepper__step--active"
          >
            <span class="v-stepper__step__step">
              <v-icon color="primary"> mdi-eye </v-icon>
            </span>
            <div class="v-stepper__label font-weight-bold">
              TEMPLATE PREVIEW
              <small>See a preview template selected</small>
            </div>
            <v-btn
              color="primary"
              plain
              small
              @click="selectTemplate"
              class="vpm-main-panel-ds-btn float-end"
              :disabled="schemaIsNotLoaded"
            >
              Use This Template
            </v-btn>
          </div>

          <v-scroll-y-transition mode="out-in">
            <TemplatePreview :key="key" :theme="theme" />
          </v-scroll-y-transition>
        </v-col>
      </v-row>
    </v-scroll-y-transition>
  </v-card>
</template>

<script lang="ts">
import _ from 'lodash';
import { computed, defineComponent, ref } from '@vue/composition-api';
import Templates from './Templates.vue';
import TemplatePreview from './TemplatePreview.vue';
import store from '../../store';
import { uuid } from 'uuidv4';
import { useExportSchema, useExportUiSchema } from '../../util';
import { setDefaultTheme } from '../../components/Composables/composableTheme';

const MainPanelDashboard = defineComponent({
  name: 'MainPanelDashboard',
  components: { Templates, TemplatePreview },
  computed: {
    schemaIsNotLoaded() {
      // Checks if there is a schema preview selected to enable the Use This Template button.
      let loaded = this.$store.get('preview/uiSchema').elements;
      return loaded === undefined || loaded.length == 0;
    },
    information() {
      return this.$store.get('app/editor@information');
    },
  },
  setup(props: any) {
    let key = ref(0);
    let theme = ref({});
    let previewTemplate = (item: any) => {
      key.value++;
      theme = item.input.theme;
    };
    return { previewTemplate, key, theme };
  },

  methods: {
    selectTemplate() {
      // Load the form editor view with the 'Use This Template' button.
      this.$store.dispatch('dashboard/addForm', {
        uuid: uuid(),
        name: this.information.name,
        description: this.information.description,
        category: this.information.category,
        type: this.information.type,
        modified: new Date().toJSON().slice(0, 10),
        created: new Date().toJSON().slice(0, 10),
        schemas: {
          schema: useExportSchema(this.$store.get('app/editor@schema')),
          uiSchema: useExportUiSchema(this.$store.get('app/editor@uiSchema')),
        },
      });
      let activityBar = { id: 'activity-json-form-editor' },
        mainPanel = { id: 'main-editor' },
        actionsBar = { id: 'actions-editor' },
        sideBar = { id: 'side-bar-pallete' };
      this.$store.dispatch('viewManager/setAllViews', {
        activityBar,
        sideBar,
        mainPanel,
        actionsBar,
      });
      let theme = this.$store.getters['themes/getThemeSelected'];
      setDefaultTheme(this.$vuetify, theme);
    },
  },
});
export default MainPanelDashboard;
</script>
<style></style>
