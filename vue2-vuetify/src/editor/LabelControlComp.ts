import {
  CoreActions,
  createId,
  Dispatch,
  JsonFormsSubStates,
  mapStateToLayoutProps,
  removeId,
} from '@jsonforms/core';
import {
  inject,
  onDeactivated,
  onUnmounted,
  onUpdated,
  ref,
  watch,
  computed,
} from 'vue';
import { alphaTeorem } from '../composition/alphaTeorem';
import { useStyles } from '../styles';
import { isEqual } from 'lodash';
import {
  ariaLabel,
  hint,
  tabindex,
  updateData,
} from './composables/controlComposition';

/***********************************************************************************************************************************
 * COMPOSITION EXTENSION FOR LABEL CONTROL
 * @param vuetifyControl
 * @returns
 ***********************************************************************************************************************************/

export const useLabelControlComposition = <P>(props: P) => {
  const dispatch = inject<Dispatch<CoreActions>>('dispatch');
  const store = inject<any>('store');
  const HX = inject<any>('HX');
  if (!dispatch) {
    throw "'jsonforms' or 'dispatch' couldn't be injected. Are you within JSON Forms?";
  }

  //Properties
  const controlCore: any = useControl(props);
  const control = ref(setPropsLabelControl(controlCore.value));

  watch(controlCore, (nControl, oControl) => {
    if (!isEqual(nControl, oControl)) {
      control.value = setPropsLabelControl(nControl);
    }
  });

  const styles = useStyles(controlCore.value.uischema);
  //alphaTeorem Dependencies
  const deactivateAlpha = alphaTeorem({
    store,
    HX,
    controlCore: controlCore,
    updater: (ctrl: any) => {
      control.value = setPropsLabelControl(ctrl);
    },
  });

  const onChange = (value: any) => {
    updateData({
      dispatch,
      control: controlCore,
      value,
    });
  };
  onUpdated(() => {
    // this eill log whenever the component re-renders
    console.log('component re-rendered!', controlCore.value.uischema.scope);
  });
  onUnmounted(() => {
    deactivateAlpha();
  });

  onDeactivated(() => {
    deactivateAlpha();
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
 * Update data in JSON CORE
 * @param params
 */
export const setPropsLabelControl = (control: any) => {
  return {
    id: control.id,
    content: content(control),
    ariaLabel: ariaLabel(control),
    tabindex: tabindex(control),
    hint: hint(control),
  };
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

export const content = (control: any) => {
  return control.uischema.options?.content || '';
};
