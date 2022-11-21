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
    </v-btn>

    <div class="pb-2 px-5">
      <span class="caption font-weight-bold">Validations</span>
    </div>

    <v-card elevation="0" color="transparent" class="mx-4">
      <v-combobox
        class="caption"
        persistent-placeholder
        v-model="select"
        :items="orientation"
        label="Rules"
        outlined
        dense
      ></v-combobox>

      <v-text-field
        v-model="cols"
        dense
        label="Cols"
        persistent-placeholder
        type="number"
        min="1"
        max="11"
        class="caption"
      ></v-text-field>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { dynamicPropertyDefault } from '../PropertiesPanelComp';
const LabelPropExt = defineComponent({
  name: 'LabelPropExt',
  components: {},
  emits: ['input', 'change', 'backPanel'],
  props: ['value', 'config'],
  setup(props: any, context: any) {
    //Init variables
    const orientation = ref([
      {
        id: 'inherit',
        text: 'Inherit',
      },
      {
        id: 'horizontal',
        text: 'Horizontal',
      },
      {
        id: 'vertical',
        text: 'Vertical',
      },
    ]);
    let select: any = ref({
      id: 'inherit',
      text: 'Inherit',
    });
    let cols = ref('');
    onMounted(() => {
      //Set orientation
      if (props.config && props.config.orientation) {
        select.value = orientation.value.find(
          (el) => el.id === props.config.orientation
        );
      }
      // Set cols
      if (props.config && props.config.cols) {
        cols.value = props.config.cols;
      }
    });

    return {
      ...dynamicPropertyDefault(props, context),
      backPanel() {
        context.emit('backPanel', {
          labelConfig: {
            orientation: select.value.id,
            cols: cols.value,
          },
        });
      },
      select,
      cols,
      orientation,
    };
  },
});
export default LabelPropExt;
</script>
<style></style>
