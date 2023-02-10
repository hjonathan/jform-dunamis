import { onDeactivated, onUnmounted, onUpdated, ref, watch } from 'vue';
import { alphaTeorem, renderWithMustache } from '../composition/alphaTeorem';
import { useStyles } from '../styles';
import { content } from './LabelControlComp';
import {
  ariaLabel,
  createProvider,
  defaultEffects,
  getEffectsControl,
  hint,
  labelCols,
  labelOrientation,
  tabindex,
  updateData,
  useCoreControlLayout,
} from './composables/controlComposition';
import { ProviderControl, LinkControl } from './composables/types';

/***********************************************************************************************************************************
 * COMPOSITION EXTENSION FOR LINK CONTROL
 * @param vuetifyControl
 * @returns
 ***********************************************************************************************************************************/

export const useLinkControlComposition = <P>(props: P) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const provider: ProviderControl = createProvider();

  const controlCore: any = useCoreControlLayout(props);
  const control = ref(
    setPropsLinkControl(
      Object.assign(
        {},
        renderWithMustache(provider, controlCore.value, true),
        defaultEffects()
      )
    )
  );

  watch(controlCore, (nControl, oControl) => {
    if (!Object.is(nControl.uischema, oControl.uischema)) {
      control.value = setPropsLinkControl(
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
      control.value = setPropsLinkControl(ctrl);
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
export const setPropsLinkControl = (control: any): LinkControl => {
  return {
    content: content(control),
    href: href(control),
    labelOrientation: labelOrientation(control),
    label: label(control),
    labelCols: labelCols(control),
    tabindex: tabindex(control),
    ariaLabel: ariaLabel(control),
    hint: hint(control),
    id: control.id,
    visible: true,
  };
};

export const label = (control: any) => control.uischema.label ?? '';

export const href = (control: any) => control.uischema.options?.href ?? '';
