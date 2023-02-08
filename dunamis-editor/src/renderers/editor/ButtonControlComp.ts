import { onDeactivated, onUnmounted, onUpdated, ref, watch } from 'vue';
import { alphaTeorem, renderWithMustache } from '../composition/alphaTeorem';
import { useStyles } from '../styles';
import {
  ariaLabel,
  createProvider,
  defaultEffects,
  getEffectsControl,
  label,
  labelCols,
  labelOrientation,
  tabindex,
  updateData,
  useCoreControl,
} from './composables/controlComposition';
import { ProviderControl } from './composables/types';

/***********************************************************************************************************************************
 * COMPOSITION EXTENSION FOR BUTTON CONTROL
 * @param vuetifyControl
 * @returns
 ***********************************************************************************************************************************/

export const useButtonControlComposition = <P>(props: P) => {
  const provider: ProviderControl = createProvider();
  const controlCore: any = useCoreControl(props);
  const styles = useStyles(controlCore.value.uischema);
  const control = ref(
    setPropsButtonControl(
      Object.assign(
        {},
        renderWithMustache(provider, controlCore.value, true),
        defaultEffects()
      )
    )
  );

  watch(controlCore, (nControl: any, oControl: any) => {
    if (!Object.is(nControl.uischema, oControl.uischema)) {
      control.value = setPropsButtonControl(
        Object.assign(
          {},
          renderWithMustache(provider, nControl, true),
          getEffectsControl(control.value)
        )
      );
    }
  });

  const deactivateAlpha = alphaTeorem({
    provider,
    dataCore: controlCore,
    dataUpdater: (ctrl: any) => {
      control.value = setPropsButtonControl(ctrl);
    },
  });

  const onChange = (value: any) => {
    updateData({
      dispatch: provider.dispatch,
      control: controlCore,
      value,
    });
  };
  const onClick = () => {
    alert('The form was submitted');
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
    onClick,
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
export const setPropsButtonControl = (control: any) => {
  return {
    id: control.id,
    ariaLabel: ariaLabel(control),
    labelOrientation: labelOrientation(control),
    label: label(control),
    labelCols: labelCols(control),
    tabindex: tabindex(control),
    data: control.data,
    show: control.show,
    disabled: control.disabled,
  };
};
