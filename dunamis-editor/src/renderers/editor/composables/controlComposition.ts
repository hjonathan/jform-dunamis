import {
  CoreActions,
  createId,
  Dispatch,
  JsonFormsSubStates,
  removeId,
  update,
  computeLabel,
  mapStateToArrayControlProps,
  mapStateToLayoutProps,
} from '@jsonforms/core';
import { computed, inject, onUnmounted, ref } from 'vue';
import { DefaultEffects, ProviderControl } from './types';

/****************************************************************************************
 * JSON CORE METHODS
 ****************************************************************************************/
/**
 * JSON CORE METHOD RETURN CONTROL PROPERTY TO COMPOSITION [TEXT]
 * @param props
 * @returns
 */
export function useCoreControl<R, P>(props: P) {
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

export function useCoreControlLayout<R, P>(props: P) {
  const jsonforms = inject<JsonFormsSubStates>('jsonforms');
  const dispatch = inject<Dispatch<CoreActions>>('dispatch');
  const stateMap = mapStateToLayoutProps;

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

/**
 * Update data in JSON CORE
 * @param params
 */
export const updateData = (params: any) => {
  const { dispatch, control, value } = params;
  const path = control.value.path;
  dispatch(
    update(path, () => {
      return value;
    })
  );
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

/**
 * Method [-GET-] Return default value for template
 * @param control
 * @returns
 */
export const defaultValue = (control: any) => {
  const format = control.uischema.options?.textTransform ?? '';
  return control.uischema.options?.defaultValue
    ? textTransform(format, control.uischema.options?.defaultValue)
    : textTransform(format, control.data);
};

/**
 * Method [-GET-] Return placeholder for template
 * @param control
 * @returns
 */
export const validation = (control: any) => {
  const val = control.uischema.options?.validation ?? [];
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
 * Method [-GET-] Label Orientation for component template
 * @param control
 * @returns
 */
export const labelOrientation = (control: any) =>
  control.uischema.options?.labelConfig?.orientation || 'inherit';

/**
 * Method [-GET-] Label Columns for component template
 * @param control
 * @returns
 */
export const labelCols = (control: any) =>
  control.uischema.options?.labelConfig?.cols || '2';

/**
 * Method [-GET-] Tab index for component template
 * @param control
 * @returns
 */
export const tabindex = (control: any) =>
  control.uischema.options?.tabindex || 1;

/**
 * Method [-GET-] Tab index for component template
 * @param control
 * @returns
 */
export const ariaLabel = (control: any) =>
  control.uischema.options?.ariaLabel || '';

/**
 * Method [-GET-] Return hint for template
 * @param control
 * @returns
 */
export const hint = (control: any) => control.uischema.options?.hint ?? '';

/**
 * Method [-GET-] Return readonly
 * @param control
 * @returns
 */
export const readonly = (control: any) =>
  control.uischema.options?.readonly ?? false;

/**
 * Method [-GET-] Return placeholder for template
 * @param control
 * @returns
 */
export const placeholder = (control: any) =>
  control.uischema.options?.placeholder ?? '';

/**
 * Build Label for component template
 * @param control
 * @returns
 */
export const label = (control: any) => {
  return computeLabel(
    control.label,
    control.required,
    !!control?.config.hideRequiredAsterisk
  );
};

export const defaultEffects = (): DefaultEffects => ({
  show: true,
  disabled: false,
});

export const options = async (provider: ProviderControl, control: any) => {
  const { serviceProvider } = provider;
  const service = serviceProvider.get('dataSources');
  const dataSource = control.uischema.options?.options?.dataSource;
  const localOptions = control.uischema.options?.options?.collection ?? [];
  let dataSourceOptions = [];
  if (dataSource) {
    dataSourceOptions = await service.call(dataSource);
  }
  return Promise.resolve(localOptions.concat(dataSourceOptions));
};

export const createProvider = (): ProviderControl => {
  return {
    dispatch: inject<Dispatch<CoreActions>>('dispatch'),
    store: inject<any>('store'),
    bus: inject<any>('HX'),
    serviceProvider: inject<any>('serviceProvider'),
  };
};

export const getEffectsControl = (control: any): DefaultEffects => {
  const { show, disabled } = control;
  return {
    show,
    disabled,
  };
};