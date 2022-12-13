//@ts-nocheck
export { default as DtTextControl } from './DtTextControl.vue';
export { default as DtTextareaControl } from './DtTextareaControl.vue';
export { default as DtCheckboxControl } from './DtCheckboxControl.vue';

import { entry as dtTextControlEntry } from './DtTextControl.vue';
import { entry as dtTextareaControlEntry } from './DtTextareaControl.vue';
import { entry as dtCheckboxControlEntry } from './DtCheckboxControl.vue';

export const DtControlRenderers = [
  dtTextControlEntry,
  dtTextareaControlEntry,
  dtCheckboxControlEntry,
];
