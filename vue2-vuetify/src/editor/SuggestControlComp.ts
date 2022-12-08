import { CoreActions, Dispatch } from '@jsonforms/core';
import { isEqual } from 'lodash';
import { inject, onDeactivated, onUnmounted, onUpdated, ref, watch } from 'vue';
import { alphaTeorem } from '../composition/alphaTeorem';
import { useStyles } from '../styles';
import {
  ariaLabel,
  hint,
  label,
  labelCols,
  labelOrientation,
  placeholder,
  readonly,
  tabindex,
  updateData,
  useControl,
  validation,
} from './TextControlComp';

/***********************************************************************************************************************************
 * COMPOSITION EXTENSION FOR SUGGEST CONTROL
 * @param vuetifyControl
 * @returns
 ***********************************************************************************************************************************/

export const useSuggestControlComposition = <P>(props: P) => {
  const dispatch = inject<Dispatch<CoreActions>>('dispatch');
  const store = inject<any>('store');
  const HX = inject<any>('HX');
  if (!dispatch) {
    throw "'jsonforms' or 'dispatch' couldn't be injected. Are you within JSON Forms?";
  }

  //Properties
  const controlCore: any = useControl(props);
  const control = ref(setPropsSuggestControl(controlCore.value));

  watch(controlCore, (nControl: any, oControl: any) => {
    if (!isEqual(nControl, oControl)) {
      control.value = setPropsSuggestControl(nControl);
    }
  });

  const styles = useStyles(controlCore.value.uischema);
  //alphaTeorem Dependencies
  const deactivateAlpha = alphaTeorem({
    store,
    HX,
    controlCore: controlCore,
    updater: (ctrl: any) => {
      control.value = setPropsSuggestControl(ctrl);
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
    styles,
    onChange,
  };
};
/*****************************************************************************************************************
 * METHODS USING CONTROL
 *****************************************************************************************************************/

/**
 * Update data in JSON CORE
 * @param params
 */
export const setPropsSuggestControl = (control: any) => {
  return {
    id: control.id,
    ariaLabel: ariaLabel(control),
    labelOrientation: labelOrientation(control),
    label: label(control),
    labelCols: labelCols(control),
    hint: hint(control),
    validation: validation(control),
    tabindex: tabindex(control),
    readonly: readonly(control),
    placeholder: placeholder(control),
    data: control.data,
    visible: true,
    options: options(control),
    errors: control.errors,
  };
};

export const options = (control: any) =>
  control.uischema.options?.options?.collection ?? [];
