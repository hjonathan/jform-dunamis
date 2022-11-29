import Props from './Properties';

const FieldProperties: any = {
  get(id: string) {
    return this[id] ? this[id] : this['Text'];
  },
  Text: [
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
  TextArea: [
    Props.build('type'),
    Props.build('variable'),
    Props.build('label'),
    Props.build('placeholder'),
    Props.build('defaultValue'),
    Props.build('hint'),
    Props.build('rows'),
    Props.build('tabindex'),
    Props.build('ariaLabel'),
    Props.build('validation'),
    Props.build('textTransform'),
    Props.build('protectedValue'),
    Props.build('readOnly'),
  ],
  Checkbox: [
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
  DatePicker: [
    Props.build('type'),
    Props.build('variable'),
    Props.build('format'),
    Props.build('hint'),
    Props.build('label'),
    Props.build('placeholder'),
    Props.build('required'),
    Props.build('minDate'),
    Props.build('maxDate'),
  ],
  TimePicker: [
    Props.build('type'),
    Props.build('format'),
    Props.build('label'),
    Props.build('variable'),
    Props.build('placeholder'),
  ],
  DateTime: [
    Props.build('type'),
    Props.build('variable'),
    Props.build('format'),
    Props.build('hint'),
    Props.build('label'),
    Props.build('placeholder'),
    Props.build('required'),
    Props.build('minDate'),
    Props.build('maxDate'),
  ],
  Dropdown: [
    Props.build('type'),
    Props.build('variable'),
    Props.build('hint'),
    Props.build('label'),
    Props.build('items'),
    Props.build('placeholder'),
    Props.build('required'),
  ],

  CheckboxGroup: [
    Props.build('type'),
    Props.build('variable'),
    Props.build('hint'),
    Props.build('label'),
    Props.build('items'),
    Props.build('required'),
    Props.build('orientation'),
  ],
  Grid: [Props.build('type'), Props.build('variable')],
  Image: [
    Props.build('type'),
    Props.build('variable'),
    Props.build('hint'),
    Props.build('alt'),
  ],
  MultipleFile: [
    Props.build('type'),
    Props.build('variable'),
    Props.build('required'),
  ],
  RadioGroup: [
    Props.build('type'),
    Props.build('variable'),
    Props.build('hint'),
    Props.build('items'),
    Props.build('required'),
  ],
  Rating: [Props.build('type'), Props.build('variable')],
  RichText: [
    Props.build('type'),
    Props.build('variable'),
    Props.build('placeholder'),
  ],
  Submit: [Props.build('type'), Props.build('variable')],
  Suggest: [
    Props.build('type'),
    Props.build('variable'),
    Props.build('hint'),
    Props.build('label'),
    Props.build('items'),
    Props.build('placeholder'),
  ],
  Group: [Props.build('type'), Props.build('variable'), Props.build('label')],
  Label: [Props.build('type'), Props.build('variable'), Props.build('label')],
  HorizontalLayout: [Props.build('cols')],
};

export default FieldProperties;
