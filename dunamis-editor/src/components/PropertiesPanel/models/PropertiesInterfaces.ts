export interface PropertyPanel {
  id: string;
  name: string;
  type: string;
  options: any;
  items: Array<any>;
}

const PropertiesPanel = [
  {
    id: 'type',
    type: 'text',
    name: 'Type',
    options: {
      readOnly: true,
    },
    items: [],
  } as PropertyPanel,
  {
    id: 'variable',
    type: 'text',
    name: 'Variable',
    options: {},
    items: [],
  } as PropertyPanel,
  {
    id: 'placeholder',
    type: 'text',
    name: 'Placeholder',
    options: {},
    items: [],
  } as PropertyPanel,
  {
    id: 'defaultValue',
    type: 'text',
    name: 'Default Value',
    options: {},
    items: [],
  } as PropertyPanel,
  {
    id: 'checkedDefault',
    type: 'checkbox',
    name: 'Checked by Default',
    options: {},
    items: [],
  } as PropertyPanel,
  {
    id: 'hint',
    type: 'text',
    name: 'Hint',
    options: {},
    items: [],
  } as PropertyPanel,
  {
    id: 'rows',
    type: 'text',
    name: 'Rows',
    options: {
      inputType: 'number',
      min: 2,
    },
    items: [],
  } as PropertyPanel,
  {
    id: 'label',
    type: 'label',
    name: 'Label',
    options: {},
    items: [],
    icons: [],
  } as PropertyPanel,
  {
    id: 'alt',
    type: 'text',
    name: 'Alt. Text',
    options: {},
    items: [],
  } as PropertyPanel,
  {
    id: 'description',
    type: 'textarea',
    name: 'Description',
    options: {},
    items: [],
  } as PropertyPanel,
  {
    id: 'format',
    type: 'dropdown',
    name: 'Format',
    options: {},
    items: [
      {
        text: 'Date',
        id: 'date',
      },
      {
        text: 'Time',
        id: 'time',
      },
      {
        text: 'Date + Time',
        id: 'date-time',
      },
    ],
  } as PropertyPanel,
  {
    id: 'maxDate',
    type: 'date',
    name: 'Max Date',
    options: {},
    items: [],
  } as PropertyPanel,
  {
    id: 'minDate',
    type: 'date',
    name: 'Min Date',
    options: {},
    items: [],
  } as PropertyPanel,
  {
    id: 'validation2',
    type: 'text',
    name: 'Validation',
    options: {},
    items: [],
  } as PropertyPanel,
  {
    id: 'validationMessage',
    type: 'text',
    name: 'Validation message',
    options: {},
    items: [],
  } as PropertyPanel,
  {
    id: 'mask',
    type: 'text',
    name: 'Mask',
    options: {},
    items: [],
  } as PropertyPanel,
  {
    id: 'maxLength',
    type: 'text',
    name: 'Max length',
    options: {},
    items: [],
  } as PropertyPanel,
  {
    id: 'textTransform',
    type: 'dropdown',
    name: 'Text Transform',
    options: {},
    items: [
      {
        text: 'None',
        id: 'none',
      },
      {
        text: 'Lowercase',
        id: 'lowercase',
      },
      {
        text: 'Uppercase',
        id: 'uppercase',
      },
      {
        text: 'Capital Phrase',
        id: 'capital',
      },
      {
        text: 'Title case',
        id: 'title',
      },
    ],
  } as PropertyPanel,
  {
    id: 'required',
    type: 'checkbox',
    name: 'Required',
    options: {},
    items: [],
  } as PropertyPanel,
  {
    id: 'readOnly',
    type: 'checkbox',
    name: 'Read Only',
    options: {},
    items: [],
  } as PropertyPanel,
  {
    id: 'multi',
    type: 'checkbox',
    name: 'Multi',
    options: {},
    items: [],
  } as PropertyPanel,
  {
    id: 'trim',
    type: 'checkbox',
    name: 'Trim',
    options: {},
    items: [],
  } as PropertyPanel,
  {
    id: 'restrictMaxLength',
    type: 'checkbox',
    name: 'Restrict Max Length',
    options: {},
    items: [],
  } as PropertyPanel,
  {
    id: 'items',
    type: 'items',
    name: 'Items',
    options: {},
    items: [],
  } as PropertyPanel,
  {
    id: 'orientation',
    type: 'dropdown',
    name: 'Orientation',
    options: {},
    items: [
      {
        text: 'Horizontal',
        id: 'horizontal',
      },
      {
        text: 'Vertical',
        id: 'vertical',
      },
    ],
  } as PropertyPanel,
  {
    id: 'cols',
    type: 'text',
    name: 'Cols',
    options: {},
    items: [],
    rules: [
      (val: string) => {
        const pattern = /^([0-9]{1,2}[\s]{1})*([0-9]{1,2})$/;
        return pattern.test(val) || 'Invalid cols format';
      },
    ],
  } as PropertyPanel,
  {
    id: 'tabindex',
    type: 'text',
    name: 'Tab index',
    options: {
      inputType: 'number',
      min: 1,
    },
    items: [],
  } as PropertyPanel,
  {
    id: 'ariaLabel',
    type: 'text',
    name: 'Aria label',
    options: {},
    items: [],
  } as PropertyPanel,
  {
    id: 'validation',
    type: 'validation',
    name: 'Validation',
    options: {},
    items: [],
    icons: [],
  } as PropertyPanel,
  {
    id: 'protectedValue',
    type: 'checkbox',
    name: 'Protected value',
    options: {},
    items: [],
  } as PropertyPanel,
];
export default PropertiesPanel;
