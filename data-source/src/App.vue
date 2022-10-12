<template>
  <div>
    <v-fade-transition mode="out-in">
      <router-view />
    </v-fade-transition>
  </div>
</template>

<script lang="ts">
export default { name: "App" };
</script>
<style>
.theme--light.v-application {
  background-color: #f3f3f3 !important;
  color: #747a80 !important;
}
</style>
