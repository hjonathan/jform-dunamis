import { additionalRenderers } from './additional';
import { arrayRenderers } from './array';
import { complexRenderers } from './complex';
import { controlRenderers } from './controls';
import { layoutRenderers } from './layouts';
import { dynaformRenderers } from './dynaform';
import { editorRenderers } from './editor';

export const vuetifyRenderers = [
  ...additionalRenderers,
  ...arrayRenderers,
  ...complexRenderers,
  ...controlRenderers,
  ...layoutRenderers,
];

export const extendedVuetifyRenderers = [
  ...vuetifyRenderers,
  ...dynaformRenderers,
];

export const extendedVuetifyRenderersEditor = [
  ...vuetifyRenderers,
  ...editorRenderers,
];
