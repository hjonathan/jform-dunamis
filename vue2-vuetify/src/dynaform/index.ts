export { default as SuggestControlRenderer } from './SuggestControlRenderer.vue';
export { default as DropdownControlRenderer } from './DropdownControlRenderer.vue';
export { default as RadioGroupControlRenderer } from './RadioGroupControlRenderer.vue';
export { default as CheckboxGroupControlRenderer } from './CheckboxGroupControlRenderer.vue';
export { default as HtmlViewerControlRenderer } from './HtmlViewerControlRenderer.vue';

import { entry as suggestControlRendererEntry } from './SuggestControlRenderer.vue';
import { entry as dropdownControlRendererEntry } from './DropdownControlRenderer.vue';
import { entry as radioGroupControlRendererEntry } from './RadioGroupControlRenderer.vue';
import { entry as checkboxGroupControlRendererEntry } from './CheckboxGroupControlRenderer.vue';
import { entry as htmlViewerControlRendererEntry } from './HtmlViewerControlRenderer.vue';

export const dynaformRenderers = [
  suggestControlRendererEntry,
  dropdownControlRendererEntry,
  htmlViewerControlRendererEntry,
  radioGroupControlRendererEntry,
  checkboxGroupControlRendererEntry
];