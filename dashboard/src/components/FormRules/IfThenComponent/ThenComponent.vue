<template>
  <v-row no-gutters>
    <v-col cols="1">
      <v-btn class="vpm-action-editor-btn" plain>
        <v-icon small color="primary">mdi-circle-slice-8</v-icon>
        Then
      </v-btn>
    </v-col>
    <v-col cols="11">
      <v-row>
        <v-col cols="2">
          <v-combobox
            v-model="effects.selected"
            :items="effects.items"
            label="Search for an action"
            outlined
            dense
            class="vpm-thencomp-combobox caption"
            @change="
              $emit('updateThen', {
                effect: effects.selected,
              })
            "
          >
          </v-combobox>
        </v-col>
        <v-col cols="10">
          <v-combobox
            v-model="scopes.selected"
            :items="scopes.items"
            label="Search for a field"
            small-chips
            dense
            multiple
            class="vpm-thencomp-combobox"
            @change="
              $emit('updateThen', {
                scopes: scopes.selected,
              })
            "
          >
            <template v-slot:selection="data">
              <v-chip
                label
                small
                :key="JSON.stringify(data.item)"
                :color="`blue-grey lighten-5`"
                v-bind="data.attrs"
                :input-value="data.selected"
                :disabled="data.disabled"
                @click:close="data.parent.selectItem(data.item)"
              >
                <span class="pr-2">
                  {{ data.item }}
                </span>
                <v-icon small @click="data.parent.selectItem(data.item)">
                  $delete
                </v-icon>
              </v-chip>
            </template>
          </v-combobox>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
//@ts-nocheck
import ThenDefaultMixing from './ThenDefaultMixing';
export default {
  name: 'ThenComponent',
  mixins: [ThenDefaultMixing],
  data() {
    return {
      field: [],
      fields: ['Field1', 'Field2', 'Field3', 'Field4'],
    };
  },
  watch: {},
  methods: {},
};
</script>
<style>
.vpm-thencomp-combobox > div > div > div > label {
  font-size: 12px !important;
}
</style>
