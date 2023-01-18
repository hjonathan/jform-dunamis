<template>
  <v-card elevation="0" class="fill-height" color="transparent">
    <v-row class="pa-2 fill-height" justify="space-between">
      <v-col cols="6">
        <div
          tabindex="-1"
          class="v-stepper__step subtitle-2 v-stepper__step--active"
        >
          <span class="v-stepper__step__step">
            <v-icon color="primary"> mdi-api </v-icon>
          </span>
          <div class="v-stepper__label font-weight-bold">
            APIs
            <small>Add your APIs</small>
          </div>
          <v-btn
            class="vpm-action-editor-btn"
            color="primary"
            elevation="0"
            plain
            small
            @click="showApiWizard"
          >
            <v-icon class="me-1" small>mdi-plus-circle</v-icon>
            Add
          </v-btn>
        </div>

        <v-simple-table color="transparent" light>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-end"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in apis" :key="item.id">
                <td>
                  <span class="caption"> {{ item.name }}</span>
                </td>
                <td class="no-gutters text-end">
                  <v-btn
                    small
                    icon
                    @click="showApi(item, index)"
                    color="warning lighten-1"
                  >
                    <v-icon small> mdi-pencil </v-icon>
                  </v-btn>
                  <v-btn
                    small
                    icon
                    color="error lighten-1"
                    @click="deleteSimpleList(index)"
                    ><v-icon small> mdi-delete </v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="6" class="d-flex justify-center">
        <v-scroll-y-transition mode="out-in">
          <ApiConfig
            :key="selectedItem.id"
            :data="transformedItem"
            :mode="mode"
            @updateApi="updateApi"
            @addApi="addApi"
          />
        </v-scroll-y-transition>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import _ from 'lodash';
import { computed, defineComponent, ref } from 'vue';
import ApiConfig from './Apis/ApiConfig.vue';
import ApiOptions from './Apis/ApiOptions.vue';
import store from '../../store';

const MainPanelDataSourcesApi = defineComponent({
  name: 'MainPanelDataSourcesApi',
  components: { ApiConfig, ApiOptions },
  computed: {},
  setup(props: any) {
    let mode = ref('add'),
      apiOptionsRef = ref(null),
      transformedItem: any = ref({
        id: '',
        name: '',
        data: {
          url: '',
          method: 'GET',
          params: [],
          headers: [],
          body: [],
          dataInputVariables: [],
          output: '',
        },
      }),
      selectedIndex = ref(0),
      selectedItem = ref({
        id: '',
        name: '',
        data: {
          url: '',
          method: 'GET',
          params: {},
          headers: {},
          body: {},
          dataInputVariables: [],
          output: '',
        },
      });
    let apis = computed({
      get() {
        return store.getters['dataSources/getApis'];
      },
      set(newValue) {
        store.dispatch('dataSources/setApis', newValue);
      },
    });
    let deleteSimpleList = (index: any) => {
      let clone: any = _.clone(apis.value);
      clone = _.concat(
        _.slice(clone, 0, index),
        _.slice(clone, index + 1, clone.length)
      );
      apis.value = clone;
    };

    let showApi = (item: any, index: number) => {
      selectedItem.value = item;
      selectedIndex.value = index;
      transformedItem.value = {
        id: item.id,
        name: item.name,
        data: {
          url: item.data.url,
          method: item.data.method,
          params: convertObjectToArray(item.data.params),
          headers: convertObjectToArray(item.data.headers),
          body: convertObjectToArray(item.data.body),
          dataInputVariables: item.data.dataInputVariables,
          output: item.data.output,
        },
      };
      mode.value = 'edit';
    };

    let showApiWizard = () => {
      let idRandom = autogenerateID();
      selectedIndex.value = -1;
      transformedItem.value = {
        id: idRandom,
        name: '',
        data: {
          url: '',
          method: 'GET',
          params: [],
          headers: [],
          body: [],
          dataInputVariables: [],
          output: '',
        },
      };
      mode.value = 'add';
    };

    let convertObjectToArray = (obj: any) => {
      return Object.keys(obj).map((key) => {
        return { key: key, value: obj[key] };
      });
    };

    let updateApi = (data: any) => {
      let clone: any = _.cloneDeep(apis.value);
      clone[selectedIndex.value] = { ...clone[selectedIndex.value], ...data };
      apis.value = clone;
      selectedItem.value = data;
    };

    let addApi = (data: any) => {
      let clone: any = _.cloneDeep(apis.value);
      clone.push(data);
      apis.value = clone;
      showApiWizard();
    };

    function autogenerateID() {
      return Math.random().toString(36).substr(2, 10);
    }

    return {
      apis,
      mode,
      selectedItem,
      apiOptionsRef,
      deleteSimpleList,
      showApi,
      addApi,
      updateApi,
      showApiWizard,
      autogenerateID,
      transformedItem,
    };
  },
  methods: {},
});
export default MainPanelDataSourcesApi;
</script>
<style></style>
