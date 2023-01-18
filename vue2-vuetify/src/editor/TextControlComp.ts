import { onDeactivated, onUnmounted, onUpdated, ref, watch } from 'vue';
import { alphaTeorem } from '../composition/alphaTeorem';
import { useStyles } from '../styles';

import {
  ariaLabel,
  createProvider,
  defaultEffects,
  defaultValue,
  hint,
  label,
  labelCols,
  labelOrientation,
  placeholder,
  readonly,
  tabindex,
  textTransform,
  updateData,
  useControl,
  validation,
} from './composables/controlComposition';
import { ProviderControl } from './composables/types';

/***********************************************************************************************************************************
 * COMPOSITION EXTENSION FOR TEXT CONTROL
 * @param vuetifyControl
 * @returns
 ***********************************************************************************************************************************/

export const useTextControlComposition = <P>(props: P) => {
  const provider: ProviderControl = createProvider();
  const controlCore: any = useControl(props);
  const control = ref(setPropsTextControl(controlCore.value, { SHOW: true }));

  watch(controlCore, (nControl, oControl) => {
    if (!Object.is(nControl, oControl)) {
      control.value = setPropsTextControl(nControl, defaultEffects());
    }
  });

  const styles = useStyles(controlCore.value.uischema);
  //alphaTeorem Dependencies
  const deactivateAlpha = alphaTeorem({
    provider,
    dataCore: controlCore,
    dataUpdater: (response: any) => {
      control.value = setPropsTextControl(
        response.control,
        Object.assign(defaultEffects(), response.fx)
      );
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
export const setPropsTextControl = (control: any, fx: any = {}) => {
  return {
    validation: validation(control),
    labelOrientation: labelOrientation(control),
    label: label(control),
    labelCols: labelCols(control),
    tabindex: tabindex(control),
    ariaLabel: ariaLabel(control),
    hint: hint(control),
    placeholder: placeholder(control),
    data: defaultValue(control),
    id: control.id,
    visible: true,
    readonly: readonly(control),
    fx: fx,
  };
};
