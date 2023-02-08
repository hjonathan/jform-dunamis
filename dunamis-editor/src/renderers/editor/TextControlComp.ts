import { onDeactivated, onUnmounted, onUpdated, ref, watch } from 'vue';
import { alphaTeorem, renderWithMustache } from '../composition/alphaTeorem';
import { useStyles } from '../styles';

import {
  ariaLabel,
  createProvider,
  defaultEffects,
  defaultValue,
  getEffectsControl,
  hint,
  label,
  labelCols,
  labelOrientation,
  placeholder,
  readonly,
  tabindex,
  textTransform,
  updateData,
  useCoreControl,
  validation,
} from './composables/controlComposition';
import { ProviderControl, TextControl } from './composables/types';

/***********************************************************************************************************************************
 * COMPOSITION EXTENSION FOR TEXT CONTROL
 * @param vuetifyControl
 * @returns
 ***********************************************************************************************************************************/

export const useTextControlComposition = <P>(props: P) => {
  const provider: ProviderControl = createProvider();
  const controlCore: any = useCoreControl(props);
  const styles = useStyles(controlCore.value.uischema);
  const control = ref(
    setPropsTextControl(
      Object.assign(
        {},
        renderWithMustache(provider, controlCore.value, true),
        defaultEffects()
      )
    )
  );

  watch(controlCore, (nControl, oControl) => {
    if (!Object.is(nControl.uischema, oControl.uischema)) {
      control.value = setPropsTextControl(
        Object.assign(
          {},
          renderWithMustache(provider, nControl, true),
          getEffectsControl(control.value)
        )
      );
    }
  });

  //alphaTeorem Dependencies
  const deactivateAlpha = alphaTeorem({
    provider,
    dataCore: controlCore,
    dataUpdater: (response: any) => {
      control.value = setPropsTextControl(response);
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
export const setPropsTextControl = (control: any): TextControl => ({
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
  readonly: readonly(control),
  show: control.show,
  disabled: control.disabled,
});
