<template>
  <div
    ref="refResizer"
    class="primary resizable-component"
    @mousedown.prevent.stop.self="mouseDown"
  ></div>
</template>

<script lang="ts">
//@ts-nocheck
import {
  defineComponent,
  onDeactivated,
  onMounted,
  onUnmounted,
  ref,
} from 'vue';
import Vue from 'vue';
import store from './../../store';
export default defineComponent({
  name: 'ResizableCols',
  props: ['value'],
  setup(props) {
    const resize = ref(false);
    const xo = ref(null);
    const xf = ref(null);
    const xm = ref(null);
    const decrease = ref(null);
    const refResizer = ref(null);

    const mouseUp = () => {
      resize.value = false;
      xm.value = null;
      xf.value = null;
      xo.value = null;
      decrease.value = null;
    };

    const mouseDown = (event: any) => {
      resize.value = true;
      xm.value = refResizer.value.getBoundingClientRect().x;
    };

    const completeColsConfig = (element: any, parent: any) => {
      let index, sum;
      let cols = parent.options?.cols;
      let colsArr;
      let length;

      if (cols) {
        colsArr = cols.split(' ');
        index = parent.elements.findIndex((el) => {
          return el.uuid === element.uuid;
        });
        length = colsArr.length;
        sum = colsArr.reduce((partialSum, a) => partialSum + parseInt(a), 0);
        for (let q = length; q <= index; q++) {
          colsArr[q] = parseInt((12 - sum) / (index - (length - 1)));
        }
        cols = colsArr;
      } else {
        cols = parent.elements.map((el, ind, arr) => parseInt(12 / arr.length));
      }
      return cols;
    };

    const rangeControl = (event: any) => {
      if (xm.value && !xf.value && !xo.value) {
        return xm.value + 20 <= event.clientX || xm.value - 20 >= event.clientX;
      }

      if (decrease.value === true) {
        if (xo.value && xf.value && xm.value) {
          // Secure rank
          if (event.clientX < xm.value && event.clientX > xf.value) {
            xm.value = event.clientX;
            return false;
          }
          // Insecure Rank
          if (event.clientX > xm.value + 20 && event.clientX < xo.value) {
            return true;
          }

          if (event.clientX < xf.value) {
            xf.value = null;
            xo.value = null;
            xm.value = event.clientX;
            return false;
          }
        }
      }

      if (decrease.value === false) {
        if (xo.value && xf.value && xm.value) {
          // Secure rank
          if (event.clientX > xm.value && event.clientX < xo.value) {
            xm.value = event.clientX;
            return false;
          }
          // Insecure Rank
          if (event.clientX < xm.value - 20 && event.clientX > xf.value) {
            return true;
          }
          if (event.clientX > xo.value) {
            xf.value = null;
            xo.value = null;
            xm.value = event.clientX;
            return false;
          }
        }
      }
    };
    const mouseMove = (event: any) => {
      let cols: any, index;
      if (
        props.value &&
        props.value.scope &&
        resize.value &&
        rangeControl(event)
      ) {
        cols = completeColsConfig(props.value, props.value.parent);
        index = props.value.parent.elements.findIndex((el) => {
          return el.uuid === props.value.uuid;
        });

        if (xm.value <= event.clientX && parseInt(cols[index]) < 12) {
          cols[index] = parseInt(cols[index]) + 1;
          decrease.value = false;
        }
        if (xm.value >= event.clientX && parseInt(cols[index]) > 1) {
          cols[index] = parseInt(cols[index]) - 1;
          decrease.value = true;
        }
        cols = cols.join(' ');
        store.dispatch('app/updateUISchemaElementOption', {
          elementUUID: props.value.parent.uuid,
          changedProperties: { cols },
        });
        Vue.nextTick(() => {
          if (!xo.value && !xf.value) {
            if (decrease.value === true) {
              xf.value = refResizer.value.getBoundingClientRect().x;
              xo.value = xm.value;
              xm.value = event.clientX;
            }
            if (decrease.value === false) {
              xo.value = refResizer.value.getBoundingClientRect().x;
              xf.value = xm.value;
              xm.value = event.clientX;
            }
          }

          if (xo.value && xf.value && xm.value) {
            xm.value = event.clientX;
          }
        });
      }
    };

    onMounted(() => {
      document.documentElement.addEventListener('mouseup', mouseUp, true);
      document.documentElement.addEventListener('mousemove', mouseMove, true);
    });
    onUnmounted(() => {
      document.documentElement.removeEventListener('mouseup', mouseUp);
      document.documentElement.removeEventListener('mousemove', mouseMove);
    });
    onDeactivated(() => {
      document.documentElement.removeEventListener('mouseup', mouseUp);
      document.documentElement.removeEventListener('mousemove', mouseMove);
    });

    return {
      resize,
      xo,
      xf,
      xm,
      decrease,
      refResizer,
      mouseDown,
      rangeControl,
    };
  },
});
</script>

<style scoped>
.resizable-component {
  border-right: 4px solid rgb(167, 167, 171);
  border-radius: 0px;
  margin-top: 4px;
  margin-bottom: 4px;
}
.resizable-component:hover {
  cursor: col-resize;
}
</style>
