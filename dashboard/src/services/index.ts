import { Service } from './ServicesProvider';

import DataSourceService from './DataSourcesService/DataSourceService';

const Services: Array<Service> = [DataSourceService.build()];
export default Services;
