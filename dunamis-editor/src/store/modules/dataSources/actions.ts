const actions = {
  addSimpleList: ({ commit }: any, data: any) => {
    const dt = {
      id: data.id,
      name: data.name,
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
      data: [],
    };
    commit('ADD_SIMPLE_LIST', dt);
  },
  setSimpleLists: ({ commit }: any, data: any) => {
    commit('SET_SIMPLE_LISTS', data);
  },
  setApis: ({ commit }: any, data: any) => {
    commit('SET_APIS', data);
  },
  addApi: ({ commit }: any, data: any) => {
    const dt = {
      id: '',
      name: '',
      data: {
        url: '',
        method: 'GET',
        params: {},
        headers: {},
        body: {},
        input: [],
        output: '',
      },
    };
    commit('ADD_API', Object.assign({}, dt, data));
  },
  updateApi: ({ commit }: any, data: any) => {
    const dt = {
      id: '',
      name: '',
      data: {
        url: '',
        method: 'GET',
        params: {},
        headers: {},
        body: {},
        input: [],
        output: '',
      },
    };
    commit('UPDATE_API', Object.assign({}, dt, data));
  },
};
export default actions;
