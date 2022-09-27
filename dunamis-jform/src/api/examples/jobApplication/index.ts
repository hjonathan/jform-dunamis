import schema from './schema.json';
import uischema from './uischema.json';
import data from './data.json';
import theme from './theme.json';

import { UISchemaElement, JsonSchema } from '@jsonforms/core';
const picture = 'jobApplication/jobApplication.png';
export const input: {
  schema: JsonSchema;
  uischema: UISchemaElement;
  data: any;
  picture: any;
  theme: any;
} = { schema, uischema, data, picture, theme };
