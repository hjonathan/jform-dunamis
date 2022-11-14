export { default as SuggestControlRenderer } from './SuggestControlRenderer.vue';
export { default as DatePickerControlRenderer } from './DatePickerControlRenderer.vue';
export { default as DateTimeControlRendererPreview } from './DateTimeControlRenderer.vue';
export { default as CheckboxControlRenderer } from './CheckboxControlRenderer.vue';
export { default as DropdownControlRenderer } from './DropdownControlRenderer.vue';
export { default as RadioGroupControlRenderer } from './RadioGroupControlRenderer.vue';
export { default as RatingControlRenderer } from './RatingControlRenderer.vue';
export { default as CheckboxGroupControlRenderer } from './CheckboxGroupControlRenderer.vue';
export { default as HtmlViewerControlRenderer } from './HtmlViewerControlRenderer.vue';
export { default as ImageControlRenderer } from './ImageControlRenderer.vue';
export { default as MultipleFileControlRenderer } from './MultipleFileControlRenderer.vue';
export { default as TextControlRenderer } from './TextControlRenderer.vue';
export { default as TextAreaControlRenderer } from './TextAreaControlRenderer.vue';
export { default as TimeControlRendererPreview } from './TimeControlRenderer.vue';
export { default as SubmitButtonControlRenderer } from './SubmitButtonControlRenderer.vue';

import { entry as suggestControlRendererEntry } from './SuggestControlRenderer.vue';
import { entry as datePickerControlRendererEntry } from './DatePickerControlRenderer.vue';
import { entry as dateTimeControlRendererEntry } from './DateTimeControlRenderer.vue';
import { entry as checkboxControlRendererEntry } from './CheckboxControlRenderer.vue';
import { entry as dropdownControlRendererEntry } from './DropdownControlRenderer.vue';
import { entry as radioGroupControlRendererEntry } from './RadioGroupControlRenderer.vue';
import { entry as ratingControlRendererEntry } from './RatingControlRenderer.vue';
import { entry as checkboxGroupControlRendererEntry } from './CheckboxGroupControlRenderer.vue';
import { entry as htmlViewerControlRendererEntry } from './HtmlViewerControlRenderer.vue';
import { entry as imageControlRendererEntry } from './ImageControlRenderer.vue';
import { entry as multipleFileControlRendererEntry } from './MultipleFileControlRenderer.vue';
import { entry as textControlRendererEntry } from './TextControlRenderer.vue';
import { entry as textAreaControlRendererEntry } from './TextAreaControlRenderer.vue';
import { entry as timeControlRendererEntry } from './TimeControlRenderer.vue';
import { entry as submitButtonControlRendererEntry } from './SubmitButtonControlRenderer.vue';

export const dynaformRenderers = [
  suggestControlRendererEntry,
  datePickerControlRendererEntry,
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
  timeControlRendererEntry,
  submitButtonControlRendererEntry,
];
