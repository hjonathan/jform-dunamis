import { map } from 'lodash';

//METHODS FOR SCOPE IN UISCHEMA
//METHODS FOR JFORM HELPER
/**
 * Input the uischema find the object wih key= "scope"
 * and return the object with scope key
 * @param json
 * @param fn
 * @returns
 */
export const scope = (json: any, fn: any) => {
  map(json, (value, key) => {
    if (key != 'parent' && key != 'condition') {
      if (typeof value == 'string' && key == 'scope') {
        fn(json, key, value);
      } else if (typeof value == 'object') {
        scope(value, fn);
      }
    }
  });
  return json;
};

export const pathControlSchema = (input: string): string => {
  return input.split('/').pop() || '';
};
