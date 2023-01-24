import { getScope, pathControlSchema } from '../../utils/scope';

const getters = {
  palleteElements: (state: any) => state.editor.paletteElements,
  activeElement: (state: any) => state.editor.element,
  schema: (state: any) => state.editor.schema,
  uiSchema: (state: any) => state.editor.uiSchema,
  locale: (state: any) => state.jsonforms.locale,
  scopes: (state: any) => {
    return Array.from(state.editor.schema.properties.keys());
  },
  scopesByValue: (state: any) => (scopes: Array<string>) => {
    // eslint-disable-next-line prefer-const
    let response: any = {};
    scopes.forEach((scope) => {
      response[scope] = state.data[scope];
    });

    return response;
  },
  formRules: (state: any) => {
    // eslint-disable-next-line prefer-const
    let rules: any = {};
    // eslint-disable-next-line prefer-const
    let response: Array<any> = [];
    const { uiSchema } = state.editor;
    getScope(uiSchema, (obj: any, key: string, value: any) => {
      const optionRules: Array<any> = obj.options?.rules;
      if (optionRules) {
        optionRules.forEach((rule) => {
          if (!rules[rule.id]) {
            rules[rule.id] = {
              expression: rule.expression,
              id: rule.id,
              effects: [
                {
                  scopes: [pathControlSchema(value)],
                  effect: rule.effect,
                },
              ],
            };
          } else {
            // eslint-disable-next-line prefer-const
            let effectObj = rules[rule.id].effects.find(
              (effect: any) => effect.effect == rule.effect
            );
            if (effectObj) {
              effectObj['scopes'].push(pathControlSchema(value));
            } else {
              rules[rule.id].effects.push({
                scopes: [pathControlSchema(value)],
                effect: rule.effect,
              });
            }
          }
        });
      }
    });

    for (const id in rules) {
      response.push(rules[id]);
    }
    return response;
  },
};

export default getters;
