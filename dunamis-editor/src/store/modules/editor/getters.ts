const getters = {
  palleteElements: (state: any) => state.editor.paletteElements,
  activeElement: (state: any) => state.editor.element,
  schema: (state: any) => state.editor.schema,
  uiSchema: (state: any) => state.editor.uiSchema,
  locale: (state: any) => state.jsonforms.locale,
};

export default getters;
