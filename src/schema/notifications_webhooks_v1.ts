// notifications_webhooks_v1 zod

// Its json has 31 types (as per ai)
// Total Exported ZodSchemas 40

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

const LinkDescriptionSchema = z.object({
  href: z.string(),
  rel: z.string(),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'CONNECT', 'OPTIONS', 'PATCH']).optional(),
});

const ErrorDetails2Schema = z.object({
  field: z.string().optional(),
  value: z.string().optional(),
  location: z.string().default('body').optional(),
  issue: z.string(),
  description: z.string().optional()
}).required({issue: true});

const EventTypeSchema = z.object({
  name: z.string().optional(),
  description: z.string().readonly().optional(),
  status: z.string().readonly().optional(),
  resource_versions: z.array(z.string()).readonly().optional()
}).required({name: true});

const WebhookSchema = z.object({
  id: z.string().readonly().optional(),
  url: z.string().url().max(2048).optional(),
  event_types: z.array(EventTypeSchema).max(500).optional(),
  links: z.array(LinkDescriptionSchema).readonly().optional()
}).required({
    url: true,
    event_types: true
});

const WebhookListSchema = z.object({
  webhooks: z.array(WebhookSchema).optional()
});

const PatchSchema = z.object({
  op: z.enum(['add', 'remove', 'replace', 'move', 'copy', 'test']),
  path: z.string(),
  value: z.unknown().optional(),
  from: z.string().optional()
}).required({ op: true });

const PatchRequestSchema = z.array(PatchSchema);

const WebhooksLookupSchema = z.object({
  id: z.string().readonly().optional(),
  client_id: z.string().regex(/^(?!\d+$)\w+\S+/).max(128).readonly().optional(),
  links: z.array(LinkDescriptionSchema).readonly().optional()
});

const EventVersionSchema = z.string().regex(/^([0-9]+.[0-9]+)$/).optional().describe("deprecated");

const ResourceVersionSchema = z.string().regex(/^([0-9]+.[0-9]+)$/).optional();

const EventSchema = z.object({
  id: z.string().readonly().optional(),
  create_time: z.string().datetime().readonly().optional(),
  resource_type: z.string().readonly().optional(),
  event_version: EventVersionSchema.optional(),
  event_type: z.string().readonly().optional(),
  summary: z.string().readonly().optional(),
  resource_version: ResourceVersionSchema.optional(),
  resource: z.record(z.any()).readonly().optional(),
  links: z.array(LinkDescriptionSchema).readonly().optional()
});

const VerifyWebhookSignatureSchema = z.object({
  auth_algo: z.string().max(100).regex(/^[a-zA-Z0-9]+$/),
  cert_url: z.string().url().max(500),
  transmission_id: z.string().regex(/^(?!\d+$)\w+\S+/).max(50),
  transmission_sig: z.string().regex(/^(?!\d+$)\w+\S+/).max(500),
  transmission_time: z.string().datetime().max(100),
  webhook_id: z.string().regex(/^[a-zA-Z0-9]+$/).max(50),
  webhook_event: EventSchema
}).required({
    auth_algo: true,
    cert_url: true,
    transmission_id: true,
    transmission_sig: true,
    transmission_time: true,
    webhook_id: true,
    webhook_event: true
});

const VerifyWebhookSignatureResponseSchema = z.object({
  verification_status: z.enum(["SUCCESS", "FAILURE"])
}).required({ verification_status: true });

const EventResendSchema = z.object({
  webhook_ids: z.array(z.string()).max(500).optional()
});

const SimulateEventSchema = z.object({
  webhook_id: z.string().regex(/^[a-zA-Z0-9]+$/).max(50).optional(),
  url: z.string().url().max(2048).optional(),
  event_type: z.string().regex(/^[a-zA-Z0-9.]+$/).max(50),
  resource_version: z.string().optional()
}).required({ event_type: true });

const WebhookLookupListSchema = z.object({
  webhooks_lookups: z.array(WebhooksLookupSchema).optional()
});

const EventListSchema = z.object({
  events: z.array(EventSchema).optional(),
  count: z.number().int().optional(),
  links: z.array(LinkDescriptionSchema).readonly().optional()
});

const ErrorSchema = z.object({
  name: z.string().optional(),
  message: z.string().optional(),
  debug_id: z.string().optional(),
  information_link: z.string().readonly().optional(),
  details: z.array(ErrorDetails2Schema).optional(),
  links: z.array(LinkDescriptionSchema).readonly().optional()
}).required({
    name: true,
    message: true,
    debug_id: true
});

// --- Parameters Schemas ---
const PaypalRequestIdParameterSchema = z.string().max(78).optional();
const AnchorTypeParameterSchema = z.enum(["APPLICATION", "ACCOUNT"]).default("APPLICATION").optional();
const WebhookIdParameterSchema = z.string();
const WebhookLookupIdParameterSchema = z.string();
const PageSizeParameterSchema = z.number().int().default(10).optional();
const StartTimeParameterSchema = z.string().optional();
const EndTimeParameterSchema = z.string().optional();
const TransactionIdParameterSchema = z.string().optional();
const EventTypeParameterSchema = z.string().optional();
const EventIdParameterSchema = z.string().max(50).regex(/^[a-zA-Z0-9]+$/);

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
  LinkDescriptionSchema,
  EventTypeSchema,
  WebhookSchema,
  WebhookListSchema,
  PatchSchema,
  PatchRequestSchema,
  WebhooksLookupSchema,
  EventVersionSchema,
  ResourceVersionSchema,
  EventSchema,
  VerifyWebhookSignatureSchema,
  VerifyWebhookSignatureResponseSchema,
  EventResendSchema,
  SimulateEventSchema,
  WebhookLookupListSchema,
  EventListSchema,
  ErrorDetails2Schema,
  ErrorSchema,
  PaypalRequestIdParameterSchema,
  AnchorTypeParameterSchema,
  WebhookIdParameterSchema,
  WebhookLookupIdParameterSchema,
  PageSizeParameterSchema,
  StartTimeParameterSchema,
  EndTimeParameterSchema,
  TransactionIdParameterSchema,
  EventTypeParameterSchema,
  EventIdParameterSchema
};