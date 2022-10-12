<template>
  <v-card outlined class="px-2">
    <IfComponent @updateIf="updateIf"> </IfComponent>
    <ThenComponent @updateThen="updateThen"> </ThenComponent>
  </v-card>
</template>

<script lang="ts">
//@ts-nocheck
import IfComponent from './IfThenComponent/IfComponent.vue';
import ThenComponent from './IfThenComponent/ThenComponent.vue';
import IfThenDefaultMixing from './IfThenDefaultMixing';
import store from '../../store';
export default {
  name: 'IfThenComponent',
  components: { ThenComponent, IfComponent },
  mixins: [IfThenDefaultMixing],
  props: {},
  data() {
    return {
      ruleSchema: {},
      scopes: [],
    };
  },
  mounted() {
    //this.ruleSchema = this.loadDefaultRulesSchema();
  },
  methods: {
    updateIf(data) {
      let ifexp = this.parseIfExpression(data);
      this.ruleSchema = ifexp;
    },
    updateThen(data) {
      if (data.effect) {
        this.ruleSchema.effect = data.effect;
      }
      if (data.scopes) {
        this.scopes = data.scopes;
      }
    },
    save() {
      for (const el of this.scopes) {
        store.dispatch('app/setScopeRules', {
          scope: el,
          rule: this.ruleSchema,
        });
      }
    },
  },
};
</script>

<style></style>
