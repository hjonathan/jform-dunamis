/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import { ControlElement, LabelElement, Layout } from '@jsonforms/core';
import { uuid } from 'uuidv4';

import { getScope, SchemaElement } from '../../model';
import {
  CategorizationLayout,
  EditorCategoryElement,
  EditorUISchemaElement,
} from '../../model/uischema';

export const createControl = (
  schemaElement: any,
  uiSchemaType: string
): ControlElement & EditorUISchemaElement => {
  return createControlWithScope(
    `#${getScope(schemaElement)}`,
    schemaElement.options,
    uiSchemaType
  );
};

export const createControlDrag = (
  schemaElement: any,
  uiSchemaType: string
): any => {
  const uid = uuid();
  return {
    type: uiSchemaType,
    scope: `#/properties/${uiSchemaType}_${uid.split('-').shift()}`,
    options: schemaElement.options,
    uuid: uid,
  };
};

export const createControlWithScope = (
  scope: string,
  options: Record<string, unknown>,
  uiSchemaType: string
): ControlElement & EditorUISchemaElement => {
  return {
    type: uiSchemaType,
    scope: scope,
    options: options,
    uuid: uuid(),
  } as ControlElement & EditorUISchemaElement;
};

export const createLayout = (type: string): Layout & EditorUISchemaElement => {
  return {
    type: type,
    elements: [],
    uuid: uuid(),
  } as Layout & EditorUISchemaElement;
};

export const createLabel = (
  text?: string
): LabelElement & EditorUISchemaElement => {
  return {
    type: 'Label',
    text: text,
    uuid: uuid(),
  } as LabelElement & EditorUISchemaElement;
};

export const createCategory = (label?: string): EditorCategoryElement => {
  return {
    type: 'Category',
    elements: [],
    label: label,
    uuid: uuid(),
  } as EditorCategoryElement;
};

export const createCategorization = (label?: string): CategorizationLayout => {
  return {
    type: 'Categorization',
    label: label,
    uuid: uuid(),
    elements: [],
  } as CategorizationLayout;
};
