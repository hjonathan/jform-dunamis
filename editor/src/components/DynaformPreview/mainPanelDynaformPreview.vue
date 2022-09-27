<template>
  <component
    v-bind:is="mode"
    type="iPhone8"
    picker
    border
    :class="mode == 'Device' ? 'vpm-device' : ''"
  >
    <v-parallax :style="getPaddings" height="auto" :src="sourceBackground">
      <v-card :style="getStyles" elevation="0">
        <json-forms
          class="pa-5"
          :data="data"
          :key="key"
          :schema="useSchema"
          :uischema="useUiSchema"
          :renderers="renderers"
          @change="onChange"
          :i18n="i18n"
          :cells="renderers"
          v-bind:style="getCurrentFont"
        />
      </v-card>
    </v-parallax>
  </component>
</template>

<script lang="ts">
//@ts-nocheck
import { JsonFormsI18nState } from '@jsonforms/core';
import { JsonForms, JsonFormsChangeEvent } from '@jsonforms/vue2';
import { useExportSchema } from '../../util';
import { generateEmptyData } from '../../model';
import { extendedVuetifyRenderers } from '@jsonforms/vue2-vuetify';
import _ from 'lodash';
import store from '../../store';
import { sync } from 'vuex-pathify';
import Device from 'vue-device';
import { defineComponent } from '@vue/composition-api';
export default defineComponent({
  name: 'dymaform-preview',
  components: {
    JsonForms,
    Device,
  },
  props: {},
  data() {
    return {
      key: 1,
      items: [
        { title: 'Mobile', icon: 'mdi-cellphone', component: 'device' },
        { title: 'Browser', icon: 'mdi-application-outline', component: 'div' },
      ],
      dialog: false,
      component: 'div',
      data: store.get('preview/data'),
      locale: sync('preview/locale') as any,
      i18n: {
        locale: 'en',
        //translate: this.createTranslator(this.locale || 'en'),
        translate: {},
      } as JsonFormsI18nState,
      renderers: extendedVuetifyRenderers,
    };
  },
  computed: {
    itemsMainPanel: sync('viewManager/mainPanel.items') as any,
    activeMainPanel: sync('viewManager/mainPanel.active') as any,
    mode() {
      let dev = 'div',
        items: any = this.itemsMainPanel,
        active: any = this.activeMainPanel;
      if (items[active]) {
        dev = items[active].data.mode;
        dev = dev == 'device' ? 'Device' : 'div';
      }
      return dev;
    },
    useUiSchema: sync('preview/uiSchema'),
    useSchema(): any {
      return useExportSchema(this.$store.get('preview/schema'));
    },
    previewData(): any {
      return generateEmptyData(this.$store.get('preview@schema'), {});
    },
    getCurrentFont(): any {
      return {
        'font-family': this.$store.getters['themes/getFontFamilyTheme'],
      };
    },
    getPaddings(): any {
      let paddings = this.$store.getters['themes/getPaddings'];
      return {
        padding:
          paddings.top +
          'px ' +
          paddings.right +
          'px ' +
          paddings.bottom +
          'px ' +
          paddings.left +
          'px',
      };
    },
    sourceBackground(): string {
      return this.$store.getters['themes/getBackground'].background;
    },
    getStyles(): any {
      let margins = this.$store.getters['themes/getMargins'];
      let backgroundColor = this.$store.getters['themes/getBackgroundColor'];
      return {
        padding:
          margins.top +
          'px ' +
          margins.right +
          'px ' +
          margins.bottom +
          'px ' +
          margins.left +
          'px',
        'background-color': backgroundColor.color,
      };
    },
  },
  watch: {
    locale(nValue: string): void {
      this.i18n.locale = nValue;
      this.i18n.translate = this.createTranslator();
    },
  },
  methods: {
    getFont(): string {
      return this.$store.getters['themes/getFontFamilyTheme'];
    },
    /**
     * Create translator for JSON FORMS based in store locale
     */
    createTranslator(): any {
      let i18n = this.$store.get('locales');
      const store = this.$store;
      return (
        key: string,
        defaultMessage: string | undefined
      ): string | undefined => {
        const locale = store.get('preview/locale');
        return (
          _.get(
            locale === 'en' ? i18n['en']['content'] : i18n[locale]['content'],
            key
          ) ?? defaultMessage
        );
      };
    },
    /**
     * On change JSON FORM save the data in store
     */
    onChange(event: JsonFormsChangeEvent): void {
      this.$store.set('preview/data', event.data || {});
    },
  },
});
</script>
<style>
.vpm-device {
  position: initial !important;
}
#device .picker {
  margin-top: 0px !important;
}
</style>
