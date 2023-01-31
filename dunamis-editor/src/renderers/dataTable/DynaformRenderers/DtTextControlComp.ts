/***********************************************************************************************************************************
 * COMPOSITION EXTENSION FOR DATATABLE TEXT CONTROL
 * @param props
 * @returns
 ***********************************************************************************************************************************/

import {
  CoreActions,
  createId,
  Dispatch,
  JsonFormsSubStates,
  mapStateToArrayControlProps,
  removeId,
} from '@jsonforms/core';
import {
  inject,
  onDeactivated,
  onUnmounted,
  onUpdated,
  ref,
  computed,
} from 'vue';
import { alphaTeoremDt } from '../../composition/alphaTeorem';
import { useStyles } from '../../styles';

export const useDtTextControlComposition = (props: any) => {
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

/*****************************************************************************************************************
 * METHODS USING CONTROL
 *****************************************************************************************************************/

/**
 * Find Column in uischema by scope
 * @param uischema
 * @param scope
 * @returns
 */
export const findColumn = (uischema: any, scope: string) => {
  return uischema.elements.find(
    (el: any) => el.scope.split('/').pop() == scope
  );
};

/**
 * Method [-GET-] Label Orientation for component template
 * @param control
 * @returns
 */
export const label = (control: any) => control.options?.label || '';

/**
 * Method [-GET-] Label Columns for component template
 * @param control
 * @returns
 */
export const labelCols = (control: any) =>
  control.options?.labelConfig?.cols || '2';

/**
 * Method [-GET-] Tab index for component template
 * @param control
 * @returns
 */
export const tabindex = (control: any) => control.options?.tabindex || 1;

/**
 * Method [-GET-] Tab index for component template
 * @param control
 * @returns
 */
export const ariaLabel = (control: any) => control.options?.ariaLabel || '';

/**
 * Method [-GET-] Return hint for template
 * @param control
 * @returns
 */
export const hint = (control: any) => control.options?.hint ?? '';

/**
 * Method [-GET-] Return readonly
 * @param control
 * @returns
 */
export const readonly = (control: any) => control.options?.readonly ?? false;

/**
 * Method [-GET-] Return placeholder for template
 * @param control
 * @returns
 */
export const placeholder = (control: any) => control.options?.placeholder ?? '';

/**
 * Method [-GET-] Return placeholder for template
 * @param control
 * @returns
 */
export const validation = (control: any) => {
  const val = control.options?.validation ?? [];
  const rules: any = {
    required: {
      id: 'required',
      text: 'Required',
      handler: () => (value: any) => !!value || 'required field',
    },
    requiredIf: {
      id: 'requiredIf',
      text: 'Required If',
      handler: () => (value: any) => !!value || 'required field',
    },
    maxLength: {
      id: 'maxLength',
      text: 'Max lenght',
      handler: (maxLength: any) => (value: any) => {
        return value.length <= parseInt(maxLength) || 'Max length';
      },
    },
    minLength: {
      id: 'minLenght',
      text: 'Min lenght',
      handler: (minLength: any) => (value: any) => {
        return (value && value.length >= parseInt(minLength)) || 'Min length';
      },
    },
    regExp: {
      id: 'regExp',
      text: 'Regular expression',
      handler: (regExp: any) => (value: string) => {
        const exp = new RegExp(regExp);
        return exp.test(value) || 'Regular expression';
      },
    },
    afterDate: {
      id: 'afterDate',
      text: 'After Date',
      handler: (date: any) => (value: string) => {
        const after: any = new Date(date);
        const inputDate: any = new Date(value);
        return inputDate > after || 'After Date';
      },
    },
    afterEqualDate: {
      id: 'afterDate',
      text: 'After Date',
      handler: (date: any) => (value: string) => {
        const after: any = new Date(date);
        const inputDate: any = new Date(value);
        return inputDate >= after || 'After or equal to Date';
      },
    },
    beforeDate: {
      id: 'beforeDate',
      text: 'Before Date',
      handler: (date: any) => (value: string) => {
        const before: any = new Date(date);
        const inputDate: any = new Date(value);
        return inputDate < before || 'Before Date';
      },
    },
    beforeEqualDate: {
      id: 'beforeEqualDate',
      text: 'Before Date',
      handler: (date: any) => (value: string) => {
        const before: any = new Date(date);
        const inputDate: any = new Date(value);
        return inputDate <= before || 'Before or equal to Date';
      },
    },
    in: {
      id: 'in',
      text: 'In',
      handler: (vIn: any) => (value: string) => {
        const valIn: Array<any> = vIn.split(',');
        return valIn.findIndex((el: string) => el == value) != -1 || 'In';
      },
    },
    notIn: {
      id: 'notIn',
      text: 'Not in',
      handler: (vIn: any) => (value: string) => {
        const valIn: Array<any> = vIn.split(',');
        return valIn.findIndex((el: string) => el == value) == -1 || 'Not in';
      },
    },
    same: {
      id: 'same',
      text: 'Same',
      handler: (sameVal: any) => (value: string) => {
        return sameVal == value || 'Same';
      },
    },
    alpha: {
      id: 'alpha',
      text: 'Alpha',
      handler: () => (value: string) => {
        return /^[a-zA-Z]*$/g.test(value) || 'Alpha';
      },
    },
    alphanumeric: {
      id: 'alphanumeric',
      text: 'Alphanumeric',
      handler: () => (value: string) => {
        return /^[a-zA-Z0-9]*$/g.test(value) || 'Alphanumeric';
      },
    },
    url: {
      id: 'url',
      text: 'URL',
      handler: () => (value: string) => {
        return (
          /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/g.test(
            value
          ) || 'URL'
        );
      },
    },
    email: {
      id: 'email',
      text: 'Email',
      handler: () => (value: string) => {
        return (
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g.test(
            value
          ) || 'Email'
        );
      },
    },
    date: {
      id: 'date',
      text: 'Date',
      handler: () => (value: string) => {
        return (
          /^\d\d\d\d-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01]) (00|[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9])$/g.test(
            value
          ) || 'Date'
        );
      },
    },
  };
  const res: any = [];
  if (val && val.length > 0) {
    val.forEach((rule: any) => {
      if (rules[rule.id]) {
        res.push(rules[rule.id].handler(rule.value));
      }
    });
  }

  return res;
};

/**
 * Method [-GET-] Return default value for template
 * @param control
 * @returns
 */
export const defaultValue = (control: any) => {
  const format = control.options?.textTransform ?? '';
  return control.options?.defaultValue
    ? textTransform(format, control.options?.defaultValue)
    : textTransform(format, control.data);
};

export const defaultDtValue = (control: any, value: string) => {
  const format = control.options?.textTransform ?? '';
  return textTransform(format, value);
};

/*********************************************************************************************************************
 * PURE FUNCTIONS
 * This methods dont use control property
 *********************************************************************************************************************/

/**
 * Method [PURE FUNCTION] Return TextTranform property
 * @param control
 * @returns
 */
export const textTransform = (format: string, text: string): string => {
  if (text) {
    const transformToApply = format;
    switch (transformToApply) {
      case 'lowercase':
        text = text.toLowerCase();
        break;
      case 'uppercase':
        text = text.toUpperCase();
        break;
      case 'capital':
        text = text.charAt(0).toUpperCase() + text.slice(1);
        break;
      case 'title': {
        const arr = text.split(' ');
        for (let i = 0; i < arr.length; i++) {
          arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }
        text = arr.join(' ');
        break;
      }
      default:
        text = text ?? '';
        break;
    }
  }
  return text;
};

/****************************************************************************************
 * JSON CORE METHODS
 ****************************************************************************************/
/**
 * JSON CORE METHOD RETURN CONTROL PROPERTY TO COMPOSITION [TEXT]
 * @param props
 * @returns
 */
export function useControl<R, P>(props: P) {
  const jsonforms = inject<JsonFormsSubStates>('jsonforms');
  const dispatch = inject<Dispatch<CoreActions>>('dispatch');
  const stateMap = mapStateToArrayControlProps;

  if (!jsonforms || !dispatch) {
    throw "'jsonforms' or 'dispatch' couldn't be injected. Are you within JSON Forms?";
  }
  const id = ref<string | undefined>(undefined);
  const control = computed(() => {
    return {
      ...stateMap({ jsonforms }, props),
      id: id.value,
    };
  });
  if ((control.value as any).uischema.scope) {
    id.value = createId((control.value as any).uischema.scope);
  }

  onUnmounted(() => {
    if (id.value) {
      removeId(id.value);
      id.value = undefined;
    }
  });

  return control as unknown as R;
}
