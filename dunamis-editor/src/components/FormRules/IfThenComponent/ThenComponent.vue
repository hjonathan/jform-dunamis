<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-row>
        <v-col cols="2">
          <v-combobox
            v-model="effects.selected"
            :items="effects.items"
            label="Then"
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
            v-if="effects.selected != 'EXECUTE'"
            v-model="scopes.selected"
            :items="scopes.items"
            label="Search for a field"
            small-chips
            dense
            multiple
            outlined
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

          <div v-else>
            <monaco-editor
              :theme="'vs-dark'"
              :options="{ minimap: { enabled: false }, fontSize: 10 }"
              height="10vh"
              width="95%"
              :language="`json`"
              v-model="script"
            ></monaco-editor>
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
//@ts-nocheck
import { defineComponent, PropType } from 'vue';
import MonacoEditor from '../../MonacoEditor.vue';
import { useThenComposition } from './ThenComposition';
export default defineComponent({
  name: 'ThenComponent',
  components: {
    MonacoEditor,
  },
  props: {
    data: {
      type: Object as PropType<{
        effect: string;
        scopes: Array;
      }>,
    },
  },
  setup(props: any) {
    return useThenComposition(props);
  },
  watch: {},
  methods: {},
});
</script>
<style>
.vpm-thencomp-combobox > div > div > div > label {
  font-size: 12px !important;
}
</style>
