import { additionalRenderers } from './additional';
import { arrayRenderers } from './array';
import { complexRenderers } from './complex';
import { controlRenderers } from './controls';
import { layoutRenderers } from './layouts';
import { dynaformRenderers } from './dynaform';
import { editorRenderers } from './editor';
import { DtControlRenderers } from './dataTable/DynaformRenderers';

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
  ...DtControlRenderers,
];

export const extendedVuetifyRenderersEditor = [
  ...vuetifyRenderers,
  ...editorRenderers,
];
