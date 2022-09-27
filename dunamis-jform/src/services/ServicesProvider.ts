import Services from './index';

export interface Service {
  id: string;
  name: string;
  type: string;
  call(config: any | undefined): void;
  get(data: any | undefined): void;
}

export class ServicesProvider {
  services: Array<Service> = [];
  constructor(services: Array<Service>) {
    this.services = services;
  }

  get(id?: string): Array<Service> | Service | undefined {
    if (id) {
      return this.services.find((element: Service) => element.id === id);
    }
    return this.services;
  }
}

export default new ServicesProvider(Services);
