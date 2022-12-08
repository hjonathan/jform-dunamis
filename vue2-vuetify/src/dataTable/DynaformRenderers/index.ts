//@ts-nocheck
export { default as DtTextControl } from './DtTextControl.vue';
export { default as DtTextareaControl } from './DtTextareaControl.vue';

import { entry as dtTextControlEntry } from './DtTextControl.vue';
import { entry as dtTextareaControlEntry } from './DtTextareaControl.vue';

export const DtControlRenderers = [dtTextControlEntry, dtTextareaControlEntry];
