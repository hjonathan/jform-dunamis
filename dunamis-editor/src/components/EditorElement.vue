<template>
  <v-card outlined :class="selectedStyle">
    <div @click="click">
      <v-row>
        <v-col>
          <div
            class="d-block"
            @mouseover.stop.prevent.self="hover = true"
            @mouseleave.self="hover = false"
          >
            <v-icon small>{{ computedIcon }}</v-icon>
            <span class="d-inline caption" v-if="ruleEffect">
              <span class="font-weight-bold">R</span>
              <span class="font-italic"> ({{ ruleEffect }})</span>
            </span>
            <div class="d-inline caption font-weight-bold v-opacity">
              {{
                wrappedElement.scope
                  ? wrappedElement.scope.split('/').pop()
                  : ''
              }}
            </div>
            <div class="d-inline float-right">
              <v-tooltip top v-if="hover" :color="moveColor">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    plain
                    x-small
                    class="drag-icon"
                    :color="moveColor"
                    @mouseover="moveColor = 'teal lighten-2'"
                    @mouseleave="moveColor = undefined"
                  >
                    <v-icon small> mdi-arrow-all </v-icon>
                  </v-btn>
                </template>
                <span>Move</span>
              </v-tooltip>
              <v-tooltip top v-if="hover" :color="removeColor">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    plain
                    x-small
                    v-if="hover"
                    @click="onRemove"
                    :color="removeColor"
                    @mouseover="removeColor = 'red lighten-2'"
                    @mouseleave="removeColor = undefined"
                  >
                    <v-icon small> mdi-delete </v-icon>
                  </v-btn>
                </template>
                <span>Delete</span>
              </v-tooltip>

              <v-tooltip top v-if="hover" :color="editColor">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    plain
                    x-small
                    @click="onEdit"
                    :color="editColor"
                    @mouseover="editColor = 'green lighten-2'"
                    @mouseleave="editColor = undefined"
                  >
                    <v-icon small> mdi-pencil-outline </v-icon>
                  </v-btn>
                </template>
                <span>Edit</span>
              </v-tooltip>
              <v-tooltip top v-if="hover" :color="duplicateColor">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    plain
                    x-small
                    @click="onDuplicate"
                    :color="duplicateColor"
                    @mouseover="duplicateColor = 'brown lighten-2'"
                    @mouseleave="duplicateColor = undefined"
                  >
                    <v-icon small> mdi-content-copy </v-icon>
                  </v-btn>
                </template>
                <span>Duplicate</span>
              </v-tooltip>
            </div>
          </div>

          <div class="editor-element">
            <slot></slot>
          </div>
        </v-col>

        <!-- <ResizableCols
          v-model="wrappedElement"
          v-if="
            wrappedElement.scope &&
            wrappedElement.parent.type == 'HorizontalLayout'
          "
        /> -->
      </v-row>
    </div>
  </v-card>
</template>

<script lang="ts">
//@ts-nocheck
import { PropType } from 'vue';
//import ResizableCols from './Generic/ResizableCols.vue';
import _ from 'lodash';
import { EditorUISchemaElement, hasChildren } from '../model/uischema';
import { tryFindByUUID } from '../util';
import store from '../store';

export default {
  name: 'EditorElement',
  components: {
    // ResizableCols
  },
  props: {
    wrappedElement: {
      required: false,
      type: Object as PropType<EditorUISchemaElement>,
    },
  },
  data() {
    return {
      hover: true,
      editColor: undefined,
      removeColor: undefined,
      moveColor: undefined,
      duplicateColor: undefined,
    };
  },
  computed: {
    ruleEffect() {
      return this.wrappedElement.rule?.effect.toLocaleUpperCase();
    },
    activeElement: {
      get() {
        return store.getters['app/activeElement'];
      },
      set(val: any) {
        store.commit('app/SET_ACTIVE_ELEMENT', val);
      },
    },
    editorSchema: {
      get() {
        return store.getters['app/schema'];
      },
      set(val: any) {
        store.commit('app/SET_SCHEMA', val);
      },
    },
    editoruiSchema: {
      get() {
        return store.getters['app/uiSchema'];
      },
      set(val: any) {
        store.commit('app/SET_UI_SCHEMA', val);
      },
    },
    computedIcon() {
      const schemaElement = tryFindByUUID(
        this.editorSchema,
        this.wrappedElement.linkedSchemaElement
      );
      switch (this.wrappedElement.type) {
        case 'HorizontalLayout':
          return 'mdi-arrow-left-right';
        case 'VerticalLayout':
          return 'mdi-arrow-up-down';
        case 'Group':
          return 'mdi-focus-field';
        case 'Categorization':
          return 'mdi-tab';
        case 'Label':
          return 'mdi-format-text';
        case 'Checkbox':
          return 'mdi-checkbox-outline';
        case 'DatePicker':
          return 'mdi-calendar-month';
        case 'Datetime':
          return 'mdi-calendar-clock-outline';
        case 'TimePicker':
          return 'mdi-clock-outline';
        case 'MultipleFile':
          return 'mdi-cloud-upload-outline';
        case 'Text':
          return 'mdi-crop-square';
        case 'TextArea':
          return 'mdi-format-pilcrow';
        case 'RichText':
          return 'mdi-pencil-ruler';
        case 'Suggest':
          return 'mdi-text-box-search-outline';
        case 'RadioGroup':
          return 'mdi-radiobox-marked';
        case 'Dropdown':
          return 'mdi-form-dropdown';
        case 'CheckboxGroup':
          return 'mdi-checkbox-outline';
        case 'Image':
          return 'mdi-image-outline';
        case 'DataTableControl':
          return 'mdi-grid';
        case 'Rating':
          return 'mdi-star-outline';

        default:
          return 'mdi-checkbox-blank-badge-outline';
      }
    },
    selectedStyle() {
      return this.activeElement.selected === this.wrappedElement.uuid
        ? 'selected pa-2'
        : 'pa-2 vpm-editor-element';
    },
  },
  watch: {
    activeElement() {
      if (this.activeElement.selected === this.wrappedElement.uuid) {
        this.hover = true;
      } else {
        this.hover = false;
      }
    },
  },
  mounted() {
    console.log('MOUNTEDDD'), this.wrappedElement;
  },
  methods: {
    onDuplicate: function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (
        !hasChildren(this.wrappedElement) &&
        this.wrappedElement.linkedSchemaElement
      ) {
        store.dispatch('app/duplicateElement', this.wrappedElement);
      } //TODO Duplicated unescoped
    },
    onRemove: function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (hasChildren(this.wrappedElement)) {
        this.removeChildren(this.wrappedElement.elements);
      }
      store.dispatch('app/removeUiSchemaElement', this.wrappedElement.uuid);
    },
    removeChildren: function (elements: any): void {
      let element;
      for (element of elements) {
        if (!hasChildren(element)) {
          store.dispatch('app/removeUiSchemaElement', element.uuid);
        } else {
          this.removeChildren(element.elements);
        }
      }
    },
    onEdit: function (e) {
      if (!hasChildren(this.wrappedElement)) {
        store.commit('app/SET_ACTIVE_ELEMENT', {
          selected: this.wrappedElement.uuid,
          edit: _.random(0, 100000),
        });
        this.hover = true;
      }
    },
    click: function (ev) {
      ev.preventDefault();
      ev.stopPropagation();
      let sideBar = { id: 'side-bar-properties' },
        mainPanel: { id: 'main-editor' };
      store.commit('app/SET_ACTIVE_ELEMENT', {
        selected: this.wrappedElement.uuid,
      });
      this.hover = true;
      store.dispatch('viewManager/setAllViews', {
        sideBar,
        mainPanel,
      });
    },
  },
};
</script>
<style scoped>
.selected {
  border: 2px solid rgb(48 201 173 / 98%);
}
</style>
