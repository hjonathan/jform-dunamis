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

export interface TextControl {
  validation: Array<any>;
  labelOrientation: string;
  label: string;
  labelCols: number;
  tabindex: string;
  ariaLabel: string;
  hint: string;
  placeholder: string;
  data: string;
  id: string;
  readonly: boolean;
  show: boolean;
  disabled: boolean;
}
