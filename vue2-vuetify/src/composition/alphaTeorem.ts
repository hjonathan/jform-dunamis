import { inject } from '@vue/composition-api';
import { map, isObject, sortedUniq, isEqual } from 'lodash';
import Vue from 'vue';

// ALPHA TEOREM is the class for manage the dependencies, computed, watchers
export const alphaTeorem = (schema: any) => {
  let dep: Array<any> = [];

  //First step::: Create dispatcher to emit the own value
  alphaDispatcher(schema.scope.split('/').pop() || '');
  //Second step::: Find the dependents fields in schema
  dep = alphaFindDependencies(schema, dep);
  //Third step::: Find the dependents fields in schema
  alphaWatcher(dep);
};

/**
 * Find variables in {{ mustache }} to build a matrix watchers
 * @param schema
 * @param res
 * @returns
 */
export const alphaFindDependencies = (schema: any, res: Array<any>) => {
  map(schema, (value: any, key: any) => {
    if (isObject(value)) {
      if (key != 'parent') {
        alphaFindDependencies(value, res);
      }
    } else if (value) {
      let match = value.match(/{{\s*[A-Za-z0-9]+\s*}}/g);
      if (match) {
        match = match.map((el: any) => {
          return el.replace('{{', '').replace('}}', '').trim();
        });
        res = res.concat(match);
        res = sortedUniq(res);
      }
    }
  });
  return res;
};

/**
 * Dispatch the changes in VUEX and emit to Event Bus
 * @param scope
 * @returns
 */
export const alphaDispatcher = (scope: string) => {
  const store = inject<any>('store');
  const HX = inject<any>('HX');
  return store.watch(
    (_state: any, getters: any) => {
      return getters['preview/getDataModel'](scope);
    },
    (n: any, o: any) => {
      if (!isEqual(n, o)) {
        Vue.nextTick(() => {
          HX.emit(scope, n);
        });
      }
    }
  );
};

/**
 * Watch all matrix variables with mustache {{}}
 * @param variables
 */
export const alphaWatcher = (variables: Array<any>) => {
  const HX = inject<any>('HX');
  variables.forEach((v: any) => {
    HX.on(v, () => {
      console.log('LISTENING::::', v);
    });
  });
};
