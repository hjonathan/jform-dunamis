<template>
  <control-wrapper
    v-bind="controlWrapper"
    :styles="styles"
    :isFocused="isFocused"
    :appliedOptions="appliedOptions"
  >
    <v-card elevation="2" outlined>
      <v-file-input
        v-model="files"
        :label="computedLabel"
        multiple
        :placeholder="appliedOptions.placeholder"
        prepend-icon="mdi-paperclip"
        :clearable="false"
        :show-size="1000"
        :accept="appliedOptions.accept"
        :required="control.required"
        :error-messages="control.errors"
      >
      </v-file-input>

      <v-list-item v-for="(item, i) in control.data" :key="i">
        <v-list-item-avatar>
          <v-icon large> mdi-file-jpg-box </v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>

          <v-list-item-subtitle>
            <v-progress-linear
              color="light-green darken-4"
              height="10"
              value="70"
              striped
            ></v-progress-linear>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon @click="downloadFile($event, i)" align="left">
            <v-icon color="grey lighten-1">mdi-file-download</v-icon>
          </v-btn>
        </v-list-item-action>
        <v-list-item-action>
          <v-btn icon @click="deleteFile($event, i)" align="right">
            <v-icon color="grey lighten-1">mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-card>
  </control-wrapper>
</template>

<script lang="ts">
//@ts-nocheck
import {
  ControlElement,
  rankWith,
  JsonFormsRendererRegistryEntry,
  and,
  isObjectArrayWithNesting,
  uiTypeIs,
} from '@jsonforms/core';
import { defineComponent } from 'vue';
import {
  rendererProps,
  useJsonFormsControl,
  RendererProps,
} from '@jsonforms/vue2';
import { useVuetifyControl } from '../util';
import { ControlWrapper } from '../ControlWrapper.vue';
import {
  VCard,
  VFileInput,
  VListItem,
  VListItemAvatar,
  VIcon,
  VListItemContent,
  VListItemTitle,
  VListItemSubtitle,
  VProgressLinear,
  VListItemAction,
  VBtn,
} from 'vuetify/lib';
const controlRenderer = defineComponent({
  name: 'multiple-file-control-renderer',
  components: {
    ControlWrapper,
    VCard,
    VFileInput,
    VListItem,
    VListItemAvatar,
    VIcon,
    VListItemContent,
    VListItemTitle,
    VListItemSubtitle,
    VProgressLinear,
    VListItemAction,
    VBtn,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    return useVuetifyControl(
      useJsonFormsControl(props),
      (value) => value || undefined
    );
  },
  computed: {
    files: {
      get() {
        return [];
      },
      set(files: Array<any>) {
        const newFiles: Array<any> = files.map((file: any) => {
          //TODO upload the file service
          return {
            name: file.name,
            size: file.size,
            mimetype: file.type,
          };
        });
        this.onChange([
          ...newFiles,
          ...(this.control.data ? this.control.data : []),
        ]);
      },
    },
  },
  methods: {
    deleteFile(event: any, index: number) {
      event.stopPropagation();
      event.preventDefault();
      this.control.data.splice(index, 1);
      this.onChange(this.control.data);
    },
    downloadFile(event: any) {
      event.stopPropagation();
      event.preventDefault();
    },
  },
});
export default controlRenderer;
export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(6, and(isObjectArrayWithNesting, uiTypeIs('multipleFile'))),
};
</script>
