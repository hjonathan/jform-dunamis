import { map, isObject, sortedUniq, cloneDeep, isString } from 'lodash';

import Vue, { inject } from 'vue';
import { defaultEffects } from '../editor/composables/controlComposition';
import {
  DefaultEffects,
  ParamsAlphaTeorem,
  ProviderControl,
} from '../editor/composables/types';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mustache = require('mustache');

// ALPHA TEOREM is the class for manage the dependencies, computed, watchers
export const alphaTeorem = (params: ParamsAlphaTeorem) => {
  let dep: Array<any> = [];
  const { dataCore } = params;
  //First step::: Create dispatcher to emit the own value
  const unwatcher = alphaDispatcher(params);
  //Second step::: Find the dependents fields in schema
  dep = alphaFindDependencies(Object.assign({}, dataCore.value.uischema), dep);
  //Third step:::Watch dependents fields in data vuex
  const unwatcherScopes = alphaWatcher(params, dep);
  return () => {
    unwatcher();
    unwatcherScopes();
  };
};

export const alphaTeoremDt = (params: any) => {
  let dep: Array<any> = [];
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
      let match = value.match(/{{\s*[A-Za-z0-9/._]+\s*}}/g);
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
  const store = inject<any>('store');
  const HX = inject<any>('HX');
  const { dataCore } = params;
  if (dataCore.value.uischema.scope) {
    const scope = dataCore.value.path;
    return store.watch(
      (_state: any, getters: any) => getters['preview/getDataModel'](scope),
      (n: any, o: any) => {
        if (!Object.is(n, o)) {
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
  const HX = inject<any>('HX');
  const callback = () => {
    debugger;
    return alphaUpdater(params);
  };
  variables.forEach((v: any) => {
    HX.on(v, callback);
  });

  return () => {
    variables.forEach((v: any) => {
      HX.off(v, callback);
    });
  };
};

/**
 * Watch all matrix variables with mustache {{}}
 * @param variables
 */
export const alphaWatcherDt = (params: any, variables: Array<any>) => {
  const HX = inject<any>('HX');
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
export const alphaUpdater = (params: any) => {
  const { dataCore, dataUpdater } = params;
  const control = cloneDeep(dataCore.value);
  debugger;
  dataUpdater({
    ...renderWithMustache(params.provider, control),
    ...getEffects(params, control),
  });
};

const getEffects = (params: ParamsAlphaTeorem, data: any) => {
  // eslint-disable-next-line prefer-const
  let effects: DefaultEffects = defaultEffects(),
    datas: any = {},
    dep: Array<any> = [];
  const { store } = params.provider,
    rules = getProp(data, 'uischema.options.rules');
  if (rules) {
    dep = alphaFindDependencies(data.uischema, dep);
    datas = store.getters['preview/scopesByValue'](dep);
    rules.forEach((rule: any) => {
      if (rule.effect == 'SHOW') {
        effects['show'] = eval(mustache.render(rule.expression, datas));
      }
      if (rule.effect == 'HIDE') {
        effects['show'] = !eval(mustache.render(rule.expression, datas));
      }
      if (rule.effect == 'ENABLED') {
        effects['disabled'] = !eval(mustache.render(rule.expression, datas));
      }
      if (rule.effect == 'DISABLED') {
        effects['disabled'] = eval(mustache.render(rule.expression, datas));
      }
    });
  }
  return effects;
};

export const renderWithMustache = (
  params: ProviderControl,
  data: any,
  isTranslation?: boolean
): any => {
  const { store } = params;
  const locales = store.getters['locales/getLocales'];
  const locale = store.getters['preview/locale'];
  const auxLocales = Object.assign(
    {},
    { T: locales[locale].content },
    isTranslation === undefined
      ? store.getters['preview/scopesByValue']([])
      : ''
  );
  const control = cloneDeep(data);
  const auxParent = control.uischema.parent;
  delete control.uischema.parent;
  control.uischema = JSON.parse(
    mustache.render(JSON.stringify(control.uischema), auxLocales)
  );
  control.uischema.parent = auxParent;
  return control;
};

/**
 * Get properties by String array
 * @param obj
 * @param arrayKey
 * @returns
 */
const getValidProps = (obj: any, arrayKey: Array<string>) =>
  arrayKey.reduce((o: any, x: string) => {
    o[x] = obj[x];
    return o;
  }, {});

const getProp = (obj: any, key: string) =>
  key
    .split('.')
    .reduce((o, x) => (typeof o == 'undefined' || o === null ? o : o[x]), obj);
