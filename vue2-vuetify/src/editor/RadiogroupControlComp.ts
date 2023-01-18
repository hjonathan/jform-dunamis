import { isEqual } from 'lodash';
import {
  onDeactivated,
  onMounted,
  onUnmounted,
  onUpdated,
  ref,
  watch,
} from 'vue';
import { alphaTeorem } from '../composition/alphaTeorem';
import { useStyles } from '../styles';
import {
  ariaLabel,
  createProvider,
  hint,
  label,
  labelCols,
  labelOrientation,
  options,
  placeholder,
  readonly,
  tabindex,
  updateData,
  useControl,
  validation,
} from './composables/controlComposition';
import { ProviderControl } from './composables/types';

/***********************************************************************************************************************************
 * COMPOSITION EXTENSION FOR CHECKGROUP CONTROL
 * @param vuetifyControl
 * @returns
 ***********************************************************************************************************************************/

export const useRadiogroupControlComposition = <P>(props: P) => {
  const provider: ProviderControl = createProvider();
  const controlCore: any = useControl(props);
  const control = ref(setDefaultPropsRadiogroupControl(controlCore.value));

  watch(controlCore, async (nControl: any, oControl: any) => {
    if (!isEqual(nControl, oControl)) {
      control.value = await setPropsRadiogroupControl(provider, nControl);
    }
  });

  const styles = useStyles(controlCore.value.uischema);
  //alphaTeorem Dependencies
  const deactivateAlpha = alphaTeorem({
    provider,
    dataCore: controlCore,
    dataUpdater: async (ctrl: any) => {
      control.value = await setPropsRadiogroupControl(provider, ctrl);
    },
  });

  const onChange = (value: any) => {
    updateData({
      dispatch: provider.dispatch,
      control: controlCore,
      value,
    });
  };

  onMounted(async () => {
    control.value = await setPropsRadiogroupControl(
      provider,
      controlCore.value
    );
  });

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
    styles,
    onChange,
  };
};
/*****************************************************************************************************************
 * METHODS USING CONTROL
 *****************************************************************************************************************/

/**
 * Update data in JSON CORE
 * @param params
 */
export const setPropsRadiogroupControl = async (
  provider: ProviderControl,
  control: any
) =>
  Promise.resolve({
    id: control.id,
    ariaLabel: ariaLabel(control),
    labelOrientation: labelOrientation(control),
    label: label(control),
    labelCols: labelCols(control),
    hint: hint(control),
    validation: validation(control),
    tabindex: tabindex(control),
    readonly: readonly(control),
    placeholder: placeholder(control),
    data: control.data,
    visible: true,
    options: await options(provider, control),
    errors: control.errors,
    multipleSelection: multipleSelection(control),
  });

/**
 * Update data in JSON CORE
 * @param params
 */
export const setDefaultPropsRadiogroupControl = (control: any) => ({
  id: control.id,
  ariaLabel: ariaLabel(control),
  labelOrientation: labelOrientation(control),
  label: label(control),
  labelCols: labelCols(control),
  hint: hint(control),
  validation: validation(control),
  tabindex: tabindex(control),
  readonly: readonly(control),
  placeholder: placeholder(control),
  data: control.data,
  visible: true,
  options: [],
  errors: control.errors,
  multipleSelection: multipleSelection(control),
});

export const multipleSelection = (control: any) =>
  control.uischema.options?.multipleSelection ?? false;
