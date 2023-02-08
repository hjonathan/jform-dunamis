import { map } from 'lodash';

//METHODS FOR SCOPE IN UISCHEMA
/**
 * Input the uischema find the object wih key= "scope"
 * and return the object with scope key
 * @param json
 * @param fn
 * @returns
 */
export const getScope = (json: any, fn: any) => {
  map(json, (value, key) => {
    if (key != 'parent' && key != 'condition') {
      if (typeof value == 'string' && key == 'scope') {
        fn(json, key, value);
      } else if (typeof value == 'object') {
        getScope(value, fn);
      }
    }
  });
  return json;
};

export const pathControlSchema = (input: string): string => {
  return input.split('/').pop() || '';
};
