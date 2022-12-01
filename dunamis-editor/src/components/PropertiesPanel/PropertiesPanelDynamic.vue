<template>
  <v-window v-model="step">
    <v-window-item :value="1">
      <v-expansion-panels
        v-model="panel"
        multiple
        no-gutters
        dense
        class="caption"
      >
        <v-expansion-panel>
          <v-expansion-panel-header>
            <div>
              <span class="caption font-weight-bold"> General</span>
              <v-icon small class="px-2">mdi-card</v-icon>
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <PropertiesPanelDynamic
              :key="key"
              v-if="generalData"
              :config="generalData"
              @updateData="updateData"
              @extendPanel="extendPanel"
              @backPanel="backPanel"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-window-item>

    <v-window-item :value="2">
      <component
        :is="panelExtended"
        @backPanel="backPanel"
        :config="extendedConfig"
      />
    </v-window-item>
  </v-window>
</template>

<script lang="ts">
//@ts-nocheck
import PropertiesPanelDynamic from './PanelDynamic/PanelDynamic.vue';
import { omit } from 'lodash';
import store from '../../store';
import { defineComponent } from 'vue';
import { getVariableName } from '../../model/uischema';
import { tryFindByUUID } from '../../util/schemasUtil';
import PanelExtended from './PanelDynamicExtended/index';
import _ from 'lodash';
const PropertiesPanel = defineComponent({
  name: 'PropertiesPanel',
  props: {},
  components: {
    PropertiesPanelDynamic,
    ...PanelExtended,
  },
  data() {
    return {
      key: 1,
      step: 1,
      panel: [0, 1, 2, 3, 4],
      generalData: null as any,
      type: null,
      uiElement: null as any,
      panelHistory: [] as any,
      extendedConfig: {},
    };
  },
  computed: {
    schema: {
      get() {
        return store.getters['app/schema'];
      },
      set(val: any) {
        store.commit('app/SET_SCHEMA', val);
      },
    },
    uischema: {
      get() {
        return store.getters['app/uiSchema'];
      },
      set(val: any) {
        store.commit('app/SET_UI_SCHEMA', val);
      },
    },
    selectedElement: {
      get() {
        return store.getters['app/activeElement'];
      },
      set(val: any) {
        store.commit('app/SET_ACTIVE_ELEMENT', val);
      },
    },
    panelExtended(): any {
      if (this.panelHistory.length == 0) {
        return 'div';
      }
      const history = this.panelHistory[this.panelHistory.length - 1]['id'];
      if (this.generalData?.data[history]) {
        this.extendedConfig = this.generalData.data[history];
      }

      return this.panelHistory[this.panelHistory.length - 1].component;
    },
  },
  mounted() {
    this.setSelection(this.selectedElement.selected);
  },
  watch: {
    selectedElement(newSelection, oldSelection) {
      this.setSelection(newSelection.selected);
      this.key++;
    },
  },
  methods: {
    setSelection: function (newSelection: any) {
      let fieldData: any = {};
      let linkedSchemaUUID, elementSchema;
      // UIELEMENT is the ui schema for specific scope
      this.uiElement = tryFindByUUID(this.uischema, newSelection);

      if (this.uiElement) {
        linkedSchemaUUID = this.uiElement?.linkedSchemaElement;
        // ELEMENTSCHEMA is the schema for specific scope
        elementSchema =
          linkedSchemaUUID && this.schema
            ? tryFindByUUID(this.schema, linkedSchemaUUID)
            : undefined;
      }

      fieldData = omit(this.uiElement, [
        'uuid',
        'parent',
        'elements',
        'linkedSchemaElement',
        'options.detail',
        'scope',
        'type',
      ]);
      fieldData['variable'] = getVariableName(this.uiElement);
      if (elementSchema && elementSchema.schema) {
        // Get the Type property
        fieldData['type'] = this.uiElement.type ? this.uiElement.type : '';
        // Get the placeholder property
        fieldData['placeholder'] = this.uiElement.options
          ? this.uiElement.options.placeholder
          : null;
        // Get the hint property
        fieldData['hint'] = this.uiElement.options
          ? this.uiElement.options.hint
          : null;
        // Get the label property
        fieldData['label'] = this.uiElement.options
          ? this.uiElement.label
          : null;
        // Get the label config property
        fieldData['labelConfig'] = this.uiElement.options
          ? this.uiElement.options.labelConfig
          : null;
        // Get the validation
        fieldData['validation'] = this.uiElement.options
          ? this.uiElement.options.validation
          : null;
        // Get the protectedValue
        fieldData['protectedValue'] = this.uiElement.options
          ? this.uiElement.options.protectedValue
          : null;

        // Get the rows property
        fieldData['rows'] = this.uiElement.options
          ? this.uiElement.options.rows
          : null;
        // Get the rows property
        fieldData['tabindex'] = this.uiElement.options
          ? this.uiElement.options.tabindex
          : null;
        // Get the arialabel
        fieldData['ariaLabel'] = this.uiElement.options
          ? this.uiElement.options.ariaLabel
          : null;
        // Get the alt text property
        fieldData['alt'] = this.uiElement.options
          ? this.uiElement.options.alt
          : null;
        // Get the description property
        fieldData['description'] = elementSchema.schema.description
          ? elementSchema.schema.description
          : '';
        // Get the required property
        fieldData['required'] =
          (this.schema.schema.required &&
            this.schema.schema.required.includes(
              getVariableName(this.uiElement)
            )) ??
          false;
        // Get the maxLength property
        fieldData['maxLength'] = elementSchema.schema.maxLength
          ? elementSchema.schema.maxLength
          : '';
        // Get the readOnly property
        fieldData['readonly'] = this.uiElement.options
          ? this.uiElement.options.readonly
          : null;
        // Get the defaultValue property
        fieldData['defaultValue'] = this.uiElement.options
          ? this.uiElement.options.defaultValue
          : '';
        // Get the Text Transform property
        fieldData['textTransform'] = this.uiElement.options
          ? this.uiElement.options.textTransform
          : '';
        // Get the items property
        fieldData['items'] = this.uiElement.options
          ? this.uiElement.options.items
          : null;
        // Get the orientation property
        fieldData['orientation'] = this.uiElement.options
          ? this.uiElement.options.orientation
          : 'horizontal';
        // Get the hint property
        fieldData['hint'] = this.uiElement.options
          ? this.uiElement.options.hint
          : null;
        fieldData['defaultDate'] = this.uiElement.options
          ? this.uiElement.options.defaultDate
          : null;
        // Get the maxDate property
        fieldData['maxDate'] = this.uiElement.options
          ? this.uiElement.options.maxDate
          : '';
        // Get the minDate property
        fieldData['minDate'] = this.uiElement.options
          ? this.uiElement.options.minDate
          : '';
        // Get the format property for DateTime
        fieldData['dataType'] = elementSchema.schema
          ? elementSchema.schema.format
          : 'date-time';
        // Get the checkedDefault property
        fieldData['checkedDefault'] = this.uiElement.options
          ? this.uiElement.options.checkedDefault
          : false;
      } else {
        // Get horizontal layout cols
        fieldData['cols'] = this.uiElement.options
          ? this.uiElement.options.cols
          : '';
      }
      this.generalData = {
        type: this.uiElement.type,
        data: fieldData,
      };
    },
    updateData(data: any) {
      const elementSchema = this.findElementSchema();
      // type
      if (data.type) {
        store.dispatch('app/updateUISchemaElement', {
          elementUUID: this.uiElement.uuid,
          changedProperties: { type: data.type },
        });
      }
      // variable
      if (data.variable && this.generalData.data['variable'] != data.variable) {
        store.dispatch('app/updateSchemaVariable', {
          elementUUID: this.uiElement.uuid,
          newVariable: data.variable,
        });
        store.dispatch('locales/updateProperty', {
          oldProperty: elementSchema ? elementSchema.key : '',
          newProperty: data.variable,
        });
      }
      // required
      if (typeof data.required !== 'undefined') {
        store.dispatch('app/updateSchemaRequired', {
          elementUUID: this.uiElement.uuid,
          required: data.required ?? false,
        });
      }
      // readOnly
      if (typeof data.readonly !== 'undefined') {
        store.dispatch('app/updateUISchemaElementOption', {
          elementUUID: this.uiElement.uuid,
          changedProperties: { readonly: data.readonly },
        });
      }
      // arialabel
      if (data.ariaLabel) {
        store.dispatch('app/updateUISchemaElementOption', {
          elementUUID: this.uiElement.uuid,
          changedProperties: { ariaLabel: data.ariaLabel },
        });
      }
      // protectedValue
      if (data.protectedValue) {
        store.dispatch('app/updateUISchemaElementOption', {
          elementUUID: this.uiElement.uuid,
          changedProperties: { protectedValue: data.protectedValue },
        });
      }
      if (data.defaultDate) {
        store.dispatch('app/updateUISchemaElementOption', {
          elementUUID: this.uiElement.uuid,
          changedProperties: { defaultDate: data.defaultDate },
        });
      }
      //mask -> to options
      if (data.mask) {
        store.dispatch('app/updateUISchemaElementOption', {
          elementUUID: this.uiElement.uuid,
          changedProperties: { label: data.label },
        });
      }
      // label
      if (data.label) {
        store.dispatch('app/updateUISchemaElement', {
          elementUUID: this.uiElement.uuid,
          changedProperties: { label: data.label },
        });
      }
      // description
      if (data.description) {
        store.dispatch('app/updateSchemaElement', {
          elementUUID: this.uiElement.uuid,
          changedProperties: {
            description: data.description,
          },
        });
      }
      // items
      if (data.items) {
        store.dispatch('app/updateUISchemaElementOption', {
          elementUUID: this.uiElement.uuid,
          changedProperties: {
            items: data.items,
          },
        });
      }
      // label
      if (data.labelConfig) {
        store.dispatch('app/updateUISchemaElementOption', {
          elementUUID: this.uiElement.uuid,
          changedProperties: { labelConfig: data.labelConfig },
        });
      }
      // Validations
      if (data.validation) {
        store.dispatch('app/updateUISchemaElementOption', {
          elementUUID: this.uiElement.uuid,
          changedProperties: { validation: data.validation },
        });
      }
      // Text Transform -> to options
      if (data.textTransform) {
        store.dispatch('app/updateUISchemaElementOption', {
          elementUUID: this.uiElement.uuid,
          changedProperties: {
            textTransform: data.textTransform ?? '',
          },
        });
      }
      // orientation -> to options
      if (data.orientation) {
        store.dispatch('app/updateUISchemaElementOption', {
          elementUUID: this.uiElement.uuid,
          changedProperties: {
            orientation: data.orientation ?? 'horizontal',
          },
        });
      }
      // maxLength
      if (data.maxLength) {
        store.dispatch('app/updateSchemaElement', {
          elementUUID: this.uiElement.uuid,
          changedProperties: { maxLength: data.maxLength },
        });
      }
      // hint -> to options
      if (data.hint || data.hint === '') {
        store.dispatch('app/updateUISchemaElementOption', {
          elementUUID: this.uiElement.uuid,
          changedProperties: { hint: data.hint },
        });
      }
      // tabindex -> to options
      if (data.tabindex) {
        store.dispatch('app/updateUISchemaElementOption', {
          elementUUID: this.uiElement.uuid,
          changedProperties: { tabindex: data.tabindex },
        });
      }
      // rows for TextArea -> to options
      if (data.rows) {
        store.dispatch('app/updateUISchemaElementOption', {
          elementUUID: this.uiElement.uuid,
          changedProperties: { rows: data.rows },
        });
      }
      // alt text for Image -> to options
      if (data.alt || data.alt == '') {
        store.dispatch('app/updateUISchemaElementOption', {
          elementUUID: this.uiElement.uuid,
          changedProperties: { alt: data.alt },
        });
      }
      // placeholder -> to options
      if (data.placeholder || data.placeholder === '') {
        store.dispatch('app/updateUISchemaElementOption', {
          elementUUID: this.uiElement.uuid,
          changedProperties: { placeholder: data.placeholder },
        });
      }
      // format for DateTime
      if (data.dataType) {
        store.dispatch('app/updateSchemaElement', {
          elementUUID: this.uiElement.uuid,
          changedProperties: { format: data.dataType },
        });
      }
      // maxDate -> to options
      if (data.maxDate || data.maxDate === '') {
        store.dispatch('app/updateUISchemaElementOption', {
          elementUUID: this.uiElement.uuid,
          changedProperties: { maxDate: data.maxDate },
        });
      }
      // minDate -> to options
      if (data.minDate || data.minDate === '') {
        store.dispatch('app/updateUISchemaElementOption', {
          elementUUID: this.uiElement.uuid,
          changedProperties: { minDate: data.minDate },
        });
      }
      // default value -> to options
      if (data.defaultValue || data.defaultValue === '') {
        store.dispatch('app/updateUISchemaElementOption', {
          elementUUID: this.uiElement.uuid,
          changedProperties: { defaultValue: data.defaultValue },
        });
      }
      // checkedDefault -> to options
      if (typeof data.checkedDefault !== 'undefined') {
        store.dispatch('app/updateUISchemaElementOption', {
          elementUUID: this.uiElement.uuid,
          changedProperties: { checkedDefault: data.checkedDefault },
        });
      }
      // Horizontal Layout cols
      if (data.cols || data.cols === '') {
        store.dispatch('app/updateUISchemaElementOption', {
          elementUUID: this.uiElement.uuid,
          changedProperties: { cols: data.cols },
        });
      }
      this.generalData['data'] = data;
    },
    findElementSchema() {
      const linkedSchemaUUID = this.uiElement.linkedSchemaElement;
      const elementSchema =
        linkedSchemaUUID && this.schema
          ? tryFindByUUID(this.schema, linkedSchemaUUID)
          : undefined;
      let ele;
      for (const [key, value] of this.schema.properties) {
        if (_.isEqual(value, elementSchema)) {
          ele = {
            key: key,
            value: value,
          };
        }
      }
      return ele;
    },
    extendPanel(dt: any) {
      this.panelHistory.push(dt);
      this.step = this.step + 1;
    },
    backPanel(dt: any) {
      this.step = this.step - 1;
      this.panelHistory.pop();
      this.updateData(Object.assign({}, this.generalData['data'], dt));
    },
  },
});
export default PropertiesPanel;
</script>
