<template>
  <div>
    <div class="py-2 d-flex" v-if="view == 'list'">
      <v-card
        v-for="(collection, index) in collections"
        :key="index"
        class="mx-2"
        max-width="220"
        max-height="220"
        outlined
      >
        <v-card-text>
          <span class="subtitle-1 text--primary">{{ collection.name }}</span>
          <div class="caption">Last update 25/05/2022</div>

          <div class="text--primary caption">
            <v-chip
              v-for="(field, indexf) in collection.fields"
              :key="indexf"
              class="me-1 mt-1 pa-4"
              label
              x-small
              >{{ field.field }}</v-chip
            >
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            plain
            small
            text
            color="primary accent-4"
            @click="reveal = true"
          >
            Learn More
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <div v-else-if="view == 'add'">
      <v-stepper v-model="e6" vertical>
        <v-stepper-step :complete="e6 > 1" step="1">
          Create a Collection
          <small>Give the collection an ID</small>
        </v-stepper-step>

        <v-stepper-content step="1">
          <v-card outlined color="" class="mb-4">
            <v-text-field
              class="caption"
              label="Collection ID"
              prepend-icon="mdi-google-circles-extended"
            ></v-text-field>
          </v-card>

          <v-btn color="primary" @click="e6 = 2"> Continue </v-btn>
          <v-btn text> Cancel </v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 2" step="2">
          Configure analytics for this app
        </v-stepper-step>

        <v-stepper-content step="2">
          <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
          <v-btn color="primary" @click="e6 = 3"> Continue </v-btn>
          <v-btn text> Cancel </v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 3" step="3">
          Select an ad format and name ad unit
        </v-stepper-step>

        <v-stepper-content step="3">
          <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
          <v-btn color="primary" @click="e6 = 4"> Continue </v-btn>
          <v-btn text> Cancel </v-btn>
        </v-stepper-content>

        <v-stepper-step step="4"> View setup instructions </v-stepper-step>
        <v-stepper-content step="4">
          <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
          <v-btn color="primary" @click="e6 = 1"> Continue </v-btn>
          <v-btn text> Cancel </v-btn>
        </v-stepper-content>
      </v-stepper>
    </div>
  </div>
</template>

<script lang="ts">
import { sync } from 'vuex-pathify';
import _ from 'lodash';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { computed, defineComponent, ref } from '@vue/composition-api';
import MonacoEditor from '@/components/MonacoEditor.vue';

import store from '../../store';
const MainPanelDataSources = defineComponent({
  name: 'MainPanelDataSources',
  inject: ['bus'],
  components: { MonacoEditor },
  computed: {},
  data: function () {
    return {
      e6: 1,
      reveal: false,
    };
  },
  methods: {},
  setup(props: any) {
    let collections = computed(sync('dataSources/collections'));
    let view = ref('add'); //list-add-table
    return { collections, view };
  },
});
export default MainPanelDataSources;
</script>
<style>
.vpm-action-editor-btn {
  text-transform: initial;
  letter-spacing: normal;
}
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
}
</style>
