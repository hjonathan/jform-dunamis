<template>
  <v-card dense elevation="0" class="vpm-main-form-rules">
    <v-card-title class="">
      <span class="subtitle-2">Form Rules</span>
    </v-card-title>

    <v-timeline dense align-top class="my-0 py-0">
      <v-timeline-item
        v-for="(rule, index) in rules"
        :key="index"
        class="my-0 py-1"
        small
      >
        <template v-slot:icon>
          <v-btn fab color="orange" x-small>
            <v-icon small color="white">mdi-delete</v-icon>
          </v-btn>
        </template>
        <IfThenComponent ref="rulesRefs" :key="index" :data="rule">
        </IfThenComponent>
      </v-timeline-item>

      <v-timeline-item
        class="white--text my-0 py-1"
        small
        color="primary"
        v-for="item in blankModelRefs"
        :key="`blank-ref-${item.id}`"
      >
        <template v-slot:icon>
          <v-btn fab color="error" x-small @click="deleteBlankForm(item)">
            <v-icon small color="white">mdi-delete</v-icon>
          </v-btn>
        </template>
        <IfThenComponent
          ref="blankRefs"
          :data="{
            id: null,
            effects: [],
          }"
        >
        </IfThenComponent>
      </v-timeline-item>
      <v-timeline-item class="white--text" small color="primary">
        <template v-slot:icon>
          <v-btn fab color="primary" x-small @click="addBlankRef">
            <v-icon small color="white">mdi-plus</v-icon>
          </v-btn>
        </template>
      </v-timeline-item>
    </v-timeline>

    <v-card-actions elevation="0">
      <v-spacer></v-spacer>
      <v-btn color="primary" text small outlined @click="saveFormRules"
        >Save</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import IfThenComponent from './IfThenComponent.vue';
import { useMainPanelComposition } from './MainPanelFormRulesComp';
export default defineComponent({
  name: 'MainPanelFormRules',
  components: { IfThenComponent },
  setup(props: PropType<any>) {
    return useMainPanelComposition(props);
  },
});
</script>
<style>
.vpm-main-form-rules {
}
</style>
