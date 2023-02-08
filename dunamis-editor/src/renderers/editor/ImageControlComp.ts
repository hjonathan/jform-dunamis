import { onDeactivated, onUnmounted, onUpdated, ref, watch } from 'vue';
import { alphaTeorem } from '../composition/alphaTeorem';
import { useStyles } from '../styles';
import {
  createProvider,
  defaultEffects,
  getEffectsControl,
  hint,
  label,
  labelCols,
  labelOrientation,
  textTransform,
  updateData,
  useCoreControl,
} from './composables/controlComposition';
import { ProviderControl } from './composables/types';

/***********************************************************************************************************************************
 * COMPOSITION EXTENSION FOR IMAGE CONTROL
 * @param props
 * @returns
 ***********************************************************************************************************************************/

export const useImageControlComposition = <P>(props: P) => {
  const provider: ProviderControl = createProvider();
  const controlCore: any = useCoreControl(props);
  const styles = useStyles(controlCore.value.uischema);
  const control = ref(
    setPropsImageControl(Object.assign({}, controlCore.value, defaultEffects()))
  );
  watch(controlCore, (nControl, oControl) => {
    if (!Object.is(nControl.uischema, oControl.uischema)) {
      control.value = setPropsImageControl(
        Object.assign({}, nControl, getEffectsControl(control.value))
      );
    }
  });

  const deactivateAlpha = alphaTeorem({
    provider,
    dataCore: controlCore,
    dataUpdater: (ctrl: any) => {
      control.value = setPropsImageControl(ctrl);
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
export const setPropsImageControl = (control: any) => {
  return {
    id: control.id,
    labelOrientation: labelOrientation(control),
    label: label(control),
    labelCols: labelCols(control),
    hint: hint(control),
    height: height(control),
    width: width(control),
    src: src(control),
    show: control.show,
    disabled: control.disabled,
  };
};

export const height = (control: any) => control.uischema.options?.height ?? 100;

export const width = (control: any) => control.uischema.options?.width ?? 100;

export const src = (control: any) => control.uischema.options?.src ?? '';
