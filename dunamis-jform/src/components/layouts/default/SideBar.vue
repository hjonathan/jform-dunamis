<template>
  <component
    v-bind:is="itemsSideBar[activeSideBar]['component']"
    ref="component"
  ></component>
</template>

<script lang="ts">
import { sync } from 'vuex-pathify';
import _ from 'lodash';
import PalletePanel from '../../DynaformEditor/PalletePanel.vue';
import PropertiesPanel from '../../PropertiesPanel/PropertiesPanelDynamic.vue';
import SideBarI18n from '../../i18n/sideBarI18n.vue';
import SideBarPreview from '../../DynaformPreview/sideBarDynaformPreview.vue';

export default {
  name: 'SideBar',
  components: {
    PalletePanel,
    PropertiesPanel,
    SideBarI18n,
    SideBarPreview,
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
