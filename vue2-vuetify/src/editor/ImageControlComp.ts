import { onDeactivated, onUnmounted, onUpdated, ref, watch } from 'vue';
import { alphaTeorem } from '../composition/alphaTeorem';
import { useStyles } from '../styles';
import {
  createProvider,
  hint,
  label,
  labelCols,
  labelOrientation,
  textTransform,
  updateData,
  useControl,
} from './composables/controlComposition';
import { ProviderControl } from './composables/types';

/***********************************************************************************************************************************
 * COMPOSITION EXTENSION FOR IMAGE CONTROL
 * @param props
 * @returns
 ***********************************************************************************************************************************/

export const useImageControlComposition = <P>(props: P) => {
  const provider: ProviderControl = createProvider();
  const controlCore: any = useControl(props);
  const control = ref(setPropsImageControl(controlCore.value));

  watch(controlCore, (nControl, oControl) => {
    if (!Object.is(nControl, oControl)) {
      control.value = setPropsImageControl(nControl);
    }
  });

  const styles = useStyles(controlCore.value.uischema);
  //alphaTeorem Dependencies
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
    visible: true,
    labelOrientation: labelOrientation(control),
    label: label(control),
    labelCols: labelCols(control),
    hint: hint(control),
    height: height(control),
    width: width(control),
    src: src(control),
  };
};

export const height = (control: any) => control.uischema.options?.height ?? 100;

export const width = (control: any) => control.uischema.options?.width ?? 100;

export const src = (control: any) => control.uischema.options?.src ?? '';
