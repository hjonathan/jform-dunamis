<template>
  <v-container
    v-if="layout.visible"
    fill-height
    :class="`pa-0 ${styles.verticalLayout.root}`"
  >
    <v-row
      v-for="(element, index) in layout.uischema.elements"
      :key="`${layout.path}-${index}`"
      no-gutters
    >
      <v-col cols="12" :class="styles.verticalLayout.item">
        <dispatch-renderer
          :schema="layout.schema"
          :uischema="element"
          :path="layout.path"
          :enabled="layout.enabled"
          :renderers="layout.renderers"
          :cells="layout.cells"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
//@ts-nocheck
import {
  uiTypeIs,
  JsonFormsRendererRegistryEntry,
  Layout,
  rankWith,
} from '@jsonforms/core';
import {
  defineComponent,
  onMounted,
  inject,
  onUnmounted,
  onDeactivated,
} from 'vue';
import {
  DispatchRenderer,
  rendererProps,
  useJsonFormsLayout,
  RendererProps,
} from '@jsonforms/vue2';
import { cloneDeep, sortedUniq } from 'lodash';
import { useVuetifyLayout } from '../util';
import { VContainer, VRow, VCol } from 'vuetify/lib';
import { alphaFindDependencies } from '../../renderers/composition/alphaTeorem';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mustache = require('mustache');

const layoutRenderer = defineComponent({
  name: 'vertical-layout-renderer',
  components: {
    DispatchRenderer,
    VContainer,
    VRow,
    VCol,
  },
  props: {
    ...rendererProps<Layout>(),
  },
  setup(props: RendererProps<Layout>) {
    const data = useVuetifyLayout(useJsonFormsLayout(props));
    useVerticalLayout(data);
    return data;
  },
});

const useVerticalLayout = (data: any) => {
  const { appliedOptions } = data;
  const store = inject('store');
  const rules = cloneDeep(appliedOptions.value.rules) || [];
  const locales = store.getters['locales/getLocales'];
  const locale = store.getters['preview/locale'];

  const HX = inject('HX');
  let dep = [];
  dep = alphaFindDependencies(appliedOptions.value.rules, dep);
  dep = dep.sort();
  dep = sortedUniq(dep);

  let fnDestroy = new Function();

  onUnmounted(() => {
    fnDestroy();
  });

  onDeactivated(() => {
    fnDestroy();
  });

  dep.forEach((v: any) => {
    const call = () => {
      rules.forEach((rule) => {
        try {
          let condition = eval(
            mustache.render(
              rule.expression,
              Object.assign(
                {},
                { T: locales[locale].content },
                store.getters['preview/scopesByValue']([])
              )
            )
          );
          if (condition) {
            eval(
              mustache.render(
                rule.script,
                Object.assign(
                  {},
                  { T: locales[locale].content },
                  store.getters['preview/scopesByValue']([])
                )
              )
            );
          }
        } catch (e) {
          console.error('ERROR', e);
        }
      });
    };
    HX.on(v, call);

    fnDestroy = () => {
      HX.off(v, call);
    };
  });
};

export default layoutRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: layoutRenderer,
  tester: rankWith(2, uiTypeIs('VerticalLayout')),
};
</script>
