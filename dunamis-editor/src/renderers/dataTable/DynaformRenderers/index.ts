export { default as DtTextRenderer } from './DtTextRenderer.vue';
export { default as DtTextAreaRenderer } from './DtTextRenderer.vue';

import { entry as dtTextRendererEntry } from './DtTextRenderer.vue';
import { entry as dtTextAreaRendererEntry } from './DtTextAreaRenderer.vue';

export const DtControlRenderers = [
  dtTextRendererEntry,
  dtTextAreaRendererEntry,
];
