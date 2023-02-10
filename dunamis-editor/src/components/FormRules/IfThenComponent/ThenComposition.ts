import { onMounted, ref } from 'vue';
import store from './../../../store';
import { ThenRule } from '../types';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { getMonacoModelForUri } from '@/core/jsonSchemaValidation';
/***********************************************************************************************************************************
 * COMPOSITION EXTENSION FOR IF COMPONENT
 ***********************************************************************************************************************************/

export const useThenComposition = (props: any) => {
  const data: ThenRule = props.data;
  const script = ref(setSchema('console.log("Execute Effect");'));
  const effects: any = ref({
      items: loadEffects(),
      selected: 'SHOW',
    }),
    scopes: any = ref({
      items: loadScopes(),
      selected: [],
    });

  const getData = () => {
    return {
      effect: effects.value.selected,
      scopes: scopes.value.selected,
      script:
        effects.value.selected == 'EXECUTE' ? script.value.getValue() : null,
    };
  };

  onMounted(() => {
    if (data.effect) {
      effects.value.selected = data.effect;
    }
    if (data.scopes.length != 0) {
      scopes.value.selected = data.scopes;
    }
  });

  return { effects, scopes, getData, script };
};

const loadEffects = () => {
  return ['SHOW', 'HIDE', 'ENABLED', 'DISABLED', 'EXECUTE'];
};

const loadScopes = () => {
  return store.getters['app/scopes'];
};

export const setSchema: any = (document: any) => {
  return monaco.editor.createModel(document, 'javascript');
};
