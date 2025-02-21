// payments_payouts_batch_v1 zod
// Total types 42, while its json has 39 types (as per ai)

import { z } from 'zod';

// --- Shared Schemas ---

const ErrorLocationSchema = z.enum(['body', 'path', 'query']).default('body');

const ErrorDetailsSchema = z.object({
  field: z.string().optional(),
  value: z.string().optional(),
  location: ErrorLocationSchema.optional(), 
  issue: z.string(),
  description: z.string().optional(),
});


const ErrorLinkDescriptionSchema = z.object({
  href: z.string().min(0).max(20000).regex(/^.*$/),
  rel: z.string().min(0).max(100).regex(/^.*$/),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']).optional(),
});

const CurrencySchema = z.object({
  currency: z.string(),
  value: z.string(),
});

const PhoneSchema = z.object({
  country_code: z.string().min(1).max(3).regex(/^[0-9]{1,3}?$/),
  national_number: z.string().min(1).max(14).regex(/^[0-9]{1,14}?$/),
  extension_number: z.string().min(1).max(15).regex(/^[0-9]{1,15}?$/).optional(),
});

const AlternateNotificationMethodSchema = z.object({
  phone: PhoneSchema.optional(),
});

const LanguageSchema = z.string().min(2).max(10).regex(/^[a-z]{2}(?:-[A-Z][a-z]{3})?(?:-(?:[A-Z]{2}))?$/);

const ApplicationContextSchema = z.object({
  social_feed_privacy: z.string().min(1).max(15).regex(/^.*$/).default("PRIVATE").optional(),
  holler_url: z.string().url().min(1).max(1000).optional().describe("deprecated"),
  logo_url: z.string().url().min(0).max(1000).optional(),
});

const PurposeEnumSchema = z.enum([
  "AWARDS",
  "PRIZES",
  "DONATIONS",
  "GOODS",
  "SERVICES",
  "REBATES",
  "CASHBACK",
  "DISCOUNTS",
  "NON_GOODS_OR_SERVICES"
]);

const RecipientEnumSchema = z.enum(["EMAIL", "PHONE", "PAYPAL_ID"]);

const BatchEnumSchema = z.enum(["DENIED", "PENDING", "PROCESSING", "SUCCESS", "CANCELED"]);

const TransactionEnumSchema = z.enum([
  "SUCCESS",
  "FAILED",
  "PENDING",
  "UNCLAIMED",
  "RETURNED",
  "ONHOLD",
  "BLOCKED",
  "REFUNDED",
  "REVERSED"
]);

const FundingSourceSchema = z.enum(["BALANCE"]);

const NameSchema = z.object({
  prefix: z.string().max(140).optional(),
  given_name: z.string().max(140).optional(),
  surname: z.string().max(140).optional(),
  middle_name: z.string().max(140).optional(),
  suffix: z.string().max(140).optional(),
  alternate_full_name: z.string().max(300).optional().describe("deprecated"),
  full_name: z.string().max(300).optional(),
});

const RecipientWalletEnumSchema = z.enum(["PAYPAL", "VENMO", "RECIPIENT_SELECTED"]).default("PAYPAL");

const LinkDescriptionSchema = z.object({
  href: z.string(),
  rel: z.string(),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'CONNECT', 'OPTIONS', 'PATCH']).optional(),
});

// --- Main Schemas ---

const SenderBatchHeaderSchema = z.object({
  sender_batch_id: z.string().min(0).max(256).regex(/^.*$/).optional(),
  recipient_type: z.string().min(0).max(13).regex(/^.*$/).optional(),
  email_subject: z.string().min(0).max(255).regex(/^.*$/).optional(),
  email_message: z.string().min(0).max(1000).regex(/^.*$/).optional(),
  note: z.string().min(0).max(1000).regex(/^.*$/).optional(),
});

const PayoutItemSchema = z.object({
  recipient_type: z.string().min(0).max(13).regex(/^.*$/).optional(),
  amount: CurrencySchema,
  note: z.string().min(0).max(4000).regex(/^.*$/).optional(),
  receiver: z.string().min(0).max(127).regex(/^.*$/),
  sender_item_id: z.string().min(0).max(63).regex(/^.*$/).optional(),
  recipient_wallet: z.string().min(0).max(36).regex(/^.*$/).default("PAYPAL").optional(),
  alternate_notification_method: AlternateNotificationMethodSchema.optional(),
  notification_language: LanguageSchema.optional(),
  application_context: ApplicationContextSchema.optional(),
  purpose: PurposeEnumSchema.optional(),
});

const CreatePayoutRequestSchema = z.object({
  sender_batch_header: SenderBatchHeaderSchema,
  items: z.array(PayoutItemSchema).min(1).max(15000),
});

const Error400Schema = z.object({
  name: z.enum(['INVALID_REQUEST']).optional(),
  message: z.enum(['Request is not well-formed, syntactically incorrect, or violates schema.']).optional(),
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

const Error500Schema = z.object({
  name: z.enum(['INTERNAL_SERVER_ERROR']).optional(),
  message: z.enum(['An internal server error occurred.']).optional(),
  debug_id: z.string().optional(),
  links: z.array(ErrorLinkDescriptionSchema).optional(),
});

const ErrorDetails2Schema = z.object({
  field: z.string().optional(),
  value: z.string().optional(),
  location: z.string().optional(),
  issue: z.string(),
  description: z.string().optional(),
});

const LinkDescription2Schema = z.object({
  href: z.string(),
  rel: z.string(),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'CONNECT', 'OPTIONS', 'PATCH']).optional(),
});

const ErrorSchema = z.object({
  name: z.string().optional(),
  message: z.string().optional(),
  debug_id: z.string().optional(),
  information_link: z.string().optional(),
  details: z.array(ErrorDetails2Schema).optional(),
  links: z.array(LinkDescription2Schema).optional(),
});

const PayoutSenderBatchHeaderSchema = z.object({
  sender_batch_id: z.string().min(0).max(256).regex(/^.*$/).optional(),
  recipient_type: RecipientEnumSchema.optional(),
  email_subject: z.string().min(0).max(255).regex(/^.*$/).optional(),
  email_message: z.string().min(0).max(1000).regex(/^.*$/).optional(),
});

const PayoutHeaderSchema = z.object({
  payout_batch_id: z.string().min(0).max(30).regex(/^.*$/).optional(),
  batch_status: BatchEnumSchema,
  time_created: z.string().datetime().min(0).max(100).optional(),
  sender_batch_header: PayoutSenderBatchHeaderSchema,
});

const PayoutSchema = z.object({
  batch_header: PayoutHeaderSchema.optional(),
  links: z.array(LinkDescriptionSchema).min(1).max(15000).readonly().optional(),
});

const PayoutBatchHeaderSchema = z.object({
  payout_batch_id: z.string().min(0).max(30).regex(/^.*$/).optional(),
  batch_status: BatchEnumSchema,
  time_created: z.string().datetime().min(0).max(100).optional(),
  time_completed: z.string().datetime().min(0).max(100).optional(),
  time_closed: z.string().datetime().min(0).max(100).optional(),
  sender_batch_header: PayoutSenderBatchHeaderSchema,
  funding_source: FundingSourceSchema.optional(),
  amount: CurrencySchema.optional(),
  fees: CurrencySchema.optional(),
});

const PayoutItemDetailSchema = z.object({
  recipient_type: RecipientEnumSchema.optional(),
  amount: CurrencySchema,
  note: z.string().min(0).max(4000).regex(/^.*$/).optional(),
  receiver: z.string().min(0).max(127).regex(/^.*$/),
  sender_item_id: z.string().min(0).max(63).regex(/^.*$/).optional(),
  recipient_name: NameSchema.optional(),
  recipient_wallet: RecipientWalletEnumSchema.optional(),
  purpose: PurposeEnumSchema.optional(),
});

const PayoutCurrencyConversionSchema = z.object({
  from_amount: CurrencySchema.optional(),
  to_amount: CurrencySchema.optional(),
  exchange_rate: z.string().min(0).max(30).regex(/^.*$/).optional(),
});

const PayoutBatchItemsSchema = z.object({
  payout_item_id: z.string().min(0).max(30).regex(/^.*$/).optional(),
  transaction_id: z.string().min(0).max(30).regex(/^.*$/).optional(),
  activity_id: z.string().min(0).max(30).regex(/^.*$/).optional(),
  transaction_status: TransactionEnumSchema.optional(),
  payout_item_fee: CurrencySchema.optional(),
  payout_batch_id: z.string().min(0).max(30).regex(/^.*$/).optional(),
  payout_item: PayoutItemDetailSchema,
  currency_conversion: PayoutCurrencyConversionSchema.optional(),
  time_processed: z.string().datetime().min(0).max(100).optional(),
  errors: ErrorSchema.optional(),
  links: z.array(LinkDescriptionSchema).min(0).max(15000).readonly().optional(),
});

const PayoutBatchSchema = z.object({
  total_items: z.number().int().min(0).max(15000).optional(),
  total_pages: z.number().int().min(0).max(1000).optional(),
  batch_header: PayoutBatchHeaderSchema.optional(),
  items: z.array(PayoutBatchItemsSchema).min(0).max(15000).optional(),
  links: z.array(LinkDescriptionSchema).min(0).max(15000).readonly().optional(),
});

const PayoutItem2Schema = z.object({
  payout_item_id: z.string().min(0).max(30).regex(/^.*$/).optional(),
  transaction_id: z.string().min(0).max(30).regex(/^.*$/).optional(),
  activity_id: z.string().min(0).max(30).regex(/^.*$/).optional(),
  transaction_status: TransactionEnumSchema.optional(),
  payout_item_fee: CurrencySchema.optional(),
  payout_batch_id: z.string().min(0).max(30).regex(/^.*$/).optional(),
  sender_batch_id: z.string().min(0).max(256).regex(/^.*$/).optional(),
  payout_item: PayoutItemDetailSchema,
  currency_conversion: PayoutCurrencyConversionSchema.optional(),
  time_processed: z.string().datetime().min(1).max(100).optional(),
  errors: ErrorSchema.optional(),
  links: z.array(LinkDescriptionSchema).min(0).max(15000).readonly().optional(),
});


const Error404Schema = z.object({
  name: z.enum(['RESOURCE_NOT_FOUND']).optional(),
  message: z.enum(['The specified resource does not exist.']).optional(),
  details: z.array(ErrorDetailsSchema).optional(),
  debug_id: z.string().optional(),
  links: z.array(ErrorLinkDescriptionSchema).optional(),
});


// --- Parameters Schemas ---
const PaypalRequestIdParameterSchema = z.string().min(1).max(1000).optional();
const IdParameterSchema = z.string().min(1).max(1000);
const FieldsParameterSchema = z.string().min(1).max(1000).optional();
const PageParameterSchema = z.number().int().min(0).max(1000).default(1).optional();
const PageSizeParameterSchema = z.number().int().min(0).max(1000).optional();
const TotalRequiredParameterSchema = z.boolean().default(false).optional();
const PayoutItemIdParameterSchema = z.string().min(1).max(32);

// --- Exports ---
export {
  ErrorDetailsSchema,
  ErrorLocationSchema,
  ErrorLinkDescriptionSchema,
  CurrencySchema,
  PhoneSchema,
  AlternateNotificationMethodSchema,
  LanguageSchema,
  ApplicationContextSchema,
  PurposeEnumSchema,
  RecipientEnumSchema,
  BatchEnumSchema,
  TransactionEnumSchema,
  FundingSourceSchema,
  NameSchema,
  RecipientWalletEnumSchema,
  LinkDescriptionSchema,
  SenderBatchHeaderSchema,
  PayoutItemSchema,
  CreatePayoutRequestSchema,
  Error400Schema,
  Error403Schema,
  Error500Schema,
  PayoutSenderBatchHeaderSchema,
  PayoutHeaderSchema,
  PayoutSchema,
  PayoutBatchHeaderSchema,
  PayoutItemDetailSchema,
  PayoutCurrencyConversionSchema,
  PayoutBatchItemsSchema,
  PayoutBatchSchema,
  PayoutItem2Schema,
  PaypalRequestIdParameterSchema,
  IdParameterSchema,
  FieldsParameterSchema,
  PageParameterSchema,
  PageSizeParameterSchema,
  TotalRequiredParameterSchema,
  PayoutItemIdParameterSchema,
  ErrorDetails2Schema,
  LinkDescription2Schema,
  ErrorSchema,
  Error404Schema
};