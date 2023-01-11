import { ref } from 'vue';
import store from '../../store';
import { uuid } from 'uuidv4';
import { FormRule } from './types';
export const useIfThenComposition = (props: any) => {
  const rule: FormRule = props.data,
    ifComponent: any = ref(null),
    thenComponent: any = ref(null);

  console.log('IFTHEN', props);
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
      store.dispatch('app/setOptionsByScope', {
        scope,
        options: {
          rules: [
            {
              expression,
              effect,
              id,
            },
          ],
        },
      });
    });
  };

  return { ifComponent, thenComponent, saveRule, dataIf, dataThen };
};
