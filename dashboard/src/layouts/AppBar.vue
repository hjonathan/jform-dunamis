<template>
  <v-app-bar dark app color="primary" elevation="0">
    <v-toolbar-title>
      <v-container fill-height fluid
        ><v-row align="center" justify="center">
          <v-col>
            <v-toolbar-title>JSON Forms 2.0</v-toolbar-title>
          </v-col>
        </v-row></v-container
      ></v-toolbar-title
    >
    <v-spacer expand></v-spacer>
    <v-toolbar-items>
      <v-container fill-height fluid justify-end
        ><v-row dense>
          <v-col><settings /> </v-col>
          <v-col><theme-changer /> </v-col>
        </v-row>
      </v-container>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script lang="ts">
import Settings from '@/components/Settings.vue';
import ThemeChanger from '@/components/ThemeChanger.vue';

export default {
  name: 'DefaultAppBar',
  components: {
    ThemeChanger,
    Settings,
  },
  data() {
    return {
      activeTab: 0,
    };
  },
};
</script>
