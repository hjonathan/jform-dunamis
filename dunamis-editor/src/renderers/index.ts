import {
  extendedVuetifyRenderersEditor,
  extendedVuetifyRenderers,
} from '@jsonforms/vue2-vuetify';
import { droppableRenderers } from './droppable';
import { dataTableRenderers } from './dataTable';

//@ts-ignore
import { entry as htmlViewerControlRendererEntry } from './HtmlViewerControlRenderer.vue';

export const defaultEditorRenderers = [
  ...extendedVuetifyRenderersEditor,
  ...droppableRenderers,
  htmlViewerControlRendererEntry,
];

export const defaultRenderers = [
  ...extendedVuetifyRenderers,
  ...dataTableRenderers,
  htmlViewerControlRendererEntry,
];
