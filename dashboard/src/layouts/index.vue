<template>
  <v-app>
    <div class="d-block vpm-height-16">
      <default-app-bar />
    </div>
    <div class="d-block fill-height">
      <v-row class="vpm-row-layout fill-height" no-gutters>
        <v-col
          cols="1"
          style="min-width: 48px; max-width: 48px"
          class="flex-grow-1 flex-shrink-0"
        >
          <default-activity-bar />
        </v-col>
        <v-col
          cols="12"
          style="min-width: 100px; max-width: 100%"
          class="flex-grow-0 flex-shrink-1 grey lighten-5"
        >
          <v-row no-gutters style="flex-wrap: nowrap">
            <default-actions-bar />
          </v-row>
          <v-row no-gutters class="vpm-centralpanel-layout fill-height">
            <v-col
              cols="2"
              style="min-width: 100px; max-width: 100%"
              class="flex-grow-1 flex-shrink-0 vpm-sidebar-layout"
            >
              <default-side-bar />
            </v-col>

            <v-col
              cols="10"
              style="min-width: 100px"
              class="vpm-mainpanel-layout flex-grow-0 flex-shrink-1"
            >
              <default-view />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
    <v-footer padless fixed>
      <v-spacer></v-spacer>
      <div color="success">
        <v-icon color="success"> mdi-check-circle </v-icon>
        <span>Changes saved</span>
      </div>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import AppBar from './AppBar.vue';
import ActivityBar from './ActivityBar.vue';
import ActionsBar from './ActionsBar.vue';
import SideBar from './SideBar.vue';
import MainPanel from './MainPanel.vue';
import Vue from 'vue';
import store from '../store';
import ServicesProvider from '../services/ServicesProvider';

export default {
  name: 'DefaultLayout',
  components: {
    DefaultAppBar: AppBar,
    DefaultActionsBar: ActionsBar,
    DefaultView: MainPanel,
    DefaultSideBar: SideBar,
    DefaultActivityBar: ActivityBar,
  },
  provide() {
    // use function syntax so that we can access `this`
    return {
      bus: new Vue(),
      serviceProvider: ServicesProvider,
      store: store,
    };
  },
};
</script>
<style>
.vpm-height-16 {
  height: 64px;
}

.vpm-row-layout {
  flex-wrap: nowrap;
}

.vpm-centralpanel-layout {
  flex-wrap: nowrap;
  height: calc(100vh - 10%);
}

.vpm-sidebar-layout {
  overflow-y: scroll;
}

.vpm-sidebar-layout::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  background-color: #f5f5f5;
}

.vpm-sidebar-layout::-webkit-scrollbar {
  width: 4px;
  background-color: #f5f5f5;
}

.vpm-sidebar-layout::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #fff;
}

.vpm-mainpanel-layout {
  overflow-y: scroll;
}

.vpm-mainpanel-layout::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  background-color: #f5f5f5;
}

.vpm-mainpanel-layout::-webkit-scrollbar {
  width: 4px;
  background-color: #f5f5f5;
}

.vpm-mainpanel-layout::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #fff;
}
html {
  overflow-y: hidden;
}
</style>
