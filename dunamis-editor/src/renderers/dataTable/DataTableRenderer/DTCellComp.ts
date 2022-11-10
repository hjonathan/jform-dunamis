import {
  CoreActions,
  Dispatch,
  JsonFormsCellRendererRegistryEntry,
  JsonFormsRendererRegistryEntry,
  JsonFormsSubStates,
  JsonSchema,
  mapStateToJsonFormsRendererProps,
  StatePropsOfJsonFormsRenderer,
  UISchemaElement,
} from '@jsonforms/core';
import { computed, inject } from '@vue/composition-api';

export const useDtCellComposition = (props: RendererProps) => {
  const jsonforms = inject<JsonFormsSubStates>('jsonforms');
  const dispatch = inject<Dispatch<CoreActions>>('dispatch');

  if (!jsonforms || !dispatch) {
    throw "'jsonforms' or 'dispatch' couldn't be injected. Are you within JSON Forms?";
  }

  const rawProps = computed(
    () =>
      mapStateToJsonFormsRendererProps(
        { jsonforms },
        props.parent
      ) as Required<StatePropsOfJsonFormsRenderer>
  );

  const rootSchema = computed(() => rawProps.value.rootSchema);
  const renderer = computed(() => {
    const { rootSchema, ...rest } = rawProps.value;
    return rest;
  });

  return {
    renderer,
    rootSchema,
  };
};

//Find column

export const findColumn = (parent: any, scope: string) => {
  const { uischema } = parent;
  return uischema.elements.find((el) => {
    el.scope.split('/').pop() == scope;
  });
};

export interface RendererProps<U = UISchemaElement> {
  parent: {
    schema: JsonSchema;
    uischema: U;
    path: string;
    enabled?: boolean;
    renderers?: JsonFormsRendererRegistryEntry[];
    cells?: JsonFormsCellRendererRegistryEntry[];
  };
  row: {
    expand: any;
    index: number;
    item: any;
    isExpanded: boolean;
    isMobile: boolean;
    isSelected: boolean;
    select: (v: boolean) => void;
    headers: any;
  };
  cell: any;
}
