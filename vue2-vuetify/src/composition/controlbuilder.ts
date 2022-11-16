import { isArray, isString, indexOf, isFunction } from 'lodash';
import _ from 'lodash';
import Vue from 'vue';
/**
 * Build function itemsBuilder for custom js that returns a items
 * @param uiSchema
 * @returns
 */
export const itemsBuilder = (uiSchema: any) => {
  let nitemsBuilder;
  const scope = pathControlSchema(uiSchema.scope);
  try {
    if (
      uiSchema &&
      uiSchema.options &&
      uiSchema.options.items &&
      isString(uiSchema.options.items)
    ) {
      nitemsBuilder = new Function('_, payload', uiSchema.options.items);
    }
  } catch (e: any) {
    console.error('JFORM::: Error in js ' + scope + ':::' + e);
  }
  return nitemsBuilder;
};

/**
 * Build items from JSON object Local or DataSources
 * config.dataSources --> service DataSource
 * config.uischema --> uiSchema
 * config.getData --> for get the dependents field values
 * @param uiSchema
 * @returns
 */
export const items = (config: any) => {
  let localItems: any = [];
  let dataSource: any;
  //Local Items
  if (
    config.uischema &&
    config.uischema.options.items &&
    isArray(config.uischema.options.items.local)
  ) {
    localItems = config.uischema.options.items.local;
  }

  //DataSources Items
  if (
    config.uischema &&
    config.uischema.options.items &&
    config.uischema.options.items.dataSource
  ) {
    dataSource = config.uischema.options.items.dataSource;
    return config.dataSources
      .call(dataSource)
      .then((res: any) => localItems.concat(res));
  } else {
    return Promise.resolve(localItems);
  }
};

export const getReactiveItems = (
  uiSchema: any,
  dataSources: any,
  data: any
) => {
  let localItems: any = [];
  let dataSource: any;
  //Local Items
  if (
    uiSchema &&
    uiSchema.options.items &&
    isArray(uiSchema.options.items.local)
  ) {
    localItems = uiSchema.options.items.local;
  }

  //DataSources Items
  if (uiSchema && uiSchema.options.items && uiSchema.options.items.dataSource) {
    dataSource = uiSchema.options.items.dataSource;
    return dataSources
      .call(dataSource, data)
      .then((res: any) => localItems.concat(res));
  } else {
    return Promise.resolve(localItems);
  }
};

export const onChange = (uiSchema: any) => {
  let fnOnchange = new Function();
  if (
    uiSchema.options &&
    uiSchema.options.events &&
    uiSchema.options.events.onChange
  ) {
    fnOnchange = new Function(
      uiSchema.options.events.onChange.arguments,
      uiSchema.options.events.onChange.body
    );
  }
  return fnOnchange;
};

export const watchScope = (store: any, uiSchema: any, provider: any) => {
  const scope = pathControlSchema(uiSchema.scope);
  return store.watch(
    (_state: any, getters: any) => {
      return getters['preview/getDataModel'](scope);
    },
    (n: any, o: any) => {
      if (!_.isEqual(n, o)) {
        Vue.nextTick(() => {
          provider.HX.emit(scope, n);
        });
      }
    }
  );
};
/**
 * The function execute the dependents fields when existe rules with dependencies, in other case executes
 * In Dropdown is necesary execute the automaticaly
 * Suggest execute the function on change input
 * @param uiSchema
 * @param provider
 * @param fn
 */
export const scopesHandler = (uiSchema: any, provider: any, fn: any) => {
  const fireItemsBuilder = ['Dropdown', 'RadioGroup', 'CheckboxGroup'];
  const deps = dependencies(uiSchema);
  const scope = pathControlSchema(uiSchema.scope);
  const type = uiSchema.type;
  const functionJoinFork = () => {
    try {
      //Not continue with the execution when is suggest control
      if (indexOf(fireItemsBuilder, type) === -1) {
        return;
      }
      //Recovery the data
      getReactiveItems(
        uiSchema,
        provider.dataSources,
        provider.store.getters['preview/getMultipleData'](deps)
      ).then((res: any) => {
        if (isFunction(fn)) {
          fn(res);
        }
      });
    } catch (e: any) {
      console.error('JFORM::: Error in js ' + e + ':::');
    }
  };

  if (deps.length !== 0) {
    return provider.HX.joinFork(deps, functionJoinFork, scope);
  } else {
    functionJoinFork();
    return new Function();
  }
};

/**
 * @param uiSchema
 * @param provider
 * @param fn
 */
export const manualHandlerDependencies = (
  uiSchema: any,
  provider: any,
  fn: any
) => {
  const deps = dependencies(uiSchema);
  const scope = pathControlSchema(uiSchema.scope);
  return (payload: any) => {
    const data = provider.store.getters['preview/getMultipleData'](deps);
    data[scope] = payload;
    try {
      getReactiveItems(uiSchema, provider.dataSources, data).then(
        (res: any) => {
          if (isFunction(fn)) {
            fn(res);
          }
        }
      );
    } catch (e: any) {
      console.error('JFORM::: Error in js ' + e + ':::');
    }
  };
};

export const dependencies = (uiSchema: any) => {
  return uiSchema.options &&
    uiSchema.options.items &&
    uiSchema.options.items.dataSource
    ? _.sortedUniq(
        uiSchema.options.items.dataSource.config.dataInputVariables.map(
          (el: any) => el.src
        )
      )
    : [];
};

export const pathControlSchema = (input: string): string => {
  return input.split('/').pop() || '';
};
