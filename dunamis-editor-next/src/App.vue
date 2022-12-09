

<template>
  <v-app>
    <div class="d-block fill-height">
      <v-row class="vpm-row-layout fill-height" no-gutters>
        <v-col cols="12" style="min-width: 100px; max-width: 100%" class="flex-grow-0 flex-shrink-1 grey lighten-5">
          <v-row no-gutters style="flex-wrap: nowrap">
            <default-actions-bar />
            header

          </v-row>
          <v-row no-gutters class="vpm-centralpanel-layout fill-height">
            <v-col cols="2" style="min-width: 100px; max-width: 100%"
              class="flex-grow-1 flex-shrink-0 vpm-sidebar-layout">
              <!-- <default-side-bar /> -->
              sidebar
            </v-col>

            <v-col cols="10" style="min-width: 100px" class="vpm-mainpanel-layout flex-grow-0 flex-shrink-1">
              <!-- <default-view /> -->
              default view
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
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import ActionsBar from './components/layout/ActionsBar.vue';

export default {
  name: 'App',
  components: {
    DefaultActionsBar: ActionsBar,
  },
}
</script>
<style scoped>
.theme--light.v-application {
  background-color: #f3f3f3 !important;
  color: #747a80 !important;
}
</style>
