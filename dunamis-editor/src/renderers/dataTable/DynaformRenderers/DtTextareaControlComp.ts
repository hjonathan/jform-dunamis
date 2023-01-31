/***********************************************************************************************************************************
 * COMPOSITION EXTENSION FOR DATATABLE TEXTAREA CONTROL
 * @param props
 * @returns
 ***********************************************************************************************************************************/

import { CoreActions, createId, Dispatch } from '@jsonforms/core';
import { inject, onDeactivated, onUnmounted, onUpdated, ref } from 'vue';
import { alphaTeoremDt } from '../../composition/alphaTeorem';
import { useStyles } from '../../styles';
import {
  ariaLabel,
  defaultDtValue,
  defaultValue,
  findColumn,
  hint,
  label,
  placeholder,
  readonly,
  tabindex,
  validation,
} from './DtTextControlComp';

export const useDtTextareaControlComposition = (props: any) => {
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

  const setPropsDtTextControl = (control: any) => {
    return {
      id: createId(control.scope),
      validation: validation(control),
      label: label(control),
      tabindex: tabindex(control),
      ariaLabel: ariaLabel(control),
      hint: hint(control),
      placeholder: placeholder(control),
      data,
      visible: true,
      readonly: readonly(control),
      rows: rows(control),
    };
  };

  const control: any = ref(setPropsDtTextControl(column));

  const onChange = (value: any) => {
    data.value = defaultDtValue(column, value);
  };

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
      control.value = setPropsDtTextControl(ctrl);
    },
  });

  return {
    control,
    onChange,
    styles,
  };
};

export const rows = (control: any) => control.options?.rows ?? 2;
