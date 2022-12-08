export { default as SuggestControlRenderer } from './SuggestControlRenderer.vue';
export { default as DateTimeControlRendererPreview } from '../editor/DateTimeControlRendererEditor.vue';
export { default as CheckboxControlRenderer } from '../editor/CheckboxControlRendererEditor.vue';
export { default as DropdownControlRenderer } from '../editor/DropdownControlRendererEditor.vue';
export { default as RadioGroupControlRenderer } from '../editor/RadiogroupControlRendererEditor.vue';
export { default as RatingControlRenderer } from './RatingControlRenderer.vue';
export { default as CheckboxGroupControlRenderer } from '../editor/CheckgroupControlRendererEditor.vue';
export { default as HtmlViewerControlRenderer } from './HtmlViewerControlRenderer.vue';
export { default as ImageControlRenderer } from './ImageControlRenderer.vue';
export { default as MultipleFileControlRenderer } from './MultipleFileControlRenderer.vue';
export { default as TextControlRenderer } from '../editor/TextControlRendererEditor.vue';
export { default as TextAreaControlRenderer } from '../editor/TextAreaControlRendererEditor.vue';
export { default as LabelControlRenderer } from '../editor/LabelControlRenderer.vue';
export { default as TitleControlRenderer } from '../editor/TitleControlRenderer.vue';
export { default as SubtitleControlRenderer } from '../editor/SubtitleControlRenderer.vue';
export { default as DataTableControlRenderer } from '../dataTable/DataTableRenderer/DataTableRenderer.vue';
export { default as SubmitControlRenderer } from '../editor/SubmitControlRendererEditor.vue';
export { default as ButtonControlRenderer } from '../editor/ButtonControlRendererEditor.vue';

import { entry as suggestControlRendererEntry } from './SuggestControlRenderer.vue';
import { entry as dateTimeControlRendererEntry } from '../editor/DateTimeControlRendererEditor.vue';
import { entry as checkboxControlRendererEntry } from '../editor/CheckboxControlRendererEditor.vue';
import { entry as dropdownControlRendererEntry } from '../editor/DropdownControlRendererEditor.vue';
import { entry as radioGroupControlRendererEntry } from '../editor/RadiogroupControlRendererEditor.vue';
import { entry as ratingControlRendererEntry } from './RatingControlRenderer.vue';
import { entry as checkboxGroupControlRendererEntry } from '../editor//CheckgroupControlRendererEditor.vue';
import { entry as htmlViewerControlRendererEntry } from './HtmlViewerControlRenderer.vue';
import { entry as imageControlRendererEntry } from './ImageControlRenderer.vue';
import { entry as multipleFileControlRendererEntry } from './MultipleFileControlRenderer.vue';
import { entry as textControlRendererEntry } from '../editor/TextControlRendererEditor.vue';
import { entry as labelControlRendererEntry } from '../editor/LabelControlRenderer.vue';
import { entry as titleControlRendererEntry } from '../editor/TitleControlRenderer.vue';
import { entry as subtitleControlRendererEntry } from '../editor/SubtitleControlRenderer.vue';

import { entry as textAreaControlRendererEntry } from '../editor/TextAreaControlRendererEditor.vue';
import { entry as dataTableControlRendererEntry } from '../dataTable/DataTableRenderer/DataTableRenderer.vue';
import { entry as submitControlRendererEntry } from '../editor/SubmitControlRendererEditor.vue';
import { entry as buttonControlRendererEntry } from '../editor/ButtonControlRendererEditor.vue';

export const dynaformRenderers = [
  suggestControlRendererEntry,
  dateTimeControlRendererEntry,
  checkboxControlRendererEntry,
  dropdownControlRendererEntry,
  htmlViewerControlRendererEntry,
  radioGroupControlRendererEntry,
  ratingControlRendererEntry,
  checkboxGroupControlRendererEntry,
  imageControlRendererEntry,
  multipleFileControlRendererEntry,
  textControlRendererEntry,
  textAreaControlRendererEntry,
  labelControlRendererEntry,
  titleControlRendererEntry,
  subtitleControlRendererEntry,
  dataTableControlRendererEntry,
  submitControlRendererEntry,
  buttonControlRendererEntry,
];
