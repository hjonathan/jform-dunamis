<template>
  <v-checkbox
    small
    dense
    filled
    no-gutters
    class="caption"
    v-model="val"
    :input-value="val"
    @input="val"
    @change="twoBind"
  >
    <template v-slot:label>
      <div class="caption">
        {{ data.name }}
      </div>
    </template>
  </v-checkbox>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { dynamicPropertyDefault } from '../PropertiesPanelComp';
const CheckboxProp = defineComponent({
  name: 'CheckboxProp',
  emits: ['input', 'change'],
  props: ['value', 'config'],
  setup(props: any, context: any) {
    let val = ref(props.value ?? false);
    return {
      ...dynamicPropertyDefault(props, context),
      val,
    };
  },
});
export default CheckboxProp;
</script>
<style></style>
