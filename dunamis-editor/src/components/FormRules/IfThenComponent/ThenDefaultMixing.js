import _ from 'lodash';
import store from '../../../store';
export default {
    data() {
        return {
            effects: {
                items: [],
                selected: 'SHOW',
            },
            scopes: {
                items: [],
                selected: [],
            },
        };
    },
    mounted() {
        this.effects.items = this.loadEffects();
        this.scopes.items = this.loadScopes();
    },
    methods: {
        loadEffects() {
            return ['SHOW', 'HIDE', 'ENABLE', 'DISABLE'];
        },
        loadScopes() {
            return store.getters['app/getScopesEditor'];
        },
    },
};
