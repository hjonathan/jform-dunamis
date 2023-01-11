<template>
  <v-card dense elevation="0">
    <v-card-title class="">
      <span class="subtitle-2">Form Rules</span>
    </v-card-title>
    <v-container>
      <IfThenComponent
        :ref="refsComponents[index]"
        v-for="(rule, index) in rules"
        :key="index"
        :data="rule"
      >
      </IfThenComponent>
      <IfThenComponent
        ref="ifAdd"
        :data="{
          expression: null,
          scopes: [],
          id: null,
          effect: null,
        }"
      >
      </IfThenComponent>
    </v-container>

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
<style></style>
