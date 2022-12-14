import { RootState } from '../../../store/types';
import { Module } from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import { make } from 'vuex-pathify';

export interface DataSourcesState {
  lists: any;
  collections: any;
  apis: any;
  databases: any;
}

const state: DataSourcesState = {
  lists: [
    {
      id: 'u1oiwe786123io',
      name: 'Alphabet',
      type: 'list',
      schema: [
        {
          id: 'id',
          type: 'string',
          name: 'Id',
        },
        {
          id: 'value',
          type: 'string',
          name: 'Value',
        },
      ],
      data: [
        {
          id: 'A',
          value: 'A',
        },
        {
          id: 'B',
          value: 'B',
        },
        {
          id: 'C',
          value: 'C',
        },
        {
          id: 'D',
          value: 'D',
        },
        {
          id: 'E',
          value: 'E',
        },
        {
          id: 'F',
          value: 'F',
        },
        {
          id: 'G',
          value: 'G',
        },
        {
          id: 'H',
          value: 'H',
        },
        {
          id: 'I',
          value: 'I',
        },
        {
          id: 'J',
          value: 'J',
        },
        {
          id: 'K',
          value: 'K',
        },
        {
          id: 'L',
          value: 'L',
        },
        {
          id: 'M',
          value: 'M',
        },
        {
          id: 'N',
          value: 'N',
        },
        {
          id: 'O',
          value: 'O',
        },
        {
          id: 'P',
          value: 'P',
        },
      ],
    },
    {
      id: '123uiqae90182',
      name: 'Gender',
      type: 'list',
      schema: [
        {
          id: 'id',
          type: 'string',
          name: 'Id',
        },
        {
          id: 'value',
          type: 'string',
          name: 'Value',
        },
      ],
      data: [
        {
          id: 'M',
          value: 'Male',
        },
        {
          id: 'F',
          value: 'Female',
        },
      ],
    },
    {
      id: '1y3y2378hns989',
      name: 'Programming Languages',
      type: 'list',
      schema: [
        {
          id: 'id',
          type: 'string',
          name: 'Id',
        },
        {
          id: 'value',
          type: 'string',
          name: 'Value',
        },
      ],
      data: [
        {
          id: 'java',
          value: 'Java',
        },
        {
          id: 'js',
          value: 'Javascript',
        },
        {
          id: 'php',
          value: 'PHP',
        },
        {
          id: 'pearl',
          value: 'Pearl',
        },
        {
          id: 'ruby',
          value: 'Ruby',
        },
        {
          id: 'python',
          value: 'Python',
        },
        {
          id: 'flutter',
          value: 'Flutter',
        },
        {
          id: 'c',
          value: 'C#',
        },
      ],
    },
  ],
  collections: {
    users: {
      type: 'collection',
      schema: [
        {
          id: 'id',
          type: 'string',
          name: 'Id 1',
        },
        {
          id: 'name',
          type: 'string',
          name: 'Name',
        },
        {
          id: 'countries',
          type: 'string',
          name: 'Countries',
        },
        {
          field: 'location',
          type: 'string',
          name: 'Location',
        },
      ],
      data: [
        {
          id: '1',
          name: 'henry',
          countries: 'bolivia',
          location: 'La paz',
        },
        {
          id: '2',
          name: 'henry',
          countries: 'bolivia',
          location: 'La paz',
        },
        {
          id: '3',
          name: 'henry',
          countries: 'bolivia',
          location: 'La paz',
        },
        {
          id: '4',
          name: 'henry',
          countries: 'bolivia',
          location: 'La paz',
        },
        {
          id: '5',
          name: 'henry',
          countries: 'bolivia',
          location: 'La paz',
        },
      ],
    },
    abc: {
      type: 'list',
      schema: [
        {
          id: 'id',
          type: 'string',
          name: 'ID',
        },
        {
          id: 'value',
          type: 'string',
          name: 'Value',
        },
      ],
      data: [
        {
          id: 'A',
          value: 'A',
        },
        {
          id: 'B',
          value: 'B',
        },
        {
          id: 'C',
          value: 'C',
        },
        {
          id: 'D',
          value: 'D',
        },
        {
          id: 'E',
          value: 'E',
        },
        {
          id: 'F',
          value: 'F',
        },
        {
          id: 'G',
          value: 'G',
        },
        {
          id: 'H',
          value: 'H',
        },
      ],
    },
  },
  apis: [
    {
      id: 'api-1',
      name: 'Processmaker Countries',
      type: 'api',
      data: {
        url: 'https://pm3-n275-dev.processmaker.net/api/1.0/workflow/project/289650576625433cc195332066440091/process-variable/dropdownVar001/execute-query',
        method: 'POST',
        params: {},
        headers: {
          authorization: 'Bearer 02efd5dd7fc793ffafe643038fb9837f28df1521',
          'content-type': 'application/json',
        },
        body: {
          field_id: 'country',
          dyn_uid: '307644763625433f6d07470067177319',
          app_uid: null,
          del_index: null,
        },
        dataInputVariables: [],
        output: '',
      },
    },
    {
      id: 'api-sub',
      name: 'Processmaker sub',
      type: 'api',
      data: {
        url: 'https://pm3-n275-dev.processmaker.net/api/1.0/workflow/project/289650576625433cc195332066440091/process-variable/dropdownVar002/execute-query',
        method: 'POST',
        params: {},
        headers: {
          authorization: 'Bearer 02efd5dd7fc793ffafe643038fb9837f28df1521',
          'content-type': 'application/json',
        },
        body: {
          country: '{{country}}',
          field_id: 'subdiv',
          dyn_uid: '307644763625433f6d07470067177319',
          app_uid: null,
          del_index: null,
        },
        dataInputVariables: ['country'],
        output: '',
      },
    },
    {
      id: 'api-loc',
      name: 'Processmaker location',
      type: 'api',
      data: {
        url: 'https://pm3-n275-dev.processmaker.net/api/1.0/workflow/project/289650576625433cc195332066440091/process-variable/dropdownVar003/execute-query',
        method: 'POST',
        params: {},
        headers: {
          authorization: 'Bearer 02efd5dd7fc793ffafe643038fb9837f28df1521',
          'content-type': 'application/json',
        },
        body: {
          country: '{{country}}',
          subdiv: '{{subdivision}}',
          field_id: 'loc',
          dyn_uid: '307644763625433f6d07470067177319',
          app_uid: null,
          del_index: null,
        },
        dataInputVariables: ['country', 'subdivision'],
        output: '',
      },
    },
    {
      id: 'api-11',
      name: 'Processmaker Countries Suggest',
      type: 'api',
      data: {
        url: 'https://pm3-n275-dev.processmaker.net/api/1.0/workflow/project/289650576625433cc195332066440091/process-variable/countries/execute-query-suggest',
        method: 'POST',
        params: {},
        headers: {
          authorization: 'Bearer 02efd5dd7fc793ffafe643038fb9837f28df1521',
          'content-type': 'application/json',
        },
        body: {
          field_id: 'countries',
          dyn_uid: '307644763625433f6d07470067177319',
          app_uid: null,
          filter: '{{countrys}}',
          order_by: 'ASC',
          var_name: 'countries',
          limit: 10,
          sql: 'SELECT IC_UID, IC_NAME FROM ISO_COUNTRY',
        },
        dataInputVariables: ['countrys'],
        output: '',
      },
    },
    {
      id: 'api-subs',
      name: 'Processmaker sub Suggest',
      type: 'api',
      data: {
        url: 'https://pm3-n275-dev.processmaker.net/api/1.0/workflow/project/289650576625433cc195332066440091/process-variable/subdivision/execute-query-suggest',
        method: 'POST',
        params: {},
        headers: {
          authorization: 'Bearer 02efd5dd7fc793ffafe643038fb9837f28df1521',
          'content-type': 'application/json',
        },
        body: {
          countries: '{{countrys}}',
          field_id: 'subdivision',
          dyn_uid: '307644763625433f6d07470067177319',
          app_uid: null,
          filter: '{{subdivisions}}',
          order_by: 'ASC',
          var_name: 'subdivision',
          limit: 10,
        },
        dataInputVariables: ['countrys', 'subdivisions'],
        output: '',
      },
    },
    {
      id: 'api-locs',
      name: 'Processmaker Location Suggest',
      type: 'api',
      data: {
        url: 'https://pm3-n275-dev.processmaker.net/api/1.0/workflow/project/289650576625433cc195332066440091/process-variable/location/execute-query-suggest',
        method: 'POST',
        params: {},
        headers: {
          authorization: 'Bearer 02efd5dd7fc793ffafe643038fb9837f28df1521',
          'content-type': 'application/json',
        },
        body: {
          countries: '{{countrys}}',
          subdivision: '{{subdivisions}}',
          field_id: 'location',
          dyn_uid: '307644763625433f6d07470067177319',
          app_uid: null,
          filter: '{{locations}}',
          order_by: 'ASC',
          var_name: 'location',
          limit: 10,
          sql: 'SELECT IL_UID, IL_NAME FROM ISO_LOCATION\nWHERE IC_UID = @@countries AND IS_UID = @@subdivision',
        },
        dataInputVariables: ['countrys', 'subdivisions', 'locations'],
        output: '',
      },
    },
  ],
  databases: {},
};

const dataSources: Module<DataSourcesState, RootState> = {
  namespaced: true,
  state,
  ...{
    mutations: {
      ...make.mutations(state),
      ...mutations,
    },
  },
  ...{
    actions: {
      ...make.actions(state),
      ...actions,
    },
  },
  ...{
    getters: {
      ...make.getters(state),
      ...getters,
    },
  },
};

export default dataSources;
