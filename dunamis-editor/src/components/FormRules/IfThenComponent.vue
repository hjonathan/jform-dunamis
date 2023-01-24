<template>
  <div class="mr-4">
    <!-- <v-col cols="6"> -->
    <IfComponent @updateIf="() => {}" ref="ifComponent" :data="dataIf">
    </IfComponent>
    <!-- </v-col>
    <v-col cols="6"> -->

    <v-timeline dense align-top class="mb-0">
      <v-timeline-item
        v-for="itemThen in multiThenComponent"
        :key="itemThen.id"
      >
        <template v-slot:icon>
          <v-btn
            fab
            color="orange"
            x-small
            class="vpm-timeline-icon"
            @click="deleteThenComponent(itemThen)"
          >
            <v-icon small color="white">mdi-delete</v-icon>
          </v-btn>
        </template>
        <ThenComponent @updateThen="() => {}" ref="thenRefs" :data="itemThen">
        </ThenComponent>
      </v-timeline-item>

      <v-timeline-item class="white--text" color="primary">
        <template v-slot:icon>
          <v-btn
            fab
            color="primary"
            x-small
            class="vpm-timeline-icon"
            @click="addThenComponent"
          >
            <v-icon small color="white">mdi-plus</v-icon>
          </v-btn>
        </template>
      </v-timeline-item>
    </v-timeline>

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

<style>
.v-timeline-item__dot:has(.v-timeline-item__inner-dot):has(.vpm-timeline-icon) {
  transform: scale(0.8);
}
</style>
