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
          value: 'A',
          label: 'A',
        },
        {
          value: 'B',
          label: 'B',
        },
        {
          value: 'C',
          label: 'C',
        },
        {
          value: 'D',
          label: 'D',
        },
        {
          value: 'E',
          label: 'E',
        },
        {
          value: 'F',
          label: 'F',
        },
        {
          value: 'G',
          label: 'G',
        },
        {
          value: 'H',
          label: 'H',
        },
        {
          value: 'I',
          label: 'I',
        },
        {
          value: 'J',
          label: 'J',
        },
        {
          value: 'K',
          label: 'K',
        },
        {
          value: 'P',
          label: 'L',
        },
        {
          value: 'M',
          label: 'M',
        },
        {
          value: 'N',
          label: 'N',
        },
        {
          value: 'O',
          label: 'O',
        },
        {
          value: 'P',
          label: 'P',
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
          value: 'M',
          label: 'Male',
        },
        {
          value: 'F',
          label: 'Female',
        },
      ],
    },
    {
      id: '123uiqa8777782',
      name: 'Region',
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
          value: 'africa',
          label: 'AFrica',
        },
        {
          value: 'america',
          label: 'America',
        },
        {
          value: 'asia',
          label: 'Asia',
        },
        {
          value: 'europe',
          label: 'Europe',
        },
        {
          value: 'oceania',
          label: 'Oceanias',
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
          value: 'java',
          label: 'Java',
        },
        {
          value: 'js',
          label: 'Javascript',
        },
        {
          value: 'php',
          label: 'PHP',
        },
        {
          value: 'pearl',
          label: 'Pearl',
        },
        {
          value: 'ruby',
          label: 'Ruby',
        },
        {
          value: 'python',
          label: 'Python',
        },
        {
          value: 'flutter',
          label: 'Flutter',
        },
        {
          value: 'c',
          label: 'C#',
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
      id: 'free-1',
      name: 'Free Countries',
      type: 'api',
      data: {
        url: 'https://restcountries.com/v3.1/all',
        method: 'GET',
        params: {},
        headers: {
          'content-type': 'application/json',
        },
        body: {},
        dataInputVariables: [],
        output: '',
      },
    },
    {
      id: 'free-2',
      name: 'Name Countries',
      type: 'api',
      data: {
        url: 'https://restcountries.com/v3.1/name/{{country}}',
        method: 'GET',
        params: {},
        headers: {
          'content-type': 'application/json',
        },
        body: {},
        dataInputVariables: ['country'],
        output: '',
      },
    },
    {
      id: 'free-3',
      name: 'Free Region',
      type: 'api',
      data: {
        url: 'https://restcountries.com/v3.1/region/{{region}}',
        method: 'GET',
        params: {},
        headers: {
          'content-type': 'application/json',
        },
        body: {},
        dataInputVariables: ['region'],
        output: '',
      },
    },
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
