import { Service } from '../ServicesProvider';
import store from '../../store';
import _ from 'lodash';

export default {
  build(): Service {
    const lists = store.getters['dataSources/getSimpleLists'];
    const apis = store.getters['dataSources/getApis'];
    return new DataSourceService('dataSources', 'DataSources', lists, apis);
  },
};

export class DataSourceService implements Service {
  id!: string;
  name!: string;
  type = 'dataSource';
  lists: any;
  apis: any;
  constructor(id: string, name: string, lists: any, apis: any) {
    this.id = id;
    this.name = name;
    this.lists = lists;
    this.apis = apis;
  }
  get(data?: any): void {
    this.lists = store.getters['dataSources/getSimpleLists'];
    this.apis = store.getters['dataSources/getApis'];
    if (data && data.id && data.type == 'api') {
      return this.apis.find((el: any) => el.id === data.id);
    }
    return this.formatDataSources();
  }
  call(config: any, data?: any): any {
    if (config.type === 'list') {
      return new Promise((resolve, reject) => {
        const res = this.lists.find((el: any) => el.id === config.id);
        resolve(res ? res.data : []);
      });
    }
    if (config.type === 'api') {
      return this.apiCall(config, data);
    }
    return [];
  }
  apiCall(config: any, data?: any) {
    const api = this.apis.find((el: any) => {
      return el.id === config.id;
    });
    const apiClone = _.cloneDeep(api);
    const dataInputVariables = this.formatDataInputVariables(
      config.config.dataInputVariables,
      data
    );
    this.findBraces(apiClone, dataInputVariables);

    if (
      apiClone.data.method == 'POST' &&
      this.verifyPayload(dataInputVariables)
    ) {
      return fetch(apiClone.data.url, {
        method: apiClone.data.method,
        body: JSON.stringify(apiClone.data.body),
        headers: apiClone.data.headers,
      })
        .then((res) => res.json())
        .then((res) => {
          const formatRes = this.indexByDots(res, apiClone.data.output);
          return formatRes.map((el: any) => ({
            value: this.indexByDots(el, config.config.value),
            label: this.indexByDots(el, config.config.label),
          }));
        });
    }

    if (apiClone.data.method == 'GET' && this.verifyPayload(dataInputVariables))
      return fetch(apiClone.data.url, {
        method: apiClone.data.method,
        headers: apiClone.data.headers,
      })
        .then((res) => res.json())
        .then((res) => {
          const formatRes = this.indexByDots(res, apiClone.data.output);
          return formatRes.map((el: any) => ({
            value: this.indexByDots(el, config.config.value),
            label: this.indexByDots(el, config.config.label),
          }));
        });
  }
  formatDataSources() {
    const list = this.lists.map((element: any) => {
      return {
        id: element.id,
        text: element.name,
        type: element.type,
        render: this.render(element.type),
      };
    });

    const apis = this.apis.map((element: any) => {
      return {
        id: element.id,
        text: element.name,
        type: element.type,
        render: this.render(element.type),
      };
    });
    return list.concat(apis);
  }
  render(type: string) {
    switch (type) {
      case 'api':
        return () => {
          return import('./ConfigViews/ApiConfig.vue');
        };
        break;
    }
    return () => {
      return 'div';
    };
  }
  indexByDots(obj: any, is: any, value?: any): any {
    if (typeof is == 'string' && is.length != 0) {
      return this.indexByDots(obj, is.split('.'), value);
    } else if (is.length == 1 && value !== undefined) {
      return (obj[is[0]] = value);
    } else if (is.length == 0) {
      return obj;
    } else {
      return this.indexByDots(obj[is[0]], is.slice(1), value);
    }
  }
  replaceBraces(value: any, data: any) {
    /* eslint-disable */
    const expression = new RegExp(/{{\s*[A-Z\.\_a-z0-9]+\s*}}/g);
    const res = value.match(expression);
    let val = value;
    /* eslint-enable */
    if (res) {
      res.forEach((el: any) => {
        const r = el.replace('{{', '').replace('}}', '').trim();
        val = value.replace(el, data[r] || el);
      });
    }
    return val;
  }
  findBraces(obj: any, data: any): any {
    if (obj) {
      _.forIn(obj, (v: any, k: any) => {
        if (_.isObject(v)) {
          this.findBraces(v, data);
        } else if (_.isString(v)) {
          obj[k] = this.replaceBraces(v, data);
        }
      });
    }
  }

  formatDataInputVariables(config: any, data: any) {
    const res: any = {};
    if (config.length) {
      config.forEach((el: any) => {
        if (el['src'].indexOf('{{') == -1) {
          res[el['dest']] = el['src'];
        } else {
          res[el['dest']] = '';
        }
      });
    }
    return res;
  }
  verifyPayload(data: any) {
    let flag = true;
    for (const key in data) {
      if (data[key] == '') flag = false;
    }
    return flag;
  }
}
