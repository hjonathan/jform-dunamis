<template>
  <v-app-bar flat outline>
    <v-icon class="pe-2">mdi-database</v-icon>
    <v-toolbar-title class="subtitle-2 font-weight-medium">
      DATA SOURCES
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn
      class="vpm-action-editor-btn"
      color="primary"
      elevation="0"
      plain
      small
      @click="changeView('json')"
    >
      <v-icon class="me-1" small>mdi-plus-circle</v-icon>
      Add Data Source
    </v-btn>
    <v-divider class="mx-1" vertical></v-divider>

    <v-btn icon x-small class="pa-5" @click.stop.prevent="saveTranslations">
      <v-icon>mdi-content-save</v-icon>
    </v-btn>

    <v-menu left bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on" x-small class="pa-5">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="n in 5" :key="n" @click="() => {}">
          <v-list-item-title>Option {{ n }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent, inject } from '@vue/composition-api';
import store from '../../store';
import _ from 'lodash';
const ActionsBarDataSources = defineComponent({
  name: 'ActionsBarDataSources',
  components: {},
  computed: {},
  inject: ['bus'],
  setup(): any {
    const bus = inject<any>('bus');
    function saveTranslations() {
      bus.$emit('translations::main-panel::save', {});
    }
    function changeView(v: any) {
      store.dispatch('viewManager/setDataMainPanel', {
        id: 'main-translations',
        data: {
          reload: _.random(0, 1000000),
          view: v,
        },
      });
    }
    return {
      saveTranslations,
      changeView,
    };
  },
});
export default ActionsBarDataSources;
</script>
<style>
.vpm-action-editor-btn {
  text-transform: initial;
  letter-spacing: normal;
}
</style>
