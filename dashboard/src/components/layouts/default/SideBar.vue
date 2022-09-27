<template>
  <component
    v-bind:is="itemsSideBar[activeSideBar]['component']"
    ref="component"
  ></component>
</template>

<script lang="ts">
import { sync } from 'vuex-pathify';
import _ from 'lodash';
import SideBarDataSources from '../../../modules/DataSources/SideBarDataSources.vue';
import SideBarDashboard from '../../../modules/Dashboard/SideBarDashboard.vue';

export default {
  name: 'SideBar',
  components: {
    SideBarDataSources,
    SideBarDashboard,
  },
  data() {
    return {};
  },
  computed: {
    itemsSideBar: sync('viewManager/sideBar.items'),
    activeSideBar: sync('viewManager/sideBar.active'),
  },
};
</script>
<style></style>
