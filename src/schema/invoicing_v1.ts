// invoicing_v1 zod

// Total types in the json are 44 (given by ai)
// Total Exported ZodSchemas 55

import { z } from 'zod';

// --- Shared Schemas ---

const ErrorDetailsSchema = z.object({
  field: z.string().optional(),
  value: z.string().optional(),
  location: z.string().default('body').optional(),
  issue: z.string(),
  description: z.string().optional(),
});

const ErrorLinkDescriptionSchema = z.object({
  href: z.string().min(0).max(20000).regex(/^.*$/),
  rel: z.string().min(0).max(100).regex(/^.*$/),
  method: z.enum(["CONNECT", "DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]).optional(),
});

const CurrencySchema = z.object({
  currency: z.string(),
  value: z.string(),
});

const PhoneSchema = z.object({
  country_code: z.string().min(1).max(3).regex(/^[0-9]{1,3}?$/),
  national_number: z.string().min(1).max(14).regex(/^[0-9]{1,14}?$/),
});

const AddressSchema = z.object({
  line1: z.string(),
  line2: z.string().optional(),
  city: z.string(),
  country_code: z.string(),
  postal_code: z.string().optional(),
  state: z.string().optional(),
  phone: z.string().regex(/^\+?[0-9]+$/).optional(),
});

const ParticipantSchema = z.object({
  email: z.string().email().max(260),
});

const TaxSchema = z.object({
  name: z.string().max(100),
  percent: z.number().min(0),
  amount: CurrencySchema.optional(),
});

const DiscountSchema = z.object({
  percent: z.number().optional(),
  amount: CurrencySchema.optional(),
});

const InvoiceItemSchema = z.object({
  name: z.string().max(200),
  description: z.string().max(1000).optional(),
  quantity: z.number(),
  unit_price: CurrencySchema,
  tax: TaxSchema.optional(),
  date: z.string().optional(),
  discount: DiscountSchema.optional(),
  unit_of_measure: z.enum(["QUANTITY", "HOURS", "AMOUNT"]).optional(),
});

const PaymentTermSchema = z.object({
  term_type: z.enum(["DUE_ON_RECEIPT", "DUE_ON_DATE_SPECIFIED", "NET_10", "NET_15", "NET_30", "NET_45", "NET_60", "NET_90", "NO_DUE_DATE"]).optional(),
  due_date: z.string().optional(),
});

const ShippingCostSchema = z.object({
  amount: CurrencySchema.optional(),
  tax: TaxSchema.optional(),
});

const CustomAmountSchema = z.object({
  label: z.string().max(50).optional(),
  amount: CurrencySchema.optional(),
});

const LinkDescriptionSchema = z.object({
  href: z.string(),
  rel: z.string(),
  method: z.enum(["GET", "POST", "PUT", "DELETE", "HEAD", "CONNECT", "OPTIONS", "PATCH"]).optional(),
});

const FileAttachmentSchema = z.object({
  name: z.string().optional(),
  url: z.string().url().optional(),
});

const PaymentSummarySchema = z.object({
  paypal: CurrencySchema.optional(),
  other: CurrencySchema.optional(),
});

const MetadataSchema = z.object({
  created_date: z.string().datetime().optional(),
  created_by: z.string().optional(),
  cancelled_date: z.string().datetime().optional(),
  cancelled_by: z.string().optional(),
  last_updated_date: z.string().datetime().optional(),
  last_updated_by: z.string().optional(),
  first_sent_date: z.string().datetime().optional(),
  last_sent_date: z.string().datetime().optional(),
  last_sent_by: z.string().optional(),
  payer_view_url: z.string().url().optional(),
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

const ErrorDetails2Schema = z.object({
  field: z.string().optional(),
  issue: z.string(),
});

const ErrorSchema = z.object({
  name: z.string().readonly(),
  debug_id: z.string().readonly(),
  message: z.string().readonly(),
  information_link: z.string().readonly(),
  details: z.array(ErrorDetails2Schema).readonly().optional(),
});

const MerchantInfoSchema = z.object({
  email: z.string().email().max(260).optional(),
  business_name: z.string().max(100).optional(),
  first_name: z.string().max(256).optional(),
  last_name: z.string().max(256).optional(),
  address: AddressSchema.optional(),
  phone: PhoneSchema.optional(),
  fax: PhoneSchema.optional(),
  website: z.string().url().max(2048).optional(),
  tax_id: z.string().max(100).optional(),
  additional_info: z.string().max(40).optional(),
});

const BillingInfoSchema = z.object({
  email: z.string().email().max(260).optional(),
  phone: PhoneSchema.optional(),
  first_name: z.string().max(30).optional(),
  last_name: z.string().max(30).optional(),
  business_name: z.string().max(100).optional(),
  address: AddressSchema.optional(),
  language: z.enum(["da_DK", "de_DE", "en_AU", "en_GB", "en_US", "es_ES", "es_XC", "fr_CA", "fr_FR", "fr_XC", "he_IL", "id_ID", "it_IT", "ja_JP", "nl_NL", "no_NO", "pl_PL", "pt_BR", "pt_PT", "ru_RU", "sv_SE", "th_TH", "tr_TR", "zh_CN", "zh_HK", "zh_TW", "zh_XC"]).optional(),
  additional_info: z.string().max(40).optional(),
});

const ShippingInfoSchema = z.object({
  first_name: z.string().max(256).optional(),
  last_name: z.string().max(256).optional(),
  business_name: z.string().max(480).optional(),
  address: AddressSchema.optional(),
});

const PaymentDetailSchema = z.object({
  type: z.enum(["PAYPAL", "EXTERNAL"]).readonly().optional(),
  transaction_id: z.string().readonly().optional(),
  transaction_type: z.enum(["SALE", "AUTHORIZATION", "CAPTURE"]).readonly().optional(),
  date: z.string().datetime().optional(),
  method: z.enum(["BANK_TRANSFER", "CASH", "CHECK", "CREDIT_CARD", "DEBIT_CARD", "PAYPAL", "WIRE_TRANSFER", "OTHER"]),
  note: z.string().optional(),
  amount: CurrencySchema.optional(),
});

const RefundDetailSchema = z.object({
  type: z.enum(["PAYPAL", "EXTERNAL"]).readonly().optional(),
  transaction_id: z.string().readonly().optional(),
  date: z.string().datetime().optional(),
  note: z.string().optional(),
  amount: CurrencySchema.optional(),
});

const InvoiceSchema = z.object({
  id: z.string().readonly().optional(),
  number: z.string().max(25).optional(),
  status: z.enum(["DRAFT", "UNPAID", "SENT", "SCHEDULED", "PARTIALLY_PAID", "PAYMENT_PENDING", "PAID", "MARKED_AS_PAID", "CANCELLED", "REFUNDED", "PARTIALLY_REFUNDED", "MARKED_AS_REFUNDED"]).readonly().optional(),
  merchant_info: MerchantInfoSchema,
  billing_info: z.array(BillingInfoSchema).length(1).optional(),
  shipping_info: ShippingInfoSchema.optional(),
  cc_info: z.array(ParticipantSchema).optional(),
  items: z.array(InvoiceItemSchema).max(100).optional(),
  invoice_date: z.string().optional(),
  payment_term: PaymentTermSchema.optional(),
  reference: z.string().max(60).optional(),
  discount: DiscountSchema.optional(),
  shipping_cost: ShippingCostSchema.optional(),
  custom: CustomAmountSchema.optional(),
  allow_partial_payment: z.boolean().default(false).optional(),
  minimum_amount_due: CurrencySchema.optional(),
  tax_calculated_after_discount: z.boolean().default(false).optional(),
  tax_inclusive: z.boolean().default(false).optional(),
  terms: z.string().max(4000).optional(),
  note: z.string().max(4000).optional(),
  merchant_memo: z.string().max(500).optional(),
  logo_url: z.string().url().max(4000).optional(),
  total_amount: CurrencySchema.readonly().optional(),
  payments: z.array(PaymentDetailSchema).max(1).readonly().optional(),
  refunds: z.array(RefundDetailSchema).max(1).readonly().optional(),
  metadata: MetadataSchema.readonly().optional(),
  paid_amount: PaymentSummarySchema.readonly().optional(),
  refunded_amount: PaymentSummarySchema.readonly().optional(),
  attachments: z.array(FileAttachmentSchema).readonly().optional(),
  allow_tip: z.boolean().default(false).optional(),
  template_id: z.string().default("PayPal system template").optional(),
  links: z.array(LinkDescriptionSchema).readonly().optional(),
});

const InvoicesSchema = z.object({
  total_count: z.number().int().optional(),
  invoices: z.array(InvoiceSchema).optional(),
  links: z.array(LinkDescriptionSchema).readonly().optional(),
});

const SearchSchema = z.object({
  email: z.string().optional(),
  recipient_first_name: z.string().optional(),
  recipient_last_name: z.string().optional(),
  recipient_business_name: z.string().optional(),
  number: z.string().optional(),
  status: z.enum(["DRAFT", "SENT", "SCHEDULED", "PAID", "MARKED_AS_PAID", "CANCELLED", "REFUNDED", "PARTIALLY_REFUNDED", "MARKED_AS_REFUNDED"]).optional(),
  lower_total_amount: z.string().optional(),
  upper_total_amount: z.string().optional(),
  start_invoice_date: z.string().optional(),
  end_invoice_date: z.string().optional(),
  start_due_date: z.string().optional(),
  end_due_date: z.string().optional(),
  start_payment_date: z.string().optional(),
  end_payment_date: z.string().optional(),
  start_creation_date: z.string().optional(),
  end_creation_date: z.string().optional(),
  page: z.number().optional(),
  page_size: z.number().optional(),
  total_count_required: z.boolean().default(false).optional(),
  archived: z.boolean().optional(),
});

const NotificationSchema = z.object({
  subject: z.string().optional(),
  note: z.string().optional(),
  send_to_merchant: z.boolean().default(true).optional(),
  cc_emails: z.array(z.string().email().min(3).max(254).regex(/^.+@[^"\-].+$/)).max(100).optional(),
});

const CancelNotificationSchema = z.object({
  subject: z.string().optional(),
  note: z.string().optional(),
  send_to_merchant: z.boolean().default(true).optional(),
  send_to_payer: z.boolean().default(true).optional(),
  cc_emails: z.array(z.string().email().min(3).max(254).regex(/^.+@[^"\-].+$/)).max(100).optional(),
});

const QrCodeSchema = z.object({
  image: z.string().optional(),
});

const InvoiceNumberSchema = z.object({
  number: z.string().optional(),
});

const TemplateDataSchema = z.object({
  merchant_info: MerchantInfoSchema.optional(),
  billing_info: z.array(BillingInfoSchema).length(1).optional(),
  shipping_info: ShippingInfoSchema.optional(),
  cc_info: z.array(z.string().email()).optional(),
  items: z.array(InvoiceItemSchema).max(100).optional(),
  payment_term: PaymentTermSchema.optional(),
  reference: z.string().max(60).optional(),
  discount: DiscountSchema.optional(),
  shipping_cost: ShippingCostSchema.optional(),
  custom: CustomAmountSchema.optional(),
  allow_partial_payment: z.boolean().default(false).optional(),
  minimum_amount_due: CurrencySchema.optional(),
  tax_calculated_after_discount: z.boolean().default(false).optional(),
  tax_inclusive: z.boolean().default(false).optional(),
  terms: z.string().max(4000).optional(),
  note: z.string().max(4000).optional(),
  merchant_memo: z.string().max(150).optional(),
  logo_url: z.string().url().max(4000).optional(),
  total_amount: CurrencySchema.readonly().optional(),
  attachments: z.array(FileAttachmentSchema).optional(),
});

const TemplateSettingsMetadataSchema = z.object({
  hidden: z.boolean().default(false).optional(),
});

const TemplateSettingsSchema = z.object({
  field_name: z.enum(["items.quantity", "items.description", "items.date", "items.discount", "items.tax", "discount", "shipping", "custom"]).optional(),
  display_preference: TemplateSettingsMetadataSchema.optional(),
});

const TemplateSchema = z.object({
  template_id: z.string().readonly().optional(),
  name: z.string().optional(),
  default: z.boolean().optional(),
  template_data: TemplateDataSchema.optional(),
  settings: z.array(TemplateSettingsSchema).optional(),
  unit_of_measure: z.enum(["HOURS", "QUANTITY", "AMOUNT"]).optional(),
  custom: z.boolean().readonly().optional(),
  links: z.array(LinkDescriptionSchema).readonly().optional(),
});

const TemplatesSchema = z.object({
  addresses: z.array(AddressSchema).optional(),
  emails: z.array(z.string().email().min(3).max(254).regex(/^.+@[^"\-].+$/)).optional(),
  phones: z.array(PhoneSchema).optional(),
  templates: z.array(TemplateSchema).optional(),
  links: z.array(LinkDescriptionSchema).readonly().optional(),
});


// --- Parameters Schemas ---

const PageParameterSchema = z.number().int().optional();
const PageSizeParameterSchema = z.number().int().optional();
const TotalCountRequiredParameterSchema = z.boolean().default(false).optional();
const InvoiceIdParameterSchema = z.string();
const NotifyMerchantParameterSchema = z.boolean().default(true).optional();
const TransactionIdParameterSchema = z.string();
const WidthParameterSchema = z.number().int().default(500).optional();
const HeightParameterSchema = z.number().int().default(500).optional();
const FieldsParameterSchema = z.string().default("all").optional();
const TemplateIdParameterSchema = z.string();

// --- Exports ---
export {
  ErrorDetailsSchema,
  ErrorLinkDescriptionSchema,
  CurrencySchema,
  PhoneSchema,
  AddressSchema,
  ParticipantSchema,
  TaxSchema,
  DiscountSchema,
  InvoiceItemSchema,
  PaymentTermSchema,
  ShippingCostSchema,
  CustomAmountSchema,
  LinkDescriptionSchema,
  FileAttachmentSchema,
  PaymentSummarySchema,
  MetadataSchema,
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
  ErrorDetails2Schema,
  ErrorSchema,
  MerchantInfoSchema,
  BillingInfoSchema,
  ShippingInfoSchema,
  PaymentDetailSchema,
  RefundDetailSchema,
  InvoiceSchema,
  InvoicesSchema,
  SearchSchema,
  NotificationSchema,
  CancelNotificationSchema,
  QrCodeSchema,
  InvoiceNumberSchema,
  TemplateDataSchema,
  TemplateSettingsMetadataSchema,
  TemplateSettingsSchema,
  TemplateSchema,
  TemplatesSchema,
  PageParameterSchema,
  PageSizeParameterSchema,
  TotalCountRequiredParameterSchema,
  InvoiceIdParameterSchema,
  NotifyMerchantParameterSchema,
  TransactionIdParameterSchema,
  WidthParameterSchema,
  HeightParameterSchema,
  FieldsParameterSchema,
  TemplateIdParameterSchema,
};