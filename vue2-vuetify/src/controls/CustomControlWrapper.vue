<template>
  <div
    v-if="$props.visible"
    :class="$props.styles.control.root"
    :id="$props.id"
  >
    <div
      v-if="$props.labelOrientation != 'inherit'"
      no-gutters
      :class="$props.labelOrientation == 'vertical' ? 'col' : 'row'"
      style="flex-wrap: nowrap"
    >
      <div
        :class="`${
          $props.labelOrientation == 'vertical'
            ? 'row'
            : 'col col-' + $props.labelCols
        } align-self-center`"
      >
        {{ label }}
      </div>
      <div :class="$props.labelOrientation == 'vertical' ? 'row' : 'col'">
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
  props: ['labelOrientation', 'label', 'labelCols', 'styles', 'id', 'visible'],
};
</script>
