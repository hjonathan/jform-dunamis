<template>
  <v-card class="px-1" color="transparent" elevation="0">
    <div class="pb-4">
      <span class="caption font-weight-bold">Configuration</span>
    </div>
    <v-row>
      <v-col>
        <v-text-field
          v-model="data.id"
          persistent-placeholder
          :label="titles.id"
          outlined
          dense
          class="caption"
        >
        </v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="data.value"
          persistent-placeholder
          dense
          outlined
          :label="titles.value"
          class="caption"
        >
        </v-text-field>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@vue/composition-api';
const ListConfig = defineComponent({
  name: 'ListConfig',
  components: {},
  props: {
    dataConfig: { required: false, type: Object },
    dataSource: { required: false, type: Object },
  },
  setup(props: any, context: any) {
    let titles = {
      id: 'ID',
      value: 'Value',
    };
    let data = ref(
      props.dataConfig && props.dataConfig
        ? props.dataConfig
        : {
            id: '',
            value: '',
          }
    );
    return {
      titles,
      data,
      getData() {
        return data.value;
      },
    };
  },
});
export default ListConfig;
</script>
<style>
.vpm-item-list > div > div > div > .v-label {
  font-size: 12px !important;
}
</style>
