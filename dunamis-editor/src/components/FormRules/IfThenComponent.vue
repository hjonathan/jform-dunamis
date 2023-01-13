<template>
  <div class="mr-4">
    <!-- <v-col cols="6"> -->
    <IfComponent @updateIf="() => {}" ref="ifComponent" :data="dataIf">
    </IfComponent>
    <!-- </v-col>
    <v-col cols="6"> -->
    <ThenComponent @updateThen="() => {}" ref="thenComponent" :data="dataThen">
    </ThenComponent>
    <!-- </v-col> -->
  </div>
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
