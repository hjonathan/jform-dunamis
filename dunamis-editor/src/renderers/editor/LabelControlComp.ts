import { onDeactivated, onUnmounted, onUpdated, ref, watch } from 'vue';
import { alphaTeorem, renderWithMustache } from '../composition/alphaTeorem';
import { useStyles } from '../styles';
import {
  ariaLabel,
  createProvider,
  defaultEffects,
  getEffectsControl,
  hint,
  tabindex,
  updateData,
  useCoreControlLayout,
} from './composables/controlComposition';
import { ProviderControl, LabelControl } from './composables/types';

/***********************************************************************************************************************************
 * COMPOSITION EXTENSION FOR LABEL CONTROL
 * @param vuetifyControl
 * @returns
 ***********************************************************************************************************************************/

export const useLabelControlComposition = <P>(props: P) => {
  const provider: ProviderControl = createProvider();
  const controlCore: any = useCoreControlLayout(props);
  const control = ref(
    setPropsLabelControl(
      Object.assign(
        {},
        renderWithMustache(provider, controlCore.value, true),
        defaultEffects()
      )
    )
  );

  watch(controlCore, (nControl, oControl) => {
    if (!Object.is(nControl.uischema, oControl.uischema)) {
      control.value = setPropsLabelControl(
        Object.assign(
          {},
          renderWithMustache(provider, nControl, true),
          getEffectsControl(control.value)
        )
      );
    }
  });

  const styles = useStyles(controlCore.value.uischema);
  //alphaTeorem Dependencies
  const deactivateAlpha = alphaTeorem({
    provider,
    dataCore: controlCore,
    dataUpdater: (ctrl: any) => {
      control.value = setPropsLabelControl(ctrl);
    },
  });

  const onChange = (value: any) => {
    updateData({
      dispatch: provider.dispatch,
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
export const setPropsLabelControl = (control: any): LabelControl => {
  return {
    id: control.id,
    content: content(control),
    ariaLabel: ariaLabel(control),
    tabindex: tabindex(control),
    hint: hint(control),
    show: control.show,
    disabled: control.disabled,
  };
};

export const content = (control: any) => {
  return control.uischema.options?.content || '';
};
