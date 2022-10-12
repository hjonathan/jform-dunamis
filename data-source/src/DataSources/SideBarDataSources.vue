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
import _ from "lodash";
import { defineComponent, ref, watch, reactive } from "@vue/composition-api";
//import languages from '../../api/languages';
//import store from '../../store';
const SideBarDataSources = defineComponent({
  name: "SideBarDataSources",
  components: {},
  setup(props: any) {
    let selectedItem = ref(0);
    let items = reactive([
      {
        id: "main-data-sources-simple-lists",
        text: "Simple Lists",
        icon: "mdi-card",
      },
      { id: "main-data-sources-api", text: "APIs", icon: "mdi-api" },
    ]);

    /*watch(selectedItem, (n, o) => {
			let mainPanel = { id: items[n].id };
			store.dispatch('viewManager/setAllViews', {
				mainPanel,
			});
		});*/
    return {
      selectedItem,
      items,
      iso: "en",
    };
  },
});
export default SideBarDataSources;
</script>
<style></style>
