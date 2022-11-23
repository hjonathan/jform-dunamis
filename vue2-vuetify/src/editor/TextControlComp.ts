import {
  CoreActions,
  createId,
  Dispatch,
  JsonFormsSubStates,
  removeId,
  update,
  computeLabel,
  isDescriptionHidden,
  mapStateToArrayControlProps,
} from '@jsonforms/core';
import { computed, inject, onUnmounted, onUpdated, ref, watch } from 'vue';
import { merge, cloneDeep, isArray, every, isString } from 'lodash';
import { alphaTeorem } from '../composition/alphaTeorem';
import { useStyles } from '../styles';

/***********************************************************************************************************************************
 * COMPOSITION EXTENSION FOR TEXT CONTROL
 * @param vuetifyControl
 * @returns
 ***********************************************************************************************************************************/

export const useTextControlComposition = <P>(props: P) => {
  const dispatch = inject<Dispatch<CoreActions>>('dispatch');
  const store = inject<any>('store');
  const HX = inject<any>('HX');
  if (!dispatch) {
    throw "'jsonforms' or 'dispatch' couldn't be injected. Are you within JSON Forms?";
  }
  //Global
  const one: any = ref({ validation: [] });

  //Properties
  const controlCore: any = useControl(props);
  const control = ref(controlCore.value);
  watch(controlCore, (nControl) => {
    //control.value = nControl;
    one.value['validation'] = validation(nControl);
  });

  const isFocused = ref(false);
  const styles = useStyles(control.value.uischema);
  const data = ref(defaultValue(control));

  //Methods
  const getLabelOrientation = labelOrientation(control);
  const getLabelCols = labelCols(control);

  const appliedOptions = useControlAppliedOptions(control);

  //Computed
  const computedHint = computed(hint(control));
  const computedTabindex = computed(tabindex(control));
  const computedArialabel = computed(ariaLabel(control));
  const computedPlaceholder = computed(placeholder(control));
  const computedLabel = computed(() => buildLabel(control));
  const computedValidation = ref([]);

  //alphaTeorem Dependencies
  alphaTeorem({
    store,
    HX,
    controlCore: controlCore,
    control: control,
  });

  const persistentHint = (): boolean => {
    return !isDescriptionHidden(
      control.value.visible,
      control.value.description,
      isFocused.value,
      !!appliedOptions.value?.showUnfocusedDescription
    );
  };

  const controlWrapper = computed(() => {
    const { id, description, errors, label, visible, required } = control.value;
    return { id, description, errors, label, visible, required };
  });

  const suggestions = computed((): string[] | undefined => {
    const sugg = control.value.uischema.options?.suggestion;
    if (sugg === undefined || !isArray(sugg) || !every(sugg, isString)) {
      return undefined;
    }
    return sugg;
  });

  const inputMask = computed((): any => {
    const mask = control.value.uischema.options?.mask || '';
    if (mask && typeof mask !== 'string') {
      //This section only works with the example
      //TODO this must work with all type of custom mask
      return {
        mask: mask ? mask.mask : '',
        tokens: {
          F: {
            pattern: new RegExp(mask.tokens['F'].pattern.replaceAll('/', '')),
            transform: eval(mask.tokens['F'].transform) || '',
          },
          G: {
            pattern: new RegExp(mask.tokens['G'].pattern.replaceAll('/', '')),
            transform: eval(mask.tokens['G'].transform) || '',
          },
        },
      };
    }
    return {
      mask: mask,
    };
  });

  const onChange = (value: any) => {
    updateData({
      dispatch,
      control,
      value,
    });
  };
  onUpdated(() => {
    // this eill log whenever the component re-renders
    console.log('component re-rendered!', control.value.uischema.scope);
  });

  return {
    one,
    data,
    appliedOptions,
    control,
    isFocused,
    controlWrapper,
    getLabelOrientation,
    getLabelCols,
    computedHint,
    computedPlaceholder,
    computedLabel,
    computedTabindex,
    computedArialabel,

    computedValidation,

    isDescriptionHidden,

    onChange,
    persistentHint,
    styles,
    suggestions,
    textTransform,
    hint,
    inputMask,
  };
};

const useControlAppliedOptions = (control: any) => {
  return computed(() =>
    merge(
      {},
      cloneDeep(control.value.config),
      cloneDeep(control.value.uischema.options)
    )
  );
};

/*****************************************************************************************************************
 * METHODS USING CONTROL
 *****************************************************************************************************************/
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

/**
 * Build Label for component template
 * @param control
 * @returns
 */
export const buildLabel = (control: any) => {
  return computeLabel(
    control.value.label,
    control.value.required,
    !!control.value?.config.hideRequiredAsterisk
  );
};

/**
 * Method [GET] Label Orientation for component template
 * @param control
 * @returns
 */
export const labelOrientation = (control: any) => () =>
  control.value.uischema.options?.labelConfig?.orientation || 'inherit';

/**
 * Method [GET] Label Columns for component template
 * @param control
 * @returns
 */
export const labelCols = (control: any) => () =>
  control.value.uischema.options?.labelConfig?.cols || '2';

/**
 * Method [GET] Tab index for component template
 * @param control
 * @returns
 */
export const tabindex = (control: any) => () =>
  control.value.uischema.options?.tabindex || 1;

/**
 * Method [GET] Tab index for component template
 * @param control
 * @returns
 */
export const ariaLabel = (control: any) => () =>
  control.value.uischema.options?.ariaLabel || '';

/**
 * Method [GET] Return hint for template
 * @param control
 * @returns
 */
export const hint = (control: any) => (): string =>
  control.value.uischema.options?.hint ?? '';

/**
 * Method [GET] Return placeholder for template
 * @param control
 * @returns
 */
export const placeholder = (control: any) => (): string =>
  control.value.uischema.options?.placeholder ?? '';

/**
 * Method [GET] Return placeholder for template
 * @param control
 * @returns
 */
export const validation = (control: any) => {
  const val = control.uischema.options?.validation ?? [];
  console.log('validation');
  const rules: any = {
    required: {
      id: 'required',
      text: 'Required',
      handler: (value: any) => !!value || 'required field',
    },
    requiredIf: {
      id: 'requiredIf',
      text: 'Required If',
      handler: (value: any) => !!value || 'required field',
    },
    maxLength: {
      id: 'maxLenght',
      text: 'Max lenght',
      rule: '',
      messages: [
        'Validate that an attribute is no greater than a given length',
      ],
    },
    minLength: {
      id: 'minLenght',
      text: 'Min lenght',
      rule: '',
      messages: [
        'Validate that an attribute is no greater than a given length',
      ],
    },
  };

  //const validation: Array<any> = control.value.uischema.options?.validation;
  const res: any = [];
  if (val && val.length > 0) {
    val.forEach((rule: any) => {
      if (rules[rule.id]) {
        res.push(rules[rule.id].handler);
      }
    });
  }
  console.log('validations', res);
  return res;
};

/**
 * Method [GET] Return default value for template
 * @param control
 * @returns
 */
export const defaultValue = (control: any) => {
  const format = control.value.uischema.options?.textTransform ?? '';
  return control.value.uischema.options?.defaultValue
    ? textTransform(format, control.value.uischema.options?.defaultValue)
    : textTransform(format, control.value.data);
};

export const eagerValidation = (control: any) => {
  return control.value.uischema.options?.validation;
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