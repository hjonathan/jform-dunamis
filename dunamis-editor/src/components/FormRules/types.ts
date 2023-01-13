export interface FormRule {
  expression: string;
  id: string | null;
  scopes: ArrayConstructor;
  effect: string;
}

export interface ThenRule {
  effect: string;
  scopes: ArrayConstructor;
}

export interface IfRule {
  expression: string;
}
