<template>
  <v-card elevation="0" class="fill-height" color="transparent">
    <div id="dunamis-editor"></div
  ></v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { defineComponent, onMounted } from '@vue/composition-api';
import Dunamis from '@jsonforms/dunamis-editor/src/mainBundle';

const MainPanelDashboard = defineComponent({
  name: 'MainPanelExtendDunamisEditor',
  setup(props: any) {
    onMounted(() => {
      setTimeout(() => {
        new Vue({
          store: Dunamis.store,
          vuetify: Dunamis.vuetify,
          render: (h) => h(Dunamis.app),
        }).$mount('#dunamis-editor');
      }, 2000);
    });
    return {};
  },
});
export default MainPanelDashboard;
</script>
<style></style>
