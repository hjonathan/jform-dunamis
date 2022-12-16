/***********************************************************************************************************************************
 * COMPOSITION EXTENSION FOR DATATABLE DATETIME CONTROL
 * @param props
 * @returns
 ***********************************************************************************************************************************/

import { CoreActions, Dispatch } from '@jsonforms/core';
import Vue, { inject, onDeactivated, onUnmounted, onUpdated, ref } from 'vue';

import { alphaTeoremDt } from '../../composition/alphaTeorem';
import { useStyles } from '../../styles';
import {
  ariaLabel,
  defaultValue,
  findColumn,
  hint,
  placeholder,
  readonly,
  tabindex,
  validation,
} from './DtTextControlComp';

export const useDtDatetimeControlComposition = (props: any) => {
  const dispatch = inject<Dispatch<CoreActions>>('dispatch');
  const store = inject<any>('store');
  const HX = inject<any>('HX');
  if (!dispatch) {
    throw "'jsonforms' or 'dispatch' couldn't be injected. Are you within JSON Forms?";
  }

  const { parent, cell } = props;
  const column = findColumn(parent.uischema, cell.header.value);
  const styles = useStyles(column);
  const data = ref(defaultValue(column));

  const setPropsDtDatetimeControl = (control: any) => {
    return {
      id: control.id,
      dataType: dataType(control),
      ariaLabel: ariaLabel(control),
      hint: hint(control),
      validation: validation(control),
      tabindex: tabindex(control),
      readonly: readonly(control),
      placeholder: placeholder(control),
      data: data,
      visible: true,
      minDate: minDate(control),
      maxDate: maxDate(control),
      errors: control.errors,
      defaultValue: defaultDate(control),
    };
  };

  const control: any = ref(setPropsDtDatetimeControl(column));

  onUpdated(() => {
    console.log('component re-rendered!', column.scope);
  });
  onUnmounted(() => {
    deactivateAlpha();
  });

  onDeactivated(() => {
    deactivateAlpha();
  });

  const deactivateAlpha = alphaTeoremDt({
    store,
    HX,
    column: column,
    updater: (ctrl: any) => {
      control.value = setPropsDtDatetimeControl(ctrl);
    },
  });

  return {
    control,
    ...useDatetimeExtend({ control, data }),
    styles,
  };
};

/*****************************************************************************************************************
 * METHODS USING CONTROL
 *****************************************************************************************************************/

export const useDatetimeExtend = (params: any) => {
  //Properties
  const { control, data } = params;
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
    data.value = val;
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

export const format = (control: any) => control.options?.format ?? 'date-time';

export const minDate = (control: any) => control.options?.minDate ?? null;

export const maxDate = (control: any) => control.options?.maxDate ?? null;

export const defaultDate = (control: any) => {
  return control.data ?? control.options?.defaultDate;
};
