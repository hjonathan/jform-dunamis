<template>
  <v-card class="mx-auto" max-width="500">
    <v-window v-model="step">
      <v-window-item :value="1">
        <v-card-text>
          <div class="d-flex flex-wrap">
            <v-chip color="primary" class="column"> </v-chip>
            <v-chip color="secondary" class="column"> </v-chip>
            <v-chip color="accent" class="column"> </v-chip>
            <v-chip color="error" class="column"> </v-chip>
            <v-chip color="info" class="column"> </v-chip>
            <v-chip color="success" class="column"> </v-chip>
            <v-chip color="warning" class="column"> </v-chip>
          </div>
          <h4>Theme Selected</h4>
          <v-divider></v-divider>
          <v-btn primary @click="step = 2"> Select Theme </v-btn>
          <v-divider></v-divider>
        </v-card-text>
        <v-card flat>
          <v-card-subtitle>Customize the current theme</v-card-subtitle>
          <panels-custom-theme />
        </v-card>
      </v-window-item>
      <v-window-item :value="2">
        <v-card-actions>
          <v-btn text x-small @click="step = 1"> Back </v-btn>
        </v-card-actions>
        <v-card-text>
          <show-theme />
        </v-card-text>
      </v-window-item>
    </v-window>
    <v-divider></v-divider>
  </v-card>
</template>

<script lang="ts">
import ShowTheme from '../CustomTheme/ShowTheme.vue';
import PanelsCustomTheme from './PanelsCustomTheme.vue';

export default {
  name: 'SideBarPreview',
  components: {
    ShowTheme,
    PanelsCustomTheme,
  },
  data(): any {
    return {
      step: 1,
    };
  },
  computed: {},
  methods: {},
};
</script>

<style>
.column {
  height: 60px !important;
  width: 14%;
  max-width: 100%;
  border-radius: 0% !important;
}
</style>
