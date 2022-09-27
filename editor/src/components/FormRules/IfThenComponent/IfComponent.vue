<template>
  <v-row no-gutters>
    <v-col no-gutters cols="1">
      <v-btn class="vpm-action-editor-btn" plain>
        <v-icon small color="primary">mdi-arrow-down-bold-box-outline</v-icon>
        If
      </v-btn>
    </v-col>
    <v-col cols="11" no-gutters>
      <v-combobox
        v-model="model"
        :filter="filter"
        :hide-no-data="!search"
        :items="items"
        :search-input.sync="search"
        hide-selected
        multiple
        small-chips
        class="vpm-thencomp-combobox caption"
        @blur="onBlurAutocomplete"
      >
        <template v-slot:no-data>
          <v-list-item>
            <span class="caption">Create value : </span>
            <v-chip :color="`${colors[nonce - 1]} lighten-3`" label small>
              {{ search }}
            </v-chip>
          </v-list-item>
        </template>
        <template v-slot:selection="{ attrs, item, parent, selected }">
          <CustomChip :attrs="attrs" :parent="parent" :selected="selected">
            <span>
              {{ item.text }}
            </span>
          </CustomChip>
        </template>
        <template v-slot:item="{ index, item }">
          <v-text-field
            v-if="editing === item"
            v-model="editing.text"
            autofocus
            flat
            background-color="transparent"
            hide-details
            solo
            @keyup.enter="edit(index, item)"
          ></v-text-field>
          <v-chip v-else dark label color="blue-grey darken-1" x-small>
            {{ item.text }}
          </v-chip>
          <v-spacer></v-spacer>
          <v-list-item-action @click.stop>
            <v-btn icon x-small @click.stop.prevent="edit(index, item)">
              <v-icon>{{
                editing !== item ? 'mdi-pencil' : 'mdi-check'
              }}</v-icon>
            </v-btn>
          </v-list-item-action>
        </template>
      </v-combobox>
    </v-col>
  </v-row>
</template>

<script lang="ts">
//@ts-nocheck
import _ from 'lodash';
import IfDefaultMixing from './IfDefaultMixing';
import IfLogicMixing from './IfLogicMixing';
import CustomChip from './CustomChip.vue';
export default {
  name: 'IfComponent',
  components: { CustomChip },
  mixins: [IfDefaultMixing, IfLogicMixing],
  data() {
    return {
      activator: null,
      attach: null,
      colors: ['white'],
      editing: null,
      editingIndex: -1,
      items: [],
      nonce: 1,
      menu: false,
      model: [],
      x: 0,
      search: null,
      y: 0,

      selectedItemEdit: null,
    };
  },
  watch: {
    model(val, prev) {
      /**When the value not change */
      if (val.length === prev.length) {
        return;
      }
      // Edit value in expression
      if (this.selectedItemEdit) {
        this.updateModelItem(val.pop(), this.selectedItemEdit);
        return;
      }
      if (val.length > prev.length) {
        this.items = this.addExpression(val, prev);
      } else {
        this.items = this.eraseExpression(val, prev);
      }
    },
  },
  methods: {
    edit(index, item) {
      let selectedItemEdit = this.selectedItemEdit;
      setTimeout(() => {
        this.selectedItemEdit = selectedItemEdit;
      }, 1000);
      if (!this.editing) {
        this.editing = item;
        this.editingIndex = index;
      } else {
        this.editing = null;
        this.editingIndex = -1;
      }
    },
    filter(item, queryText, itemText) {
      if (item.header) return false;
      const hasValue = (val) => (val != null ? val : '');
      const text = hasValue(itemText);
      const query = hasValue(queryText);
      return (
        text.toString().toLowerCase().indexOf(query.toString().toLowerCase()) >
        -1
      );
    },
    clickEditItem(item) {
      this.selectedItemEdit = item;
      switch (item.type) {
        case 'field':
          this.editItemField(item);
          break;
        case 'operator':
          this.editItemOperator(item);
          break;
        case 'value':
          this.editItemValue(item);
          break;
      }
    },
    updateModelItem(newItem, oldItem) {
      let clone = _.clone(this.model);
      let index = _.findIndex(clone, function (o) {
        return _.isEqual(o, oldItem);
      });

      if (index == 0) {
        clone = _.concat(newItem, _.slice(clone, index + 1, clone.length));
      } else {
        clone = _.concat(
          _.slice(clone, 0, index),
          newItem,
          _.slice(clone, index + 1, clone.length)
        );
      }
      this.selectedItemEdit = newItem;
      this.model = clone;
    },
    editItemField() {
      this.items = this.fields;
    },
    editItemOperator() {
      this.items = this.operators;
    },
    editItemValue(item) {
      this.items = [
        {
          text: 'Edit new value',
          color: 'grey',
          type: 'value',
        },
      ];
    },
    highlightSelectedItem(item) {
      return _.isEqual(item, this.selectedItemEdit) ? 'mdi-pencil' : null;
    },
    onBlurAutocomplete() {
      this.selectedItemEdit = null;
    },
  },
};
</script>
<style>
.vpm-ifcomp-dropdown > div > div > div > label {
  font-size: 12px !important;
}
</style>
