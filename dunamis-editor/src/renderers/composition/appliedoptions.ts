import { computed } from 'vue';
import { cloneDeep, merge } from 'lodash';
import { useStyles } from '@jsonforms/vue2-vuetify/src/styles';

// Mix the uiSchema Options and config in a variable
export const useControlAppliedOptions = <I extends { control: any }>(
  input: I
) => {
  return computed(() =>
    merge(
      {},
      cloneDeep(input.control.value.config),
      cloneDeep(input.control.value.uischema.options)
    )
  );
};

// Mix  the uiSchema Options , config and styles in a variable
export const useVuetifyLayout = <I extends { layout: any }>(input: I) => {
  const appliedOptions = computed(() =>
    merge(
      {},
      cloneDeep(input.layout.value.config),
      cloneDeep(input.layout.value.uischema.options)
    )
  );
  return {
    ...input,
    styles: useStyles(input.layout.value.uischema),
    appliedOptions,
  };
};
