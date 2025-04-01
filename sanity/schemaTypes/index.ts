import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
import { productType } from './productType'
import { salesType } from './salesType';
import { orderType } from './orderType';
export const schemaTypes = [
    blockContentType,
    categoryType,
    productType,    //Cretaed an array of schema types  
    salesType,
    orderType
]

export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypes, // schemaTypes is an array of schema types
};
