<template>
  <div>
    <v-row no-gutters>
      <v-col cols="2">
        <v-combobox
          v-model="request.method"
          class="caption"
          label="Method"
          dense
          outlined
          persistent-placeholder
          prepend-icon="mdi-web"
          :items="methodItems"
        ></v-combobox>
      </v-col>
      <v-col cols="10">
        <v-text-field
          dense
          outlined
          persistent-placeholder
          v-model="request.url"
          class="caption"
          label="URL"
        ></v-text-field>
      </v-col>
    </v-row>
    <div>
      <v-tabs v-model="tab" color="primary">
        <v-tab
          v-for="item in itemsTabs"
          :key="item"
          class="caption font-weight-bold"
          x-small
        >
          {{ item }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card flat>
            <list-options
              :key="key"
              ref="list-params"
              value="key"
              label="value"
              valueTitle="Key"
              labelTitle="Value"
              :hideFooter="true"
              :options="request.params"
            ></list-options>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <list-options
              ref="list-headers"
              value="key"
              label="value"
              valueTitle="Key"
              labelTitle="Value"
              :hideFooter="true"
              :options="request.headers"
            ></list-options>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <list-options
              ref="list-body"
              value="key"
              label="value"
              valueTitle="Key"
              labelTitle="Value"
              :options="request.body"
              :hideFooter="true"
            ></list-options>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-row class="pt-4">
            <v-col>
              <v-text-field
                v-model="request.output"
                filled
                persistent-placeholder
                dense
                prepend-icon="mdi-slash-forward-box"
                class="caption"
                label="Path source"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script lang="ts">
//@ts-nocheck
import _ from 'lodash';
import ListOptions from './ListOptions.vue';
export default {
  name: 'DynamicItems',
  components: { ListOptions },
  props: {
    data: {
      type: Object,
      required: false,
    },
  },
  computed: {},
  data() {
    return {
      key: 1,
      methodItems: ['POST', 'GET', 'PUT'],
      slots: ['value', 'label'],
      tab: null,
      itemsTabs: ['Params', 'Headers', 'Body', 'Output'],

      request: {
        method: 'GET',
        url: '',
        params: [],
        header: [],
        body: [],
        output: '',
      },
    };
  },
  mounted() {
    this.request = this.data || {
      method: 'GET',
      url: '',
      params: [],
      header: [],
      body: [],
      output: '',
    };
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
      let params = this.$refs['list-params']
        ? this.$refs['list-params'].getData()
        : [];
      let headers = this.$refs['list-headers']
        ? this.$refs['list-headers'].getData()
        : [];
      let body = this.$refs['list-body']
        ? this.$refs['list-body'].getData()
        : [];

      params = _.uniqWith([].concat(this.request.params, params), _.isEqual);
      headers = _.uniqWith([].concat(this.request.headers, headers), _.isEqual);
      body = _.uniqWith([].concat(this.request.body, body), _.isEqual);
      return {
        params,
        headers,
        body,
        output: this.request.output,
        method: this.request.method,
        url: this.request.url,
      };
    },
  },
};
</script>
<style>
.vpm-item-list > div > div > div > .v-label {
  font-size: 12px !important;
}

.vpm-prop-tabs-bar > .v-tabs-bar {
  border-radius: inherit;
  height: 20px;
}
</style>
