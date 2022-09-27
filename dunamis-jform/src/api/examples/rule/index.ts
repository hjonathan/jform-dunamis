import schema from './schema.json';
import uischema from './uischema.json';
import data from './data.json';
import theme from './theme.json';
import { UISchemaElement, JsonSchema } from '@jsonforms/core';

export const input: {
  schema: JsonSchema;
  uischema: UISchemaElement;
  data: any;
  theme: any;
} = { schema, uischema, data, theme };
