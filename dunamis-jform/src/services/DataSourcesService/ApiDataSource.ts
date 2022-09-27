import { DataSource } from './DataSourceService';

export interface ApiConfig {
  url: string | undefined;
  method: string | undefined;
  params: Object | undefined;
  headers: any | undefined;
  body: Object | undefined;
  input: Array<string> | undefined;
  output: Array<string> | undefined;
}

export default class ApiDataSource implements DataSource {
  config: ApiConfig = {
    url: undefined,
    method: undefined,
    params: undefined,
    headers: undefined,
    body: undefined,
    input: undefined,
    output: undefined,
  };
  async call(data: any) {
    let response;
    switch (this.config.url) {
      case 'POST':
        response = await this.post(data);
        break;
      case 'PUT':
        response = await this.put(data);
        break;
      case 'GET':
        response = await this.get(data);
        break;
      case 'UPDATE':
        response = await this.update(data);
        break;
    }
    return response;
  }

  async post(data: any) {
    const response = await fetch(this.config.url as RequestInfo, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: this.config.headers || {},
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json();
  }
  async put(data: any) {
    const response = await fetch(this.config.url as RequestInfo, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: this.config.headers || {},
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json();
  }

  async get(data: any) {
    const response = await fetch(this.config.url as RequestInfo, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: this.config.headers || {},
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json();
  }

  async update(data: any) {
    const response = await fetch(this.config.url as RequestInfo, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: this.config.headers || {},
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json();
  }
}
