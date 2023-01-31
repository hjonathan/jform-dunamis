import { isEqual } from 'lodash';
import { onDeactivated, onUnmounted, onUpdated, ref, watch } from 'vue';
import { alphaTeorem } from '../composition/alphaTeorem';
import { useStyles } from '../styles';
import {
  ariaLabel,
  createProvider,
  defaultEffects,
  getEffectsControl,
  hint,
  label,
  labelCols,
  labelOrientation,
  readonly,
  tabindex,
  updateData,
  useCoreControl,
  validation,
} from './composables/controlComposition';
import { ProviderControl } from './composables/types';

/***********************************************************************************************************************************
 * COMPOSITION EXTENSION FOR CHECKBOX CONTROL
 * @param vuetifyControl
 * @returns
 ***********************************************************************************************************************************/

export const useCheckboxControlComposition = <P>(props: P) => {
  const provider: ProviderControl = createProvider();
  const controlCore: any = useCoreControl(props);
  const styles = useStyles(controlCore.value.uischema);
  const control = ref(
    setPropsDefaultCheckboxControl(
      Object.assign({}, controlCore.value, defaultEffects())
    )
  );

  watch(controlCore, (nControl: any, oControl: any) => {
    if (!isEqual(nControl, oControl)) {
      control.value = setPropsCheckboxControl(
        Object.assign({}, nControl, getEffectsControl(control.value))
      );
    }
  });

  const deactivateAlpha = alphaTeorem({
    provider,
    dataCore: controlCore,
    dataUpdater: (ctrl: any) => {
      control.value = setPropsCheckboxControl(ctrl);
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
  };
};

/*****************************************************************************************************************
 * METHODS USING CONTROL
 *****************************************************************************************************************/

/**
 * Update data in JSON CORE
 * @param params
 */
export const setPropsCheckboxControl = (control: any) => ({
  id: control.id,
  ariaLabel: ariaLabel(control),
  labelOrientation: labelOrientation(control),
  label: label(control),
  labelCols: labelCols(control),
  hint: hint(control),
  validation: validation(control),
  tabindex: tabindex(control),
  readonly: readonly(control),
  data: control.data,
  show: control.show,
  disabled: control.disabled,
});

/**
 * Default data for
 * @param params
 */
export const setPropsDefaultCheckboxControl = (control: any) => ({
  id: control.id,
  ariaLabel: ariaLabel(control),
  labelOrientation: labelOrientation(control),
  label: label(control),
  labelCols: labelCols(control),
  hint: hint(control),
  validation: validation(control),
  tabindex: tabindex(control),
  readonly: readonly(control),
  data: checkedDefault(control),
  show: control.show,
  disabled: control.disabled,
});

export const checkedDefault = (control: any) =>
  control.uischema.options?.checkedDefault ?? control.data;