<template>
  <div class="my-2">
    <v-btn
      class="vpm-action-editor-btn justify-end"
      color="primary"
      plain
      small
      @click="backPanel"
    >
      <v-icon class="me-1" small>mdi-arrow-left</v-icon>
      Back
    </v-btn>

    <div class="pb-2 px-5">
      <span class="caption font-weight-bold">Options</span>
    </div>

    <v-card elevation="0" color="transparent" class="mx-4">
      <v-row dense>
        <list-options
          ref="refList"
          :options="items"
          :value="keys.value"
          :label="keys.label"
          :valueTitle="titles.value"
          :labelTitle="titles.label"
          :hideFooter="false"
        />
      </v-row>
      <div class="pt-4"></div>

      <v-combobox
        class="caption"
        persistent-placeholder
        v-model="select"
        :items="sources"
        label="Data Source"
        outlined
        dense
      ></v-combobox>

      <component
        ref="configurationView"
        :dataSource="dataSource"
        :dataConfig="dataConfig"
        v-bind:is="dataSourceView"
      ></component>
    </v-card>
  </div>
</template>

<script lang="ts">
//@ts-nocheck
import { computed, defineComponent, inject, onMounted, ref, watch } from 'vue';
import ListOptions from '../../Generic/ListOptions.vue';
import { dynamicPropertyDefault } from '../PropertiesPanelComp';
const ItemPropExt = defineComponent({
  name: 'OptionsPropExt',
  components: {
    ListOptions,
  },
  emits: ['input', 'change', 'backPanel'],
  props: ['value', 'config'],
  setup(props: any, context: any) {
    //Init variables
    const serviceProvider = inject<any>('serviceProvider');
    const dataSources = serviceProvider.get('dataSources');
    const configurationView: any = ref(null);
    const titles: any = ref({
      value: 'Value',
      label: 'Label',
    });
    const keys: any = ref({
      value: 'value',
      label: 'label',
    });
    let items = ref(
      props.config && props.config.collection ? props.config.collection : []
    );
    const refList: any = ref(null);
    const sources: any = ref(dataSources.get());
    let select: any = ref(null);
    let dataSource: any = ref(null);
    let dataConfig: any = ref(null);

    let dataSourceView = computed(() => {
      if (select.value && select.value.render) {
        return select.value.render;
      } else if (dataSource) {
        return dataSource.render;
      }
      return 'div';
    });

    watch(select, (val, nval) => {
      dataSource.value = val;
    });

    onMounted(() => {
      //Set the dropdown select value
      if (props.config && props.config.dataSource) {
        dataSource.value = sources.value.find(
          (el) => el.id === props.config.dataSource.id
        );
        select.value = dataSource.value;
        dataConfig.value = props.config.dataSource.config || null;
      }
    });

    return {
      configurationView,
      refList,
      dataConfig,
      ...dynamicPropertyDefault(props, context),
      backPanel() {
        let res: any = {
          dataSource: null,
          collection: refList.value.getData(),
        };
        if (select.value) {
          res.dataSource = {
            id: select.value.id,
            name: select.value.text,
            type: select.value.type,
            config: configurationView.value?.getData
              ? configurationView.value.getData()
              : null,
          };
        }
        context.emit('backPanel', { options: res });
      },
      items,
      select,
      titles,
      keys,
      dataSourceView,
      sources,
      dataSource,
    };
  },
});
export default ItemPropExt;
</script>
<style></style>
