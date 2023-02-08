import _ from 'lodash';
import { uuid } from 'uuidv4';
import { TypeExpression } from './types';
import store from '../../store';

/**
 * Predictor class for combobox in IfComponent Expressions
 */
class FiniteAutomaton {
  statesHistory: Array<any> = [];
  expressionGlobal: Array<any> = [];
  state: Array<string> = ['EMPTY'];
  initialParentheses = 0;
  states: any = {
    EMPTY: {
      types: ['Empty'],
      nextState: ['0', '1'],
    },
    '0': {
      types: ['InitialParentheses'],
      nextState: ['0', '1'],
    },
    '1': {
      types: ['Field'],
      nextState: ['2'],
    },
    '2': {
      types: ['Operator'],
      nextState: ['3'],
    },
    '3': {
      types: ['Value'],
      nextState: ['4', '5', 'Final'],
    },
    '4': {
      types: ['LogicOperator'],
      nextState: ['0', '1'],
    },
    '5': {
      types: ['FinalParentheses'],
      nextState: ['4', '5', 'Final'],
    },
  };

  constructor(expression: string | null) {
    this.exec();
    expression && this.executeStringExpression(expression);
  }

  getExpression() {
    return this.expressionGlobal;
  }

  executeStringExpression(strExpression: string) {
    const parseExp: Array<string> = strExpression.split(/\s+/);
    parseExp.forEach((str: string) => {
      const typeExpression: TypeExpression = formatStringExpression(str);
      this.exec(typeExpression);
    });
  }

  /**
   * Add to expression collection Global
   * @param expression
   */
  updateExpressionGlobal(expression: any) {
    this.expressionGlobal.push(expression);
  }
  // State Empty Field to:: State1 || State2
  stateEmpty(lastSingleExpression: any) {
    let res,
      state,
      oldState = '0';
    if (!lastSingleExpression) {
      return this.states['EMPTY'];
    }
    if (lastSingleExpression.type == 'InitialParentheses') {
      state = ['0', '1'];
      oldState = '0';
      this.statesHistory.push(oldState);
      this.updateExpressionGlobal(lastSingleExpression);
      this.initialParentheses = +1;
    }
    if (lastSingleExpression.type == 'Field') {
      state = ['2'];
      oldState = '1';
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
    let res,
      state,
      oldState = '0';
    if (lastSingleExpression.type == 'InitialParentheses') {
      state = ['0', '1'];
      oldState = '0';
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
    let res,
      state,
      oldState = '0';
    if (lastSingleExpression.type == 'Field') {
      state = '2';
      oldState = '1';
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
    let res,
      state,
      oldState = '0';
    if (lastSingleExpression.type == 'Operator') {
      state = '3';
      oldState = '2';
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
    let res,
      state,
      oldState = '0';
    if (lastSingleExpression.type == 'Value') {
      state = this.states['3'].nextState;
      oldState = '3';
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
    let res,
      state,
      oldState = '0';
    if (lastSingleExpression.type == 'LogicOperator') {
      state = this.states['4'].nextState;
      oldState = '4';
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
    let res,
      state,
      oldState = '0';
    if (lastSingleExpression.type == 'FinalParentheses') {
      state = this.states['5'].nextState;
      oldState = '5';
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
  exec(lastSingleExpression?: any) {
    let res;
    for (const st of this.state) {
      switch (st) {
        case 'EMPTY':
          res = this.stateEmpty(lastSingleExpression);
          break;
        case '0':
          res = this.state0(lastSingleExpression);
          break;
        case '1':
          res = this.state1(lastSingleExpression);
          break;
        case '2':
          res = this.state2(lastSingleExpression);
          break;
        case '3':
          res = this.state3(lastSingleExpression);
          break;
        case '4':
          res = this.state4(lastSingleExpression);
          break;
        case '5':
          res = this.state5(lastSingleExpression);
          break;
      }
      if (res) {
        break; // Exit For
      }
    }
    return res;
  }

  /**
   * Execute the Finite Automaton and verify the states of expression, when add new expression
   * @param lastSingleExpression
   * @returns any
   */
  execute(lastSingleExpression?: any) {
    let res;
    if (typeof lastSingleExpression == 'string') {
      lastSingleExpression = formatStringExpression(lastSingleExpression);
    }

    for (const st of this.state) {
      switch (st) {
        case 'EMPTY':
          res = this.stateEmpty(lastSingleExpression);
          break;
        case '0':
          res = this.state0(lastSingleExpression);
          break;
        case '1':
          res = this.state1(lastSingleExpression);
          break;
        case '2':
          res = this.state2(lastSingleExpression);
          break;
        case '3':
          res = this.state3(lastSingleExpression);
          break;
        case '4':
          res = this.state4(lastSingleExpression);
          break;
        case '5':
          res = this.state5(lastSingleExpression);
          break;
      }
      if (res) {
        break; // Exit For
      }
    }
    return this;
  }

  getTypesNextState() {
    let res: Array<any> = [];
    let nextState = [];
    if (this.statesHistory.length == 0) {
      nextState = this.states['EMPTY'].nextState;
    } else {
      nextState = this.states[this.statesHistory.at(-1)].nextState;
    }
    for (const st of nextState) {
      switch (st) {
        case '0':
          res = res.concat(getTypes('InitialParentheses'));
          break;
        case '1':
          res = res.concat(getScopes());
          break;
        case '2':
          res = res.concat(getTypes('Operator'));
          break;
        case '3':
          res = res.concat(getValuesDefault());
          break;
        case '4':
          res = res.concat(getTypes('LogicOperator'));
          break;
        case '5':
          res = res.concat(getTypes('FinalParentheses'));
          break;
      }
    }
    return res;
  }
  /**
   * When erase the expression
   * @returns new accepted states
   */
  backExec() {
    let lastState = 'EMPTY';
    const expression = this.expressionGlobal.pop();
    // Control in parentheses
    if (expression.type == 'InitialParentheses') {
      this.initialParentheses--;
    }
    if (expression.type == 'FinalParentheses') {
      this.initialParentheses++;
    }
    this.statesHistory.pop();
    // Return new state and set new accepted state this.state
    if (this.statesHistory.length > 0) {
      lastState = this.statesHistory[this.statesHistory.length - 1];
      this.state = this.states[lastState].nextState;
    } else {
      this.state = ['EMPTY'];
    }
    // Return new accepted states validate with parentheses
    return this;
  }
  /**
   * Verify if items returns the final parentheses
   * @param nextState
   * @returns
   */
  verifyFinalParentheses(nextState: Array<string>) {
    const clone = _.cloneDeep(nextState);
    _.remove(clone, (n) => n == '5' && this.initialParentheses == 0);
    return clone;
  }
}

export default FiniteAutomaton;

export const getTypes = (criteria = 'all') => {
  const types = [
    {
      text: '(',
      format: '(',
      value: uuid(),
      color: 'white',
      type: 'InitialParentheses',
    },
    {
      text: ')',
      format: ')',
      value: uuid(),
      color: 'white',
      type: 'FinalParentheses',
    },
    {
      text: 'AND',
      value: uuid(),
      format: '&&',
      color: 'white',
      type: 'LogicOperator',
    },
    {
      text: 'OR',
      value: uuid(),
      format: '||',
      color: 'white',
      type: 'LogicOperator',
    },
    {
      text: '==',
      format: '==',
      value: uuid(),
      color: 'white',
      type: 'Operator',
    },
    {
      text: '!=',
      format: '!=',
      value: uuid(),
      color: 'white',
      type: 'Operator',
    },
    {
      text: '<',
      format: '<',
      value: uuid(),
      color: 'white',
      type: 'Operator',
    },
    {
      text: '<=',
      format: '<=',
      value: uuid(),
      color: 'white',
      type: 'Operator',
    },
    {
      text: '>=',
      format: '>=',
      value: uuid(),
      color: 'white',
      type: 'Operator',
    },
    {
      text: '>',
      format: '>',
      value: uuid(),
      color: 'white',
      type: 'Operator',
    },
  ];

  if (criteria == 'all') {
    return types;
  }

  return types.filter((element: any) => element.type == criteria);
};

export const getScopes = () => {
  const res: Array<any> = [];
  const scopes = store.getters['app/scopes'];
  scopes.forEach((el: string) => {
    res.push(formatMustacheValue(el));
  });
  return res;
};

export const formatMustacheValue = (value: string) => {
  return {
    text: value,
    format: `'{{${value}}}'`,
    value: uuid(),
    color: 'yellow',
    type: 'Field',
  };
};

export const formatValue = (value: string) => {
  return {
    text: value,
    format: `'${value}'`,
    value: uuid(),
    color: 'yellow',
    type: 'Value',
  };
};

export const getValuesDefault = () => {
  return {
    items: [{ header: 'Create a value' }],
  };
};

export const formatStringExpression = (strExp: string): TypeExpression => {
  const types: Array<TypeExpression> = getTypes();
  let resultMustache: any = strExp.match(/{{\s*([\w_]+)\s*}}/);
  let resultNormalValue: any = strExp.match(/\s*([\w_]+)\s*/);
  const resultType: any = types.find(
    (element: TypeExpression) => element.format == strExp
  );
  resultMustache = resultMustache
    ? formatMustacheValue(resultMustache[1])
    : null;

  resultNormalValue = resultNormalValue
    ? formatValue(resultNormalValue[1])
    : null;

  return resultMustache || resultNormalValue || resultType;
};
