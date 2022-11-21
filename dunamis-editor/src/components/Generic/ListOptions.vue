<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      dense
      :hide-default-footer="hideFooter"
      :options="optionsTable"
      :footer-props="{
        'items-per-page-text': '',
      }"
      caption
    >
      <template v-slot:item.value="{ item }">
        <v-text-field
          dense
          single-line
          class="vpm-item-list caption"
          :label="valueTitle"
          v-model="item.value"
          >{{ item.value }}</v-text-field
        >
      </template>

      <template v-slot:item.actions="{ item, index }">
        <div class="d-flex">
          <v-btn
            slot="append"
            small
            icon
            @click="addItem(item, index)"
            color="primary lighten-1"
          >
            <v-icon small> mdi-plus-circle </v-icon>
          </v-btn>

          <v-btn
            slot="append"
            small
            icon
            color="error lighten-1"
            @click="removeItem(item, index)"
            ><v-icon small> mdi-delete </v-icon>
          </v-btn>
        </div>
      </template>

      <template v-slot:item.label="{ item }">
        <v-text-field
          dense
          single-line
          class="vpm-item-list caption"
          :label="labelTitle"
          v-model="item.label"
          >{{ item.value }}
        </v-text-field>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
//@ts-nocheck
import { defineComponent, ref, onMounted } from 'vue';
import _ from 'lodash';
const ListOptions = defineComponent({
  name: 'ListOptions',
  components: {},
  props: {
    value: {
      type: String,
      required: false,
    },
    label: {
      type: String,
      required: false,
    },
    valueTitle: {
      type: String,
      required: false,
    },
    labelTitle: {
      type: String,
      required: false,
    },
    hideFooter: {
      type: Boolean,
      required: false,
    },
    options: {
      type: Array,
      required: false,
    },
  },
  mounted() {
    let its = _.map(this.options, (i) => {
      return { value: i[this.value], label: i[this.label] };
    });
    this.items =
      its.length == 0
        ? [
            {
              value: '',
              label: '',
            },
          ]
        : its;
  },
  setup(props: any, context: any) {
    let items = ref([
      {
        value: '',
        label: '',
      },
    ]);

    return {
      items,
      slots: ref(['value', 'label']),
      optionsTable: ref({
        itemsPerPage: 5,
      }),
      headers: ref([
        { text: props.valueTitle, value: 'value', sortable: false },
        { text: props.labelTitle, value: 'label', sortable: false },
        { text: '', value: 'actions', sortable: false },
      ]),
      addItem(item: any, index: any) {
        let clone: any = _.clone(items.value);
        clone = _.concat(
          _.slice(clone, 0, index + 1),
          { value: '', label: '' },
          _.slice(clone, index + 1, clone.length)
        );
        items.value = clone;
      },
      removeItem(item: any, index: any) {
        let clone: any = _.clone(items.value);
        clone = _.concat(
          _.slice(clone, 0, index),
          _.slice(clone, index + 1, clone.length)
        );
        items.value = clone;
      },
      getData() {
        if (
          items.value.length >= 0 &&
          items.value[0].value !== '' &&
          items.value[0].label !== ''
        ) {
          return _.map(_.clone(items.value), (i: any) => {
            return {
              [this.value]: i.value,
              [this.label]: i.label,
            };
          });
        }
        return [];
      },
    };
  },
});
export default ListOptions;
</script>
<style>
.vpm-item-list > div > div > div > .v-label {
  font-size: 12px !important;
}
</style>
