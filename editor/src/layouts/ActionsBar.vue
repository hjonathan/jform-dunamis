<template>
	<component v-bind:is="itemsActionsBar[activeActionsBar]['component']" />
</template>

<script lang="ts">
import { sync } from 'vuex-pathify';
import ActionsBarEditor from './../../DynaformEditor/ActionsBarEditor.vue';
import ActionsBarDataSources from '../../../modules/DataSources/ActionsBarDataSources.vue';
import ActionsBarDashboard from '../../../modules/Dashboard/ActionsBarDashboard.vue';

export default {
	name: 'ActionsBar',
	props: {},
	components: { ActionsBarEditor, ActionsBarDataSources, ActionsBarDashboard },
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
