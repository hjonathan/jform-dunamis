import _ from "lodash";
/**
 * Predictor class for combobox in IfComponent Expressions
 */
class FiniteAutomaton {
    statesHistory: Array<any> = [];
    expressionGlobal: Array<any> = [];
    state: Array<string> = ["EMPTY"];
    initialParentheses = 0;
    states: any = {
        "EMPTY": {
            types: ["Empty"],
            nextState: ["0", "1"],
        },
        "0": {
            types: ["InitialParentheses"],
            nextState: ["0", "1"],
        },
        "1": {
            types: ["Field"],
            nextState: ["2"]
        },
        "2": {
            types: ["Operator"],
            nextState: ["3"]
        },
        "3": {
            types: ["Value"],
            nextState: ["4", "5", "Final"]
        },
        "4": {
            types: ["LogicOperator"],
            nextState: ["0", "1"]
        },
        "5": {
            types: ["FinalParentheses"],
            nextState: ["4", "5", "Final"]
        }
    };
    /**
     * Add to expression collection Global
     * @param expression 
     */
    updateExpressionGlobal(expression: any) {
        this.expressionGlobal.push(expression);
    }
    // State Empty Field to:: State1 || State2
    stateEmpty(lastSingleExpression: any) {
        let res, state, oldState = "0";
        if (!lastSingleExpression) {
            return this.states["EMPTY"];
        }
        if (lastSingleExpression.type == "InitialParentheses") {
            state = ["0", "1"];
            oldState = "0";
            this.statesHistory.push(oldState);
            this.updateExpressionGlobal(lastSingleExpression);
            this.initialParentheses = + 1;
        }
        if (lastSingleExpression.type == "Field") {
            state = ["2"];
            oldState = "1";
            this.statesHistory.push(oldState);
            this.updateExpressionGlobal(lastSingleExpression);
        }

        if (state) {
            this.state = state;
            res = {
                nextState: this.states[oldState].nextState,
            };
        }
        return res;
    }
    /**
     * State 0 validations
     * @param lastSingleExpression 
     * @returns 
     */
    state0(lastSingleExpression: any) {
        let res, state, oldState = "0";
        if (lastSingleExpression.type == "InitialParentheses") {
            state = ["0", "1"];
            oldState = "0";
            this.statesHistory.push(oldState);
            this.updateExpressionGlobal(lastSingleExpression);
            this.initialParentheses += 1;
        }
        if (state) {
            this.state = state;
            res = {
                nextState: this.verifyFinalParentheses(this.states[oldState].nextState),
            };
        }
        return res;
    }
    /**
     * State 1 validations
     * @param lastSingleExpression 
     * @returns 
     */
    state1(lastSingleExpression: any) {
        let res, state, oldState = "0";
        if (lastSingleExpression.type == "Field") {
            state = "2";
            oldState = "1";
            this.statesHistory.push(oldState);
            this.updateExpressionGlobal(lastSingleExpression);
        }
        if (state) {
            this.state = [state];
            res = {
                nextState: this.verifyFinalParentheses(this.states[oldState].nextState),
            };
        }
        return res;
    }
    /**
     * State 2 validations
     * @param lastSingleExpression 
     * @returns 
     */
    state2(lastSingleExpression: any) {
        let res, state, oldState = "0";
        if (lastSingleExpression.type == "Operator") {
            state = "3";
            oldState = "2";
            this.statesHistory.push(oldState);
            this.updateExpressionGlobal(lastSingleExpression);
        }
        if (state) {
            this.state = [state];
            res = {
                nextState: this.verifyFinalParentheses(this.states[oldState].nextState),
            };
        }
        return res;
    }
    /**
     * State 3 validations
     * @param lastSingleExpression 
     * @returns 
     */
    state3(lastSingleExpression: any) {
        let res, state, oldState = "0";
        if (lastSingleExpression.type == "Value") {
            state = this.states["3"].nextState;
            oldState = "3";
            this.statesHistory.push(oldState);
            this.updateExpressionGlobal(lastSingleExpression);
        }
        if (state) {
            this.state = state;
            res = {
                nextState: this.verifyFinalParentheses(this.states[oldState].nextState),
            };
        }
        return res;
    }
    /**
     * State 4 validations
     * @param lastSingleExpression 
     * @returns 
     */
    state4(lastSingleExpression: any) {
        let res, state, oldState = "0";
        if (lastSingleExpression.type == "LogicOperator") {
            state = this.states["4"].nextState;
            oldState = "4";
            this.statesHistory.push(oldState);
            this.updateExpressionGlobal(lastSingleExpression);
        }
        if (state) {
            this.state = state;
            res = {
                nextState: this.verifyFinalParentheses(this.states[oldState].nextState),
            };
        }
        return res;
    }
    /**
     * State 5 validations
     * @param lastSingleExpression 
     * @returns 
     */
    state5(lastSingleExpression: any) {
        let res, state, oldState = "0";
        if (lastSingleExpression.type == "FinalParentheses") {
            state = this.states["5"].nextState;
            oldState = "5";
            this.statesHistory.push(oldState);
            this.initialParentheses -= 1;
            this.updateExpressionGlobal(lastSingleExpression);
        }
        if (state) {
            this.state = state;
            res = {
                nextState: this.verifyFinalParentheses(this.states[oldState].nextState),
            };
        }
        return res;
    }
    /**
     * Execute the Finite Automaton and verify the states of expression, when add new expression
     * @param lastSingleExpression 
     * @returns any
     */
    exec(lastSingleExpression: any) {
        let res;
        for (const st of this.state) {
            switch (st) {
                case "EMPTY":
                    res = this.stateEmpty(lastSingleExpression);
                    break;
                case "0":
                    res = this.state0(lastSingleExpression);
                    break;
                case "1":
                    res = this.state1(lastSingleExpression);
                    break;
                case "2":
                    res = this.state2(lastSingleExpression);
                    break;
                case "3":
                    res = this.state3(lastSingleExpression);
                    break;
                case "4":
                    res = this.state4(lastSingleExpression);
                    break;
                case "5":
                    res = this.state5(lastSingleExpression);
                    break;
            }
            if (res) {
                break; // Exit For
            }
        }
        return res;
    }/**
     * When erase the expression
     * @returns new accepted states
     */
    backExec() {
        let lastState = "EMPTY";
        const expression = this.expressionGlobal.pop();
        // Control in parentheses
        if (expression.type == "InitialParentheses") {
            this.initialParentheses--;
        }
        if (expression.type == "FinalParentheses") {
            this.initialParentheses++;
        }
        this.statesHistory.pop();
        // Return new state and set new accepted state this.state
        if (this.statesHistory.length > 0) {
            lastState = this.statesHistory[this.statesHistory.length - 1];
            this.state = this.states[lastState].nextState;
        }
        // Return new accepted states validate with parentheses
        return {
            nextState: this.verifyFinalParentheses(this.states[lastState].nextState),
        };
    }
    /**
     * Verify if items returns the final parentheses
     * @param nextState 
     * @returns 
     */
    verifyFinalParentheses(nextState: Array<string>) {
        const clone = _.cloneDeep(nextState);
        _.remove(clone, (n) => (n == "5" && this.initialParentheses == 0));
        return clone;
    }
}

export default FiniteAutomaton;
