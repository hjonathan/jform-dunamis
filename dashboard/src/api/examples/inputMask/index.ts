import schema from './schema.json';
import uischema from './uischema.json';
import data from './data.json';
import { UISchemaElement, JsonSchema } from '@jsonforms/core';
const picture = '';
export const input: {
  schema: JsonSchema;
  uischema: UISchemaElement;
  data: any;
  picture: any;
} = { schema, uischema, data, picture };
