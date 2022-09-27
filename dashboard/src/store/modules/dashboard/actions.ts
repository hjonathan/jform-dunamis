const actions = {
  fetchForms: ({ commit }: any, data: any) => {
    // Here we need complete and consume a API
    commit('SET_FORMS', [
      {
        id: 1,
        name: 'Add Department',
        description: 'Add a new departmento to th Department collection',
        category: 'Human Resourses',
        type: 'Form',
        modified: '10/08/2019 21:55',
        created: '08/27/2019 22:25',
      },
    ]);
  },
  addForm: ({ commit }: any, data: any) => {
    commit('ADD_FORM', data);
  },
};
export default actions;
