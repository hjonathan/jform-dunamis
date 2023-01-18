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
