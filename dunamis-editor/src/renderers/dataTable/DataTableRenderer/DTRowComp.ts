import {
  CoreActions,
  Dispatch,
  UISchemaElement,
  JsonFormsRendererRegistryEntry,
  JsonFormsCellRendererRegistryEntry,
  JsonSchema,
} from '@jsonforms/core';
import { inject, ref } from 'vue';
import { useControl } from './DataTableComp';

/***********************************************************************************************************************************
 * COMPOSITION EXTENSION FOR VUE DATATABLE
 * @param vuetifyControl
 * @returns
 ***********************************************************************************************************************************/

export const useDtRowComposition = (props: RendererProps, emit: any) => {
  const dispatch = inject<Dispatch<CoreActions>>('dispatch');
  if (!dispatch) {
    throw "'jsonforms' or 'dispatch' couldn't be injected. Are you within JSON Forms?";
  }

  const control: any = useControl(props.parent); // Basic Object from Json Core
  //Properties
  const rHeaders = ref(props.row.headers);

  //Methods
  const onDelete = () => {
    emit('onDeleteRow', props.row);
  };

  return {
    control,
    rHeaders,
    onDelete,
  };
};

/*******************************************************************************************************
 * METHODS FOR DTROWRENDERER TEMPLATE
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
}
