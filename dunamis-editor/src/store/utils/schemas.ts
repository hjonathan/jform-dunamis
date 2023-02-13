import { assign } from 'lodash';
import { v4 as uuid } from 'uuid';
import { withCloneTree, withCloneTrees, getTree } from './../../util/clone';
import {
  findByUUID,
  getRoot,
  isUUIDError,
  linkElements,
  linkSchemas,
  UUIDError,
} from '../../util/schemasUtil';
import {
  buildSchemaTree,
  cleanLinkedElements,
  SchemaElement,
  getScope,
} from '../../model/schema';
import {
  buildEditorUiSchemaTree,
  cleanUiSchemaLinks,
  EditorLayout,
  EditorUISchemaElement,
  getVariableName,
} from '../../model/uischema';
import { DefaultPaletteService } from '../../api/paletteService';
import { cloneDeep } from 'lodash';
import { CategorizationService } from '../../api/categorizationService';
import _ from 'lodash';

/** Removes the given UI element from its tree.
 *  If a SchemaElement is provided, the element to remove will be cleaned up from all linkedUISchemaElements fields in the schema.
 */
const removeUiElement = (
  elementToRemove: EditorUISchemaElement,
  schema?: SchemaElement,
  categorizationService?: CategorizationService
): true | UUIDError => {
  // remove links to UI element in the schema (if any)
  if (schema && elementToRemove.linkedSchemaElement) {
    const uuidToRemove = elementToRemove.uuid;
    if (!uuidToRemove) {
      return { id: 'noUUIDError', element: elementToRemove };
    }
    const schemaRoot = getRoot(schema);
    const linkedSchemaElement: SchemaElement = findByUUID(
      schemaRoot,
      elementToRemove.linkedSchemaElement
    );
    if (!isUUIDError(linkedSchemaElement)) {
      linkedSchemaElement.linkedUISchemaElements?.delete(uuidToRemove);
    }
  }
  // remove from parent
  if (elementToRemove.parent) {
    // - case: Layout
    if ((elementToRemove.parent as EditorLayout).elements) {
      const index = (elementToRemove.parent as EditorLayout).elements.indexOf(
        elementToRemove
      );
      if (index !== -1) {
        (elementToRemove.parent as EditorLayout).elements.splice(index, 1);
      }
    }
    // - case: element with detail
    if (elementToRemove.parent.options?.detail === elementToRemove) {
      delete elementToRemove.parent.options.detail;
      if (Object.keys(elementToRemove.parent.options).length === 0) {
        delete elementToRemove.parent.options;
      }
    }
    // TODO other cases
  }
  // - case: categorization/category element
  if (
    elementToRemove.type === 'Categorization' ||
    elementToRemove.type === 'Category'
  ) {
    // release the map entry memory
    categorizationService?.removeElement(elementToRemove);
  }
  return true;
};

export const palleteElements = () => {
  const paletteService = new DefaultPaletteService();
  const palleteElements = paletteService.getPaletteElements();
  return palleteElements;
};

export const updateSchemaVariable = (state: any, payload: any) => {
  return withCloneTrees(
    state.editor.uiSchema,
    undefined,
    state.editor.schema,
    undefined,
    state,
    (newUiSchema, newSchema) => {
      const uiSchemaElement: any = findByUUID(newUiSchema, payload.elementUUID);
      const oldVariable = getVariableName(uiSchemaElement);
      if (uiSchemaElement && oldVariable !== payload.newVariable) {
        const linkedShemaElement: any = findByUUID(
          newSchema,
          uiSchemaElement.linkedSchemaElement
        );
        linkedShemaElement.schema['i18n'] = payload.newVariable;
        if (
          linkedShemaElement &&
          linkedShemaElement.parent &&
          linkedShemaElement.parent.properties
        ) {
          linkedShemaElement.parent.properties.delete(oldVariable);
          linkedShemaElement.parent.properties.set(
            `${payload.newVariable}`,
            linkedShemaElement
          );
        }
        uiSchemaElement.scope = `#${getScope(linkedShemaElement)}`;
      }
      const schemaR = {
        schema: getRoot(newSchema),
        uiSchema: getRoot(newUiSchema),
      };
      return schemaR;
    }
  );
};

export const updateSchemaRequired = (state: any, payload: any) => {
  return withCloneTrees(
    state.editor.uiSchema,
    undefined,
    state.editor.schema,
    undefined,
    state,
    (newUiSchema, newSchema) => {
      const uiSchemaElement: any = findByUUID(newUiSchema, payload.elementUUID);
      const currentVariable = getVariableName(uiSchemaElement);
      // require procedure
      newSchema.schema.required = newSchema.schema.required
        ? newSchema.schema.required
        : [];
      if (payload.required) {
        if (!newSchema.schema.required.includes(currentVariable)) {
          newSchema.schema.required.push(currentVariable);
        }
      } else {
        const index = newSchema.schema.required.indexOf(currentVariable);
        if (index !== -1) {
          newSchema.schema.required.splice(index, 1);
        }
      }
      return {
        schema: getRoot(newSchema),
        uiSchema: getRoot(newUiSchema),
      };
    }
  );
};

export const updateSchemaReadOnly = (state: any, payload: any) => {
  return withCloneTrees(
    state.editor.uiSchema,
    undefined,
    state.editor.schema,
    undefined,
    state,
    (newUiSchema, newSchema) => {
      const uiSchemaElement: any = findByUUID(newUiSchema, payload.elementUUID);
      //readOnly
      const linkedShemaElement: any = findByUUID(
        newSchema,
        uiSchemaElement.linkedSchemaElement
      );
      assign(linkedShemaElement.schema, { readOnly: payload.readOnly });
      return {
        schema: getRoot(newSchema),
        uiSchema: getRoot(newUiSchema),
      };
    }
  );
};

export const updateSchemaMinDate = (state: any, payload: any) => {
  return withCloneTrees(
    state.editor.uiSchema,
    undefined,
    state.editor.schema,
    undefined,
    state,
    (newUiSchema, newSchema) => {
      const uiSchemaElement: any = findByUUID(newUiSchema, payload.elementUUID);
      const linkedShemaElement: any = findByUUID(
        newSchema,
        uiSchemaElement.linkedSchemaElement
      );
      assign(linkedShemaElement.schema, { minDate: payload.minDate });
      return {
        schema: getRoot(newSchema),
        uiSchema: getRoot(newUiSchema),
      };
    }
  );
};

export const updateSchemaMaxDate = (state: any, payload: any) => {
  return withCloneTrees(
    state.editor.uiSchema,
    undefined,
    state.editor.schema,
    undefined,
    state,
    (newUiSchema, newSchema) => {
      const uiSchemaElement: any = findByUUID(newUiSchema, payload.elementUUID);
      const linkedShemaElement: any = findByUUID(
        newSchema,
        uiSchemaElement.linkedSchemaElement
      );
      assign(linkedShemaElement.schema, { maxDate: payload.maxDate });
      return {
        schema: getRoot(newSchema),
        uiSchema: getRoot(newUiSchema),
      };
    }
  );
};

export const updateSchemaDefaultDate = (state: any, payload: any) => {
  return withCloneTrees(
    state.editor.uiSchema,
    undefined,
    state.editor.schema,
    undefined,
    state,
    (newUiSchema, newSchema) => {
      const uiSchemaElement: any = findByUUID(newUiSchema, payload.elementUUID);
      const linkedShemaElement: any = findByUUID(
        newSchema,
        uiSchemaElement.linkedSchemaElement
      );
      assign(linkedShemaElement.schema, { defaultDate: payload.defaultDate });
      return {
        schema: getRoot(newSchema),
        uiSchema: getRoot(newUiSchema),
      };
    }
  );
};

export const duplicateElement = (state: any, payload: any) => {
  return withCloneTrees(
    state.editor.uiSchema,
    payload.parent.uuid,
    state.editor.schema,
    payload.linkedSchemaElement,
    state,
    (newUiSchema, newSchema) => {
      const variable = getVariableName(payload);
      let counter = 0;
      for (const key of newSchema.parent.properties.keys()) {
        if (key.includes(variable)) {
          counter += 1;
        }
      }
      const schemauuid = uuid();
      newSchema.schema.i18n = `${variable}_${counter}`;
      newSchema.parent.properties?.set(`${variable}_${counter}`, {
        options: newSchema.options,
        parent: newSchema.parent,
        schema: newSchema.schema,
        type: newSchema.type,
        uuid: schemauuid,
      });
      const shemaElement: any = findByUUID(newSchema, schemauuid);
      const newUIElement = {
        options: payload.options,
        parent: newUiSchema,
        scope: `#${getScope(shemaElement)}`,
        type: payload.type,
        uuid: uuid(),
      };
      if (!shemaElement || !linkElements(newUIElement, shemaElement)) {
        console.error('Could not add new UI element', newUIElement);
        return state;
      }
      const index = _.findIndex(newUiSchema.elements, function (element: any) {
        return element.uuid === payload.uuid;
      });
      (newUiSchema as EditorLayout).elements.splice(index + 1, 0, newUIElement);
      return {
        schema: getRoot(newSchema),
        uiSchema: getRoot(newUiSchema),
      };
    }
  );
};

export const removeUiSchemaElement = (state: any, payload: any) => {
  return withCloneTrees(
    state.editor.uiSchema,
    payload,
    state.editor.schema,
    undefined,
    state,
    (elementToRemove, newSchema) => {
      if (!elementToRemove || (elementToRemove && !elementToRemove.parent)) {
        console.error('Could not remove ui element ', elementToRemove);
        return state.editor;
      }
      const removeResult = removeUiElement(
        elementToRemove,
        newSchema,
        state.categorizationService
      );
      if (isUUIDError(removeResult)) {
        console.error('Could not remove ui element ', removeResult);
        return state;
      }
      //Remove the element from Schema
      if (elementToRemove.scope) {
        newSchema.properties.delete(elementToRemove.scope.substring(13));
      }
      // check whether the element to remove was the root element
      const uiSchemaToReturn = elementToRemove.parent
        ? getRoot(elementToRemove)
        : undefined;
      return {
        schema: getRoot(newSchema),
        uiSchema: uiSchemaToReturn,
      };
    }
  );
};

export const createScopedElementToLayout = (state: any, payload: any) => {
  return withCloneTrees(
    state.editor.uiSchema,
    payload.layoutUUID,
    state.editor.schema,
    payload.schemaUUID,
    state,
    (newUiSchema, newSchema) => {
      const newUIElement = payload.uiSchemaElement;
      newUIElement.parent = newUiSchema;
      (newUiSchema as EditorLayout).elements.splice(
        payload.index,
        0,
        newUIElement
      );

      if (!newSchema || !linkElements(newUIElement, payload.schemaElement)) {
        console.error('Could not add new UI element', newUIElement);
        return state;
      }
      return {
        schema: getRoot(newSchema),
        uiSchema: getRoot(newUiSchema),
      };
    }
  );
};

export const createScopedElementToTable = (state: any, payload: any) => {
  return withCloneTrees(
    state.editor.uiSchema,
    payload.layoutUUID,
    state.editor.schema,
    payload.schemaUUID,
    state,
    (newUiSchema, newSchema) => {
      const newUIElement = payload.uiSchemaElement;
      newUiSchema.options.detail.elements.splice(
        payload.index,
        0,
        newUIElement
      );
      if (!newSchema || !linkElements(newUIElement, payload.schemaElement)) {
        console.error('Could not add new UI element', newUIElement);
        return state;
      }
      return {
        schema: getRoot(newSchema),
        uiSchema: getRoot(newUiSchema),
      };
    }
  );
};

export const addPropertyToSchema = (state: any, payload: any) => {
  return withCloneTree(
    state.editor.schema,
    payload.parentUUID,
    state.editor,
    (clonedSchema) => {
      const newElement = payload.schemaElement;
      newElement.parent = clonedSchema;
      newElement.schema.i18n = payload.variable;
      clonedSchema.properties?.set(payload.variable, newElement);
      // return clonedSchema;
      return getRoot(clonedSchema as EditorUISchemaElement);
    }
  );
};

export const addColumnToDataTable = (state: any, payload: any) => {
  return withCloneTree(
    state.editor.schema,
    payload.parentUUID,
    state.editor.schema,
    (clonedSchema) => {
      const newColumn = payload.column;
      clonedSchema.items?.properties?.set(payload.variableColumn, newColumn);
      return getRoot(clonedSchema as EditorUISchemaElement);
    }
  );
};

export const removeColumnDataTable = (state: any, payload: any) => {
  return withCloneTree(
    state.editor.schema,
    payload.parentUUID,
    state.editor.schema,
    (clonedSchema) => {
      clonedSchema.items?.properties?.delete(payload.variableColumn);
      return getRoot(clonedSchema as EditorUISchemaElement);
    }
  );
};

export const createUnscopedUiSchema = (state: any, payload: any) => {
  return withCloneTree(
    state.editor.uiSchema,
    payload.layoutUUID,
    state.editor.uiSchema,
    (newUiSchema) => {
      const newUIElement = payload.uiSchemaElement;
      newUIElement.parent = newUiSchema;
      (newUiSchema as EditorLayout).elements.splice(
        payload.index,
        0,
        newUIElement
      );
      // state.editor.uiSchema = getRoot(newUiSchema as EditorUISchemaElement);;
      return getRoot(newUiSchema as EditorUISchemaElement);
    }
  );
};

export const updateParentUiSchemaElement = (state: any, payload: any) => {
  const uiSchema = cloneDeep(state.editor.uiSchema);
  const element = getTree(uiSchema, payload.elementUUID);
  const parent = getTree(uiSchema, payload.parentUUID);
  element.parent = parent;
  element.linkedSchemaElement = payload.linkedSchemaElement;
  return uiSchema;
};

export const createSchema = (state: any, payload: any) => {
  return withCloneTree(
    state.editor.schema,
    undefined,
    state.editor,
    (clonedSchema) => {
      return linkSchemas(
        buildSchemaTree(payload.schema),
        cleanUiSchemaLinks(clonedSchema)
      );
    }
  );
};

export const createUiSchema = (state: any, payload: any) => {
  return withCloneTree(
    state.editor.schema,
    undefined,
    state.editor,
    (clonedSchema) => {
      return linkSchemas(
        cleanLinkedElements(clonedSchema),
        buildEditorUiSchemaTree(payload.uiSchema)
      );
    }
  );
};

export const updateUISchemaElement = (state: any, payload: any) => {
  return withCloneTree(
    state.editor.uiSchema,
    payload.elementUUID,
    state.editor.uiSchema,
    (newUiSchema) => {
      // options.detail is not part of the editable properties
      const optionsDetail = newUiSchema.options?.detail;
      assign(newUiSchema, payload.changedProperties);
      if (optionsDetail && !newUiSchema.options?.detail) {
        newUiSchema.options = newUiSchema.options || {};
        newUiSchema.options.detail = optionsDetail;
      }
      return getRoot(newUiSchema as EditorUISchemaElement);
    }
  );
};

export const updateUISchemaElementOption = (state: any, payload: any) => {
  const a = withCloneTree(
    state.editor.uiSchema,
    payload.elementUUID,
    state.editor.uiSchema,
    (newUiSchema) => {
      newUiSchema.options = newUiSchema.options || {};
      assign(newUiSchema.options, payload.changedProperties);
      return getRoot(newUiSchema as EditorUISchemaElement);
    }
  );
  return a;
};

export const updateSchemaElement = (state: any, payload: any) => {
  return withCloneTrees(
    state.editor.uiSchema,
    undefined,
    state.editor.schema,
    undefined,
    state,
    (newUiSchema, newSchema) => {
      const uiSchemaElement: any = findByUUID(newUiSchema, payload.elementUUID);
      const linkedShemaElement: any = findByUUID(
        newSchema,
        uiSchemaElement.linkedSchemaElement
      );
      assign(linkedShemaElement.schema, payload.changedProperties);
      return {
        schema: getRoot(newSchema),
        uiSchema: getRoot(newUiSchema),
      };
    }
  );
};

export const updateScreenReference = (state: any, payload: any) => {
  return withCloneTrees(
    state.editor.uiSchema,
    undefined,
    state.editor.schema,
    undefined,
    state,
    (newUiSchema, newSchema) => {
      const uiSchemaElement: SchemaElement = findByUUID(
        newUiSchema,
        payload.elementUUID
      );
      const linkedShemaElement: SchemaElement = findByUUID(
        newSchema,
        uiSchemaElement.linkedSchemaElement
      );
      linkedShemaElement.schema.$ref =
        '#/definitions/' + payload.changedProperties.formRef.id;

      newSchema.schema.definitions = newSchema.schema.definitions || {};

      newSchema.schema.definitions[payload.changedProperties.formRef.id] =
        payload.changedProperties.formRef.schema;

      uiSchemaElement.elements = [];
      uiSchemaElement.elements.push(payload.changedProperties.formRef.uischema);
      return {
        schema: getRoot(newSchema),
        uiSchema: getRoot(newUiSchema),
      };
    }
  );
};
