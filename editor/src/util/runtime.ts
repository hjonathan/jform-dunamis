/*
  The MIT License

  Copyright (c) 2017-2019 EclipseSource Munich
  https://github.com/eclipsesource/jsonforms

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/

import has from 'lodash/has';
import {
  JsonFormsState,
  UISchemaElement,
  JsonSchema,
  getAjv,
  Condition,
  composeWithUi,
  OrCondition,
  SchemaBasedCondition,
  AndCondition,
  LeafCondition,
  Scopable,
  resolveData,
} from '@jsonforms/core';
import Ajv from 'ajv';

/**
 * Indicates whether the given `uischema` element shall be enabled or disabled.
 * Checks the global readonly flag, uischema rule, uischema options (including the config),
 * the schema and the enablement indicator of the parent.
 */
export const fireDependencyHandler = (
  state: JsonFormsState,
  ownProps: any,
  uischema: UISchemaElement,
  schema: (JsonSchema & { readOnly?: boolean }) | undefined,
  rootData: any,
  config: any
) => {
  if (uischema && hasReloadRule(uischema)) {
    return fireReload(uischema, rootData, ownProps?.path, getAjv(state));
  }
  return true;
};
export const fireReload = (
  uischema: UISchemaElement,
  data: any,
  path: string | undefined = undefined,
  ajv: any
): boolean => {
  if (uischema.rule) {
    return evalReload(uischema, data, path, ajv);
  }

  return true;
};

const isOrCondition = (condition: Condition): condition is OrCondition =>
  condition.type === 'OR';

const isAndCondition = (condition: Condition): condition is AndCondition =>
  condition.type === 'AND';

const isLeafCondition = (condition: Condition): condition is LeafCondition =>
  condition.type === 'LEAF';

const isDependencyCondition = (
  condition: Condition
): condition is AndCondition => condition.type === 'DEPENDENCY';

const isSchemaCondition = (
  condition: Condition
): condition is SchemaBasedCondition => has(condition, 'schema');

const getConditionScope = (condition: Scopable, path: string): string => {
  return composeWithUi(condition, path);
};
const evaluateCondition = (
  data: any,
  condition: Condition,
  path: string,
  ajv: Ajv
): any => {
  if (isAndCondition(condition)) {
    return condition.conditions.reduce(
      (acc, cur) => acc && evaluateCondition(data, cur, path, ajv),
      true
    );
  } else if (isOrCondition(condition)) {
    return condition.conditions.reduce(
      (acc, cur) => acc || evaluateCondition(data, cur, path, ajv),
      false
    );
  } else if (isLeafCondition(condition)) {
    const value = resolveData(
      data,
      getConditionScope(condition, undefined || '')
    );
    return value === condition.expectedValue;
  } else if (isDependencyCondition(condition)) {
    return true;
  } else if (isSchemaCondition(condition)) {
    const value = resolveData(data, getConditionScope(condition, path));
    return ajv.validate(condition.schema, value) as boolean;
  } else {
    // unknown condition
    return true;
  }
};
const isRuleFulfilled = (
  uischema: any,
  data: any,
  path: string,
  ajv: Ajv
): boolean => {
  const condition = uischema.rule.condition;
  return evaluateCondition(data, condition, path, ajv);
};
export const evalReload = (
  uischema: any,
  data: any,
  path: string | undefined = undefined,
  ajv: Ajv
): boolean => {
  const fulfilled = isRuleFulfilled(uischema, data, path || '', ajv);

  switch (uischema.rule.effect) {
    case RuleEffect.RELOAD:
      return fulfilled;
    // false by default
    default:
      return false;
  }
};

/**
 * The different rule effects.
 */
export enum RuleEffect {
  /**
   * Effect that reload the associated element.
   */
  RELOAD = 'RELOAD',
}

export const hasReloadRule = (uischema: any): boolean => {
  if (uischema.rule && uischema.rule.effect === RuleEffect.RELOAD) {
    return true;
  }
  return false;
};
