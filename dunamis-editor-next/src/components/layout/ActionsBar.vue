<template>
  <div>{{viewManager.name}}</div>
  <p>{{itemsSideBar}}</p>
  <!-- <component v-bind:is="itemsActionsBar[activeActionsBar]['component']" /> -->
</template>

<script lang="ts">
import { ref, computed } from 'vue'
import { mapActions } from 'pinia'
import { useViewManagerStore } from '../../stores/viewManager/viewManager'
export default {
  // components: { ActionsBarEditor },
  setup() {
    const viewManager = useViewManagerStore();
    const itemsSideBar = computed({
      // getter
      get() {
        return "hola mundo ";
      },
      // setter
      set(newValue) {
        // Note: we are using destructuring assignment syntax here.
        
      }
    });
    return {
      // you can return the whole store instance to use it in the template
      viewManager,
      itemsSideBar
    }
  },
};
</script>
