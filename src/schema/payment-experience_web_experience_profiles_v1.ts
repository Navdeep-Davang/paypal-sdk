// payment-experience_web_experience_profiles_v1 zod

// Its Json Types are 18 (as per ai)
// Total Exported ZodSchemas 19

import { z } from 'zod';

// --- Shared Schemas ---

const ErrorDetailsSchema = z.object({
  field: z.string().optional(),
  value: z.string().optional(),
  location: z.enum(['body', 'path', 'query']).default('body').optional(),
  issue: z.string(),
  description: z.string().optional(),
});

const ErrorLocationSchema = z.enum(['body', 'path', 'query']).default('body');

const ErrorLinkDescriptionSchema = z.object({
  href: z.string().min(0).max(20000).regex(/^.*$/),
  rel: z.string().min(0).max(100).regex(/^.*$/),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']).optional(),
});

// --- Main Schemas ---

const Error400Schema = z.object({
  name: z.enum(['INVALID_REQUEST']).optional(),
  message: z.enum(['Request is not well-formed, syntactically incorrect, or violates schema.']).optional(),
  details: z.array(ErrorDetailsSchema).optional(),
  debug_id: z.string().optional(),
  links: z.array(ErrorLinkDescriptionSchema).optional(),
});

const Error401Schema = z.object({
  name: z.enum(['AUTHENTICATION_FAILURE']).optional(),
  message: z.enum(['Authentication failed due to missing authorization header, or invalid authentication credentials.']).optional(),
  details: z.array(ErrorDetailsSchema).optional(),
  debug_id: z.string().optional(),
  links: z.array(ErrorLinkDescriptionSchema).optional(),
});

const Error403Schema = z.object({
  name: z.enum(['NOT_AUTHORIZED']).optional(),
  message: z.enum(['Authorization failed due to insufficient permissions.']).optional(),
  details: z.array(ErrorDetailsSchema).optional(),
  debug_id: z.string().optional(),
  links: z.array(ErrorLinkDescriptionSchema).optional(),
});

const Error404Schema = z.object({
  name: z.enum(['RESOURCE_NOT_FOUND']).optional(),
  message: z.enum(['The specified resource does not exist.']).optional(),
  details: z.array(ErrorDetailsSchema).optional(),
  debug_id: z.string().optional(),
  links: z.array(ErrorLinkDescriptionSchema).optional(),
});

const Error409Schema = z.object({
  name: z.enum(['RESOURCE_CONFLICT']).optional(),
  message: z.enum(['The server has detected a conflict while processing this request.']).optional(),
  details: z.array(ErrorDetailsSchema).optional(),
  debug_id: z.string().optional(),
  links: z.array(ErrorLinkDescriptionSchema).optional(),
});

const Error415Schema = z.object({
  name: z.enum(['UNSUPPORTED_MEDIA_TYPE']).optional(),
  message: z.enum(['The server does not support the request payload\'s media type.']).optional(),
  details: z.array(ErrorDetailsSchema).optional(),
  debug_id: z.string().optional(),
  links: z.array(ErrorLinkDescriptionSchema).optional(),
});

const Error422Schema = z.object({
  name: z.enum(['UNPROCESSABLE_ENTITY']).optional(),
  message: z.enum(['The requested action could not be performed, semantically incorrect, or failed business validation.']).optional(),
  details: z.array(ErrorDetailsSchema).optional(),
  debug_id: z.string().optional(),
  links: z.array(ErrorLinkDescriptionSchema).optional(),
});

const Error500Schema = z.object({
  name: z.enum(['INTERNAL_SERVER_ERROR']).optional(),
  message: z.enum(['An internal server error occurred.']).optional(),
  debug_id: z.string().optional(),
  links: z.array(ErrorLinkDescriptionSchema).optional(),
});

const Error503Schema = z.object({
  name: z.enum(['SERVICE_UNAVAILABLE']).optional(),
  message: z.enum(['Service Unavailable.']).optional(),
  debug_id: z.string().optional(),
  links: z.array(ErrorLinkDescriptionSchema).optional(),
});

const WebProfileSchema = z.object({
  id: z.string().min(22).max(22).readonly().optional(),
  name: z.string().min(1).max(50),
  temporary: z.boolean().optional(),
  flow_config: z.object({
    landing_page_type: z.enum(["login", "billing"]).optional(),
    bank_txn_pending_url: z.string().url().min(1).max(127).optional(),
    user_action: z.enum(["COMMIT"]).optional(),
    return_uri_http_method: z.enum(["GET", "POST"]).optional()
  }).optional(),
  input_fields: z.object({
    no_shipping: z.number().int().min(0).max(2).optional(),
    address_override: z.number().int().min(0).max(1).optional()
  }).optional(),
  presentation: z.object({
    brand_name: z.string().min(1).max(127).optional(),
    logo_image: z.string().min(1).max(127).optional(),
    locale_code: z.string().min(2).max(5).optional()
  }).optional()
}).required({name: true});

const WebProfileListSchema = z.array(WebProfileSchema).min(1).max(20);

const PatchSchema = z.object({
  op: z.enum(["add", "remove", "replace", "move", "copy", "test"]),
  path: z.string(),
  value: z.unknown().optional(),
  from: z.string().optional()
}).required({ op: true });

const PatchRequestSchema = z.array(PatchSchema);

const ErrorSchema = z.object({
  name: z.string().readonly().optional(),
  debug_id: z.string().readonly().optional(),
  message: z.string().readonly().optional(),
  information_link: z.string().readonly().optional(),
  details: z.array(z.object({
    field: z.string().optional(),
    issue: z.string().optional()
  })).readonly().optional()
}).required({ name: true, message: true, information_link: true });

// --- Parameters Schemas ---
const PaypalRequestIdParameterSchema = z.string().optional();
const IdParameterSchema = z.string();

// --- Exports ---
export {
  ErrorDetailsSchema,
  ErrorLocationSchema,
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
  WebProfileSchema,
  WebProfileListSchema,
  PatchSchema,
  PatchRequestSchema,
  PaypalRequestIdParameterSchema,
  IdParameterSchema,
  ErrorSchema
};