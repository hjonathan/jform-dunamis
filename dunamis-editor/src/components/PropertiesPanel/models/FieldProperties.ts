import Props from './Properties';

const FieldProperties: any = {
  get(id: string, parent: string) {
    if (parent && this[id] && this[id][parent]) {
      return this[id][parent];
    }
    return this[id] && this[id]['default']
      ? this[id]['default']
      : this['Text']['default'];
  },
  Text: {
    DataTableControl: [
      Props.build('type'),
      Props.build('variable'),
      Props.build('placeholder'),
      Props.build('defaultValue'),
      Props.build('hint'),
      Props.build('tabindex'),
      Props.build('ariaLabel'),
      Props.build('validation'),
      Props.build('textTransform'),
      Props.build('protectedValue'),
      Props.build('readonly'),
    ],
    default: [
      Props.build('type'),
      Props.build('variable'),
      Props.build('label'),
      Props.build('placeholder'),
      Props.build('defaultValue'),
      Props.build('hint'),
      Props.build('tabindex'),
      Props.build('ariaLabel'),
      Props.build('validation'),
      Props.build('textTransform'),
      Props.build('protectedValue'),
      Props.build('readonly'),
    ],
  },
  TextArea: {
    default: [
      Props.build('type'),
      Props.build('variable'),
      Props.build('label'),
      Props.build('placeholder'),
      Props.build('defaultValue'),
      Props.build('rows'),
      Props.build('hint'),
      Props.build('tabindex'),
      Props.build('ariaLabel'),
      Props.build('validation'),
      Props.build('textTransform'),
      Props.build('protectedValue'),
      Props.build('readonly'),
    ],
  },
  Checkbox: {
    default: [
      Props.build('type'),
      Props.build('variable'),
      Props.build('label'),
      Props.build('hint'),
      Props.build('tabindex'),
      Props.build('ariaLabel'),
      Props.build('validation'),
      Props.build('protectedValue'),
      Props.build('checkedDefault'),
      Props.build('readonly'),
    ],
  },
  Datetime: {
    default: [
      Props.build('type'),
      Props.build('variable'),
      Props.build('dataType'),
      Props.build('defaultDate'),
      Props.build('label'),
      Props.build('hint'),

      Props.build('placeholder'),
      Props.build('ariaLabel'),
      Props.build('validation'),

      Props.build('readonly'),
      Props.build('minDate'),
      Props.build('maxDate'),
    ],
  },
  Dropdown: {
    default: [
      Props.build('type'),
      Props.build('variable'),
      Props.build('label'),
      Props.build('tabindex'),
      Props.build('placeholder'),
      Props.build('hint'),
      Props.build('ariaLabel'),
      Props.build('options'),
      Props.build('validation'),
      Props.build('protectedValue'),
      Props.build('readonly'),
    ],
  },
  CheckboxGroup: {
    default: [
      Props.build('type'),
      Props.build('variable'),
      Props.build('label'),
      Props.build('tabindex'),
      Props.build('hint'),
      Props.build('ariaLabel'),
      Props.build('options'),
      Props.build('validation'),
      Props.build('protectedValue'),
      Props.build('readonly'),
    ],
  },
  RadioGroup: {
    default: [
      Props.build('type'),
      Props.build('variable'),
      Props.build('label'),
      Props.build('tabindex'),
      Props.build('hint'),
      Props.build('ariaLabel'),
      Props.build('options'),
      Props.build('validation'),
      Props.build('protectedValue'),
      Props.build('readonly'),
    ],
  },
  Grid: { default: [Props.build('type'), Props.build('variable')] },
  Image: {
    default: [
      Props.build('type'),
      Props.build('variable'),
      Props.build('hint'),
      Props.build('alt'),
    ],
  },
  MultipleFile: {
    default: [
      Props.build('type'),
      Props.build('variable'),
      Props.build('required'),
    ],
  },
  Rating: { default: [Props.build('type'), Props.build('variable')] },
  RichText: {
    default: [
      Props.build('type'),
      Props.build('variable'),
      Props.build('placeholder'),
    ],
  },
  Submit: {
    default: [
      Props.build('type'),
      Props.build('variable'),
      Props.build('label'),
      Props.build('tabindex'),
    ],
  },
  Button: {
    default: [
      Props.build('type'),
      Props.build('variable'),
      Props.build('label'),
      Props.build('tabindex'),
    ],
  },
  Suggest: {
    default: [
      Props.build('type'),
      Props.build('variable'),
      Props.build('label'),
      Props.build('tabindex'),
      Props.build('placeholder'),
      Props.build('hint'),
      Props.build('ariaLabel'),
      Props.build('options'),
      Props.build('validation'),
      Props.build('protectedValue'),
      Props.build('readonly'),
    ],
  },
  Group: {
    default: [
      Props.build('type'),
      Props.build('variable'),
      Props.build('label'),
    ],
  },
  Label: {
    default: [
      Props.build('type'),
      Props.build('content'),
      Props.build('ariaLabel'),
      Props.build('hint'),
    ],
  },
  Title: {
    default: [
      Props.build('type'),
      Props.build('content'),
      Props.build('ariaLabel'),
      Props.build('hint'),
    ],
  },
  Subtitle: {
    default: [
      Props.build('type'),
      Props.build('content'),
      Props.build('ariaLabel'),
      Props.build('hint'),
    ],
  },
  Link: {
    default: [
      Props.build('type'),
      Props.build('variable'),
      Props.build('label'),
      Props.build('hint'),
      Props.build('tabindex'),
      Props.build('ariaLabel'),
      Props.build('content'),
      Props.build('href'),
    ],
  },
  HorizontalLayout: { default: [Props.build('cols')] },
};

export default FieldProperties;
