import {
  JsonSchema,
  computeLabel,
  UISchemaElement,
  isDescriptionHidden,
  JsonFormsRendererRegistryEntry,
  JsonFormsCellRendererRegistryEntry,
  ControlProps,
  resolveData,
  getData,
  getSchema,
  JsonFormsSubStates,
} from '@jsonforms/core';

import { rendererProps, useControl } from '@jsonforms/vue2';
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import { useStyles } from '@jsonforms/vue2-vuetify';
import { CompType, computed, ComputedRef, ref, inject } from './vue';
import { fireDependencyHandler } from './runtime';
import { hasChildren } from '../model/uischema';
/**
 * Constructs a props declaration for Vue components which can be used
 * for registered renderers and cells. These are typically used in combination
 * with one of the provided bindings, e.g. 'useJsonFormsControl'.
 *
 * Use the generic type parameter when using a specialized binding, e.g.
 * `rendererProps<Layout>()` in combination with `useJsonFormsLayout` or
 * `rendererProps<ControlElement>()` in combination with `useJsonFormsControl`.
 */
export const editorRendererProps = <U = UISchemaElement>() => ({
  editorTabs: {
    required: false as const,
    type: Array as CompType<[], ArrayConstructor>,
  },
  schema: {
    required: true as const,
    type: [Object, Boolean] as CompType<
      JsonSchema,
      [ObjectConstructor, BooleanConstructor]
    >,
  },
  uischema: {
    required: true as const,
    type: [Object, Boolean] as CompType<
      U,
      [ObjectConstructor, BooleanConstructor]
    >,
  },
  selection: {
    required: false as const,
    type: String,
    default: undefined,
  },
  renderers: {
    required: false,
    type: Array as CompType<JsonFormsRendererRegistryEntry[], ArrayConstructor>,
    default: undefined,
  },
  cells: {
    required: false,
    type: Array as CompType<
      JsonFormsCellRendererRegistryEntry[],
      ArrayConstructor
    >,
    default: undefined,
  },
});

export const editorRendererOnlyProps = <U = UISchemaElement>() => ({
  renderers: {
    required: false,
    type: Array as CompType<JsonFormsRendererRegistryEntry[], ArrayConstructor>,
    default: undefined,
  },
});

export interface RendererProps<U = UISchemaElement> {
  schema: JsonSchema;
  uischema: U;
  path: string;
  enabled?: boolean;
  renderers?: JsonFormsRendererRegistryEntry[];
  cells?: JsonFormsCellRendererRegistryEntry[];
  selection?: string;
}
export const useJsonTest = (props: RendererProps) => {
  const test = {
    direction: 'row',
  };
  return test;
};

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
export const useDynaformControl = <
  I extends { control: any; handleChange: any }
>(
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

  const fireDependency = computed(() => {
    if (input.control.value.uischema.rule) {
      const jsonforms = inject<any>('jsonforms');
      const { uischema, rootSchema, config } = input.control.value;
      const rootData = getData({ jsonforms });

      if (
        fireDependencyHandler(
          { jsonforms },
          input.control.value,
          uischema,
          rootSchema,
          rootData,
          config
        )
      ) {
        input.control.value.data = 'reloaded';
      }
    }
    return '';
  });

  return {
    ...input,
    styles,
    isFocused,
    appliedOptions,
    controlWrapper,
    onChange,
    persistentHint,
    computedLabel,
    fireDependency,
  };
};
