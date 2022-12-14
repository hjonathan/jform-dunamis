import { CoreActions, Dispatch } from '@jsonforms/core';
import { isEqual } from 'lodash';
import { inject, onDeactivated, onUnmounted, onUpdated, ref, watch } from 'vue';
import { alphaTeorem } from '../composition/alphaTeorem';
import { useStyles } from '../styles';
import {
  hint,
  label,
  labelCols,
  labelOrientation,
  textTransform,
  updateData,
  useControl,
} from './TextControlComp';

/***********************************************************************************************************************************
 * COMPOSITION EXTENSION FOR IMAGE CONTROL
 * @param props
 * @returns
 ***********************************************************************************************************************************/

export const useImageControlComposition = <P>(props: P) => {
  const dispatch = inject<Dispatch<CoreActions>>('dispatch');
  const store = inject<any>('store');
  const HX = inject<any>('HX');
  if (!dispatch) {
    throw "'jsonforms' or 'dispatch' couldn't be injected. Are you within JSON Forms?";
  }

  //Properties
  const controlCore: any = useControl(props);
  const control = ref(setPropsImageControl(controlCore.value));

  watch(controlCore, (nControl, oControl) => {
    if (!isEqual(nControl, oControl)) {
      control.value = setPropsImageControl(nControl);
    }
  });

  const styles = useStyles(controlCore.value.uischema);
  //alphaTeorem Dependencies
  const deactivateAlpha = alphaTeorem({
    store,
    HX,
    controlCore: controlCore,
    updater: (ctrl: any) => {
      control.value = setPropsImageControl(ctrl);
    },
  });

  const onChange = (value: any) => {
    updateData({
      dispatch,
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
