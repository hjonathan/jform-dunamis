import { extendedVuetifyRenderersEditor } from '@jsonforms/vue2-vuetify';
import { droppableRenderers } from './droppable';

//@ts-ignore
import { entry as htmlViewerControlRendererEntry } from './HtmlViewerControlRenderer.vue';

export const defaultEditorRenderers = [
  ...extendedVuetifyRenderersEditor,
  ...droppableRenderers,
  htmlViewerControlRendererEntry,
];
