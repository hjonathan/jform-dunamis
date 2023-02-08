export interface FormRule {
  expression: string;
  id: string | null;
  scopes: ArrayConstructor;
  effect: string;
}
export interface MultiFormRule {
  expression: string;
  id: string | null;
  effects: Array<ThenRule>;
}

export interface ThenRule {
  id: string;
  effect: string;
  scopes: Array<string>;
}

export interface IfRule {
  expression: string;
}
