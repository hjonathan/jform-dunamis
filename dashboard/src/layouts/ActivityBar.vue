<template>
  <v-navigation-drawer
    mini-variant
    mini-variant-width="48"
    color="grey lighten-4"
  >
    <v-list dense nav>
      <v-list-item-group v-model="activeActivityBar">
        <v-list-item
          v-for="item in itemsActivityBar"
          :key="item.title"
          class="vpm-actbar-item"
        >
          <v-tooltip small right>
            <template v-slot:activator="{ on, attrs }">
              <v-list-item-action
                v-on="on"
                v-bind="attrs"
                class="vpm-actbar-item-icon"
              >
                <v-icon color="primary" small>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content v-on="on" v-bind="attrs">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <span>{{ item.title }}</span>
          </v-tooltip>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { sync } from 'vuex-pathify';
import store from '../store';
import _ from 'lodash';
import { defineComponent } from '@vue/composition-api';
export default defineComponent({
  name: 'ActivityBar',
  components: {},
  data() {
    return {
      mini: true,
    };
  },
  computed: {
    itemsActivityBar: sync('viewManager/activityBar.items'),
    activeActivityBar: {
      get(): any {
        return store.get('viewManager/activityBar@active');
      },
      set(val: any) {
        store.set('viewManager/activityBar@active', val);
        let id = this.itemsActivityBar[val].id,
          mainPanel = { id: '' },
          mainPanelExtend = { id: '' },
          actionsBar = { id: '' },
          sideBar = { id: '' };
        switch (id) {
          case 'activity-json-forms':
            sideBar.id = 'side-bar-dashboard';
            mainPanel.id = 'main-dashboard';
            actionsBar.id = 'actions-dashboard';
            break;
          case 'activity-json-form-editor':
            mainPanelExtend.id = 'main-panel-extend-dunamis-editor';
            break;
          case 'activity-data-sources':
            sideBar.id = 'side-bar-data-sources';
            mainPanel.id = 'main-data-sources-simple-lists';
            actionsBar.id = 'actions-data-sources';
            break;
        }

        this.$store.dispatch('viewManager/setAllViews', {
          sideBar,
          mainPanel,
          mainPanelExtend,
          actionsBar,
        });
      },
    },
    //sync('viewManager/activityBar.active'),
    itemsSideBar: sync('viewManager/sideBar.items'),
    activeSideBar: sync('viewManager/sideBar.active'),
  },
});
</script>
<style>
.vpm-actbar-item {
  justify-content: inherit !important;
}
.vpm-actbar-item-icon:hover {
  transform: scale(1.6, 1.6);
}
.vpm-actbar-item-icon {
  transition: transform 250ms;
}
</style>
