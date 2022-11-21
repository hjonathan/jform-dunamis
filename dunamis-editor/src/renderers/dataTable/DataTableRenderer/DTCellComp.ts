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
import { maxBy } from 'lodash';
import { computed, inject, ref } from 'vue';
import { UnknownRenderer } from '@jsonforms/vue2';
import { DtControlRenderers } from '../DynaformRenderers/index';

/****************************************************************************************************
 * COMPOSITION EXTENSION FOR DTCELLRENDERER
 * @param props
 * @returns
 *****************************************************************************************************/
export const useDtCellComposition = (props: RendererProps) => {
  const jsonforms = inject<JsonFormsSubStates>('jsonforms');
  const dispatch = inject<Dispatch<CoreActions>>('dispatch');

  if (!jsonforms || !dispatch) {
    throw "'jsonforms' or 'dispatch' couldn't be injected. Are you within JSON Forms?";
  }

  const { parent, row, cell } = props;

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

  // Ref Properties
  const column = ref(findColumn(parent.uischema, cell.header.value));

  const cDeterminedRenderer = computed((): any => {
    return determinedRanked(column.value);
  });

  return {
    column,
    renderer,
    rootSchema,
    cDeterminedRenderer,
  };
};

/**********************************************************************************************************
 * PURE FUNCTIONS
 **********************************************************************************************************/
/**
 * Determined ranked for Cell Renderers
 * @param parent
 * @param column
 * @returns
 */
export const determinedRanked = (column: any) => {
  const renderer = maxBy(DtControlRenderers, (r: any) => r.tester(column, {}));
  if (renderer === undefined || renderer.tester(column, {}) === -1) {
    return UnknownRenderer;
  } else {
    return renderer.renderer;
  }
};

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

/*******************************************************************************************************
 * INTERFACES
 *******************************************************************************************************/
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
