<template>
  <v-card elevation="0" color="transparent" class="no-gutters">
    <template v-for="(property, index) in properties">
      <component
        v-bind:is="property.type + '-prop'"
        :key="index"
        :config="property"
        v-model="data[property.id]"
        @change="getData"
        @extendPanel="extendPanel"
        @backPanel="backPanel"
      ></component> </template
  ></v-card>
</template>

<script lang="ts">
//@ts-nocheck
import { defineComponent, ref } from 'vue';
import FieldProperties from '../models/FieldProperties';
import TextProp from './TextProp.vue';
import TextareaProp from './TextareaProp.vue';
import DropdownProp from './DropdownProp.vue';
import DateProp from './DateProp.vue';
import CheckboxProp from './CheckboxProp.vue';
import OptionsProp from './OptionsProp.vue';
import LabelProp from './LabelProp.vue';
import ValidationProp from './ValidationProp.vue';

import PanelExtended from '../PanelDynamicExtended/index';
import _ from 'lodash';

const PropertiesPanelDynamic = defineComponent({
  name: 'PropertiesPanelDynamic',
  components: {
    TextProp,
    TextareaProp,
    DropdownProp,
    CheckboxProp,
    DateProp,
    OptionsProp,
    LabelProp,
    ValidationProp,
    ...PanelExtended,
  },
  props: ['config'],
  emit: ['backPanel'],
  setup(props: any, context: any) {
    let type = ref(props.config.type);
    let properties = ref(FieldProperties.get(type.value));
    let formatProperties = (properties: any, data: any) => {
      let res = {};
      properties.forEach((element) => {
        res[element.id] = null;
      });
      return _.assign(res, data);
    };
    let data = ref(
      formatProperties(FieldProperties.get(type.value), props.config.data)
    );
    return {
      properties,
      type,
      data,
      getData() {
        context.emit('updateData', _.cloneDeep(data.value));
      },
      extendPanel(dt: any) {
        context.emit('extendPanel', dt);
      },
      backPanel(dt: any) {
        context.emit('backPanel', dt);
      },
    };
  },
});
export default PropertiesPanelDynamic;
</script>
<style></style>
