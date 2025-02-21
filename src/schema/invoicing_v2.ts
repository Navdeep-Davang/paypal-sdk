// invoicing_v2.json zod
// Its json has 103 (as by ai)
// Total Exported ZodSchemas 105

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
  method: z.enum(['CONNECT', 'DELETE', 'GET', 'HEAD', 'OPTIONS', 'PATCH', 'POST', 'PUT']).optional(),
});

const LinkDescriptionSchema = z.object({
    href: z.string(),
    rel: z.string(),
    method: z.enum(["GET", "POST", "PUT", "DELETE", "HEAD", "CONNECT", "OPTIONS", "PATCH"]).optional(),
});

const CurrencyCodeSchema = z.string().min(3).max(3);

const DateTimeSchema = z.string().min(20).max(64).regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$/);

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

const AmountSchema = z.object({
  currency_code: CurrencyCodeSchema.optional(),
  value: z.string().max(32).regex(/^((-?[0-9]+)|(-?([0-9]+)?[.][0-9]+))$/).optional()
}).required({
    currency_code: true,
    value: true
});

const DiscountSchema = z.object({
  percent: z.string().regex(/^((-?[0-9]+)|(-?([0-9]+)?[.][0-9]+))$/).optional(),
  amount: AmountSchema.optional()
});

const BusinessNameSchema = z.object({
  business_name: z.string().max(300).optional()
}).required({business_name: true});

const NameSchema = z.object({
  prefix: z.string().max(140).optional(),
  given_name: z.string().max(140).optional(),
  surname: z.string().max(140).optional(),
  middle_name: z.string().max(140).optional(),
  suffix: z.string().max(140).optional(),
  alternate_full_name: z.string().max(300).optional(),
  full_name: z.string().max(300).optional()
});

const AddressPortableSchema = z.object({
  address_line_1: z.string().max(300).optional(),
  address_line_2: z.string().max(300).optional(),
  address_line_3: z.string().max(100).optional(),
  admin_area_4: z.string().max(100).optional(),
  admin_area_3: z.string().max(100).optional(),
  admin_area_2: z.string().max(120).optional(),
  admin_area_1: z.string().max(300).optional(),
  postal_code: z.string().max(60).optional(),
  country_code: z.string().min(2).max(2).regex(/^([A-Z]{2}|C2)$/),
  address_details: z.object({
    street_number: z.string().max(100).optional(),
    street_name: z.string().max(100).optional(),
    street_type: z.string().max(100).optional(),
    delivery_service: z.string().max(100).optional(),
    building_name: z.string().max(100).optional(),
    sub_building: z.string().max(100).optional()
  }).optional()
}).required({
    country_code: true
});

const ContactNameAddressSchema = z.object({
  ...NameSchema.shape,       
  ...AddressPortableSchema.shape, 
  ...BusinessNameSchema.shape,   
});

const EmailAddressSchema = z.string().min(3).max(254).regex(/^.+@[^"\\-].+$/);

const PhoneSchema = z.object({
  country_code: z.string().min(1).max(3).regex(/^[0-9]{1,3}?$/),
  national_number: z.string().min(1).max(14).regex(/^[0-9]{1,14}?$/),
  extension_number: z.string().min(1).max(15).regex(/^[0-9]{1,15}?$/).optional()
}).required({
    country_code: true,
    national_number: true
});

const PhoneTypeSchema = z.enum(["FAX", "HOME", "MOBILE", "OTHER", "PAGER"]);

const PhoneDetailSchema = z.object({
  ...PhoneSchema.shape,
  phone_type: PhoneTypeSchema.optional()
}).required({ phone_type: true });

const FileReferenceSchema = z.object({
    id: z.string().min(1).max(255).optional(),
    reference_url: z.string().url().min(1).max(2000).optional(),
    content_type: z.string().optional(),
    create_time: DateTimeSchema.optional(),
    size: z.string().regex(/^[0-9]+$/).optional()
});

const InvoiceStatusSchema = z.enum([
    "DRAFT",
    "SENT",
    "SCHEDULED",
    "PAID",
    "MARKED_AS_PAID",
    "CANCELLED",
    "REFUNDED",
    "PARTIALLY_PAID",
    "PARTIALLY_REFUNDED",
    "MARKED_AS_REFUNDED",
    "UNPAID",
    "PAYMENT_PENDING"
]);

const DetailSchema = z.object({
  reference: z.string().max(120).optional(),
  currency_code: CurrencyCodeSchema,
  note: z.string().max(4000).optional(),
  terms_and_conditions: z.string().max(4000).optional(),
  memo: z.string().max(500).optional(),
  attachments: z.array(FileReferenceSchema).max(5).optional()
}).required({currency_code: true});

const DateNoTimeSchema = z.string().min(10).max(10).regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/);

const PaymentTermTypeSchema = z.enum(["DUE_ON_RECEIPT", "DUE_ON_DATE_SPECIFIED", "NET_10", "NET_15", "NET_30", "NET_45", "NET_60", "NET_90", "NO_DUE_DATE"]);

const PaymentTermSchema = z.object({
  term_type: PaymentTermTypeSchema.optional()
});

const InvoicePaymentTermSchema = PaymentTermSchema.extend({
  due_date: DateNoTimeSchema.optional()
});

const TemplateMetadataSchema = z.object({
  create_time: DateTimeSchema.readonly().optional(),
  created_by: z.string().readonly().optional(),
  last_update_time: DateTimeSchema.readonly().optional(),
  last_updated_by: z.string().readonly().optional()
});

const InvoiceCreationFlowSchema = z.enum(["MULTIPLE_RECIPIENTS_GROUP", "BATCH", "REGULAR_SINGLE"]);

const MetadataSchema = TemplateMetadataSchema.extend({
  cancel_time: DateTimeSchema.readonly().optional(),
  cancelled_by: z.string().readonly().optional(),
  first_sent_time: DateTimeSchema.readonly().optional(),
  last_sent_time: DateTimeSchema.readonly().optional(),
  last_sent_by: z.string().readonly().optional(),
  created_by_flow: InvoiceCreationFlowSchema.readonly().optional(),
  recipient_view_url: z.string().url().readonly().optional(),
  invoicer_view_url: z.string().url().readonly().optional()
});

const InvoiceDetailSchema = DetailSchema.extend({
  invoice_number: z.string().max(127).optional(),
  invoice_date: DateNoTimeSchema.optional(),
  payment_term: InvoicePaymentTermSchema.optional(),
  metadata: MetadataSchema.optional()
});

const AmountRangeSchema = z.object({
  lower_amount: AmountSchema,
  upper_amount: AmountSchema
}).required({
    lower_amount: true,
    upper_amount: true
});

const DateRangeSchema = z.object({
  start: DateNoTimeSchema,
  end: DateNoTimeSchema
}).required({
    start: true,
    end: true
});

const DateTimeRangeSchema = z.object({
  start: DateTimeSchema,
  end: DateTimeSchema
}).required({
    start: true,
    end: true
});

const ItemSchema = z.object({
  id: z.string().max(22).readonly().optional(),
  name: z.string().max(200).optional(),
  description: z.string().max(1000).optional(),
  quantity: z.string().max(14).min(0).optional(),
  unit_amount: AmountSchema,
  tax: z.unknown().optional(), //TODO::
  item_date: DateNoTimeSchema.optional(),
  discount: DiscountSchema.optional(),
  unit_of_measure: z.enum(["QUANTITY", "HOURS", "AMOUNT"]).optional()
}).required({
    name: true,
    quantity: true,
    unit_amount: true
});

const TaxSchema = z.object({
  name: z.string().max(100).optional(),
  percent: z.string().regex(/^((-?[0-9]+)|(-?([0-9]+)?[.][0-9]+))$/).optional(),
  amount: AmountSchema.readonly().optional()
}).required({
    name: true,
    percent: true
});

const PartialPaymentSchema = z.object({
  allow_partial_payment: z.boolean().default(false).optional(),
  minimum_amount_due: AmountSchema.optional()
});

const TemplateConfigurationSchema = z.object({
  tax_calculated_after_discount: z.boolean().default(true).optional(),
  tax_inclusive: z.boolean().default(false).optional(),
  allow_tip: z.boolean().default(false).optional(),
  partial_payment: PartialPaymentSchema.optional()
});

const ConfigurationSchema = TemplateConfigurationSchema.extend({
  template_id: z.string().max(30).default("PayPal system template").optional()
});

const AggregatedDiscountSchema = z.object({
  invoice_discount: DiscountSchema.optional(),
  item_discount: AmountSchema.optional()
});

const ShippingCostSchema = z.object({
  amount: AmountSchema,
  tax: TaxSchema.optional()
});

const CustomAmountSchema = z.object({
  label: z.string().max(50),
  amount: AmountSchema.optional()
}).required({label: true});

const AmountWithBreakdownSchema = z.object({
  item_total: AmountSchema.optional(),
  discount: AggregatedDiscountSchema.optional(),
  tax_total: AmountSchema.optional(),
  shipping: ShippingCostSchema.optional(),
  custom: CustomAmountSchema.optional()
});

const PaymentTypeSchema = z.enum(["PAYPAL", "EXTERNAL"]);

const PaymentMethodSchema = z.enum(["BANK_TRANSFER", "CASH", "CHECK", "CREDIT_CARD", "DEBIT_CARD", "PAYPAL", "WIRE_TRANSFER", "OTHER"]);

const PaymentDetailSchema = z.object({
  type: PaymentTypeSchema.readonly().optional(),
  payment_id: z.string().max(22).optional(),
  payment_date: DateNoTimeSchema.optional(),
  method: PaymentMethodSchema,
  note: z.string().max(2000).optional(),
  amount: AmountSchema.optional(),
  shipping_info: ContactNameAddressSchema.optional()
}).required({ method: true });

const PaymentsSchema = z.object({
  paid_amount: AmountSchema.readonly().optional(),
  transactions: z.array(PaymentDetailSchema).max(100).readonly().optional()
});

const RefundDetailSchema = z.object({
  type: PaymentTypeSchema.readonly().optional(),
  refund_id: z.string().max(22).readonly().optional(),
  refund_date: DateNoTimeSchema.optional(),
  amount: AmountSchema.optional(),
  method: PaymentMethodSchema
}).required({ method: true });

const RefundsSchema = z.object({
  refund_amount: AmountSchema.readonly().optional(),
  transactions: z.array(RefundDetailSchema).max(100).readonly().optional()
});

const InvoicerInfoSchema = ContactNameAddressSchema.extend({
  email_address: EmailAddressSchema.optional(),
  phones: z.array(PhoneDetailSchema).optional(),
  website: z.string().url().max(2048).optional(),
  tax_id: z.string().max(100).optional(),
  additional_notes: z.string().max(400).optional(),
  logo_url: z.string().url().max(2000).optional()
});

const BillingInfoSchema = ContactNameAddressSchema.extend({
  email_address: EmailAddressSchema.optional(),
  phones: z.array(PhoneDetailSchema).optional(),
  additional_info: z.string().max(40).optional(),
  language: z.string().regex(/^[a-z]{2}(?:-[A-Z][a-z]{3})?(?:-(?:[A-Z]{2}))?$/).min(2).max(10).optional()
});

const RecipientInfoSchema = z.object({
  billing_info: BillingInfoSchema.optional(),
  shipping_info: ContactNameAddressSchema.optional()
});

const InvoicesSchema = z.object({
  total_pages: z.number().int().readonly().optional(),
  total_items: z.number().int().readonly().optional(),
  items: z.array(z.lazy(() => InvoiceSchema)).readonly().optional(),
  links: z.array(LinkDescriptionSchema).readonly().optional()
});

const AmountSummaryDetailSchema = z.object({
    currency_code: CurrencyCodeSchema.optional(),
    value: z.string().max(32).regex(/^((-?[0-9]+)|(-?([0-9]+)?[.][0-9]+))$/).optional(),
    breakdown: z.lazy(() => AmountWithBreakdownSchema).optional()
});

const MoneySchema = z.object({
    currency_code: CurrencyCodeSchema,
    value: z.string().max(32).regex(/^((-?[0-9]+)|(-?([0-9]+)?[.][0-9]+))$/),
});

const InvoiceSchema = z.object({
  id: z.string().max(30).readonly().optional(),
  parent_id: z.string().max(30).readonly().optional(),
  status: InvoiceStatusSchema.readonly().optional(),
  detail: InvoiceDetailSchema,
  invoicer: InvoicerInfoSchema.optional(),
  primary_recipients: z.array(RecipientInfoSchema).max(100).optional(),
  additional_recipients: z.array(EmailAddressSchema).max(100).optional(),
  items: z.array(ItemSchema).max(100).optional(),
  configuration: ConfigurationSchema.optional(),
  amount: AmountSummaryDetailSchema.optional(),
  due_amount: MoneySchema.readonly().optional(),
  gratuity: MoneySchema.readonly().optional(),
  payments: PaymentsSchema.optional(),
  refunds: RefundsSchema.optional(),
  links: z.array(LinkDescriptionSchema).readonly().optional()
}).required({ detail: true });

const InvoicesCreate400Schema = z.object({
  details: z.array(z.any()).optional()  // TODO:
});

const NotificationSchema = z.object({
  subject: z.string().max(4000).optional(),
  note: z.string().max(4000).optional(),
  send_to_invoicer: z.boolean().default(false).optional(),
  send_to_recipient: z.boolean().default(true).optional(),
  additional_recipients: z.array(EmailAddressSchema).max(100).optional()
});

const InvoicesRemind400Schema = z.object({
  details: z.array(z.any()).optional() // TODO:
});

const InvoicesRemind422Schema = z.object({
  details: z.array(z.any()).optional()  // TODO:
});

const InvoicesCancel400Schema = z.object({
  details: z.array(z.any()).optional()  // TODO:
});

const InvoicesCancel422Schema = z.object({
  details: z.array(z.any()).optional()  // TODO:
});

const PaymentReferenceSchema = z.object({
  payment_id: z.string().readonly().optional()
});

const InvoicesPayments400Schema = z.object({
  details: z.array(z.any()).optional()  // TODO:
});

const InvoicesPayments422Schema = z.object({
  details: z.array(z.any()).optional()  // TODO:
});

const InvoicesPaymentsDelete422Schema = z.object({
  details: z.array(z.any()).optional()  // TODO:
});

const QrConfigSchema = z.object({
  width: z.number().int().min(150).max(500).default(500).optional(),
  height: z.number().int().min(150).max(500).default(500).optional(),
  action: z.string().regex(new RegExp("(?i)^(pay|details)$")).max(7).default("pay").optional(),
});

const InvoicesGenerateQrCode400Schema = z.object({
  details: z.array(z.any()).optional()  // TODO:
});

const InvoiceNumberSchema = z.object({
  invoice_number: z.string().max(25).readonly().optional()
});

const TemplateSubtotalFieldSchema = z.enum(["DISCOUNT", "SHIPPING", "CUSTOM"]);

const TemplateDisplayPreferenceSchema = z.object({
  hidden: z.boolean().default(false).optional()
});

const TemplateItemSettingSchema = z.object({
  field_name: z.string().optional(),  //TODO::
  display_preference: TemplateDisplayPreferenceSchema.optional()
});

const TemplateSubtotalSettingSchema = z.object({
  field_name: TemplateSubtotalFieldSchema.optional(),  //TODO::
  display_preference: TemplateDisplayPreferenceSchema.optional()
});

const TemplateSettingsSchema = z.object({
  template_item_settings: z.array(TemplateItemSettingSchema).optional(),
  template_subtotal_settings: z.array(TemplateSubtotalSettingSchema).optional()
});

const TemplateInfoSchema = z.object({
  detail: z.lazy(() => TemplateDetailSchema).optional(),
  invoicer: z.lazy(() => InvoicerInfoSchema).optional(),
  primary_recipients: z.array(RecipientInfoSchema).max(100).optional(),
  additional_recipients: z.array(EmailAddressSchema).max(100).optional(),
  items: z.array(ItemSchema).max(100).optional(),
  configuration: TemplateConfigurationSchema.optional(),
  amount: z.lazy(() => AmountSummaryDetailSchema).optional(),
  due_amount: MoneySchema.readonly().optional()
});

const RefundSchema = z.string(); // TODO:
const InvoicesUpdate400Schema = z.object({
  details: z.array(z.any()).optional()  // TODO:
});

const TemplateDetailSchema = z.object({
  payment_term: PaymentTermSchema.optional(),
  metadata: TemplateMetadataSchema.optional()
}).and(DetailSchema);

// --- Parameters Schemas ---

const PageParameterSchema = z.number().int().min(1).max(1000).default(1).optional();
const PageSizeParameterSchema = z.number().int().min(1).max(100).default(20).optional();
const TotalRequiredParameterSchema = z.boolean().default(false).optional();
const FieldsParameterSchema = z.string().regex(new RegExp("(?i)^(all|none)$")).default("all").optional();
const InvoiceIdParameterSchema = z.string();
const TransactionIdParameterSchema = z.string();
const SendToRecipientParameterSchema = z.boolean().default(true).optional();
const SendToInvoicerParameterSchema = z.boolean().default(true).optional();
const PaypalRequestIdParameterSchema = z.string();
const TemplateIdParameterSchema = z.string();


// --- Remaining Schemas ---

const _400Schema = z.object({
  details: z.array(z.unknown()).optional() //TODO: add anyOf items
});

const _403Schema = z.object({
   details: z.array(z.unknown()).optional() //TODO: add anyOf items
});

const _422Schema = z.object({
   details: z.array(z.unknown()).optional() //TODO: add anyOf items
});

const PercentageSchema = z.string().regex(/^((-?[0-9]+)|(-?([0-9]+)?[.][0-9]+))$/);

const SearchDataSchema = z.object({
  recipient_email: z.string().max(254).optional(),
  recipient_first_name: z.string().max(140).optional(),
  recipient_last_name: z.string().max(140).optional(),
  recipient_business_name: z.string().max(300).optional(),
  invoice_number: z.string().max(25).optional(),
  status: z.array(z.string()).max(5).optional(),  // Assuming invoice_status is meant here.  If not string, replace z.string() with the correct enum/schema reference
  reference: z.string().max(120).optional(),
  currency_code: CurrencyCodeSchema.optional(),
  memo: z.string().max(500).optional(),
  total_amount_range: z.lazy(() => AmountRangeSchema).optional(),
  invoice_date_range: z.lazy(() => DateRangeSchema).optional(),
  due_date_range: z.lazy(() => DateRangeSchema).optional(),
  payment_date_range: z.lazy(() => DateTimeRangeSchema).optional(),
  creation_date_range: z.lazy(() => DateTimeRangeSchema).optional(),
  archived: z.boolean().optional(),
  fields: z.array(z.string()).optional()
});

const InvoicesSearchInvoices400Schema = z.object({
  details: z.array(z.unknown()).optional() //TODO: add anyOf items
});

const TemplateItemFieldSchema = z.enum(["ITEMS_QUANTITY", "ITEMS_DESCRIPTION", "ITEMS_DATE", "ITEMS_DISCOUNT", "ITEMS_TAX"]);

const TemplateSchema = z.object({
  id: z.string().max(30).readonly().optional(),
  name: z.string().min(1).max(500),
  default_template: z.boolean().optional(),
  template_info: z.lazy(() => TemplateInfoSchema).optional(),
  settings: z.lazy(() => TemplateSettingsSchema).optional(),
  unit_of_measure: z.enum(["QUANTITY", "HOURS", "AMOUNT"]).optional(),
  standard_template: z.boolean().readonly().optional(),
  links: z.array(LinkDescriptionSchema).readonly().optional()
});

const TemplatesSchema = z.object({
  addresses: z.array(AddressPortableSchema).readonly().optional(),
  emails: z.array(EmailAddressSchema).readonly().optional(), // Assuming it's an array, otherwise, remove array
  phones: z.array(PhoneDetailSchema).optional(),
  templates: z.array(z.lazy(() => TemplateSchema)).optional(),
  links: z.array(LinkDescriptionSchema).readonly().optional()
});

const TemplatesCreate400Schema = z.object({
  details: z.array(z.unknown()).optional() //TODO: add anyOf items
});

const TemplatesCreate422Schema = z.object({
  details: z.array(z.unknown()).optional() //TODO: add anyOf items
});

const TemplatesGet403Schema = z.object({
   details: z.array(z.unknown()).optional() //TODO: add anyOf items
});

const TemplatesUpdate400Schema = z.object({
  details: z.array(z.unknown()).optional() //TODO: add anyOf items
});

const TemplatesUpdate422Schema = z.object({
 details: z.array(z.unknown()).optional() //TODO: add anyOf items
});

const TemplatesDelete403Schema = z.object({
  details: z.array(z.unknown()).optional() //TODO: add anyOf items
});

const RefundReferenceSchema = z.object({
  refund_id: z.string().readonly().optional()
});
const CorrectEmailAddressSchema = z.string().min(3).max(254).regex(/^.+@[^"\\-].+$/);


// --- Exports ---
export {
  ErrorDetailsSchema,
  ErrorLocationSchema,
  ErrorLinkDescriptionSchema,
  LinkDescriptionSchema,
  Error400Schema,
  Error401Schema,
  Error403Schema,
  Error404Schema,
  Error415Schema,
  Error422Schema,
  Error500Schema,
  Error503Schema,
  AmountSchema,
  BusinessNameSchema,
  NameSchema,
  ContactNameAddressSchema,
  AddressPortableSchema,
  EmailAddressSchema,
  PhoneSchema,
  PhoneTypeSchema,
  PhoneDetailSchema,
  FileReferenceSchema,
  InvoiceStatusSchema,
  DetailSchema,
  DateNoTimeSchema,
  PaymentTermTypeSchema,
  PaymentTermSchema,
  InvoicePaymentTermSchema,
  TemplateMetadataSchema,
  InvoiceCreationFlowSchema,
  MetadataSchema,
  InvoiceDetailSchema,
  AmountRangeSchema,
  DateRangeSchema,
  DateTimeRangeSchema,
  ItemSchema,
  TaxSchema,
  PartialPaymentSchema,
  TemplateConfigurationSchema,
  ConfigurationSchema,
  AggregatedDiscountSchema,
  ShippingCostSchema,
  CustomAmountSchema,
  AmountWithBreakdownSchema,
  PaymentTypeSchema,
  PaymentMethodSchema,
  PaymentDetailSchema,
  PaymentsSchema,
  RefundDetailSchema,
  RefundsSchema,
  InvoicerInfoSchema,
  BillingInfoSchema,
  RecipientInfoSchema,
  InvoicesSchema,
  MoneySchema,
  InvoiceSchema,
  InvoicesCreate400Schema,
  NotificationSchema,
  InvoicesRemind400Schema,
  InvoicesRemind422Schema,
  InvoicesCancel400Schema,
  InvoicesCancel422Schema,
  PaymentReferenceSchema,
  InvoicesPayments400Schema,
  InvoicesPayments422Schema,
  InvoicesPaymentsDelete422Schema,
  QrConfigSchema,
  InvoicesGenerateQrCode400Schema,
  InvoiceNumberSchema,
  TemplateSubtotalFieldSchema,
  TemplateDisplayPreferenceSchema,
  TemplateItemSettingSchema,
  TemplateSubtotalSettingSchema,
  TemplateSettingsSchema,
  TemplateInfoSchema,
  RefundSchema,
  InvoicesUpdate400Schema,
  TemplateDetailSchema,
  PageParameterSchema,
  PageSizeParameterSchema,
  TotalRequiredParameterSchema,
  FieldsParameterSchema,
  InvoiceIdParameterSchema,
  TransactionIdParameterSchema,
  SendToRecipientParameterSchema,
  SendToInvoicerParameterSchema,
  PaypalRequestIdParameterSchema,
  TemplateIdParameterSchema,
  _400Schema,
  _403Schema,
  _422Schema,
  PercentageSchema,
  SearchDataSchema,
  InvoicesSearchInvoices400Schema,
  TemplateItemFieldSchema,
  TemplateSchema,
  TemplatesSchema,
  TemplatesCreate400Schema,
  TemplatesCreate422Schema,
  TemplatesGet403Schema,
  TemplatesUpdate400Schema,
  TemplatesUpdate422Schema,
  TemplatesDelete403Schema,
  RefundReferenceSchema,
  CorrectEmailAddressSchema
};