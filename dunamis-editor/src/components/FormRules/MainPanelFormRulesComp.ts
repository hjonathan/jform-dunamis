import { PropType } from '@vue/composition-api';
import { ref, Ref } from 'vue';
import store from '../../store';
import { FormRule } from './types';
export const useMainPanelComposition = (props: PropType<any>) => {
  const storeRules: Array<FormRule> = store.getters['app/formRules'];
  const rules: Ref<Array<FormRule>> = ref(storeRules);
  const refsComponents = ref({});
  const refAddRule = ref({});

  const saveFormRules = (): void => {
    if (refAddRule.value) {
      refAddRule.value.save();
    }
  };

  return {
    rules,
    refsComponents,
    refAddRule,
    saveFormRules,
  };
};
