<template>
  <v-app-bar elevation="0">
    <template v-for="(action, index) in actions">
      <v-toolbar-title :key="index" v-if="action.type === 'title'">{{
        action.title
      }}</v-toolbar-title>
      <v-spacer :key="index" v-else-if="action.type === 'spacer'"></v-spacer>
      <v-btn
        :key="index"
        v-else-if="action.type === 'button-flat'"
        :class="action.class"
        :color="action.color"
        plain
        small
        @click="action.handler"
      >
        <v-icon class="me-1" small>{{ action.icon }}</v-icon>
        {{ action.title }}
      </v-btn>

      <v-tooltip v-else-if="action.type == 'button-icon'" bottom :key="index">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            x-small
            class="pa-5"
            @click="action.handler"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>{{ action.icon }}</v-icon>
          </v-btn>
        </template>

        {{ action.title }}
      </v-tooltip>

      <v-divider
        :key="index"
        v-else-if="action.type == 'divider'"
        class="mx-1"
        vertical
      ></v-divider>
    </template>
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
//import { sync } from 'vuex-pathify';
import _ from 'lodash';
import { defineComponent, ref } from '@vue/composition-api';
import store from '../../store';
export default defineComponent({
  name: 'ActionsBar',
  components: {},
  inject: ['bus'],
  setup(): any {
    function showTemplates() {
      let mainPanel = { id: 'main-dashboard-templates' };
      store.dispatch('viewManager/setAllViews', {
        mainPanel,
      });
    }
    return {
      actions: ref([
        {
          title: 'My Forms',
          type: 'title',
        },

        {
          type: 'spacer',
        },
        {
          type: 'button-flat',
          color: 'primary',
          class: 'vpm-action-editor-btn',
          icon: 'mdi-plus',
          handler: showTemplates,
          title: 'Create a Form',
        },
      ]),
    };
  },
  computed: {},
  methods: {},
});
</script>
<style>
.vpm-action-editor-btn {
  text-transform: initial;
  letter-spacing: normal;
}
</style>
