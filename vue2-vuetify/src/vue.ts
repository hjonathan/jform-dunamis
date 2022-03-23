/**
 * Switch between Vue 3 and Vue 2 '@vue/composition-api'.
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
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onActivated,
  onDeactivated,
  onErrorCaptured

} from '@vue/composition-api';
export type { Ref, ComputedRef } from '@vue/composition-api';
/**
 * Compatibility type as defineComponent of '@vue/composition-api' can't properly handle PropTypes.
 */
export type CompType<_S, V> = V;