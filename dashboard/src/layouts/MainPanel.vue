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
import { sync } from 'vuex-pathify';
import MainPanelDataSourcesSimpleLists from '../modules/DataSources/MainPanelDataSourcesSimpleList.vue';
import MainPanelDataSourcesApi from '../modules/DataSources/MainPanelDataSourcesApi.vue';
import MainPanelDashboard from '../modules/Dashboard/MainPanelDashboard.vue';
import MainPanelDashboardTemplates from '../modules/Dashboard/MainPanelDashboardTemplates.vue';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'mainPanel',
  props: {},
  components: {
    MainPanelDataSourcesSimpleLists,
    MainPanelDataSourcesApi,
    MainPanelDashboard,
    MainPanelDashboardTemplates,
  },
  data() {
    return {
      data: {},
    };
  },
  computed: {
    itemsMainPanel: sync('viewManager/mainPanel.items'),
    activeMainPanel: sync('viewManager/mainPanel.active'),
  },
  methods: {},
});
</script>
