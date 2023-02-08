<template>
  <v-card elevation="0" class="fill-height">
    <v-row class="pa-2 fill-height" justify="space-between">
      <v-col cols="6">
        <div
          tabindex="-1"
          class="v-stepper__step subtitle-2 v-stepper__step--active"
        >
          <span class="v-stepper__step__step">
            <v-icon color="primary"> mdi-card </v-icon>
          </span>
          <div class="v-stepper__label font-weight-bold">
            Simple Lists
            <small>Add your listings</small>
          </div>
        </div>

        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-end">
                  <v-btn
                    class="vpm-action-editor-btn"
                    color="primary"
                    elevation="0"
                    plain
                    small
                    @click="addList = true"
                  >
                    <v-icon class="me-1" small>mdi-plus-circle</v-icon>
                    Add
                  </v-btn>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in simpleLists" :key="item.id">
                <td>
                  <span class="caption"> {{ item.name }}</span>
                </td>
                <td class="no-gutters text-end">
                  <v-btn
                    small
                    icon
                    @click="showSimpleList(item)"
                    color="warning lighten-1"
                  >
                    <v-icon small> mdi-pencil </v-icon>
                  </v-btn>
                  <v-btn
                    small
                    icon
                    color="error lighten-1"
                    @click="deleteSimpleList(index)"
                    ><v-icon small> mdi-delete </v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="6" class="d-flex justify-center">
        <v-scroll-y-transition mode="out-in">
          <AddSimpleList v-if="addList" />
          <SimpleList
            ref="simpleListRef"
            :item="selectedItem"
            :key="selectedItem.id"
            @saveList="saveList"
            v-else
          />
        </v-scroll-y-transition>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import _ from 'lodash';
import { computed, defineComponent, ref } from 'vue';
import AddSimpleList from './SimpleLists/AddSimpleList.vue';
import SimpleList from './SimpleLists/SimpleList.vue';
import store from '../../store';

const MainPanelDataSourcesSimpleList = defineComponent({
  name: 'main-panel-data-sources-simple-list',
  components: { AddSimpleList, SimpleList },
  computed: {},
  setup(props: any) {
    let addList = ref(true),
      simpleListRef = ref(null),
      selectedItem = ref({ data: [], id: -1, name: '' });
    let simpleLists = computed({
      get() {
        return store.getters['dataSources/getSimpleLists'];
      },
      set(newValue) {
        store.dispatch('dataSources/setSimpleLists', newValue);
      },
    });
    let deleteSimpleList = (index: any) => {
      let clone: any = _.clone(simpleLists.value);
      clone = _.concat(
        _.slice(clone, 0, index),
        _.slice(clone, index + 1, clone.length)
      );
      simpleLists.value = clone;
    };

    let showSimpleList = (item: any) => {
      selectedItem.value = item;
      addList.value = false;
    };
    let saveList = (data: any) => {
      selectedItem.value.data = data;
    };

    return {
      simpleLists,
      addList,
      selectedItem,
      simpleListRef,
      deleteSimpleList,
      showSimpleList,
      saveList,
    };
  },
  methods: {},
});
export default MainPanelDataSourcesSimpleList;
</script>
<style></style>
