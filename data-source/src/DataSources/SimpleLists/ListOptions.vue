<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      :hide-default-footer="hideFooter"
    >
      <template v-slot:item.value="{ item }">
        <v-text-field
          dense
          filled
          single-line
          class="vpm-item-list caption"
          :label="valueTitle"
          v-model="item.value"
          >{{ item.value }}</v-text-field
        >
      </template>

      <template v-slot:item.actions="{ item, index }">
        <v-btn
          small
          icon
          @click="addItem(item, index)"
          color="primary lighten-1"
        >
          <v-icon small> mdi-plus-circle </v-icon>
        </v-btn>

        <v-btn
          small
          icon
          color="error lighten-1"
          @click="removeItem(item, index)"
          ><v-icon small> mdi-delete </v-icon>
        </v-btn>
      </template>

      <template v-slot:item.label="{ item }">
        <v-text-field
          dense
          single-line
          class="vpm-item-list caption"
          :label="labelTitle"
          v-model="item.label"
          >{{ item.value }}</v-text-field
        >
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
//@ts-nocheck
import _ from 'lodash';
export default {
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
  data() {
    return {
      slots: ['value', 'label'],
      headers: [
        { text: this.valueTitle, value: 'value', sortable: false },
        { text: this.labelTitle, value: 'label', sortable: false },
        { text: '', value: 'actions', sortable: false },
      ],
      items: [
        {
          value: '',
          label: '',
        },
      ],
    };
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
  methods: {
    addItem(item: any, index: any) {
      let clone = _.clone(this.items);
      clone = _.concat(
        _.slice(clone, 0, index + 1),
        { value: '', label: '' },
        _.slice(clone, index + 1, clone.length)
      );
      this.items = clone;
    },
    removeItem(item: any, index: any) {
      let clone = _.clone(this.items);
      clone = _.concat(
        _.slice(clone, 0, index),
        _.slice(clone, index + 1, clone.length)
      );
      this.items = clone;
    },
    getData() {
      _.clone(this.items);
      return _.map(_.clone(this.items), (i) => {
        return {
          [this.value]: i.value,
          [this.label]: i.label,
        };
      });
    },
  },
};
</script>
<style>
.vpm-item-list > div > div > div > .v-label {
  font-size: 12px !important;
}
</style>
