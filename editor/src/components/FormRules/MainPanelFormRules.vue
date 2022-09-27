<template>
  <v-card dense elevation="0">
    <v-card-title class="">
      <span class="subtitle-2">Form Rules</span>
    </v-card-title>
    <v-container>
      <IfThenComponent ref="comp1"> </IfThenComponent>
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
import { defineComponent } from '@vue/composition-api';
import IfThenComponent from './IfThenComponent.vue';
export default defineComponent({
  name: 'MainPanelFormRules',
  components: { IfThenComponent },
  props: {},
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    saveFormRules() {
      let ref: any = this.$refs?.comp1;
      ref.save();
    },
  },
});
</script>
<style></style>
