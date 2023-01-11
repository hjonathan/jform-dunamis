import { onMounted, ref } from 'vue';
import store from './../../../store';
import { ThenRule } from '../types';
/***********************************************************************************************************************************
 * COMPOSITION EXTENSION FOR IF COMPONENT
 ***********************************************************************************************************************************/

export const useThenComposition = (props: any) => {
  console.log('THEN COMPOSITION', props);
  const data: ThenRule = props.data;
  const effects: any = ref({
      items: loadEffects(),
      selected: 'SHOW',
    }),
    scopes: any = ref({
      items: loadScopes(),
      selected: [],
    });

  const getData = () => {
    return { effect: effects.value.selected, scopes: scopes.value.selected };
  };

  onMounted(() => {
    if (data.effect) {
      effects.value.selected = data.effect;
    }
    if (data.scopes.length != 0) {
      scopes.value.selected = data.scopes;
    }
  });

  return { effects, scopes, getData };
};

const loadEffects = () => {
  return ['SHOW', 'HIDE', 'ENABLED', 'DISABLED'];
};

const loadScopes = () => {
  return store.getters['app/scopes'];
};
