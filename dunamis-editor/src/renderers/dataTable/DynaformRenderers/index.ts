//@ts-nocheck
export { default as DtTextControl } from './DtTextControl.vue';
export { default as DtTextareaControl } from './DtTextareaControl.vue';
export { default as DtCheckboxControl } from './DtCheckboxControl.vue';
export { default as DtDropdownControl } from './DtDropdownControl.vue';
export { default as DtRadiogroupControl } from './DtRadiogroupControl.vue';
export { default as DtCheckgroupControl } from './DtCheckgroupControl.vue';
export { default as DtSuggestControl } from './DtSuggestControl.vue';
export { default as DtDatetimeControl } from './DtDatetimeControl.vue';

import { entry as dtTextControlEntry } from './DtTextControl.vue';
import { entry as dtTextareaControlEntry } from './DtTextareaControl.vue';
import { entry as dtCheckboxControlEntry } from './DtCheckboxControl.vue';
import { entry as dtDropdownControlEntry } from './DtDropdownControl.vue';
import { entry as dtRadiogroupControlEntry } from './DtRadiogroupControl.vue';
import { entry as dtCheckgroupControlEntry } from './DtCheckgroupControl.vue';
import { entry as dtSuggestControlEntry } from './DtSuggestControl.vue';
import { entry as dtDatetimeControlEntry } from './DtDatetimeControl.vue';

export const DtControlRenderers = [
  dtTextControlEntry,
  dtTextareaControlEntry,
  dtCheckboxControlEntry,
  dtDropdownControlEntry,
  dtRadiogroupControlEntry,
  dtCheckgroupControlEntry,
  dtSuggestControlEntry,
  dtDatetimeControlEntry,
];
