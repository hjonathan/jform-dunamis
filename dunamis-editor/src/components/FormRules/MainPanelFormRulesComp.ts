import { PropType } from '@vue/composition-api';
import { ref, Ref } from 'vue';
import store from '../../store';
import { FormRule } from './types';
import { uuid } from 'uuidv4';
export const useMainPanelComposition = (props: PropType<any>) => {
  const storeRules: Array<FormRule> = store.getters['app/formRules'];
  const rules: Ref<Array<FormRule>> = ref(storeRules);
  const blankModelRefs: any = ref(
    storeRules.length == 0 ? [{ id: uuid() }] : []
  );
  const blankRefs: any = ref([]);
  const rulesRefs = ref([]);

  const saveFormRules = (): void => {
    rulesRefs.value.forEach((ref: any) => {
      ref && ref.updateRule();
    });
    blankRefs.value.forEach((ref: any) => {
      ref && ref.saveRule();
    });
  };

  const addBlankRef = () => {
    const newRef = { id: uuid() };
    blankModelRefs.value.push(newRef);
  };

  const deleteBlankForm = (item: any) => {
    const arr = blankModelRefs.value;
    const index: number = arr.findIndex((element: any) => {
      return item.id == element.id;
    });
    if (index != -1) {
      blankModelRefs.value.splice(index, 1);
    }
  };

  return {
    rules,
    rulesRefs,
    blankModelRefs,
    blankRefs,
    addBlankRef,
    saveFormRules,
    deleteBlankForm,
  };
};
