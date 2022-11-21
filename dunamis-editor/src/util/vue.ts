/**
 * Switch between Vue 3 and Vue 2 'vue'.
 */
export {
  computed,
  defineComponent,
  inject,
  onBeforeMount,
  onUnmounted,
  reactive,
  ref,
  watch,
  watchEffect,
} from 'vue';
export type { Ref, ComputedRef } from 'vue';
/**
 * Compatibility type as defineComponent of 'vue' can't properly handle PropTypes.
 */
export type CompType<_S, V> = V;
