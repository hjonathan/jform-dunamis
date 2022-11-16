import { inject } from '@vue/composition-api';
import { map, isObject, sortedUniq, isEqual, cloneDeep } from 'lodash';
import Vue from 'vue';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mustache = require('mustache');

// ALPHA TEOREM is the class for manage the dependencies, computed, watchers
export const alphaTeorem = (control: any) => {
  let dep: Array<any> = [];
  const uischema = control.value.uischema;
  console.log('TEOREM');
  //First step::: Create dispatcher to emit the own value
  alphaDispatcher(uischema.scope.split('/').pop() || '');
  //Second step::: Find the dependents fields in schema
  dep = alphaFindDependencies(uischema, dep);
  //Third step::: Find the dependents fields in schema
  alphaWatcher(control, dep);
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
export const alphaWatcher = (control: any, variables: Array<any>) => {
  const HX = inject<any>('HX');
  variables.forEach((v: any) => {
    HX.on(v, (nVal: any) => {
      alphaUpdater(control, v, nVal);
    });
  });
};

/**
 * Alpha updater: update the options property in control
 * @param control
 * @param variable
 * @param value
 */
export const alphaUpdater = (control: any, variable: string, value: any) => {
  console.log('ALPHAAAAAAA');
  const options = JSON.stringify(cloneDeep(control.value.uischema.options));
  const output = mustache.render(options, { [variable]: value });
  control.value.uischema.options = JSON.parse(output);
};
