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

<script>
import { defineComponent } from '@vue/composition-api';
import CustomizeTheme from './CustomizeTheme.vue';
import CustomForm from './CustomForm.vue';

const PanelsCustomTheme = defineComponent({
  name: 'panels-custom-theme',
  setup() {
    return {};
  },
  components: {
    CustomizeTheme,
    CustomForm,
  },
});

export default PanelsCustomTheme;
</script>
