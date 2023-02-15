<script setup lang="ts">
import { useCounteStore } from "../../stores/counter";
defineProps<{
  msg: string;
}>();

const counterStore = useCounteStore();
</script>

<template>
  <v-app>
    <div class="d-block fill-height">
      <v-row class="vpm-row-layout fill-height" no-gutters>
        <v-col
          cols="12"
          style="min-width: 100px; max-width: 100%"
          class="flex-grow-0 flex-shrink-1 grey lighten-5"
        >
          <v-row no-gutters style="flex-wrap: nowrap"> Here action bar </v-row>
          <v-row no-gutters class="vpm-centralpanel-layout fill-height">
            <v-col
              cols="2"
              style="min-width: 100px; max-width: 100%"
              class="flex-grow-1 flex-shrink-0 vpm-sidebar-layout"
            >
              default sidebar
              {{ counterStore.counter }}
            </v-col>

            <v-col
              cols="10"
              style="min-width: 100px"
              class="vpm-mainpanel-layout flex-grow-0 flex-shrink-1"
            >
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
    </v-footer> </v-app
  >;
</template>

<style scoped>
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
