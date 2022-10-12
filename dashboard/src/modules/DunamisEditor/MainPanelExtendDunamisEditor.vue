<template>
  <v-card elevation="0" class="fill-height" color="transparent">
    <div id="dunamis-editor"></div
  ></v-card>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api';
import Dunamis from '@jsonforms/dunamis-editor/src/mainBundle';

const MainPanelDashboard = defineComponent({
  name: 'MainPanelExtendDunamisEditor',
  setup(props: any) {
    onMounted(() => {
      setTimeout(() => {
        // new Vue({
        //   vuetify: Dunamis.vuetify,
        //   render: (h) => h(Dunamis.app),
        // })
        Dunamis.$mount('#dunamis-editor');
      }, 2000);
    });
    return {};
  },
});
export default MainPanelDashboard;
</script>
<style></style>
