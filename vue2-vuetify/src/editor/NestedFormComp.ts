import { onDeactivated, onUnmounted, onUpdated, ref, watch } from 'vue';
import { alphaTeorem } from '../composition/alphaTeorem';
//import { controlRenderers } from '../controls';
import { useStyles } from '../styles';
import {
  createProvider,
  textTransform,
  updateData,
  useCoreControl,
} from './composables/controlComposition';
import { ProviderControl } from './composables/types';

/***********************************************************************************************************************************
 * COMPOSITION EXTENSION FOR TEXT CONTROL
 * @param vuetifyControl
 * @returns
 ***********************************************************************************************************************************/

export const useNestedFormComposition = <P>(props: P) => {
  const provider: ProviderControl = createProvider();
  const controlCore: any = useCoreControl(props);
  const styles = useStyles(controlCore.value.uischema);
  const control = ref(setPropsFormRef(controlCore.value));

  console.log('NETSED', controlCore);
  watch(controlCore, (nControl, oControl) => {
    if (!Object.is(nControl, oControl)) {
      control.value = setPropsFormRef(controlCore.value);
    }
  });

  //alphaTeorem Dependencies
  const deactivateAlpha = alphaTeorem({
    provider,
    dataCore: controlCore,
    dataUpdater: () => {
      control.value = setPropsFormRef(controlCore.value);
    },
  });

  const onChange = (value: any) => {
    updateData({
      dispatch: provider.dispatch,
      control: controlCore,
      value,
    });
  };
  onUpdated(() => {
    // this eill log whenever the component re-renders
    console.log('component re-rendered!', controlCore.value.uischema.scope);
  });
  onUnmounted(() => {
    deactivateAlpha();
  });

  onDeactivated(() => {
    deactivateAlpha();
  });

  return {
    control,
    onChange,
    styles,
    textTransform,
  };
};

/*****************************************************************************************************************
 * METHODS USING CONTROL
 *****************************************************************************************************************/
/**
 * Update data in JSON CORE
 * @param params
 */
export const setPropsFormRef = (control: any): any => ({
  visible: true,
  enabled: true,
  schema: {},
  uischema: control.uischema?.elements[0],
  path: control.path,
  renderers: control.renderers,
  cells: control.cells,
});
