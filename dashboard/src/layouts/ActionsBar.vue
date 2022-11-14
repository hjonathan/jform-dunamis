<template>
  <component v-bind:is="itemsActionsBar[activeActionsBar]['component']" />
</template>

<script lang="ts">
import { sync } from 'vuex-pathify';
import ActionsBarDataSources from '../modules/DataSources/ActionsBarDataSources.vue';
import ActionsBarDashboard from '../modules/Dashboard/ActionsBarDashboard.vue';
import store from '../store';

export default {
  name: 'ActionsBar',
  props: {},
  components: { ActionsBarDataSources, ActionsBarDashboard },
  data() {
    return {
      data: {},
    };
  },
  computed: {
    //itemsActionsBar: sync('viewManager/actionsBar.items'),
    itemsActionsBar: {
      get() {
        return store.getters['viewManager/actionsBarItem'];
      },
      set(val: any) {
        store.commit('viewManager/SET_ACTIONS_BAR_ITEMS', val);
      },
    },
    //activeActionsBar: sync('viewManager/actionsBar.active'),
    activeActionsBar: {
      get() {
        return store.getters['viewManager/actionsBarActive'];
      },
      set(val: any) {
        store.commit('viewManager/SET_ACTIONS_BAR_ACTIVE', val);
      },
    },
  },
  methods: {},
};
</script>
