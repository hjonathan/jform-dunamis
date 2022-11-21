<template>
  <div>
    <div
      v-if="$props.getLabelOrientation() != 'inherit'"
      no-gutters
      :class="$props.getLabelOrientation() == 'vertical' ? 'col' : 'row'"
      style="flex-wrap: nowrap"
    >
      <div
        :class="`${
          $props.getLabelOrientation() == 'vertical'
            ? 'row'
            : 'col col-' + $props.getLabelCols()
        } align-self-center`"
      >
        {{ computedLabel }}
      </div>
      <div :class="$props.getLabelOrientation() == 'vertical' ? 'row' : 'col'">
        <slot />
      </div>
    </div>
    <slot v-else />
  </div>
</template>

<script>
//@ts-nocheck
// Custom Wrapper for styles,label,functionality: For example:: Text, TextArea
export default {
  props: ['getLabelOrientation', 'computedLabel', 'getLabelCols'],
};
</script>
