<template>
  <v-row no-gutters>
    <v-col cols="12" no-gutters>
      <v-combobox
        dense
        v-model="model"
        :filter="filter"
        :hide-no-data="!search"
        :items="items"
        :search-input.sync="search"
        hide-selected
        multiple
        small-chips
        class="vpm-thencomp-combobox caption"
        @blur="onBlurAutocomplete"
        outlined
        label="If"
      >
        <template v-slot:no-data>
          <v-list-item>
            <span class="caption">Create value : </span>
            <v-chip :color="`white lighten-3`" label small>
              {{ search }}
            </v-chip>
          </v-list-item>
        </template>
        <template v-slot:selection="{ attrs, item, parent, selected }">
          <CustomChip :attrs="attrs" :parent="parent" :selected="selected">
            <span>
              {{ item.text }}
            </span>
          </CustomChip>
        </template>
        <template v-slot:item="{ index, item }">
          <v-text-field
            v-if="editing === item"
            v-model="editing.text"
            autofocus
            flat
            background-color="transparent"
            hide-details
            solo
            @keyup.enter="edit(index, item)"
          ></v-text-field>
          <v-chip v-else dark label color="blue-grey darken-1" x-small>
            {{ item.text }}
          </v-chip>
          <v-spacer></v-spacer>
          <v-list-item-action @click.stop>
            <v-btn icon x-small @click.stop.prevent="edit(index, item)">
              <v-icon>{{
                editing !== item ? 'mdi-pencil' : 'mdi-check'
              }}</v-icon>
            </v-btn>
          </v-list-item-action>
        </template>
      </v-combobox>
    </v-col>
  </v-row>
</template>

<script lang="ts">
//@ts-nocheck
import _ from 'lodash';
import CustomChip from './CustomChip.vue';
import { defineComponent, PropType } from 'vue';
import { useIfComposition } from './IfComposition';
export default defineComponent({
  name: 'IfComponent',
  components: { CustomChip },
  props: {
    data: {
      type: Object as PropType<{
        expression: string;
      }>,
    },
  },
  setup(props: any) {
    return useIfComposition(props);
  },
});
</script>
<style>
.vpm-ifcomp-dropdown > div > div > div > label {
  font-size: 12px !important;
}
</style>
