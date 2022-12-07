export { default as GridControlRenderer } from './GridControlRenderer.vue';
export { default as SimpleTableRenderer } from './SimpleTableRenderer.vue';

import { entry as gridControlRendererEntry } from './GridControlRenderer.vue';
import { entry as simpleTableRendererEntry } from './SimpleTableRenderer.vue';

export const gridRenderers = [
  gridControlRendererEntry,
  simpleTableRendererEntry,
];
