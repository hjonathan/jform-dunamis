export { default as DroppableElement } from './DroppableElement.vue';
import { entry as droppableRenderer } from './DroppableElement.vue';
import { entry as droppableHorizontalLayoutRenderer } from './DroppableHorizontalLayoutRegistration.vue';
import { entry as droppableVerticalLayoutRenderer } from './DroppableVerticalLayoutRegistration.vue';
import { entry as droppableGroupRenderer } from './DroppableGroupRegistration.vue';
import { entry as droppableCategorizationRenderer } from './DroppableCategorizationRenderer.vue';
import { entry as DroppableCategoryRenderer } from './DroppableCategoryRenderer.vue';
import { entry as droppableGridControlRendererEntry } from './DroppableGridControlRenderer.vue';
import { entry as droppableSimpleTableRendererEntry } from './DroppableSimpleTableRenderer.vue';
import { entry as droppableDataTableControlRendererEntry } from './DroppableDataTableControlRenderer.vue';

export const droppableRenderers = [
  droppableRenderer,
  droppableHorizontalLayoutRenderer,
  droppableVerticalLayoutRenderer,
  droppableGroupRenderer,
  droppableCategorizationRenderer,
  DroppableCategoryRenderer,
  droppableGridControlRendererEntry,
  droppableSimpleTableRendererEntry,
  droppableDataTableControlRendererEntry,
];
