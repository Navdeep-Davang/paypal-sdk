import { z } from 'zod';
import {
  ProductCategorySchema,
  ErrorDetailsSchema,
  ErrorLinkDescriptionSchema,
  Error400Schema,
  Error401Schema,
  Error403Schema,
  Error404Schema,
  Error409Schema,
  Error415Schema,
  Error422Schema,
  Error500Schema,
  Error503Schema,
  ErrorDefaultSchema,
  DateTimeSchema,
  LinkDescriptionSchema,
  ProductCollectionElementSchema,
  ProductCollectionSchema,
  ProductRequestPOSTSchema,
  ProductSchema,
  ProductsCreate400Schema,
  PatchSchema,
  PatchRequestSchema,
  ProductsPatch400Schema,
  ProductsPatch422Schema,
  PreferParameterSchema,
  PaypalRequestIdParameterSchema,
  PageSizeParameterSchema,
  PageParameterSchema,
  TotalRequiredParameterSchema,
  ProductIdParameterSchema,
  _400Schema,
  _401Schema,
  _403Schema,
  _404Schema,
  _422Schema,
} from '../schema/catalogs_products_v1';

export type ProductCategory = z.infer<typeof ProductCategorySchema>;
export type ErrorDetails = z.infer<typeof ErrorDetailsSchema>;
export type ErrorLinkDescription = z.infer<typeof ErrorLinkDescriptionSchema>;
export type Error400 = z.infer<typeof Error400Schema>;
export type Error401 = z.infer<typeof Error401Schema>;
export type Error403 = z.infer<typeof Error403Schema>;
export type Error404 = z.infer<typeof Error404Schema>;
export type Error409 = z.infer<typeof Error409Schema>;
export type Error415 = z.infer<typeof Error415Schema>;
export type Error422 = z.infer<typeof Error422Schema>;
export type Error500 = z.infer<typeof Error500Schema>;
export type Error503 = z.infer<typeof Error503Schema>;
export type ErrorDefault = z.infer<typeof ErrorDefaultSchema>;
export type DateTime = z.infer<typeof DateTimeSchema>;
export type LinkDescription = z.infer<typeof LinkDescriptionSchema>;
export type ProductCollectionElement = z.infer<typeof ProductCollectionElementSchema>;
export type ProductCollection = z.infer<typeof ProductCollectionSchema>;
export type ProductRequestPOST = z.infer<typeof ProductRequestPOSTSchema>;
export type Product = z.infer<typeof ProductSchema>;
export type ProductsCreate400 = z.infer<typeof ProductsCreate400Schema>;
export type Patch = z.infer<typeof PatchSchema>;
export type PatchRequest = z.infer<typeof PatchRequestSchema>;
export type ProductsPatch400 = z.infer<typeof ProductsPatch400Schema>;
export type ProductsPatch422 = z.infer<typeof ProductsPatch422Schema>;
export type PreferParameter = z.infer<typeof PreferParameterSchema>;
export type PaypalRequestIdParameter = z.infer<typeof PaypalRequestIdParameterSchema>;
export type PageSizeParameter = z.infer<typeof PageSizeParameterSchema>;
export type PageParameter = z.infer<typeof PageParameterSchema>;
export type TotalRequiredParameter = z.infer<typeof TotalRequiredParameterSchema>;
export type ProductIdParameter = z.infer<typeof ProductIdParameterSchema>;
export type _400 = z.infer<typeof _400Schema>;
export type _401 = z.infer<typeof _401Schema>;
export type _403 = z.infer<typeof _403Schema>;
export type _404 = z.infer<typeof _404Schema>;
export type _422 = z.infer<typeof _422Schema>;