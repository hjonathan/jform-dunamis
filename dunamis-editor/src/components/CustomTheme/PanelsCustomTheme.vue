<template>
  <v-expansion-panels flat accordion>
    <v-expansion-panel key="1">
      <v-expansion-panel-header color="white">
        Change Colors
      </v-expansion-panel-header>
      <v-expansion-panel-content color="white">
        <CustomizeTheme />
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel key="2">
      <v-expansion-panel-header color="white">
        Custom CSS
      </v-expansion-panel-header>
      <v-expansion-panel-content color="white">
        <CustomForm />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CustomizeTheme from './CustomizeTheme.vue';
import CustomForm from './CustomForm.vue';

const PanelsCustomTheme = defineComponent({
  name: 'panels-custom-theme',
  components: {
    CustomizeTheme,
    CustomForm,
  },
  setup() {
    return {};
  },
});

export default PanelsCustomTheme;
</script>
