<template>
  <component v-bind:is="itemsActionsBar[activeActionsBar]['component']" />
</template>

<script lang="ts">
import ActionsBarEditor from './../../DynaformEditor/ActionsBarEditor.vue';
import store from '../../../store';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ActionsBar',
  props: {},
  components: { ActionsBarEditor },
  data() {
    return {
      data: {},
    };
  },
  computed: {
    itemsActionsBar: {
      get() {
        return store.getters['viewManager/actionsBarItems'];
      },
      set(val: any) {
        store.commit('viewManager/SET_ACTIONS_BAR_ITEMS', val);
      },
    },
    activeActionsBar: {
      get() {
        return store.getters['viewManager/actionsBarActive'];
      },
      set(val: any) {
        store.commit('viewManager/SET_ACTIONS_BAR_ACTIVE', val);
      },
    },
  },
  methods: {},
});
</script>
