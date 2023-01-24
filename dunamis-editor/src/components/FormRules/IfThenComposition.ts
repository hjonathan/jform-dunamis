import { onMounted, Ref, ref } from 'vue';
import store from '../../store';
import { uuid } from 'uuidv4';
import { MultiFormRule, ThenRule } from './types';
export const useIfThenComposition = (props: any) => {
  const rule: MultiFormRule = props.data;
  const ifComponent: any = ref(null);
  const thenComponent: any = ref(null);
  const thenRefs = ref([]);
  const dataIf = ref({
    expression: rule.expression,
  });
  const multiThenComponent: Ref<Array<ThenRule>> = ref(rule.effects);

  const saveRule = () => {
    const { expression } = ifComponent.value.getData();
    const id = uuid();
    const rules: any = thenRefs.value.reduce((acc: any, element: any) => {
      acc.push(Object.assign({ id, expression }, element.getData()));
      return acc;
    }, []);

    rules.forEach((rule: any) => {
      rule.scopes.forEach((scope: string) => {
        store.dispatch('app/setRulesByScope', {
          scope,
          rules: [
            {
              expression: rule.expression,
              effect: rule.effect,
              id: rule.id,
            },
          ],
        });
      });
    });
  };

  const updateRule = () => {
    const { expression } = ifComponent.value.getData();
    const id = rule.id;
    const rules: any = thenRefs.value.reduce((acc: any, element: any) => {
      acc.push(Object.assign({ id, expression }, element.getData()));
      return acc;
    }, []);

    let scopes = rules.reduce((acc: Array<any>, obj: any) => {
      acc = acc.concat(obj.scopes);
      return acc;
    }, []);
    scopes = [...new Set(scopes)];
    scopes.forEach((scope: string) => {
      store.dispatch('app/deleteRulesByScope', {
        scope,
      });
    });

    rules.forEach((rule: any) => {
      rule.scopes.forEach((scope: string) => {
        store.dispatch('app/setRulesByScope', {
          scope,
          rules: [
            {
              expression: rule.expression,
              effect: rule.effect,
              id,
            },
          ],
        });
      });
    });
  };

  const addThenComponent = () => {
    multiThenComponent.value.push(createThenRule());
  };

  const deleteThenComponent = (item: ThenRule) => {
    const arr = multiThenComponent.value;
    const index: number = arr.findIndex((element: any) => {
      return item.id == element.id;
    });
    if (index != -1) {
      multiThenComponent.value.splice(index, 1);
    }
  };

  onMounted(() => {
    if (multiThenComponent.value?.length == 0) {
      multiThenComponent.value.push(createThenRule());
    }
  });

  return {
    ifComponent,
    thenComponent,
    saveRule,
    updateRule,
    addThenComponent,
    deleteThenComponent,
    thenRefs,
    dataIf,
    multiThenComponent,
    hover: ref(false),
  };
};

export const createThenRule = (): ThenRule => ({
  id: uuid(),
  scopes: [],
  effect: '',
});
