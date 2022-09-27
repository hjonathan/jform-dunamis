import { EditorUISchemaElement } from '../model/uischema';
import {
  createCategorization,
  createLabel,
  createLayout,
} from '../util/generators/uiSchema';
import { createControl } from '../util/generators/schema';
export interface PaletteService {
  getPaletteElements(): PaletteElement[];
}

export interface PaletteElement {
  type: string;
  label: string;
  icon: string;
  uiSchemaElementProvider: () => EditorUISchemaElement;
}

const paletteElements: PaletteElement[] = [
  {
    type: 'HorizontalLayout',
    label: 'Horizontal Layout',
    icon: 'mdi-arrow-left-right',
    uiSchemaElementProvider: () => createLayout('HorizontalLayout'),
  } as PaletteElement,
  {
    type: 'VerticalLayout',
    label: 'Vertical Layout',
    icon: 'mdi-arrow-up-down',
    uiSchemaElementProvider: () => createLayout('VerticalLayout'),
  },
  {
    type: 'Group',
    label: 'Group',
    icon: 'mdi-focus-field',
    uiSchemaElementProvider: () => createLayout('Group'),
  },
  {
    type: 'Label',
    label: 'Label',
    icon: 'mdi-format-text',
    uiSchemaElementProvider: () => createLabel(),
  },
  {
    type: 'Categorization',
    label: 'Categorization',
    icon: 'mdi-tab',
    uiSchemaElementProvider: () => createCategorization(),
  },
];
const controlElements = [
  {
    type: 'Checkbox',
    label: 'Checkbox',
    icon: 'mdi-checkbox-outline',
    uiSchemaElementProvider: () => {
      const control = createControl('boolean');
      return {
        control,
        variable: 'checkbox',
        uiOptions: {},
      };
    },
  },
  {
    type: 'DateTime',
    label: 'Date Time Picker',
    icon: 'mdi-calendar-clock-outline',
    uiSchemaElementProvider: () => {
      const control = {
        type: 'string',
        format: 'date-time',
      };
      return {
        control,
        variable: 'datetime',
        uiOptions: {},
      };
    },
  },
  {
    type: 'MultipleFile',
    label: 'Multiple File Upload',
    icon: 'mdi-cloud-upload-outline',
    uiSchemaElementProvider: () => {
      const control = createControl('array', {
        items: {
          name: {
            type: 'string',
          },
          size: {
            type: 'string',
          },
          mimetype: {
            type: 'string',
          },
        },
      });
      return {
        control,
        variable: 'multipleFile',
        uiOptions: {
          multipleFile: true,
          placeholder: 'Select your files',
          multiple: true,
          accept: '.png, .jpg',
          maxFileSize: 70000,
        },
      };
    },
  },
  {
    type: 'Text',
    label: 'Text',
    icon: 'mdi-crop-square',
    uiSchemaElementProvider: () => {
      const control = {
        type: 'string',
        description: '',
        i18n: 'textField',
      };
      return {
        control,
        variable: 'textField',
        uiOptions: {},
      };
    },
  },
  {
    type: 'TextArea',
    label: 'Text Area',
    icon: 'mdi-format-pilcrow',
    uiSchemaElementProvider: () => {
      const control = {
        type: 'string',
        description: '',
        i18n: 'textArea',
      };
      return {
        control,
        variable: 'textArea',
        uiOptions: { multi: true },
      };
    },
  },
  {
    type: 'RichText',
    label: 'Rich Text',
    icon: 'mdi-pencil-ruler',
    uiSchemaElementProvider: () => {
      const control = createControl('string');
      return {
        control,
        variable: 'richText',
        uiOptions: {
          isHtmlViewer: true,
          content: 'Rich Text',
        },
      };
    },
  },
  {
    type: 'Suggest',
    label: 'Suggest',
    icon: 'mdi-text-box-search-outline',
    uiSchemaElementProvider: () => {
      const control = {
        type: 'object',
        description: '',
        i18n: 'suggest',
      };
      return {
        control,
        variable: 'suggest',
        uiOptions: {
          events: {
            onChange: {
              arguments: 'JForm, nval, oval',
              body: '',
            },
          },
          source: null,
          items: null,
          request: null,
          dependencies: [],
        },
      };
    },
  },
  {
    type: 'RadioGroup',
    label: 'Radio Group',
    icon: 'mdi-radiobox-marked',
    uiSchemaElementProvider: () => {
      const control = {
        type: 'string',
        description: '',
        i18n: 'radiogroup',
      };
      return {
        control,
        variable: 'radiogroup',
        uiOptions: {
          events: {
            onChange: {
              arguments: 'JForm, nval, oval',
              body: '',
            },
          },
          items: null,
          request: null,
          source: null,
          dependencies: [],
        },
      };
    },
  },
  {
    type: 'Dropdown',
    label: 'Dropdown',
    icon: 'mdi-form-dropdown',
    uiSchemaElementProvider: () => {
      const control = {
        type: 'string',
        description: '',
        i18n: 'dropdown',
      };
      return {
        control,
        variable: 'dropdown',
        uiOptions: {
          events: {
            onChange: {
              arguments: 'JForm, nval, oval',
              body: '',
            },
          },
          items: null,
          request: null,
          source: null,
          dependencies: [],
        },
      };
    },
  },
  {
    type: 'CheckboxGroup',
    label: 'Checkbox Group',
    icon: 'mdi-checkbox-outline',
    uiSchemaElementProvider: () => {
      const control = {
        type: 'string',
        description: '',
        i18n: 'checkboxgroup',
      };
      return {
        control,
        variable: 'checkboxgroup',
        uiOptions: {
          events: {
            onChange: {
              arguments: 'JForm, nval, oval',
              body: '',
            },
          },
          items: null,
          request: null,
          source: null,
          dependencies: [],
        },
      };
    },
  },
  {
    type: 'Image',
    label: 'Image',
    icon: 'mdi-image-outline',
    uiSchemaElementProvider: () => {
      const control = {
        type: 'object',
      };
      return {
        control,
        variable: 'image',
        uiOptions: {
          image: 'https://picsum.photos/id/11/500/300',
          height: 600,
          width: 600,
        },
      };
    },
  },
  {
    type: 'Submit',
    label: 'Submit Button',
    icon: 'mdi-send-circle',
    uiSchemaElementProvider: () => {
      const control = {
        type: 'string',
        title: 'Submit Form',
        i18n: 'submit',
      };
      return {
        control,
        variable: 'submit',
        uiOptions: {},
      };
    },
  },
];
const complexElements = [
  {
    type: 'DataTableControl',
    label: 'Grid',
    icon: 'mdi-grid',
    uiSchemaElementProvider: () => {
      const control = {
        type: 'array',
        items: {
          type: 'object',
          properties: {},
        },
        minItems: 0,
        maxItems: 15,
      };

      return {
        control,
        variable: 'dataTable',
        uiOptions: {
          detail: {
            type: 'VerticalLayout',
            elements: [],
          },
        },
      };
    },
  },
];
const extendedElements = [
  {
    type: 'Rating',
    label: 'Rating',
    icon: 'mdi-star-outline',
    uiSchemaElementProvider: () => {
      const control = {
        type: 'integer',
        minimum: 0,
        maximum: 5,
      };
      return {
        control,
        variable: 'rating',
        uiOptions: {
          rating: true,
        },
      };
    },
  },
];
const mainPalette = {
  containers: {
    label: 'Layouts & Others',
    elements: paletteElements,
  },
  controls: {
    label: 'Controls',
    elements: controlElements,
  },
  complex: {
    label: 'Complex',
    elements: complexElements,
  },
  extended: {
    label: 'Extended',
    elements: extendedElements,
  },
};

export class DefaultPaletteService implements PaletteService {
  getPaletteElements = (): any => mainPalette;
}
