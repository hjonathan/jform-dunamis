<template>
  <control-wrapper
    v-bind="controlWrapper"
    :styles="styles"
    :isFocused="isFocused"
    :appliedOptions="appliedOptions"
  >
    asdasd
    <!-- <v-container v-html="appliedOptions.content"></v-container> -->
    <v-container v-html="content"></v-container>
  </control-wrapper>
</template>

<script lang="ts">
//@ts-nocheck
import {
  ControlElement,
  JsonFormsRendererRegistryEntry,
  rankWith,
  uiTypeIs,
} from '@jsonforms/core';
import { defineComponent, inject, onMounted, ref } from 'vue';
import {
  rendererProps,
  useJsonFormsControl,
  RendererProps,
} from '@jsonforms/vue2';
import { default as ControlWrapper } from '../ControlWrapper.vue';
import { useVuetifyControl } from '../util';
import { VContainer } from 'vuetify/lib';
import { cloneDeep } from 'lodash';
import { alphaFindDependencies } from '../../renderers/composition/alphaTeorem';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mustache = require('mustache');

const controlRenderer = defineComponent({
  name: 'html-viewer-control-renderer',
  components: {
    ControlWrapper,
    VContainer,
  },
  directives: {},
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    let data = useVuetifyControl(
      useJsonFormsControl(props),
      (value) => value || undefined
    );
    let content = useHtmlComp(data);
    console.log('data', data);
    return { ...data, ...content };
  },
  computed: {},
});

const useHtmlComp = (data: any) => {
  const { appliedOptions } = data;
  const store = inject('store');
  const schema = cloneDeep(appliedOptions.value);
  const content = ref(cloneDeep(appliedOptions.value.content) || '');
  const locales = store.getters['locales/getLocales'];
  const locale = store.getters['preview/locale'];

  const HX = inject('HX');
  let dep = [];
  dep = alphaFindDependencies(schema, dep);
  console.log('HTML DEP', dep);
  dep.forEach((v: any) => {
    HX.on(v, () => {
      console.log('LISTEN HTML CHANGES');
      let con = appliedOptions.value.content;
      content.value = mustache.render(
        con,
        Object.assign(
          {},
          { T: locales[locale].content },
          store.getters['preview/scopesByValue']([])
        )
      );
    });
  });

  onMounted(() => {
    console.log('MOUNTED HTML');
  });
  return { content };
};

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(2, uiTypeIs('RichText')),
};
</script>
