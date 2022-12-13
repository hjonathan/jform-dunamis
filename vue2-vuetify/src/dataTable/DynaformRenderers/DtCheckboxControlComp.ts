/***********************************************************************************************************************************
 * COMPOSITION EXTENSION FOR DATATABLE CHECKBOX CONTROL
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
  placeholder,
  readonly,
  tabindex,
  validation,
} from './DtTextControlComp';

export const useDtCheckboxControlComposition = (props: any) => {
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

  const setPropsDtCheckboxControl = (control: any) => {
    return {
      id: createId(control.scope),
      ariaLabel: ariaLabel(control),
      hint: hint(control),
      validation: validation(control),
      tabindex: tabindex(control),
      readonly: readonly(control),
      data,
      placeholder: placeholder(control),
      visible: true,
    };
  };

  const control: any = ref(setPropsDtCheckboxControl(column));

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
      control.value = setPropsDtCheckboxControl(ctrl);
    },
  });

  return {
    control,
    onChange,
    styles,
  };
};
