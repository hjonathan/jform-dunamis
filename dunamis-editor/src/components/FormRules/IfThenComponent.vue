<template>
  <v-card outlined class="px-2">
    <IfComponent @updateIf="() => {}" ref="ifComponent" :data="dataIf">
    </IfComponent>
    <ThenComponent @updateThen="() => {}" ref="thenComponent" :data="dataThen">
    </ThenComponent>
    <v-btn color="primary" text small outlined @click="saveRule">Save</v-btn>
  </v-card>
</template>

<script lang="ts">
//@ts-nocheck
import IfComponent from './IfThenComponent/IfComponent.vue';
import ThenComponent from './IfThenComponent/ThenComponent.vue';
import { useIfThenComposition } from './IfThenComposition';
import { defineComponent, PropType } from 'vue';
import { FormRule } from './types';
export default defineComponent({
  name: 'IfThenComponent',
  components: { ThenComponent, IfComponent },
  props: {
    data: {
      type: Object as PropType<FormRule>,
    },
  },
  setup(props: any) {
    return useIfThenComposition(props);
  },
});
</script>

<style></style>
