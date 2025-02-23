// notifications_webhooks_v1 ts types 

// Total 40 ts types

import { z } from 'zod';
import {
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
} from '../schema/notifications_webhooks_v1';

export type ErrorDetails = z.infer<typeof ErrorDetailsSchema>;
export type ErrorLocation = z.infer<typeof ErrorLocationSchema>;
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
export type LinkDescription = z.infer<typeof LinkDescriptionSchema>;
export type EventType = z.infer<typeof EventTypeSchema>;
export type Webhook = z.infer<typeof WebhookSchema>;
export type WebhookList = z.infer<typeof WebhookListSchema>;
export type Patch = z.infer<typeof PatchSchema>;
export type PatchRequest = z.infer<typeof PatchRequestSchema>;
export type WebhooksLookup = z.infer<typeof WebhooksLookupSchema>;
export type EventVersion = z.infer<typeof EventVersionSchema>;
export type ResourceVersion = z.infer<typeof ResourceVersionSchema>;
export type Event = z.infer<typeof EventSchema>;
export type VerifyWebhookSignature = z.infer<typeof VerifyWebhookSignatureSchema>;
export type VerifyWebhookSignatureResponse = z.infer<typeof VerifyWebhookSignatureResponseSchema>;
export type EventResend = z.infer<typeof EventResendSchema>;
export type SimulateEvent = z.infer<typeof SimulateEventSchema>;
export type WebhookLookupList = z.infer<typeof WebhookLookupListSchema>;
export type EventList = z.infer<typeof EventListSchema>;
export type ErrorDetails2 = z.infer<typeof ErrorDetails2Schema>;
export type Error = z.infer<typeof ErrorSchema>;

//Parameter Types
export type PaypalRequestIdParameter = z.infer<typeof PaypalRequestIdParameterSchema>;
export type AnchorTypeParameter = z.infer<typeof AnchorTypeParameterSchema>;
export type WebhookIdParameter = z.infer<typeof WebhookIdParameterSchema>;
export type WebhookLookupIdParameter = z.infer<typeof WebhookLookupIdParameterSchema>;
export type PageSizeParameter = z.infer<typeof PageSizeParameterSchema>;
export type StartTimeParameter = z.infer<typeof StartTimeParameterSchema>;
export type EndTimeParameter = z.infer<typeof EndTimeParameterSchema>;
export type TransactionIdParameter = z.infer<typeof TransactionIdParameterSchema>;
export type EventTypeParameter = z.infer<typeof EventTypeParameterSchema>;
export type EventIdParameter = z.infer<typeof EventIdParameterSchema>;