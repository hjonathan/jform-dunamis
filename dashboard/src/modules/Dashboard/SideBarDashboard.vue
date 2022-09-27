<template>
	<v-list nav dense color="gray">
		<v-list-item-group v-model="selectedItem" color="primary">
			<v-list-item v-for="(item, i) in items" :key="i">
				<v-list-item-icon>
					<v-icon small v-text="item.icon"></v-icon>
				</v-list-item-icon>

				<v-list-item-content>
					<v-list-item-title
						small
						v-text="item.text"
						class="caption"
					></v-list-item-title>
				</v-list-item-content>
			</v-list-item>
			<v-divider />
			<v-list-item v-for="(item, i) in itemsDefault" :key="i + 1000">
				<v-list-item-icon>
					<v-icon small v-text="item.icon" :color="item.color"></v-icon>
				</v-list-item-icon>

				<v-list-item-content>
					<v-list-item-title
						small
						v-text="item.text"
						class="caption"
					></v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list-item-group>
	</v-list>
</template>

<script lang="ts">
import _ from 'lodash';
import { sync } from 'vuex-pathify';
import { defineComponent, ref, watch, reactive } from '@vue/composition-api';
import languages from '../../api/languages';
import store from '../../store';
const SideBarDataSources = defineComponent({
	name: 'SideBarDataSources',
	components: {},
	setup(props: any) {
		let selectedItem = ref(0);
		let items = reactive([
			{ id: 'main-dashboard-my-forms', text: 'My Forms', icon: 'mdi-folder' },
		]);

		let itemsDefault = reactive([
			{
				id: 'main-dashboard-my-forms1',
				text: 'Favorites',
				icon: 'mdi-star',
				color: 'warning',
			},
			{
				id: 'main-dashboard-my-forms2',
				text: 'Archive',
				icon: 'mdi-archive',
				color: '',
			},
			{
				id: 'main-dashboard-my-forms3',
				text: 'Trash',
				icon: 'mdi-trash-can',
				color: '',
			},
		]);

		watch(selectedItem, (n, o) => {
			let mainPanel = { id: items[n].id };
			store.dispatch('viewManager/setAllViews', {
				mainPanel,
			});
		});
		return {
			selectedItem,
			items,
			itemsDefault,
			iso: languages,
		};
	},
});
export default SideBarDataSources;
</script>
<style>
</style>
