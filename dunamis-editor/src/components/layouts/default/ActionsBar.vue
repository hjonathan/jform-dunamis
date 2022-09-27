<template>
  <component v-bind:is="itemsActionsBar[activeActionsBar]['component']" />
</template>

<script lang="ts">
import { sync } from 'vuex-pathify';
import ActionsBarEditor from './../../DynaformEditor/ActionsBarEditor.vue';

export default {
  name: 'ActionsBar',
  props: {},
  components: { ActionsBarEditor },
  data() {
    return {
      data: {},
    };
  },
  computed: {
    itemsActionsBar: sync('viewManager/actionsBar.items'),
    activeActionsBar: sync('viewManager/actionsBar.active'),
  },
  methods: {},
};
</script>
