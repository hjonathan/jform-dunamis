/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import { ControlElement } from '@jsonforms/core';
import { v4 as uuid } from 'uuid';

import { getScope, SchemaElement } from '../../model';
import {
  CategorizationLayout,
  EditorCategoryElement,
  EditorUISchemaElement,
} from '../../model/uischema';

export const createControl = (
  type: string,
  options?: Record<string, unknown>
) => {
  return {
    ...{
      type,
    },
    ...options,
  };
};
