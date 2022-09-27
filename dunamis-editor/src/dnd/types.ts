/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
// import { getArrayContainer, SchemaElement } from '../model';
import {
  containsControls,
  EditorLayout,
  EditorUISchemaElement,
  getDetailContainer,
} from '../model/uischema';
import { tryFindByUUID } from '../util/schemasUtil';
import { getHierarchy } from '../util/tree';

export const NEW_UI_SCHEMA_ELEMENT: 'newUiSchemaElement' = 'newUiSchemaElement';
export const MOVE_UI_SCHEMA_ELEMENT: 'moveUiSchemaElement' =
  'moveUiSchemaElement';

export type DndType = NewUISchemaElement;

export interface NewUISchemaElement {
  type: 'newUiSchemaElement';
  uiSchemaElement: EditorUISchemaElement;
  schemaUUID?: string;
}

const newUISchemaElement = (
  uiSchemaElement: EditorUISchemaElement,
  schemaUUID?: string
) => ({
  type: NEW_UI_SCHEMA_ELEMENT,
  uiSchemaElement,
  schemaUUID,
});


export const DndItems = { newUISchemaElement };

