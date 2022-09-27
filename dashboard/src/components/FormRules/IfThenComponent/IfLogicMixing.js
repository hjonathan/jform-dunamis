import _ from "lodash";
import FiniteAutomaton from "../../../util/FiniteAutomaton/FiniteAutomaton";
export default {
    data() {
        return {
            automaton: new FiniteAutomaton()
        }
    },
    mounted() {
        this.items = this.initExpression();
    },
    methods: {
        /**
         * When the expression is erased
         */
        eraseExpression(val, prev) {
            let res = [], resAutomaton = this.automaton.backExec();
            if (resAutomaton) {
                for (const st of resAutomaton.nextState) {
                    switch (st) {
                        case "0":
                            res = res.concat(this.loadInitialParentheses());
                            break;
                        case "1":
                            res = res.concat(this.loadScopes());
                            break;
                        case "2":
                            res = res.concat(this.loadOperators());
                            break;
                        case "3":
                            res = res.concat(this.values.items);
                            break;
                        case "4":
                            res = res.concat(this.loadLogicOperators());
                            break;
                        case "5":
                            res = res.concat(this.loadFinalParentheses());
                            break;

                    }
                }
            }
            return res;
        },
        initExpression() {
            let res = [], resAutomaton = this.automaton.exec();
            if (resAutomaton) {
                for (const st of resAutomaton.nextState) {
                    switch (st) {
                        case "0":
                            res = res.concat(this.loadInitialParentheses());
                            break;
                        case "1":
                            res = res.concat(this.loadScopes());
                            break;
                        case "2":
                            res = res.concat(this.loadOperators());
                            break;
                        case "3":
                            res = res.concat(this.values.items);
                            break;
                        case "4":
                            res = res.concat(this.loadLogicOperators());
                            break;
                        case "5":
                            res = res.concat(this.loadFinalParentheses());
                            break;

                    }
                }
            }
            return res;
        },
        /**
         * When the expression is added
         */
        addExpression(val, prev) {
            let res = [], expression = val, resAutomaton;
            if (this.automaton.state[0] == "3") {
                this.model = val.map((v) => {
                    if (typeof v === 'string') {
                        v = {
                            text: v,
                            color: 'white',
                            value: _.random(0, 10000000),
                            type: 'Value',
                        };
                        this.items.push(v);
                        this.nonce++;
                    }
                    return v;
                });
                this.$emit('updateIf', this.model);
                expression = this.model;
            }

            if (val.length > 0) {
                resAutomaton = this.automaton.exec(_.last(expression));
            }

            if (resAutomaton) {
                for (const st of resAutomaton.nextState) {
                    switch (st) {
                        case "0":
                            res = res.concat(this.loadInitialParentheses());
                            break;
                        case "1":
                            res = res.concat(this.loadScopes());
                            break;
                        case "2":
                            res = res.concat(this.loadOperators());
                            break;
                        case "3":
                            res = res.concat(this.values.items);
                            break;
                        case "4":
                            res = res.concat(this.loadLogicOperators());
                            break;
                        case "5":
                            res = res.concat(this.loadFinalParentheses());
                            break;

                    }
                }
            }
            return res;
        }
    }
}
