import {
  composePaths,
  computeLabel,
  ControlElement,
  getFirstPrimitiveProp,
  isDescriptionHidden,
  JsonFormsSubStates,
  Resolve,
  Dispatch,
  CoreActions,
  update,
  moveUp,
  moveDown,
} from '@jsonforms/core';
import { RendererProps } from '@jsonforms/vue2';
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import { useStyles } from '../styles';
import {
  computed,
  ComputedRef,
  inject,
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onActivated,
  onDeactivated,
  onErrorCaptured,
} from '../vue';
import Vue from 'vue';
import Ajv from 'ajv';
import _ from 'lodash';

const useControlAppliedOptions = <I extends { control: any }>(input: I) => {
  return computed(() =>
    merge(
      {},
      cloneDeep(input.control.value.config),
      cloneDeep(input.control.value.uischema.options)
    )
  );
};

const useComputedLabel = <I extends { control: any }>(
  input: I,
  appliedOptions: ComputedRef<any>
) => {
  return computed((): string => {
    return computeLabel(
      input.control.value.label,
      input.control.value.required,
      !!appliedOptions.value?.hideRequiredAsterisk
    );
  });
};

/**
 * Adds styles, isFocused, appliedOptions and onChange
 */
export const useVuetifyControl = <
  I extends { control: any; handleChange: any }
>(
  input: I,
  adaptValue: (target: any, options: any) => any = (v) => v
) => {
  const appliedOptions = useControlAppliedOptions(input);

  const isFocused = ref(false);
  const onChange = (value: any) => {
    input.handleChange(
      input.control.value.path,
      adaptValue(value, appliedOptions)
    );
  };

  const persistentHint = (): boolean => {
    return !isDescriptionHidden(
      input.control.value.visible,
      input.control.value.description,
      isFocused.value,
      !!appliedOptions.value?.showUnfocusedDescription
    );
  };

  const computedLabel = useComputedLabel(input, appliedOptions);
  const getLabelOrientation = (): string => {
    return (
      input.control.value.uischema.options?.labelConfig?.orientation ||
      'inherit'
    );
  };

  const labelCols = (): string => {
    return input.control.value.uischema.options?.labelConfig?.cols || '2';
  };

  const controlWrapper = computed(() => {
    const { id, description, errors, label, visible, required } =
      input.control.value;
    return { id, description, errors, label, visible, required };
  });

  const styles = useStyles(input.control.value.uischema);
  return {
    ...input,
    styles,
    isFocused,
    appliedOptions,
    controlWrapper,
    onChange,
    persistentHint,
    computedLabel,
    getLabelOrientation,
    labelCols,
  };
};

export const useTranslator = () => {
  const jsonforms = inject<JsonFormsSubStates>('jsonforms');

  if (!jsonforms) {
    throw new Error(
      "'jsonforms couldn't be injected. Are you within JSON Forms?"
    );
  }

  if (!jsonforms.i18n || !jsonforms.i18n.translate) {
    throw new Error(
      "'jsonforms i18n couldn't be injected. Are you within JSON Forms?"
    );
  }

  const translate = computed(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return jsonforms.i18n!.translate!;
  });

  return translate;
};

/**
 * Adds styles and appliedOptions
 */
export const useVuetifyLayout = <I extends { layout: any }>(input: I) => {
  //HorizontalLayout
  const cols = computed(() => {
    let cls = input.layout.value.uischema.options?.cols
      ? input.layout.value.uischema.options?.cols.split(' ')
      : null;
    if (cls) {
      cls = cls.map((el: string) => {
        return parseInt(el);
      });
    }
    return cls;
  });

  const appliedOptions = computed(() => {
    return merge(
      {},
      cloneDeep(input.layout.value.config),
      cloneDeep(input.layout.value.uischema.options)
    );
  });
  return {
    ...input,
    styles: useStyles(input.layout.value.uischema),
    appliedOptions,
    cols,
  };
};

/**
 * Adds styles, appliedOptions and childUiSchema
 */
export const useVuetifyArrayControl = <I extends { control: any }>(
  input: I
) => {
  const appliedOptions = useControlAppliedOptions(input);

  const computedLabel = useComputedLabel(input, appliedOptions);

  const childLabelForIndex = (index: number) => {
    const childLabelProp =
      input.control.value.uischema.options?.childLabelProp ??
      getFirstPrimitiveProp(input.control.value.schema);
    if (!childLabelProp) {
      return `${index}`;
    }
    const labelValue = Resolve.data(
      input.control.value.data,
      composePaths(`${index}`, childLabelProp)
    );
    if (
      labelValue === undefined ||
      labelValue === null ||
      Number.isNaN(labelValue)
    ) {
      return '';
    }
    return `${labelValue}`;
  };
  return {
    ...input,
    styles: useStyles(input.control.value.uischema),
    appliedOptions,
    childLabelForIndex,
    computedLabel,
  };
};

/**
 * Adds styles and appliedOptions
 */
export const useVuetifyBasicControl = <I extends { control: any }>(
  input: I
) => {
  const appliedOptions = useControlAppliedOptions(input);

  return {
    ...input,
    styles: useStyles(input.control.value.uischema),
    appliedOptions,
  };
};

/**
 * Extracts Ajv from JSON Forms
 */
export const useAjv = () => {
  const jsonforms = inject<JsonFormsSubStates>('jsonforms');

  if (!jsonforms) {
    throw new Error(
      "'jsonforms' couldn't be injected. Are you within JSON Forms?"
    );
  }

  // should always exist
  return jsonforms.core?.ajv as Ajv;
};

/**
 * Adds styles, isFocused, appliedOptions and onChange
 */
export const useVuetifyControlExt = <
  I extends { control: any; handleChange: any }
>(
  props: RendererProps<ControlElement> | any,
  input: I,
  adaptValue: (target: any) => any = (v) => v
) => {
  const appliedOptions = useControlAppliedOptions(input);

  const isFocused = ref(false);
  const onChange = (value: any) => {
    input.handleChange(input.control.value.path, adaptValue(value));
  };

  const persistentHint = (): boolean => {
    return !isDescriptionHidden(
      input.control.value.visible,
      input.control.value.description,
      isFocused.value,
      !!appliedOptions.value?.showUnfocusedDescription
    );
  };

  const computedLabel = useComputedLabel(input, appliedOptions);

  const controlWrapper = computed(() => {
    const { id, description, errors, label, visible, required } =
      input.control.value;
    return { id, description, errors, label, visible, required };
  });

  const styles = useStyles(input.control.value.uischema);

  // Extension for dependents fields
  const indexc = pathControlSchema(props.uischema.scope);
  const JForm = inject<any>('JForm');
  const store = inject<any>('store');
  const HX = inject<any>('HX');

  // CREATE FUNCTION
  let fnOnchange = new Function();
  if (
    props.uischema.options &&
    props.uischema.options.events &&
    props.uischema.options.events.onChange
  ) {
    fnOnchange = new Function(
      props.uischema.options.events.onChange.arguments,
      props.uischema.options.events.onChange.body
    );
  }
  // CREATE FUNCTION DEEPCHANGE
  let deepChange = new Function();
  if (
    props.uischema.options &&
    props.uischema.options.events &&
    props.uischema.options.events.deepChange
  ) {
    deepChange = new Function(
      props.uischema.options.events.deepChange.arguments,
      props.uischema.options.events.deepChange.body
    );
  }
  //Watch own value
  const unwatch = store.watch(
    (_state: any, getters: any) => {
      return getters['app/getDataModel'](indexc);
    },
    (n: string, o: string) => {
      HX.emit(indexc, n);
      Vue.nextTick(() => {
        fnOnchange(JForm, n, o);
      });
    }
  );

  const dependencies = _.map(
    props.uischema.rule && props.uischema.rule.condition.conditions
      ? props.uischema.rule.condition.conditions
      : [],
    (e) => pathControlSchema(e.scope)
  );
  HX.joinFork(
    dependencies,
    (payload: any) => {
      deepChange(_, payload).then((res: any) => {
        const newArray = res || [];
        Vue.nextTick(() => {
          JForm.setItems(indexc, newArray);
        });
      });
    },
    indexc
  );

  onBeforeMount(() => {});
  onMounted(() => {});
  onBeforeUpdate(() => {});
  onUpdated(() => {});
  onBeforeUnmount(() => {});
  onUnmounted(() => {
    unwatch();
  });
  onActivated(() => {});
  onDeactivated(() => {
    unwatch();
  });
  onErrorCaptured(() => {});
  return {
    ...input,
    styles,
    isFocused,
    appliedOptions,
    controlWrapper,
    onChange,
    persistentHint,
    computedLabel,
  };
};

const pathControlSchema = (input: string): string => {
  return input.split('/').pop() || '';
};

export interface DispatchPropsOfArrayControlEx {
  addItem(path: string, value: any): () => void;
  removeItems?(path: string, toDelete: number[]): () => void;
  updateItem?(path: string, toUpdate: number, value: any): () => void;
  moveUp?(path: string, toMove: number): () => void;
  moveDown?(path: string, toMove: number): () => void;
}

/**
 * Maps state to dispatch properties of an array control.
 *
 * @param dispatch the store's dispatch method
 * @returns {DispatchPropsOfArrayControl} dispatch props of an array control
 */
export const mapDispatchToArrayControlPropsEx = (
  dispatch: Dispatch<CoreActions>
): DispatchPropsOfArrayControlEx => ({
  addItem: (path: string, value: any) => () => {
    dispatch(
      update(path, (array) => {
        if (array === undefined || array === null) {
          return [value];
        }

        array.push(value);
        return array;
      })
    );
  },
  removeItems: (path: string, toDelete: number[]) => () => {
    dispatch(
      update(path, (array) => {
        toDelete
          .sort()
          .reverse()
          .forEach((s) => array.splice(s, 1));
        return array;
      })
    );
  },
  updateItem: (path: string, toUpdate: number, value: any) => () => {
    dispatch(
      update(path, (array) => {
        array[toUpdate] = value;
        return array;
      })
    );
  },
  moveUp: (path, toMove: number) => () => {
    dispatch(
      update(path, (array) => {
        moveUp(array, toMove);
        return array;
      })
    );
  },
  moveDown: (path, toMove: number) => () => {
    dispatch(
      update(path, (array) => {
        moveDown(array, toMove);
        return array;
      })
    );
  },
});
