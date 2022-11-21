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
      >
      </v-combobox>

      <v-btn class="vpm-btn" color="primary" plain small>
        <v-icon class="me-1" small>mdi-plus</v-icon>
        Add Rule
      </v-btn>

      <v-data-iterator
        :items="desserts"
        item-key="name"
        :items-per-page="4"
        hide-default-footer
      >
        <template v-slot:default="{ items, isExpanded, expand }">
          <v-card v-for="item in items" :key="item.name" class="caption">
            <v-card-title>
              <span class="caption">{{ item.name }}</span>
              <v-spacer></v-spacer>
              <v-btn
                icon
                small
                color="warning"
                :input-value="isExpanded(item)"
                @input="(v) => expand(item, v)"
              >
                <v-icon small>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon small color="error">
                <v-icon small>mdi-delete</v-icon>
              </v-btn>
            </v-card-title>

            <v-switch
              v-show="false"
              dense
              :input-value="isExpanded(item)"
              :label="isExpanded(item) ? 'Expanded' : 'Closed'"
              class="pl-4 mt-0"
              @change="(v) => expand(item, v)"
            ></v-switch>
            <v-divider></v-divider>
            <div v-if="isExpanded(item)">
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
            </div>
          </v-card>
        </template>
      </v-data-iterator>
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
        id: 'required',
        text: 'Required',
      },
      {
        id: 'requiredIf',
        text: 'Required If',
      },
      {
        id: 'maxLenght',
        text: 'Max lenght',
      },
      {
        id: 'minLenght',
        text: 'Min lenght',
      },
    ]);
    let select: any = ref({
      id: null,
      text: null,
    });
    let cols = ref('');

    let desserts = ref([
      {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        sodium: 87,
        calcium: '14%',
        iron: '1%',
      },
      {
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        sodium: 129,
        calcium: '8%',
        iron: '1%',
      },
      {
        name: 'Eclair',
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        sodium: 337,
        calcium: '6%',
        iron: '7%',
      },
      {
        name: 'Cupcake',
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        sodium: 413,
        calcium: '3%',
        iron: '8%',
      },
    ]);

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
      desserts,
      orientation,
    };
  },
});
export default LabelPropExt;
</script>
<style>
.vpm-btn {
  text-transform: initial;
  letter-spacing: normal;
}
</style>
