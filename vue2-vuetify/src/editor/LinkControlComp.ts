import { CoreActions, Dispatch } from '@jsonforms/core';
import { isEqual } from 'lodash';
import { inject, onDeactivated, onUnmounted, onUpdated, ref, watch } from 'vue';
import { alphaTeorem } from '../composition/alphaTeorem';
import { useStyles } from '../styles';
import { content, useControl } from './LabelControlComp';
import {
  ariaLabel,
  hint,
  labelCols,
  labelOrientation,
  tabindex,
  updateData,
} from './composables/controlComposition';

/***********************************************************************************************************************************
 * COMPOSITION EXTENSION FOR LINK CONTROL
 * @param vuetifyControl
 * @returns
 ***********************************************************************************************************************************/

export const useLinkControlComposition = <P>(props: P) => {
  const dispatch = inject<Dispatch<CoreActions>>('dispatch');
  const store = inject<any>('store');
  const HX = inject<any>('HX');
  if (!dispatch) {
    throw "'jsonforms' or 'dispatch' couldn't be injected. Are you within JSON Forms?";
  }

  //Properties
  const controlCore: any = useControl(props);
  const control = ref(setPropsLinkControl(controlCore.value));

  watch(controlCore, (nControl, oControl) => {
    if (!isEqual(nControl, oControl)) {
      control.value = setPropsLinkControl(nControl);
    }
  });

  const styles = useStyles(controlCore.value.uischema);
  //alphaTeorem Dependencies
  const deactivateAlpha = alphaTeorem({
    store,
    HX,
    controlCore: controlCore,
    updater: (ctrl: any) => {
      control.value = setPropsLinkControl(ctrl);
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
  };
};

/*****************************************************************************************************************
 * METHODS USING CONTROL
 *****************************************************************************************************************/

/**
 * Update data in JSON CORE
 * @param params
 */
export const setPropsLinkControl = (control: any) => {
  return {
    content: content(control),
    href: href(control),
    labelOrientation: labelOrientation(control),
    label: label(control),
    labelCols: labelCols(control),
    tabindex: tabindex(control),
    ariaLabel: ariaLabel(control),
    hint: hint(control),
    id: control.id,
    visible: true,
  };
};

export const label = (control: any) => control.uischema.label ?? '';

export const href = (control: any) => control.uischema.options?.href ?? '';
