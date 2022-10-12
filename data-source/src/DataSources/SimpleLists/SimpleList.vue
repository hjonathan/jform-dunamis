<template>
  <v-card flat class="fill-height flex">
    <div
      tabindex="-1"
      class="v-stepper__step subtitle-2 v-stepper__step--active"
    >
      <span class="v-stepper__step__step">
        <v-icon color="primary"> mdi-alpha-l-circle </v-icon>
      </span>
      <div class="v-stepper__label font-weight-bold">
        {{ list.name }}
      </div>
      <v-btn
        class="vpm-action-editor-btn"
        color="primary"
        elevation="0"
        plain
        small
        @click="saveList"
      >
        <v-icon class="me-1" small>mdi-content-save</v-icon>
        Save
      </v-btn>
    </div>
    <ListOptions
      key="key"
      ref="simpleList"
      value="id"
      label="value"
      valueTitle="ID"
      labelTitle="Value"
      :hideFooter="false"
      :options="list.data"
    ></ListOptions>
  </v-card>
</template>

<script lang="ts">
import _ from "lodash";
import { defineComponent, ref } from "@vue/composition-api";
import ListOptions from "./ListOptions.vue";

const SimpleList = defineComponent({
  name: "SimpleList",
  inject: ["bus"],
  components: { ListOptions },
  props: ["item"],
  setup(props: any, context: any) {
    let list = ref(props.item);
    const simpleList: any = ref(null);
    let saveList = () => {
      let data = simpleList.value.getData();
      context.emit("saveList", data);
    };

    return { list, saveList, simpleList };
  },
});
export default SimpleList;
</script>
<style>
.vpm-main-panel-ds-btn {
  text-transform: initial;
  letter-spacing: normal;
}
</style>
