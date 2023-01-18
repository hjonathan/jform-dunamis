import { CoreActions, Dispatch } from '@jsonforms/core';
import { isEqual } from 'lodash';
import Vue, {
  inject,
  onDeactivated,
  onUnmounted,
  onUpdated,
  ref,
  watch,
} from 'vue';
import { alphaTeorem } from '../composition/alphaTeorem';
import { useStyles } from '../styles';
import {
  ariaLabel,
  createProvider,
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
} from './composables/controlComposition';
import { ProviderControl } from './composables/types';

/***********************************************************************************************************************************
 * COMPOSITION EXTENSION FOR DATETIME CONTROL
 * @param vuetifyControl
 * @returns
 ***********************************************************************************************************************************/

export const useDatetimeControlComposition = <P>(props: P) => {
  const provider: ProviderControl = createProvider();
  //Properties
  const controlCore: any = useControl(props);
  const control = ref(setPropsDefaultDatetimeControl(controlCore.value));

  watch(controlCore, (nControl: any, oControl: any) => {
    if (!isEqual(nControl, oControl)) {
      control.value = setPropsDatetimeControl(nControl);
    }
  });

  const styles = useStyles(controlCore.value.uischema);
  //alphaTeorem Dependencies
  const deactivateAlpha = alphaTeorem({
    provider,
    dataCore: controlCore,
    dataUpdater: (ctrl: any) => {
      control.value = setPropsDatetimeControl(ctrl);
    },
  });

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
    ...useDatetimeExtend({ control, controlCore }),
  };
};

export const useDatetimeExtend = (params: any) => {
  //Properties
  const { control, controlCore } = params;
  const dispatch = inject<Dispatch<CoreActions>>('dispatch');
  const showPicker = ref(false);
  const x = ref(0);
  const y = ref(0);
  const date = ref('');
  const time = ref('');

  const show = (e: any) => {
    e.preventDefault();
    showPicker.value = false;
    x.value = e.clientX;
    y.value = e.clientY;
    Vue.nextTick(() => {
      showPicker.value = true;
    });
  };

  const onChange = () => {
    const { dataType } = control.value;
    let val = '';
    switch (dataType) {
      case 'date-time':
        val = time.value != '' ? date.value + ' ' + time.value : date.value;
        break;
      case 'date':
        val = date.value;
        break;
      case 'time':
        val = time.value;
        break;
    }

    updateData({
      dispatch,
      control: controlCore,
      value: val,
    });
  };

  return {
    showPicker,
    show,
    onChange,
    date,
    time,
    x,
    y,
  };
};

/*****************************************************************************************************************
 * METHODS USING CONTROL
 *****************************************************************************************************************/

/**
 * Update data in JSON CORE
 * @param params
 */
export const setPropsDatetimeControl = (control: any) => {
  return {
    id: control.id,
    dataType: dataType(control),
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
    minDate: minDate(control),
    maxDate: maxDate(control),
    errors: control.errors,
    defaultValue: defaultDate(control),
  };
};

export const setPropsDefaultDatetimeControl = (control: any) => {
  return {
    id: control.id,
    dataType: dataType(control),
    ariaLabel: ariaLabel(control),
    labelOrientation: labelOrientation(control),
    label: label(control),
    labelCols: labelCols(control),
    hint: hint(control),
    validation: validation(control),
    tabindex: tabindex(control),
    readonly: readonly(control),
    placeholder: placeholder(control),
    data: defaultDate(control),
    visible: true,
    minDate: minDate(control),
    maxDate: maxDate(control),
    errors: control.errors,
  };
};

export const dataType = (control: any) => {
  let path = [],
    currentPath: any;
  if (control.path) {
    path = control.path.split('.');
  }
  currentPath = control.rootSchema?.properties;
  if (currentPath) {
    path.forEach((p: string) => {
      if (currentPath[p]) {
        currentPath = currentPath[p];
        if (currentPath.items?.properties) {
          currentPath = currentPath.items?.properties;
        }
      }
    });

    return currentPath?.format ?? 'date-time';
  }
  return 'date-time';
};

export const format = (control: any) =>
  control.uischema.options?.format ?? 'date-time';

export const minDate = (control: any) =>
  control.uischema.options?.minDate ?? null;

export const maxDate = (control: any) =>
  control.uischema.options?.maxDate ?? null;

export const defaultDate = (control: any) => {
  return control.data ?? control.uischema.options?.defaultDate;
};
