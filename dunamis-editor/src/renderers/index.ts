import { droppableRenderers } from './droppable';

import { layoutRenderers } from './layouts';
import { dynaformRenderers } from './dynaform';
import { editorRenderers } from './editor';
import { DtControlRenderers } from './dataTable/DynaformRenderers';

//@ts-ignore
import { entry as htmlViewerControlRendererEntry } from './HtmlViewerControlRenderer.vue';

export const defaultEditorRenderers = [
  ...layoutRenderers,
  ...editorRenderers,
  ...droppableRenderers,
  htmlViewerControlRendererEntry,
];

export const defaultRenderers = [
  ...layoutRenderers,
  ...dynaformRenderers,
  ...DtControlRenderers,
];

/**
 * Renderes for Nested Form use editor renderes, but without the droppable elements
 * in order to not use the store in Dynaforms
 */
export const defaultNestedRenders = [
  ...layoutRenderers,
  ...editorRenderers,
  ...DtControlRenderers,
  htmlViewerControlRendererEntry,
];
