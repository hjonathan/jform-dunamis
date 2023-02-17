<template>
  <v-list nav dense color="gray">
    <v-list-item-group v-model="selectedItem" color="primary">
      <v-list-item v-for="(item, i) in items" :key="i">
        <v-list-item-icon>
          <v-icon small v-text="item.icon"></v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title
            small
            v-text="item.text"
            class="caption"
          ></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import store from '../../store';

const SideBarFormRules = defineComponent({
  name: 'sidedar-form-rules',
  setup() {
    let selectedItem = ref(0);
    let items = ref([
      {
        id: 'main-form-rules',
        text: 'Form Rules',
        icon: 'mdi-card',
      },
      {
        id: 'main-button-event',
        text: 'Button Events',
        icon: 'mdi-card',
      },
    ]);
    watch(selectedItem, (n, o) => {
      let mainPanel = { id: items.value[n].id };
      store.dispatch('viewManager/setAllViews', {
        mainPanel,
      });
    });
    return {
      selectedItem,
      items,
    };
  },
});

export default SideBarFormRules;
</script>
