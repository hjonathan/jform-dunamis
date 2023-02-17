<template>
  <component
    v-bind:is="itemsSideBar[activeSideBar]['component']"
    ref="component"
  ></component>
</template>

<script lang="ts">
import PalletePanel from '../../DynaformEditor/PalletePanel.vue';
import PropertiesPanel from '../../PropertiesPanel/PropertiesPanelDynamic.vue';
import SideBarI18n from '../../i18n/sideBarI18n.vue';
import SideBarPreview from '../../DynaformPreview/sideBarDynaformPreview.vue';
import SideBarFormRules from '../../FormRules/SideBarFormRules.vue';
import SideBarDataSources from '../../DataSources/SideBarDataSources.vue';
import store from '../../../store';

export default {
  name: 'SideBar',
  components: {
    PalletePanel,
    PropertiesPanel,
    SideBarI18n,
    SideBarPreview,
    SideBarDataSources,
    SideBarFormRules,
  },
  data() {
    return {};
  },
  computed: {
    itemsSideBar: {
      get() {
        return store.getters['viewManager/sideBarItems'];
      },
      set(val: any) {
        store.commit('viewManager/SET_SIDE_BAR_ITEMS', val);
      },
    },
    activeSideBar: {
      get() {
        return store.getters['viewManager/sideBarActive'];
      },
      set(val: any) {
        store.commit('viewManager/SET_SIDE_BAR_ACTIVE', val);
      },
    },
  },
};
</script>
<style></style>
