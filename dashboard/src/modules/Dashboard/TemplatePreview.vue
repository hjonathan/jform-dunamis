<template>
  <div class="vpm-scale-preview">
    <v-parallax :style="getPaddings" height="auto" :src="sourceBackground">
      <v-card :style="getStyles" elevation="0" plain>
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
  </div>
</template>

<script lang="ts">
//@ts-nocheck
import { JsonFormsI18nState } from '@jsonforms/core';
import { JsonForms, JsonFormsChangeEvent } from '@jsonforms/vue2';
//import { useExportSchema } from '../../util';
import { extendedVuetifyRenderers } from '@jsonforms/vue2-vuetify';
import _ from 'lodash';
import store from '../../store';
import { sync } from 'vuex-pathify';
export default {
  name: 'template-preview',
  components: {
    JsonForms,
  },
  props: {
    theme: {
      type: Object,
    },
  },
  data() {
    return {
      key: 1,
      items: [
        { title: 'Mobile', icon: 'mdi-cellphone', component: 'device' },
        { title: 'Browser', icon: 'mdi-application-outline', component: 'div' },
      ],
      dialog: false,
      component: 'div',
      data: this.$store.get('preview/data'),
      locale: sync('preview/locale'),
      i18n: {
        locale: this.locale || 'en',
        translate: this.createTranslator(this.locale || 'en'),
      } as JsonFormsI18nState,
      renderers: extendedVuetifyRenderers,
    };
  },
  computed: {
    itemsMainPanel: sync('viewManager/mainPanel.items'),
    activeMainPanel: sync('viewManager/mainPanel.active'),
    mode() {
      return this.itemsMainPanel[this.activeMainPanel]['data']['mode'] ==
        'device'
        ? 'Device'
        : 'div';
    },
    useUiSchema: sync('preview/uiSchema'),
    useSchema: function () {
      return {};
      //return useExportSchema(this.$store.get('preview/schema'));
    },
    previewData: function () {
      return {};
      //return generateEmptyData(this.$store.get('preview@schema'), {});
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
          paddings.top / 2 +
          'px ' +
          paddings.right / 2 +
          'px ' +
          paddings.bottom / 2 +
          'px ' +
          paddings.left / 2 +
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
          margins.top / 2 +
          'px ' +
          margins.right / 2 +
          'px ' +
          margins.bottom / 2 +
          'px ' +
          margins.left / 2 +
          'px',
        'background-color': backgroundColor.color,
      };
    },
  },
  watch: {
    locale(nValue: string): void {
      this.i18n.locale = nValue;
      this.i18n.translate = this.createTranslator(nValue || 'en');
    },
  },
  mounted() {
    this.copySchemasFromEditorToPreview();
  },
  methods: {
    getFont(): string {
      return this.$store.getters['themes/getFontFamilyTheme'];
    },
    /**
     * Copy schemasfrom editor to preview
     */
    copySchemasFromEditorToPreview(): void {
      this.$store.dispatch(
        'preview/setSchema',
        this.$store.get('app/editor@schema')
      );
      this.$store.dispatch(
        'preview/setUiSchema',
        this.$store.get('app/editor@uiSchema')
      );
      this.$store.dispatch(
        'preview/setLocale',
        this.$store.get('app/jsonforms@locale')
      );
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
        let locale = store.get('preview/locale');
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
    /**
     * On click in icon preview
     * Load the schemas and refresh the view
     */
    onClickMenu(item): void {
      this.component = item.component ? item.component : 'div';
      this.copySchemasFromEditorToPreview();
      this.createTranslator(this.$store.get('app/jsonforms@locale'));
      this.dialog = !this.dialog;
      this.key++;
    },
  },
};
</script>
<style>
.vpm-device {
  position: initial !important;
}
.vpm-scale-preview {
  transform: scale(0.6);
}
</style>
