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
import MainPanelExtendDunamisEditor from '../modules/DunamisEditor/MainPanelExtendDunamisEditor.vue';
import { computed, defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'mainPanelExtend',
  props: {},
  components: {
    MainPanelExtendDunamisEditor,
  },
  setup() {
    const itemsMainPanel = computed(sync('viewManager/mainPanelExtend.items'));
    const activeMainPanel = computed(
      sync('viewManager/mainPanelExtend.active')
    );
    return { itemsMainPanel, activeMainPanel };
  },
});
</script>
