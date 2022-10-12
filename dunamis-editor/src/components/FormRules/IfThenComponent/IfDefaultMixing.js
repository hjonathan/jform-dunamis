import _ from 'lodash';
import store from '../../../store';
export default {
    data() {
        return {
            scopes: {
                items: [],
                colors: ['white'],
            },
            operators: {
                items: [],
            },
            logicOperators: {
                items: [],
            },
            values: {
                items: [{ header: 'Create a value' }],
            },
            initialParentheses: {
                items: [
                    {
                        text: '(',
                        value: _.random(0, 10000000),
                        color: 'white',
                        type: 'InitialParentheses',
                    },
                ],
            },
            finalParentheses: {
                items: [
                    {
                        text: ')',
                        value: _.random(0, 10000000),
                        color: 'white',
                        type: 'FinalParentheses',
                    },
                ],
            },
        };
    },
    mounted() {
        this.scopes.items = this.loadScopes();
        this.operators.items = this.loadOperators();
        this.logicOperators.items = this.loadLogicOperators();
    },
    methods: {
        /**
         * Load scope fields from JSON Editor
         * @returns array
         */
        loadScopes() {
            let res = [],
                scopes = store.getters['app/getScopesEditor'];
            scopes.forEach((el) => {
                res.push({
                    text: el,
                    value: _.random(0, 10000000),
                    color: this.scopes.colors[_.random(0, this.scopes.colors.length - 1)],
                    type: 'Field',
                });
            });
            return res;
        },
        loadOperators() {
            return [
                {
                    text: '=',
                    value: _.random(0, 10000000),
                    color: 'white',
                    type: 'Operator',
                },
                {
                    text: '!=',
                    value: _.random(0, 10000000),
                    color: 'white',
                    type: 'Operator',
                },
                {
                    text: '<',
                    value: _.random(0, 10000000),
                    color: 'white',
                    type: 'Operator',
                },
                {
                    text: '>',
                    value: _.random(0, 10000000),
                    color: 'white',
                    type: 'Operator',
                },
            ];
        },
        loadLogicOperators() {
            return [
                {
                    text: 'AND',
                    value: _.random(0, 10000000),
                    color: 'white',
                    type: 'LogicOperator',
                },
                {
                    text: 'OR',
                    value: _.random(0, 10000000),
                    color: 'white',
                    type: 'LogicOperator',
                },
                {
                    text: 'XOR',
                    value: _.random(0, 10000000),
                    color: 'white',
                    type: 'LogicOperator',
                },
            ];
        },
        loadInitialParentheses() {
            return [
                {
                    text: '(',
                    value: _.random(0, 10000000),
                    color: 'white',
                    type: 'InitialParentheses',
                },
            ];
        },
        loadFinalParentheses() {
            return [
                {
                    text: ')',
                    value: _.random(0, 10000000),
                    color: 'white',
                    type: 'FinalParentheses',
                },
            ];
        },
    },
};
