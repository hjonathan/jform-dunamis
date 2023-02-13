<template>
  <v-card elevation="0" class="fill-height" color="transparent">
    <div
      tabindex="-1"
      class="v-stepper__step subtitle-2 v-stepper__step--active"
    >
      <span class="v-stepper__step__step">
        <v-icon color="primary"> mdi-mirror-rectangle </v-icon>
      </span>
      <div class="v-stepper__label font-weight-bold">
        START A NEW FORM
        <small>Start a new form or import a one</small>
      </div>
    </div>
    <div class="d-flex justify-center">
      <v-card
        flat
        outlined
        class="pa-2 ma-2 d-flex justify-center"
        min-width="60"
        min-height="80"
        @click="createBlankForm"
      >
        <v-row align="center" justify="center">
          <v-col align="center">
            <v-icon color="primary lighten-1">mdi-plus</v-icon>
          </v-col>
        </v-row>
      </v-card>

      <v-card
        flat
        outlined
        class="pa-2 ma-2 d-flex justify-center"
        min-width="60"
        min-height="80"
        @click="false"
      >
        <v-row align="center" justify="center">
          <v-col align="center">
            <v-icon color="primary lighten-1">mdi-import</v-icon>
          </v-col>
        </v-row>
      </v-card>
    </div>

    <div
      tabindex="-1"
      class="v-stepper__step subtitle-2 v-stepper__step--active"
    >
      <span class="v-stepper__step__step">
        <v-icon color="primary"> mdi-mirror-rectangle </v-icon>
      </span>
      <div class="v-stepper__label font-weight-bold">
        CHOOSE A TEMPLATE
        <small
          >Select a template from the largest selection of free forms templates
          available online</small
        >
      </div>
    </div>
    <div>
      <v-list dense color="transparent">
        <v-list-item-group color="primary">
          <v-list-item
            v-for="item in temples"
            :key="item.title"
            dense
            @dblclick="createFromTemplate(item)"
            @click="previewTemplate(item)"
          >
            <v-list-item-avatar size="25" color="accent">
              <v-icon class="grey lighten-1" x-small color="white">
                mdi-card
              </v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title> {{ item.title }} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
  </v-card>
</template>

<script lang="ts">
//@ts-nocheck
import _ from 'lodash';
import { computed, defineComponent, ref, watch } from '@vue/composition-api';
import { TemplateSchemaService } from '../../api/schemaService';
import store from '../../store';
import { v4 as uuid } from 'uuid';
//import { useExportSchema, useExportUiSchema, createLayout } from '../../util';

const Templates = defineComponent({
  name: 'Templates',
  components: {},
  data: function () {
    return {};
  },
  setup(props: any, context: any) {
    let templates = ref(null as any);
    let selectedItem = ref(null);
    let temples = ref([] as any);
    let icons = ref(['mdi-eye', 'mdi-play']);
    let transparent = ref('rgba(255, 255, 255, 0)');
    let defaultTemples = ref([
      {
        title: 'Blank form',
        icon: 'mdi-file',
      },
      {
        title: 'Import form',
        icon: 'mdi-import',
      },
    ]);

    let createBlankForm = () => {
      let schema = {
          type: 'object',
          title: 'Dynaform',
          properties: {},
        },
        uiSchema = createLayout('VerticalLayout');
      store.dispatch('app/setSchema', {
        schema: schema,
      });
      store.dispatch('app/setUiSchema', {
        uiSchema: uiSchema,
      });
      store.dispatch('dashboard/addForm', {
        uuid: uuid(),
        name: 'Blank form',
        description: '',
        category: 'General',
        type: 'Form',
        modified: new Date().toJSON().slice(0, 10),
        created: new Date().toJSON().slice(0, 10),
        schemas: {
          schema,
          uiSchema,
        },
      });
      // Load the form editor view with the 'Use This Template' button.
      let activityBar = { id: 'activity-json-form-editor' },
        mainPanel = { id: 'main-editor' },
        actionsBar = { id: 'actions-editor' },
        sideBar = { id: 'side-bar-pallete' };
      store.dispatch('viewManager/setAllViews', {
        activityBar,
        sideBar,
        mainPanel,
        actionsBar,
      });
      store.dispatch('themes/setTheme');
      return;
    };

    new TemplateSchemaService()
      .getTemplates()
      .then((res: any) => {
        templates.value = res;
        res.forEach((element: any) => {
          temples.value = _.concat(temples.value, element.items);
        });
      })
      .catch((err: any) => {
        console.log(err);
      });
    return {
      templates,
      temples,
      defaultTemples,
      icons,
      selectedItem,
      createBlankForm,
      transparent,
    };
  },
  methods: {
    onClickListItem(e: any) {
      // this.$store.dispatch('viewManager/setAllViews', {
      //   mainPanel: {
      //     id: 'main-dashboard',
      //     data: {
      //       reload: _.random(0, 10000),
      //       form: e.input,
      //     },
      //   },
      // });
    },
    previewTemplate: function (item) {
      // this.$store.dispatch('app/setSchema', {
      //   schema: item.input.schema,
      // });
      // this.$store.dispatch('app/setUiSchema', {
      //   uiSchema: item.input.uischema,
      // });
      // this.$store.dispatch('locales/setSchema', {
      //   properties: _.keys(item.input.schema.properties),
      // });
      // //set form information
      // this.$store.dispatch('app/setInfomation', {
      //   name: item.title,
      //   description: '',
      //   category: 'General',
      //   type: 'Form',
      //   modified: new Date().toJSON().slice(0, 10),
      //   created: new Date().toJSON().slice(0, 10),
      // });
      // this.$store.set('themes/updateTheme', item.input.theme);
      // this.$emit('preview', item);
    },
    createFromTemplate: function (template) {
      // store.dispatch('dashboard/addForm', {
      //   name: template.title,
      //   description: '',
      //   category: 'General',
      //   type: 'Form',
      //   modified: new Date().toJSON().slice(0, 10),
      //   created: new Date().toJSON().slice(0, 10),
      //   schemas: {
      //     schema: useExportSchema(this.$store.get('app/editor@schema')),
      //     uiSchema: useExportUiSchema(this.$store.get('app/editor@uiSchema')),
      //   },
      // });
      // // Load the form editor view with the 'Use This Template' button.
      // let activityBar = { id: 'activity-json-form-editor' },
      //   mainPanel = { id: 'main-editor' },
      //   actionsBar = { id: 'actions-editor' },
      //   sideBar = { id: 'side-bar-pallete' };
      // store.dispatch('viewManager/setAllViews', {
      //   activityBar,
      //   sideBar,
      //   mainPanel,
      //   actionsBar,
      // });
    },
  },
});
export default Templates;
</script>
<style>
.vpm-action-dashboard-btn {
  text-transform: initial;
  letter-spacing: normal;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}

.vpm-float-icons {
  height: 100%;
  width: 100%;
  text-align: center;
  line-height: 50px;
  position: absolute;
}

.vpm-float-icons-hover {
  background-color: #00000047;
  height: 100%;
  width: 100%;
  text-align: center;
  line-height: 48px;
  position: absolute;
}

.vpm-padding-zero {
  padding: 0 !important;
}
</style>
