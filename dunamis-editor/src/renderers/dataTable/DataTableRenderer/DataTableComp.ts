import {
  CoreActions,
  createId,
  Dispatch,
  JsonFormsSubStates,
  moveDown,
  moveUp,
  removeId,
  update,
  computeLabel,
  mapStateToArrayControlProps,
} from '@jsonforms/core';
import {
  computed,
  inject,
  onBeforeMount,
  onUnmounted,
  ref,
} from '@vue/composition-api';

/***********************************************************************************************************************************
 * COMPOSITION EXTENSION FOR VUE DATATABLE
 * @param vuetifyControl
 * @returns
 ***********************************************************************************************************************************/

export const useDataTableComposition = <P>(props: P) => {
  const dispatch = inject<Dispatch<CoreActions>>('dispatch');
  if (!dispatch) {
    throw "'jsonforms' or 'dispatch' couldn't be injected. Are you within JSON Forms?";
  }

  const control: any = useControl(props);
  //Properties
  const data = ref([]);
  //Computed
  const cHeaders = computed(() => buildHeaders(control, false));
  const cLabel = computed(() => buildLabel(control));
  //Methods
  const onClickNewRow = () =>
    newRow({
      control,
      data,
      dispatch,
    });

  const onDeleteRow = (row: RowProps) =>
    deleteRow({ dispatch, row, data, control });
  return {
    data,
    control,
    cHeaders,
    cLabel,
    onClickNewRow,
    onDeleteRow,
  };

  //const appliedOptions = useControlAppliedOptions(input);

  // const childLabelForIndex = (index: number) => {
  //   const childLabelProp =
  //     control.value.uischema.options?.childLabelProp ??
  //     getFirstPrimitiveProp(input.control.value.schema);
  //   if (!childLabelProp) {
  //     return `${index}`;
  //   }
  //   const labelValue = Resolve.data(
  //     control.value.data,
  //     composePaths(`${index}`, childLabelProp)
  //   );
  //   if (
  //     labelValue === undefined ||
  //     labelValue === null ||
  //     Number.isNaN(labelValue)
  //   ) {
  //     return '';
  //   }
  //   return `${labelValue}`;
  // };
};

/***********************************************************************************************************
 * COMPUTED PROPERTIES FOR DATA TABLE COMPONENT
 ************************************************************************************************************/

/*******************************************************************************************************
 * METHODS FOR DATA TABLE COMPONENT TEMPLATE
 *******************************************************************************************************/

/**
 * Add New Row to Data Table and dispatch to JsonCore the new Row
 * @param params
 */
const newRow = (params: any) => {
  const { dispatch, control, data } = params;
  const path = control.value.path;
  const row: any = buildEmptyRowData(control.value?.schema.properties);
  dispatch(
    update(path, (array) => {
      if (array === undefined || array === null) {
        return [row];
      }

      array.push(row);
      return array;
    })
  );
};

/**
 * Delete Row, dispatch the last changes to Json Core
 * @param params
 */
const deleteRow = (params: any) => {
  const { dispatch, control, row, data } = params;
  const path = control.value.path;
  dispatch(
    update(path, (array) => {
      array.splice(row.index, 1);
      return array;
    })
  );
};

/***********************************************************************************************************
 * PURE FUNCTIONS DATA TABLE
 ***********************************************************************************************************/
/**
 * Return headers from vuetify control data
 * @param vuetifyControl
 * @returns
 */
export const buildHeaders = (control: any, onlyHeaders = true): Array<any> => {
  let h: Array<any> = [];
  const index = {
    value: 'index',
    text: '#',
  };
  const actions = {
    text: 'Actions',
    value: 'actions',
    sortable: false,
  };
  for (const property in control.value?.schema.properties) {
    h.push({
      text: property,
      value: property,
    });
  }
  if (!onlyHeaders) {
    h = [index].concat(h, actions);
  }
  return h;
};

const buildLabel = <I extends any>(control: I) => {
  return computeLabel(
    control.value.label,
    control.value.required,
    !!control.value?.config.hideRequiredAsterisk
  );
};

/**
 * Return headers from vuetify control data
 * @param vuetifyControl
 * @returns
 */
const buildEmptyRowData = (properties: any) => {
  const emptyRowData: any = {};
  for (const key in properties) {
    if (Object.hasOwn(properties, key)) {
      if (properties[key]['type'] == 'string') {
        emptyRowData[key] = 'jonas' + Math.random(0, 1000);
      }
    }
  }
  return emptyRowData;
};

/*******************************************************************************************************************************
 * JSON CORE METHODS FOR COMPOSITION PLEASE EDIT WITH CAUTION
 * @param props
 * @param stateMap
 * @param dispatchMap
 * @returns
 ********************************************************************************************************************************/
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types

/**
 * Method return property control from the JSON CORE for manage in other layers
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
  onBeforeMount(() => {
    if ((control.value as any).uischema.scope) {
      id.value = createId((control.value as any).uischema.scope);
    }
  });

  onUnmounted(() => {
    if (id.value) {
      removeId(id.value);
      id.value = undefined;
    }
  });

  return control as unknown as R;
}

export const mapDispatch = (dispatch: Dispatch<CoreActions>): any => ({
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
  moveUp: (path: any, toMove: number) => () => {
    dispatch(
      update(path, (array) => {
        moveUp(array, toMove);
        return array;
      })
    );
  },
  moveDown: (path: any, toMove: number) => () => {
    dispatch(
      update(path, (array) => {
        moveDown(array, toMove);
        return array;
      })
    );
  },
});

export interface RowProps {
  expand: any;
  index: number;
  item: any;
  isExpanded: boolean;
  isMobile: boolean;
  isSelected: boolean;
  select: (v: boolean) => void;
  headers: any;
}
