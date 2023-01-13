import { ref } from 'vue';
import store from '../../store';
import { uuid } from 'uuidv4';
import { FormRule } from './types';
export const useIfThenComposition = (props: any) => {
  const rule: FormRule = props.data,
    ifComponent: any = ref(null),
    thenComponent: any = ref(null);

  const dataIf = ref({
    expression: rule.expression,
  });

  const dataThen = ref({
    effect: rule.effect,
    scopes: rule.scopes,
  });

  const saveRule = () => {
    const { expression } = ifComponent.value.getData();
    const { effect, scopes } = thenComponent.value.getData();
    const id = uuid();
    scopes.forEach((scope: any) => {
      store.dispatch('app/setRulesByScope', {
        scope,
        rules: [
          {
            expression,
            effect,
            id,
          },
        ],
      });
    });
  };

  const updateRule = () => {
    const { expression } = ifComponent.value.getData();
    const { effect, scopes } = thenComponent.value.getData();
    const id = rule.id;
    scopes.forEach((scope: any) => {
      store.dispatch('app/updateRuleByScope', {
        scope,
        rule: {
          expression,
          effect,
          id,
        },
      });
    });
  };

  return {
    ifComponent,
    thenComponent,
    saveRule,
    updateRule,
    dataIf,
    dataThen,
    hover: ref(false),
  };
};
