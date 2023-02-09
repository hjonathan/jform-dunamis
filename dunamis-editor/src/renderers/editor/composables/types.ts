import { CoreActions, Dispatch } from '@jsonforms/core';

export interface ProviderControl {
  dispatch?: Dispatch<CoreActions>;
  store: any;
  bus: any;
  serviceProvider: any;
}

export interface ParamsAlphaTeorem {
  provider: ProviderControl;
  dataCore: any;
  dataUpdater(data: any): void;
}

export interface DefaultEffects {
  show: boolean;
  disabled: boolean;
}
export interface Control {
  id: string;
  label: string;
  labelOrientation: string;
  labelCols: number;
  tabindex: number;
  ariaLabel: string;
  hint: string;
  placeholder?: string;
  disabled?: boolean;
}
export interface TextControl extends Control {
  validation: Array<any>;
  data: string;
  readonly: boolean;
  show: boolean;
}
export interface TextAreaControl extends Control {
  validation: Array<any>;
  data: string;
  show: boolean;
  rows: string;
}
export interface SuggestControl extends Control {
  validation: Array<any>;
  data: string;
  show: boolean;
  readonly: boolean;
  options: Array<any>;
  errors: string;
}
export interface DropdownControl extends Control {
  validation: Array<any>;
  data: string;
  show: boolean;
  readonly: boolean;
  options: Array<any>;
  errors: string;
}
export interface RadioControl extends Control {
  validation: Array<any>;
  data: string;
  readonly: boolean;
  show: boolean;
  options: Array<any>;
  errors: string;
  multipleSelection: boolean;
}
export interface DatetimeControl extends Control {
  validation: Array<any>;
  data: string;
  readonly: boolean;
  show: boolean;
  dataType: string;
  visible: true;
  minDate: string;
  maxDate: string;
  errors: string;
  defaultValue: string;
}
export interface CheckboxControl extends Control {
  validation: Array<any>;
  data: string;
  readonly: boolean;
  show: boolean;
}
export interface CheckboxgroupControl extends CheckboxControl {
  options: Array<any>;
  errors: string;
}
export interface ImageControl extends Control {
  height: number;
  width: number;
  src: string;
  show: boolean;
  disabled: boolean;
}
export interface LinkControl extends Control {
  content: string;
  href: string;
  visible: boolean;
}
export interface ButtonControl {
  id: string;
  label: string;
  labelOrientation: string;
  labelCols: number;
  tabindex?: string;
  data: string;
  show: boolean;
  disabled: boolean;
}
export interface LabelControl {
  id: string;
  content: string;
  ariaLabel: string;
  tabindex: string;
  hint: string;
  show: boolean;
  disabled: boolean;
}
export interface NestedForm {
  visible: boolean;
  enabled: boolean;
  schema: any;
  uischema: any;
  path: string;
  renderers: any;
  cells: string;
}
