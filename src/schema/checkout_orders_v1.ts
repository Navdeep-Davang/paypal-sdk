

// checkout_orders_v1 zod

// Its json has 32 types (as per ai)
// Total Exported ZodSchemas 44

import { z } from 'zod';

// --- Shared Schemas ---

const ErrorDetailsSchema = z.object({
  field: z.string().optional(),
  value: z.string().optional(),
  location: z.enum(['body', 'path', 'query']).default('body').optional(),
  issue: z.string(),
  description: z.string().optional(),
});

const ErrorLinkDescriptionSchema = z.object({
  href: z.string().min(0).max(20000).regex(/^.*$/),
  rel: z.string().min(0).max(100).regex(/^.*$/),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']).optional(),
});

const ErrorDetails2Schema = z.object({
  field: z.string().optional(),
  value: z.string().optional(),
  location: z.enum(["body", "path", "query"]).default("body").optional(),
  issue: z.string(),
  description: z.string().optional(),
});

const ErrorSchema = z.object({
  name: z.string(),
  message: z.string(),
  debug_id: z.string(),
  information_link: z.string().optional(),
  details: z.array(z.lazy(() => ErrorDetails2Schema)).optional(),
  links: z.array(z.lazy(() => LinkDescriptionSchema)).optional(),
});

const ErrorLocationSchema = z.enum(["body", "path", "query"]).default("body");


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

const ErrorDefaultSchema = z.union([
  Error400Schema,
  Error401Schema,
  Error403Schema,
  Error404Schema,
  Error409Schema,
  Error415Schema,
  Error422Schema,
  Error500Schema,
  Error503Schema
]);

const CurrencySchema = z.object({
  currency: z.string(),
  value: z.string(),
});

const AmountDetailsSchema = z.object({
  subtotal: z.string().optional(),
  shipping: z.string().optional(),
  tax: z.string().optional(),
  handling_fee: z.string().optional(),
  shipping_discount: z.string().optional(),
  insurance: z.string().optional(),
  gift_wrap: z.string().optional(),
});

const AmountSchema = z.object({
  currency: z.string(),
  total: z.string(),
  details: AmountDetailsSchema.optional(),
});

const PayeeDisplayMetadataSchema = z.object({
  email: z.string().email().optional(),
  display_phone: z.object({
    country_code: z.string().optional(),
    number: z.string().optional(),
  }).optional(),
  brand_name: z.string().optional(),
});

const PayeeSchema = z.object({
  email: z.string().email().optional(),
  merchant_id: z.string().optional(),
  payee_display_metadata: PayeeDisplayMetadataSchema.optional(),
});

const ItemSchema = z.object({
  sku: z.string().max(127).optional(),
  name: z.string().max(127),
  description: z.string().max(127).optional(),
  quantity: z.string().max(10).regex(/^[0-9]{0,10}$/),
  price: z.string().max(10).regex(/^[0-9]{0,10}(\.[0-9]{0,2})?$/),
  currency: z.string(),
  tax: z.string().optional(),
  url: z.string().url().optional(),
});

const CountryCodeSchema = z.string().min(2).max(2).regex(/^([A-Z]{2}|C2)$/);

const AddressSchema = z.object({
  line1: z.string(),
  line2: z.string().optional(),
  city: z.string(),
  country_code: CountryCodeSchema,
  postal_code: z.string().optional(),
  state: z.string().max(40).optional(),
  phone: z.string().regex(/^\+?[0-9]+$/).optional(),
  normalization_status: z.enum(["UNKNOWN", "UNNORMALIZED_USER_PREFERRED", "NORMALIZED", "UNNORMALIZED"]).readonly().optional(),
  type: z.string().optional(),
});

const ShippingAddressSchema = AddressSchema.extend({
  recipient_name: z.string().max(127).optional(),
});

const PartnerFeeDetailsSchema = z.object({
  receiver: PayeeSchema,
  amount: CurrencySchema,
});

const NameValuePairSchema = z.object({
  name: z.string(),
  value: z.string(),
});

const MetadataSchema = z.object({
  supplementary_data: z.array(NameValuePairSchema).optional(),
});

const LinkDescriptionSchema = z.object({
  href: z.string(),
  rel: z.string(),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'CONNECT', 'OPTIONS', 'PATCH']).optional(),
});

const CaptureSchema = z.object({
  id: z.string().readonly().optional(),
  amount: CurrencySchema,
  status: z.enum(["PENDING", "COMPLETED", "REFUNDED", "PARTIALLY_REFUNDED", "DENIED"]).readonly().optional(),
  reason_code: z.enum(["CHARGEBACK", "GUARANTEE", "BUYER_COMPLAINT", "REFUND", "UNCONFIRMED_SHIPPING_ADDRESS", "ECHECK", "INTERNATIONAL_WITHDRAWAL", "RECEIVING_PREFERENCE_MANDATES_MANUAL_ACTION", "PAYMENT_REVIEW", "REGULATORY_REVIEW", "UNILATERAL", "VERIFICATION_REQUIRED", "DELAYED_DISBURSEMENT"]).readonly().optional(),
  transaction_fee: CurrencySchema.optional(),
  links: z.array(LinkDescriptionSchema).readonly().optional(),
});

const RefundSchema = z.object({
  id: z.string().readonly().optional(),
  amount: CurrencySchema,
  capture_id: z.string().readonly().optional(),
  sale_id: z.string().readonly().optional(),
  status: z.enum(["PENDING", "COMPLETED", "FAILED"]).readonly().optional(),
  links: z.array(LinkDescriptionSchema).readonly().optional(),
});

const SaleSchema = z.object({
  id: z.string().readonly().optional(),
  amount: CurrencySchema,
  transaction_fee: CurrencySchema.optional(),
  status: z.enum(["COMPLETED", "PARTIALLY_REFUNDED", "PENDING", "REFUNDED", "DENIED"]).readonly().optional(),
  reason_code: z.enum(["CHARGEBACK", "GUARANTEE", "BUYER_COMPLAINT", "REFUND", "UNCONFIRMED_SHIPPING_ADDRESS", "ECHECK", "INTERNATIONAL_WITHDRAWAL", "RECEIVING_PREFERENCE_MANDATES_MANUAL_ACTION", "PAYMENT_REVIEW", "REGULATORY_REVIEW", "UNILATERAL", "VERIFICATION_REQUIRED", "DELAYED_DISBURSEMENT"]).readonly().optional(),
  create_time: z.string().datetime().readonly().optional(),
  update_time: z.string().datetime().readonly().optional(),
  links: z.array(LinkDescriptionSchema).readonly().optional(),
});

const PaymentSummarySchema = z.object({
  captures: z.array(CaptureSchema).min(1).optional(),
  refunds: z.array(RefundSchema).min(1).optional(),
  sales: z.array(SaleSchema).min(1).optional(),
  authorizations: z.array(SaleSchema).min(1).optional(),
});

const PurchaseUnitSchema = z.object({
  reference_id: z.string().max(256),
  amount: AmountSchema,
  payee: PayeeSchema.optional(),
  description: z.string().max(127).optional(),
  custom: z.string().max(127).optional(),
  invoice_number: z.string().max(256).optional(),
  payment_descriptor: z.string().max(22).optional(),
  items: z.array(ItemSchema).optional(),
  notify_url: z.string().url().max(2048).optional(),
  shipping_address: ShippingAddressSchema.optional(),
  shipping_method: z.string().optional(),
  partner_fee_details: PartnerFeeDetailsSchema.optional(),
  payment_linked_group: z.number().int().min(1).max(100).optional(),
  metadata: MetadataSchema.optional(),
  payment_summary: PaymentSummarySchema.optional(),
  status: z.enum(["NOT_PROCESSED", "PENDING", "VOIDED", "AUTHORIZED", "CAPTURED"]).readonly().optional(),
  reason_code: z.enum(["PAYER_SHIPPING_UNCONFIRMED", "MULTI_CURRENCY", "RISK_REVIEW", "REGULATORY_REVIEW", "VERIFICATION_REQUIRED", "ORDER", "OTHER", "DECLINED_BY_POLICY"]).readonly().optional(),
});

const PaymentDetailsSchema = z.object({
  payment_id: z.string().optional(),
  disbursement_mode: z.enum(["INSTANT", "DELAYED"]).optional(),
});  

const LanguageSchema = z.string().min(2).max(10).regex(/^[a-z]{2}(?:-[A-Z][a-z]{3})?(?:-(?:[A-Z]{2}))?$/);

const ApplicationContextSchema = z.object({
  brand_name: z.string().max(127).optional(),
  locale: LanguageSchema.optional(),
  shipping_preference: z.enum(["NO_SHIPPING", "GET_FROM_FILE", "SET_PROVIDED_ADDRESS"]).optional(),
  user_action: z.enum(["CONTINUE", "PAY_NOW"]).optional(),
  supplementary_data: z.array(NameValuePairSchema).optional(),
});

const OrderSchema = z.object({
  id: z.string().readonly().optional(),
  intent: z.enum(["SALE", "AUTHORIZE"]).optional(),
  purchase_units: z.array(PurchaseUnitSchema).min(1),
  payment_details: z.any().optional(), // TODO: PaymentDetails schema
  gross_total_amount: CurrencySchema.optional(),
  application_context: ApplicationContextSchema.optional(),
  metadata: MetadataSchema.describe("deprecated").optional(),
  status: z.enum(["CREATED", "APPROVED", "COMPLETED", "FAILED"]).readonly().optional(),
  redirect_urls: z.object({
    return_url: z.string().url(),
    cancel_url: z.string().url(),
  }),
  create_time: z.string().datetime().readonly().optional(),
  update_time: z.string().datetime().readonly().optional(),
  links: z.array(LinkDescriptionSchema).readonly().optional(),
});

const CreditCardSchema = z.object({
  number: z.string(),
  type: z.string(),
  expire_month: z.number().int(),
  expire_year: z.number().int(),
  cvv2: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  billing_address: AddressSchema.optional(),
  links: z.array(LinkDescriptionSchema).readonly().optional(),
});

const CreditCardTokenSchema = z.object({
  credit_card_id: z.string(),
  payer_id: z.string().optional(),
  last4: z.string().readonly().optional(),
  type: z.string().readonly().optional(),
  expire_month: z.number().int().readonly().optional(),
  expire_year: z.number().int().readonly().optional(),
});

const FundingInstrumentSchema = z.object({
  credit_card: CreditCardSchema.optional().describe("deprecated"),
  credit_card_token: CreditCardTokenSchema.optional(),
});

const PayerInfoSchema = z.object({
  email: z.string().email().max(127).optional(),
  salutation: z.string().readonly().optional(),
  first_name: z.string().readonly().optional(),
  middle_name: z.string().readonly().optional(),
  last_name: z.string().readonly().optional(),
  suffix: z.string().readonly().optional(),
  payer_id: z.string().readonly().optional(),
  birth_date: z.string().datetime().optional(),
  tax_id: z.string().max(14).optional(),
  tax_id_type: z.enum(["BR_CPF", "BR_CNPJ"]).optional(),
  country_code: z.string().optional(),
  billing_address: AddressSchema.optional(),
  shipping_address: ShippingAddressSchema.readonly().optional().describe("deprecated"),
});

const PayerSchema = z.object({
  payment_method: z.enum(["credit_card", "bank", "paypal", "pay_upon_invoice", "carrier", "alternate_payment"]).optional(),
  status: z.enum(["VERIFIED", "UNVERIFIED"]).readonly().optional(),
  funding_instruments: z.array(FundingInstrumentSchema).optional(),
  payer_info: PayerInfoSchema.optional(),
});

const PayOrderRequestSchema = z.object({
  disbursement_mode: z.enum(["INSTANT", "DELAYED"]),
  payer: PayerSchema.optional(),
});

const PayOrderResponseSchema = z.object({
  order_id: z.string().readonly().optional(),
  status: z.enum(["APPROVED", "CANCELED", "COMPLETED", "CREATED", "EXPIRED", "FAILED", "IN_PROGRESS", "SUBMITTED"]).readonly().optional(),
  intent: z.enum(["SALE", "AUTHORIZE"]).optional(),
  payer_info: PayerInfoSchema.optional(),
  purchase_units: z.array(PurchaseUnitSchema).min(1).optional(),
  create_time: z.string().datetime().readonly().optional(),
  update_time: z.string().datetime().readonly().optional(),
  links: z.array(LinkDescriptionSchema).readonly().optional(),
});

// --- Parameters Schemas ---
const PaypalPartnerAttributionIdParameterSchema = z.string().optional();
const OrderIdParameterSchema = z.string();
const PaypalRequestIdParameterSchema = z.string().optional();

// --- Exports ---
export {
  ErrorDetailsSchema,
  ErrorLocationSchema,
  ErrorLinkDescriptionSchema,
  ErrorDetails2Schema,
  ErrorSchema,
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
  CurrencySchema,
  AmountDetailsSchema,
  AmountSchema,
  PayeeDisplayMetadataSchema,
  PayeeSchema,
  ItemSchema,
  CountryCodeSchema,
  AddressSchema,
  ShippingAddressSchema,
  PartnerFeeDetailsSchema,
  NameValuePairSchema,
  MetadataSchema,
  LinkDescriptionSchema,
  CaptureSchema,
  RefundSchema,
  SaleSchema,
  PaymentSummarySchema,
  PurchaseUnitSchema,
  PaymentDetailsSchema,
  LanguageSchema,
  ApplicationContextSchema,
  OrderSchema,
  CreditCardSchema,
  CreditCardTokenSchema,
  FundingInstrumentSchema,
  PayerInfoSchema,
  PayerSchema,
  PayOrderRequestSchema,
  PayOrderResponseSchema,
  PaypalPartnerAttributionIdParameterSchema,
  OrderIdParameterSchema,
  PaypalRequestIdParameterSchema,
};