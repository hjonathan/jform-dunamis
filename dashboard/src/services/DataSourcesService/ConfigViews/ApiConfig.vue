<template>
  <v-card class="px-1" color="transparent" elevation="0">
    <v-row>
      <v-simple-table v-if="dataInputVariables.length != 0">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Data input source</th>
              <th class="text-left">Dest</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in dataInputVariables" :key="item.dest">
              <td>
                <v-combobox
                  dense
                  :items="items"
                  class="caption"
                  v-model="item.src"
                  @change="getData"
                  >{{ item.src }}

                  <v-icon slot="append" color="accent darken-1">
                    mdi-arrow-right-bold-box</v-icon
                  >
                </v-combobox>
              </td>
              <td>
                <span class="caption">
                  {{ item.dest }}
                </span>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          v-model="data.value"
          persistent-placeholder
          :label="titles.id"
          outlined
          dense
          class="caption"
          @change="getData"
        >
        </v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="data.label"
          persistent-placeholder
          dense
          outlined
          :label="titles.value"
          class="caption"
          @change="getData"
        >
        </v-text-field>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, inject } from '@vue/composition-api';
const ApiConfig = defineComponent({
  name: 'ApiConfig',
  components: {},
  props: {
    dataConfig: { required: false, type: Object },
    dataSource: { required: false, type: Object },
  },
  setup(props: any, context: any) {
    const dataInputVariables = ref([]);
    const serviceProvider = inject<any>('serviceProvider');
    const store = inject<any>('store');
    const items = ref(store.getters['app/getScopesEditor']);
    const dataSources = serviceProvider.get('dataSources');
    const source = dataSources.get(props.dataSource);
    let titles = {
      id: 'Value',
      value: 'Label',
    };
    let data = ref(
      props.dataConfig && props.dataConfig
        ? props.dataConfig
        : {
            value: '',
            label: '',
          }
    );

    onMounted(() => {
      //Load Data Input Variables
      if (props.dataConfig && props.dataConfig) {
        dataInputVariables.value = props.dataConfig.dataInputVariables;
      } else {
        let its = source.data.dataInputVariables.map((el: any) => ({
          dest: el,
          src: '',
        }));
        dataInputVariables.value = its;
      }
    });

    return {
      titles,
      dataInputVariables,
      data,
      getData() {
        return {
          value: data.value.value,
          label: data.value.label,
          dataInputVariables: dataInputVariables.value,
        };
      },
      items,
    };
  },
});
export default ApiConfig;
</script>
<style>
.vpm-item-list > div > div > div > .v-label {
  font-size: 12px !important;
}
</style>
