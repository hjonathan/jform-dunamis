import { DataSource } from './DataSourceService';

export default class ApiDataSource implements DataSource {
  async call(data: any) {
    return [1, 2, 3];
  }
}
