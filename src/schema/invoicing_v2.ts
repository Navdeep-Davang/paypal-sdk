// invoicing_v2.json zod

// Its json has 103 (as by ai)
// Total Exported ZodSchemas 106

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

const EmailAddressSchema = z.string().email().min(3).max(254);

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

const TaxSchema = z.object({
  name: z.string().max(100),
  percent: z.string().regex(/^((-?[0-9]+)|(-?([0-9]+)?[.][0-9]+))$/),
  amount: z.lazy(()=>AmountSchema).readonly().optional()
}).required({ name: true, percent: true });

const ItemSchema = z.object({
  id: z.string().max(22).readonly().optional(),
  name: z.string().max(200).optional(),
  description: z.string().max(1000).optional(),
  quantity: z.string().max(14).min(0).optional(),
  unit_amount: AmountSchema,
  tax: TaxSchema.optional(),
  item_date: DateNoTimeSchema.optional(),
  discount: DiscountSchema.optional(),
  unit_of_measure: z.enum(["QUANTITY", "HOURS", "AMOUNT"]).optional()
}).required({
    name: true,
    quantity: true,
    unit_amount: true
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


const NotificationSchema = z.object({
  subject: z.string().max(4000).optional(),
  note: z.string().max(4000).optional(),
  send_to_invoicer: z.boolean().default(false).optional(),
  send_to_recipient: z.boolean().default(true).optional(),
  additional_recipients: z.array(EmailAddressSchema).max(100).optional()
});



// Define Invoices error types directly as tuples
const InvoicesErrorTypes = {
  INVALID_STRING_MAX_LENGTH: z.object({
      issue: z.literal("INVALID_STRING_MAX_LENGTH"),
      description: z.enum(["the value of a field is too long."]),
  }),
  INVALID_STRING_LENGTH: z.object({
      issue: z.literal("INVALID_STRING_LENGTH"),
      description: z.enum(["the value of a field is either too short or too long."]),
  }),
  INVALID_ARRAY_MAX_ITEMS: z.object({
      issue: z.literal("INVALID_ARRAY_MAX_ITEMS"),
      description: z.enum(["the number of items in an array parameter is too large.",
       "Only maximum of 100 email address is supported in additional recipients."]),
  }),
  INVALID_PARAMETER_SYNTAX: z.object({
      issue: z.literal("INVALID_PARAMETER_SYNTAX"),
      description: z.enum(["the value of a field does not conform to the expected format."]),
  }),
  CANNOT_REMIND_INVOICE: z.object({
      issue: z.literal("CANNOT_REMIND_INVOICE"),
      description: z.enum(["You cannot remind an invoice which is in DRAFT status. Only UNPAID, SENT and PARTIALLY_PAID invoices can be reminded."]),
  }),
  CANNOT_CANCEL_DRAFT_INVOICE: z.object({
      issue: z.literal("CANNOT_CANCEL_DRAFT_INVOICE"),
      description: z.enum(["Draft invoice cannot be canceled."]),
  }),
  CANNOT_CANCEL_PAID_INVOICE: z.object({
      issue: z.literal("CANNOT_CANCEL_PAID_INVOICE"),
      description: z.enum(["Cannot cancel a paid or partially paid invoice."]),
  }),
  CANNOT_CANCEL_REFUNDED_INVOICE: z.object({
      issue: z.literal("CANNOT_CANCEL_REFUNDED_INVOICE"),
      description: z.enum(["Cannot cancel a refunded or partially refunded invoice."]),
  }),
   CANNOT_CANCEL_SCHEDULED_INVOICE: z.object({
      issue: z.literal("CANNOT_CANCEL_SCHEDULED_INVOICE"),
      description: z.enum(["Cannot cancel a scheduled invoice."]),
  }),
  INVOICE_CANCELED_ALREADY: z.object({
      issue: z.literal("INVOICE_CANCELED_ALREADY"),
      description: z.enum(["Invoice is already cancelled."]),
  }),
  MISSING_REQUIRED_PARAMETER: z.object({
      issue: z.literal("MISSING_REQUIRED_PARAMETER"),
      description: z.enum(["Payment method is missing. Please provide a valid payment method."]),
  }),
  INVALID_PAYMENT_METHOD: z.object({
      issue: z.literal("INVALID_PAYMENT_METHOD"),
      description: z.enum(["The value provided is not an acceptable method of payment."]),
  }),
  NOT_SUPPORTED: z.object({
      issue: z.literal("NOT_SUPPORTED"),
      description: z.enum(["Currency code is not supported."]),
  }),
      VALUE_CANNOT_BE_ZERO: z.object({
      issue: z.literal("VALUE_CANNOT_BE_ZERO"),
      description: z.enum(["Payment amount cannot be zero. Please provide a valid amount."]),
  }),
  INVALID_DECIMAL_VALUE: z.object({
      issue: z.literal("INVALID_DECIMAL_VALUE"),
      description: z.enum(["Payment amount value is invalid. Can have non-negative value with maximum 7 digits and upto 2 fractions."]),
  }),
  INVALID_INTEGER_VALUE: z.object({
      issue: z.literal("INVALID_INTEGER_VALUE"),
      description: z.enum(["Payment amount value is invalid. Can have non-negative value with maximum 6 digits."]),
  }),
  PAYMENT_AMOUNT_GREATER_THAN_AMOUNT_DUE: z.object({
      issue: z.literal("PAYMENT_AMOUNT_GREATER_THAN_AMOUNT_DUE"),
      description: z.enum(["Payment amount is greater than the amount due."]),
  }),
  INVALID_INVOICE_TYPE: z.object({
      issue: z.literal("INVALID_INVOICE_TYPE"),
      description: z.enum(["The invoice type is not valid for paying an invoice."]),
  }),
  CANNOT_PROCESS_PAYMENTS: z.object({
      issue: z.literal("CANNOT_PROCESS_PAYMENTS"),
      description: z.enum(["Current invoice state does not support payment processing."]),
  }),
   CANNOT_DELETE_EXTERNAL_PAYMENT: z.object({
      issue: z.literal("CANNOT_DELETE_EXTERNAL_PAYMENT"),
      description: z.enum(["The external payment cannot be deleted as the recorded refund cannot exceed the recored payment for an invoice."]),
  }),
      INVALID_REFUND_METHOD: z.object({
      issue: z.literal("INVALID_REFUND_METHOD"),
      description: z.enum(["The value provided is not an acceptable method of refund."]),
  }),
      INVALID_REFUND_AMOUNT: z.object({
      issue: z.literal("INVALID_REFUND_AMOUNT"),
      description: z.enum(["Recorded refunds cannot exceed recorded payments."]),
  }),
  CANNOT_PROCESS_REFUNDS: z.object({
      issue: z.literal("CANNOT_PROCESS_REFUNDS"),
      description: z.enum(["Current invoice state does not support refunds."]),
  }),
  INVALID_INTEGER_MAX_VALUE: z.object({
       issue: z.literal("INVALID_INTEGER_MAX_VALUE"),
       description: z.enum(["Value exceeds max value."])
  }),
  INVALID_INTEGER_MIN_VALUE: z.object({
       issue: z.literal("INVALID_INTEGER_MIN_VALUE"),
       description: z.enum(["Value less than minimum value."])
  }), 
};


// Invoices Schemas for each error code
const InvoicesCreate400Schema = z.object({
  details: z.array(z.discriminatedUnion("issue", [
    InvoicesErrorTypes.INVALID_STRING_MAX_LENGTH,
    InvoicesErrorTypes.INVALID_STRING_LENGTH,
    InvoicesErrorTypes.INVALID_PARAMETER_SYNTAX,
  ])).optional(),
});

const InvoicesRemind400Schema = z.object({
  details: z.array(z.discriminatedUnion("issue", [
    InvoicesErrorTypes.INVALID_STRING_MAX_LENGTH,
    InvoicesErrorTypes.INVALID_ARRAY_MAX_ITEMS,
  ])).optional(),
});

const InvoicesRemind422Schema = z.object({
  details: z.array(z.discriminatedUnion("issue", [
    InvoicesErrorTypes.CANNOT_REMIND_INVOICE,
  ])).optional(),
});

const InvoicesCancel400Schema = z.object({
  details: z.array(z.discriminatedUnion("issue", [
    InvoicesErrorTypes.INVALID_STRING_MAX_LENGTH,
    InvoicesErrorTypes.INVALID_ARRAY_MAX_ITEMS,
  ])).optional(),
});

const InvoicesCancel422Schema = z.object({
  details: z.array(z.discriminatedUnion("issue", [
    InvoicesErrorTypes.CANNOT_CANCEL_DRAFT_INVOICE,
    InvoicesErrorTypes.CANNOT_CANCEL_PAID_INVOICE,
    InvoicesErrorTypes.CANNOT_CANCEL_REFUNDED_INVOICE,
    InvoicesErrorTypes.CANNOT_CANCEL_SCHEDULED_INVOICE,
    InvoicesErrorTypes.INVOICE_CANCELED_ALREADY,
  ])).optional(),
});

const InvoicesPayments400Schema = z.object({
  details: z.array(z.discriminatedUnion("issue", [
    InvoicesErrorTypes.MISSING_REQUIRED_PARAMETER,
    InvoicesErrorTypes.INVALID_PAYMENT_METHOD,
    InvoicesErrorTypes.NOT_SUPPORTED,
    InvoicesErrorTypes.INVALID_STRING_LENGTH,
    InvoicesErrorTypes.VALUE_CANNOT_BE_ZERO,
    InvoicesErrorTypes.INVALID_DECIMAL_VALUE,
    InvoicesErrorTypes.INVALID_INTEGER_VALUE,
     InvoicesErrorTypes.INVALID_PARAMETER_SYNTAX
  ])).optional()
});

const InvoicesPayments422Schema = z.object({
  details: z.array(z.discriminatedUnion("issue", [
    InvoicesErrorTypes.PAYMENT_AMOUNT_GREATER_THAN_AMOUNT_DUE,
    InvoicesErrorTypes.INVALID_INVOICE_TYPE,
    InvoicesErrorTypes.CANNOT_PROCESS_PAYMENTS
  ])).optional()
});

const InvoicesPaymentsDelete422Schema = z.object({
  details: z.array(z.discriminatedUnion("issue", [
    InvoicesErrorTypes.CANNOT_DELETE_EXTERNAL_PAYMENT
  ])).optional()
});

const InvoicesRefunds400Schema = z.object({
     details: z.array(z.discriminatedUnion("issue", [
       InvoicesErrorTypes.MISSING_REQUIRED_PARAMETER,
        InvoicesErrorTypes.INVALID_REFUND_METHOD,
       InvoicesErrorTypes.INVALID_STRING_LENGTH,
        InvoicesErrorTypes.NOT_SUPPORTED,
        InvoicesErrorTypes.VALUE_CANNOT_BE_ZERO,
         InvoicesErrorTypes.INVALID_DECIMAL_VALUE,
          InvoicesErrorTypes.INVALID_PARAMETER_SYNTAX,
          InvoicesErrorTypes.INVALID_INTEGER_VALUE
  ])).optional()
});

const InvoicesRefunds422Schema = z.object({
      details: z.array(z.discriminatedUnion("issue", [
        InvoicesErrorTypes.INVALID_REFUND_AMOUNT,
        InvoicesErrorTypes.CANNOT_PROCESS_REFUNDS
  ])).optional()
});

const InvoicesUpdate400Schema = z.object({
  details: z.array(z.discriminatedUnion("issue", [
    InvoicesErrorTypes.INVALID_STRING_MAX_LENGTH,
    InvoicesErrorTypes.INVALID_STRING_LENGTH,
    InvoicesErrorTypes.INVALID_PARAMETER_SYNTAX,
  ])).optional(),
});

const InvoicesGenerateQrCode400Schema = z.object({
 details: z.array(z.discriminatedUnion("issue", [
     InvoicesErrorTypes.INVALID_INTEGER_MAX_VALUE,
       InvoicesErrorTypes.INVALID_INTEGER_MIN_VALUE,
        InvoicesErrorTypes.INVALID_PARAMETER_SYNTAX
  ])).optional()
});

const PaymentReferenceSchema = z.object({
  payment_id: z.string().readonly().optional()
});

const QrConfigSchema = z.object({
  width: z.number().int().min(150).max(500).default(500).optional(),
  height: z.number().int().min(150).max(500).default(500).optional(),
  action: z.string().regex(new RegExp("(?i)^(pay|details)$")).max(7).default("pay").optional(),
});

const InvoiceNumberSchema = z.object({
  invoice_number: z.string().max(25).readonly().optional()
});

const TemplateSubtotalFieldSchema = z.enum(["DISCOUNT", "SHIPPING", "CUSTOM"]);

const TemplateDisplayPreferenceSchema = z.object({
  hidden: z.boolean().default(false).optional()
});

const TemplateItemFieldSchema = z.enum(["ITEMS_QUANTITY", "ITEMS_DESCRIPTION", "ITEMS_DATE", "ITEMS_DISCOUNT", "ITEMS_TAX"]);

const TemplateItemSettingSchema = z.object({
  field_name: TemplateItemFieldSchema,
  display_preference: TemplateDisplayPreferenceSchema
});

const TemplateSubtotalSettingSchema = z.object({
  field_name: TemplateSubtotalFieldSchema.optional(), 
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

// General Error Types (Reusable)
const ErrorTypes = {
  INVALID_INTEGER_MAX_VALUE: z.object({
    issue: z.literal("INVALID_INTEGER_MAX_VALUE"),
    description: z.literal("Value exceeds max value."),
  }),
  INVALID_INTEGER_MIN_VALUE: z.object({
    issue: z.literal("INVALID_INTEGER_MIN_VALUE"),
    description: z.literal("Value less than minimum value."),
  }),
  PERMISSION_DENIED: z.object({
    issue: z.literal("PERMISSION_DENIED"),
    description: z.literal("The requested invoice is not associated with the requested user."),
  }),
  USER_NOT_FOUND: z.object({
    issue: z.literal("USER_NOT_FOUND"),
    description: z.enum(["User is not associated with paypal based on invoicer email."]),
  }),
};


// Schemas for each error code that uses the error types
const Error400DetailsSchema = z.discriminatedUnion("issue", [
  ErrorTypes.INVALID_INTEGER_MAX_VALUE,
  ErrorTypes.INVALID_INTEGER_MIN_VALUE,
]);

const Error403DetailsSchema = z.discriminatedUnion("issue", [
  ErrorTypes.PERMISSION_DENIED,
]);

const Error422DetailsSchema = z.discriminatedUnion("issue", [
  ErrorTypes.USER_NOT_FOUND,
]);

// Main Error Schemas
const _400Schema = z.object({
  details: z.array(Error400DetailsSchema).optional(),
});

const _403Schema = z.object({
  details: z.array(Error403DetailsSchema).optional(),
});

const _422Schema = z.object({
  details: z.array(Error422DetailsSchema).optional(),
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
  details: z.array(z.discriminatedUnion("issue", [
    InvoicesErrorTypes.INVALID_INTEGER_MAX_VALUE,
    InvoicesErrorTypes.INVALID_INTEGER_MIN_VALUE,
    InvoicesErrorTypes.INVALID_STRING_MAX_LENGTH,
    InvoicesErrorTypes.INVALID_ARRAY_MAX_ITEMS,
    InvoicesErrorTypes.INVALID_STRING_LENGTH,
    InvoicesErrorTypes.INVALID_PARAMETER_SYNTAX,
  ])).optional(),
});

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



// Define Templates error types
const TemplatesErrorTypes = {
  TEMPLATE_NAME_ALREADY_EXISTS: z.object({
    issue: z.enum(["TEMPLATE_NAME_ALREADY_EXISTS"]),
    description: z.enum(["Template name already exists."]),
  }),
  INVALID_STRING_LENGTH: z.object({
    issue: z.enum(["INVALID_STRING_LENGTH"]),
    description: z.enum([
      "Template name length should be between 1 and 500.",
      "Currency code length should be 3 characters.",
      "the value of a field is either too short or too long.",
    ]),
  }),
  INVALID_STRING_MAX_LENGTH: z.object({
    issue: z.enum(["INVALID_STRING_MAX_LENGTH"]),
    description: z.enum(["Value of the field is too long."]),
  }),
  INVALID_PARAMETER_SYNTAX: z.object({
    issue: z.enum(["INVALID_PARAMETER_SYNTAX"]),
    description: z.enum(["Value of the field does not conform to the expected format."]),
  }),
  CANNOT_CANCEL_DRAFT_INVOICE: z.object({
    issue: z.enum(["CANNOT_CANCEL_DRAFT_INVOICE"]),
    description: z.enum(["Cannot cancel a draft invoice."]),
  }),
  PERMISSION_DENIED: z.object({
    issue: z.enum(["PERMISSION_DENIED"]),
    description: z.enum(["The requested template is not associated with the requested user."]),
  }),
  CANNOT_DELETE_GLOBAL_TEMPLATE: z.object({
    issue: z.enum(["CANNOT_DELETE_GLOBAL_TEMPLATE"]),
    description: z.enum(["Global templates cannot be deleted."]),
  }),
};


// Templates Schemas for each error code
const TemplatesCreate400ErrorSchema = z.discriminatedUnion("issue", [
  TemplatesErrorTypes.TEMPLATE_NAME_ALREADY_EXISTS,
  TemplatesErrorTypes.INVALID_STRING_LENGTH,
  TemplatesErrorTypes.INVALID_STRING_MAX_LENGTH,
  TemplatesErrorTypes.INVALID_PARAMETER_SYNTAX,
]);

const TemplatesCreate422ErrorSchema = z.discriminatedUnion("issue", [
  TemplatesErrorTypes.CANNOT_CANCEL_DRAFT_INVOICE,
]);

const TemplatesGet403ErrorSchema = z.discriminatedUnion("issue", [
  TemplatesErrorTypes.PERMISSION_DENIED,
]);

const TemplatesUpdate400ErrorSchema = z.discriminatedUnion("issue", [
  TemplatesErrorTypes.TEMPLATE_NAME_ALREADY_EXISTS,
  TemplatesErrorTypes.INVALID_STRING_LENGTH,
  TemplatesErrorTypes.INVALID_STRING_MAX_LENGTH,
  TemplatesErrorTypes.INVALID_PARAMETER_SYNTAX,
]);

const TemplatesUpdate422ErrorSchema = z.discriminatedUnion("issue", [
  TemplatesErrorTypes.CANNOT_CANCEL_DRAFT_INVOICE,
]);

const TemplatesDelete403ErrorSchema = z.discriminatedUnion("issue", [
  TemplatesErrorTypes.PERMISSION_DENIED,
  TemplatesErrorTypes.CANNOT_DELETE_GLOBAL_TEMPLATE,
]);

// Main Templates Error Schemas
const TemplatesCreate400Schema = z.object({
  details: z.array(TemplatesCreate400ErrorSchema).optional(),
});

const TemplatesCreate422Schema = z.object({
  details: z.array(TemplatesCreate422ErrorSchema).optional(),
});

const TemplatesGet403Schema = z.object({
  details: z.array(TemplatesGet403ErrorSchema).optional(),
});

const TemplatesUpdate400Schema = z.object({
  details: z.array(TemplatesUpdate400ErrorSchema).optional(),
});

const TemplatesUpdate422Schema = z.object({
  details: z.array(TemplatesUpdate422ErrorSchema).optional(),
});

const TemplatesDelete403Schema = z.object({
  details: z.array(TemplatesDelete403ErrorSchema).optional(),
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
  InvoicesRefunds400Schema,
  InvoicesRefunds422Schema,
  InvoicesUpdate400Schema,
  QrConfigSchema,
  InvoicesGenerateQrCode400Schema,
  InvoiceNumberSchema,
  TemplateSubtotalFieldSchema,
  TemplateDisplayPreferenceSchema,
  TemplateItemSettingSchema,
  TemplateSubtotalSettingSchema,
  TemplateSettingsSchema,
  TemplateInfoSchema,
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