/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */

import { examples } from './examples';

export interface SchemaService {
  getSchema(): Promise<any>;
  getUiSchema(): Promise<any>;
  getTheme(): Promise<any>;
}

export class EmptySchemaService implements SchemaService {
  getSchema = async () => undefined;
  getUiSchema = async () => undefined;
  getTheme = async () => undefined;
}

export class TemplateSchemaService {
  getTemplates = async () => examples;
}
