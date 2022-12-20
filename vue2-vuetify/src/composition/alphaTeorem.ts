import {
  map,
  isObject,
  sortedUniq,
  isEqual,
  cloneDeep,
  isString,
} from 'lodash';
import Vue from 'vue';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mustache = require('mustache');

// ALPHA TEOREM is the class for manage the dependencies, computed, watchers
export const alphaTeorem = (params: any) => {
  let dep: Array<any> = [];
  //const { control, HX, store } = params;
  const { controlCore } = params;
  const uischema = controlCore.value.uischema;
  //First step::: Create dispatcher to emit the own value
  const unwatcher = alphaDispatcher(params);
  //Second step::: Find the dependents fields in schema
  dep = alphaFindDependencies(uischema, dep);
  //Third step::: Find the dependents fields in schema
  alphaWatcher(params, dep);
  return () => {
    unwatcher();
  };
};

export const alphaTeoremDt = (params: any) => {
  let dep: Array<any> = [];
  //const { control, HX, store } = params;
  const { column } = params;

  //Second step::: Find the dependents fields in schema
  dep = alphaFindDependencies(column, dep);
  //Third step::: Find the dependents fields in schema
  alphaWatcherDt(params, dep);
  return () => {
    //unwatcher();
  };
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
        res = res.concat(alphaFindDependencies(value, res));
        res = sortedUniq(res);
      }
    } else if (isString(value)) {
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
  const { store, controlCore, HX } = params;
  let scope = '';
  if (controlCore.value.uischema.scope) {
    scope = controlCore.value.uischema.scope.split('/').pop() || '';
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
  } else {
    return new Function();
  }
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
 * Watch all matrix variables with mustache {{}}
 * @param variables
 */
export const alphaWatcherDt = (params: any, variables: Array<any>) => {
  const { HX } = params;
  variables.forEach((v: any) => {
    HX.on(v, (nVal: any) => {
      alphaUpdaterDt(params, v, nVal);
    });
  });
};

/**
 * Alpha updater: update the options property in control in datatable
 * @param control
 * @param variable
 * @param value
 */
export const alphaUpdaterDt = (params: any, variable: string, value: any) => {
  const { column, updater } = params;
  const cloneControl = cloneDeep(column);
  const clone = cloneDeep(cloneControl);
  const parent = clone.parent;
  delete clone.parent;

  //Stringify cloneControl
  const sCloneControl = JSON.stringify(clone);
  const outputCloneControl = mustache.render(sCloneControl, {
    [variable]: value,
  });

  const resControl = JSON.parse(outputCloneControl);
  resControl.parent = parent;
  updater({ ...column, ...resControl });
};

/**
 * Alpha updater: update the options property in control
 * @param control
 * @param variable
 * @param value
 */
export const alphaUpdater = (params: any, variable: string, value: any) => {
  const { controlCore, updater } = params;
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
  updater({ ...controlCore.value, ...resControl });
};
