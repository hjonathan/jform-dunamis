import { ref } from '@vue/composition-api';
import _ from 'lodash';

export const dynamicPropertyDefault = (props: any, context: any) => {
  const data = ref(props.config);
  const input = (v: any) => {
    if (typeof v === 'object' && !Array.isArray(v) && v !== null) {
      context.emit('input', v.id);
    } else {
      context.emit('input', v);
    }
  };
  const change = (value: any) => {
    if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      context.emit('change', value.id);
      context.emit('visible', value.id);
    } else {
      context.emit('change', value);
      context.emit('visible', value);
    }
  };
  const twoBind = (value: any) => {
    context.emit('input', value);
    context.emit('change', value);
  };
  return { data, input, change, twoBind };
};
