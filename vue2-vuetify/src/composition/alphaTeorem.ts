import { map, isObject, sortedUniq, isEqual, cloneDeep } from 'lodash';
import Vue from 'vue';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mustache = require('mustache');

// ALPHA TEOREM is the class for manage the dependencies, computed, watchers
export const alphaTeorem = (params: any) => {
  let dep: Array<any> = [];
  //const { control, HX, store } = params;
  const { control } = params;
  const uischema = control.value.uischema;
  //First step::: Create dispatcher to emit the own value
  alphaDispatcher(params);
  //Second step::: Find the dependents fields in schema
  dep = alphaFindDependencies(uischema, dep);
  //Third step::: Find the dependents fields in schema
  alphaWatcher(params, dep);
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
export const alphaDispatcher = (params: any) => {
  const { store, control, HX } = params;
  const scope = control.value.uischema.scope.split('/').pop() || '';
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
export const alphaWatcher = (params: any, variables: Array<any>) => {
  const { HX } = params;
  variables.forEach((v: any) => {
    HX.on(v, (nVal: any) => {
      alphaUpdater(params, v, nVal);
    });
  });
};

/**
 * Alpha updater: update the options property in control
 * @param control
 * @param variable
 * @param value
 */
export const alphaUpdater = (params: any, variable: string, value: any) => {
  const { control, controlCore } = params;

  const cloneControl = cloneDeep(controlCore.value);
  const { cells, childErrors, renderers, rootSchema, uischemas, ...rest } =
    cloneControl;

  //UISCHEMA
  const clone = cloneDeep(cloneControl.uischema);
  const parent = clone.parent;
  delete clone.parent;
  delete rest.uischema;

  //Stringify cloneControl
  const sCloneControl = JSON.stringify(rest);
  const outputCloneControl = mustache.render(sCloneControl, {
    [variable]: value,
  });

  //Stringify uischema
  const sClone = JSON.stringify(clone);
  const outputClone = mustache.render(sClone, { [variable]: value });

  const resControl = JSON.parse(outputCloneControl);
  const resuichema = JSON.parse(outputClone);
  resuichema.parent = parent;
  resControl.uischema = resuichema;

  control.value = { ...control.value, ...resControl };
};
