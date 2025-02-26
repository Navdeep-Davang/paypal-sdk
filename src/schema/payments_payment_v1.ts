// payments_payment_v1 zod

// Total Exported ZodSchemas 54

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


const LinkDescriptionSchema = z.object({
    href: z.string(),
    rel: z.string(),
    method: z.enum(["GET", "POST", "PUT", "DELETE", "HEAD", "CONNECT", "OPTIONS", "PATCH"]).optional()
});

const CurrencyCodeSchema = z.string().min(3).max(3);

const ItemSchema = z.object({
  sku: z.string().max(127).optional(),
  name: z.string().max(127).optional(),
  description: z.string().max(127).optional(),
  quantity: z.string().max(10).regex(/^[0-9]{0,10}$/).optional(),
  price: z.string().max(10).regex(/^[0-9]{0,10}(\.[0-9]{0,2})?$/).optional(),
  currency: CurrencyCodeSchema.optional(),
  tax: z.string().optional()
}).required({
    quantity: true,
    price: true,
    currency: true
});

const ShippingAddressSchema = z.object({
    recipient_name: z.string().max(127).optional()
}).and(z.object({
    line1: z.string().max(300),
    line2: z.string().max(300).optional(),
    city: z.string().max(64).optional(),
    country_code: z.string().max(2).min(2).regex(/^([A-Z]{2}|C2)$/).optional(),
    postal_code: z.string().optional(),
    state: z.string().max(300).optional(),
    phone: z.string().regex(/^(?:\+[0-9]{1,3})?[0-9]{3,}$/).optional(),
    normalization_status: z.enum(["UNKNOWN", "UNNORMALIZED_USER_PREFERRED", "NORMALIZED", "UNNORMALIZED"]).optional(),
    type: z.string().optional(),
}).required({
    line1: true,
    country_code: true
}));

const ProcessorResponseSchema = z.object({
    response_code: z.string().max(4).readonly(),
    avs_code: z.string().max(1).regex(/[A-z0-9]{1}/).readonly().optional(),
    cvv_code: z.string().max(1).regex(/[A-z0-9]{1}/).readonly().optional(),
    advice_code: z.enum([
        "01_NEW_ACCOUNT_INFORMATION",
        "02_TRY_AGAIN_LATER",
        "02_STOP_SPECIFIC_PAYMENT",
        "03_DO_NOT_TRY_AGAIN",
        "03_REVOKE_AUTHORIZATION_FOR_FUTURE_PAYMENT",
        "21_DO_NOT_TRY_AGAIN_CARD_HOLDER_CANCELLED_RECURRRING_CHARGE",
        "21_CANCEL_ALL_RECURRING_PAYMENTS"
    ]).readonly().optional(),
    eci_submitted: z.string().readonly().optional(),
    vpas: z.string().readonly().optional()
}).required({
    response_code: true
});

const FmfDetailsSchema = z.object({
    filter_type: z.enum(["ACCEPT", "PENDING", "DENY", "REPORT"]).readonly(),
    filter_id: z.enum([
        "AVS_NO_MATCH",
        "AVS_PARTIAL_MATCH",
        "AVS_UNAVAILABLE_OR_UNSUPPORTED",
        "CARD_SECURITY_CODE_MISMATCH",
        "MAXIMUM_TRANSACTION_AMOUNT",
        "UNCONFIRMED_ADDRESS",
        "COUNTRY_MONITOR",
        "LARGE_ORDER_NUMBER",
        "BILLING_OR_SHIPPING_ADDRESS_MISMATCH",
        "RISKY_ZIP_CODE",
        "SUSPECTED_FREIGHT_FORWARDER_CHECK",
        "TOTAL_PURCHASE_PRICE_MINIMUM",
        "IP_ADDRESS_VELOCITY",
        "RISKY_EMAIL_ADDRESS_DOMAIN_CHECK",
        "RISKY_BANK_IDENTIFICATION_NUMBER_CHECK",
        "RISKY_IP_ADDRESS_RANGE",
        "PAYPAL_FRAUD_MODEL"
    ]).readonly(),
    name: z.string().readonly().optional(),
    description: z.string().readonly().optional()
}).required({
    filter_type: true,
    filter_id: true
});

const PaymentHoldReasonSchema = z.object({
    payment_hold_reason: z.enum(["PAYMENT_HOLD", "SHIPPING_RISK_HOLD"]).optional()
});



const RelatedResourcesSchema = z.object({
    sale: z.lazy(() => SaleSchema).optional(),
    authorization: z.lazy(() => AuthorizationSchema).optional(),
    order: z.lazy(() => OrderSchema).optional(),
    capture: z.lazy(() => CaptureSchema).optional(),
    refund: z.lazy(() => RefundSchema).optional()
});

const CreditCardTokenSchema = z.object({
    credit_card_id: z.string().min(1).max(256),
    payer_id: z.string().max(1).min(256).optional(),
    external_customer_id: z.string().min(1).max(256).optional(),
    last4: z.string().min(4).max(4).readonly().optional(),
    type: z.string().min(1).max(256).readonly().optional(),
    expire_month: z.number().int().min(1).max(12).readonly().optional(),
    expire_year: z.string().regex(/^[0-9]{4}$/).min(4).max(4).readonly().optional()
}).required({
    credit_card_id: true
});

const MoneySchema = z.object({
    currency: z.string().optional(),
    value: z.string().optional()
}).required({
    currency: true,
    value: true
});

// --- Main Schemas ---

const CreditCardTokenSchemaCreditCardTokenSchema = z.object({
  credit_card_token: CreditCardTokenSchema.optional()
});

const FundingInstrumentSchema = z.object({
  credit_card_token: CreditCardTokenSchema.optional()
});

const PayeeBaseSchema = z.object({
  email: z.string().email().optional(),
  merchant_id: z.string().optional()
});

const AddressSchema = z.object({
  line1: z.string().max(300),
  line2: z.string().max(300).optional(),
  city: z.string().max(64).optional(),
  country_code: z.string().min(2).max(2).regex(/^([A-Z]{2}|C2)$/),
  postal_code: z.string().optional(),
  state: z.string().max(300).optional(),
  phone: z.string().regex(/^(?:\+[0-9]{1,3})?[0-9]{3,}$/).optional(),
  normalization_status: z.enum(["UNKNOWN", "UNNORMALIZED_USER_PREFERRED", "NORMALIZED", "UNNORMALIZED"]).optional(),
  type: z.string().optional()
}).required({
    line1: true,
    country_code: true
});

const ShippingAddressSchemaShippingAddressSchema = AddressSchema.extend({
  recipient_name: z.string().max(127).optional()
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
  billing_address: AddressSchema.optional(),
  shipping_address: ShippingAddressSchemaShippingAddressSchema.readonly().optional()
});

const PayerSchema = z.object({
  payment_method: z.enum(["credit_card", "paypal", "pay_upon_invoice", "carrier", "alternate_payment", "bank"]).optional(),
  status: z.enum(["VERIFIED", "UNVERIFIED"]).readonly().optional(),
  funding_instruments: z.array(FundingInstrumentSchema).min(1).max(1).optional(),
  payer_info: PayerInfoSchema.optional()
});

const TokenSchema = z.object({
  id: z.string().min(1).max(255),
  type: z.enum(["BILLING_AGREEMENT"])
}).required({
    id: true,
    type: true
});

const PaymentSourceSchema = z.object({
  token: TokenSchema.optional()
});

const PaymentPatternSchema = z.enum([
  "CUSTOMER_PRESENT_ONETIME_PURCHASE",
  "CUSTOMER_NOT_PRESENT_RECURRING",
  "CUSTOMER_PRESENT_RECURRING_FIRST",
  "CUSTOMER_PRESENT_ONETIME_PURCHASE_VAULTED",
  "CUSTOMER_NOT_PRESENT_ONETIME_PURCHASE_VAULTED",
  "MAIL_ORDER_TELEPHONE_ORDER"
]);

const ApplicationContextSchema = z.object({
  brand_name: z.string().max(127).optional(),
  locale: z.string().optional(),
  landing_page: z.string().optional(),
  shipping_preference: z.enum(["NO_SHIPPING", "GET_FROM_FILE", "SET_PROVIDED_ADDRESS"]).default("GET_FROM_FILE").optional(),
  user_action: z.string().optional(),
  preferred_payment_source: PaymentSourceSchema.optional(),
  payment_pattern: PaymentPatternSchema.optional()
});

const AmountSchema = z.object({
  currency: z.string(),
  total: z.string()
}).required({
    currency: true,
    total: true
});

const PaymentAmountDetailsSchema = z.object({
  subtotal: z.string().optional(),
  shipping: z.string().optional(),
  tax: z.string().optional(),
  handling_fee: z.string().optional(),
  shipping_discount: z.string().optional(),
  insurance: z.string().optional(),
  gift_wrap: z.string().optional().describe("deprecated")
});

const PayeeSchema = z.object({
  email: z.string().email().optional(),
  merchant_id: z.string().optional()
});

const TransactionSchema = z.object({
  amount: AmountSchema,
  payee: PayeeSchema.optional(),
  description: z.string().max(127).optional(),
  note_to_payee: z.string().max(255).optional(),
  custom: z.string().max(127).optional(),
  invoice_number: z.string().max(127).optional(),
  soft_descriptor: z.string().max(22).optional(),
  payment_options: z.object({
    allowed_payment_method: z.enum(["UNRESTRICTED", "INSTANT_FUNDING_SOURCE", "IMMEDIATE_PAY"]).default("UNRESTRICTED").optional()
  }).optional(),
  item_list: z.object({
    items: z.array(ItemSchema).optional(),
    shipping_address: ShippingAddressSchemaShippingAddressSchema.optional(),
    shipping_method: z.string().optional(),
    shipping_phone_number: z.string().optional()
  }).optional(),
  notify_url: z.string().url().max(2048).optional(),
  related_resources: z.array(RelatedResourcesSchema).readonly().optional()
}).required({
    amount: true
});

const PaymentSchema = z.object({
  id: z.string().readonly().optional(),
  intent: z.enum(["sale", "authorize", "order"]),
  payer: PayerSchema,
  application_context: ApplicationContextSchema.optional(),
  transactions: z.array(TransactionSchema).optional(),
  state: z.enum(["created", "approved", "failed", "partially_completed", "in_progress"]).readonly().optional(),
  experience_profile_id: z.string().optional().describe("deprecated"),
  note_to_payer: z.string().max(165).optional(),
  redirect_urls: z.object({
    return_url: z.string().url().optional(),
    cancel_url: z.string().url().optional()
  }).optional(),
  failure_reason: z.enum(["UNABLE_TO_COMPLETE_TRANSACTION", "INVALID_PAYMENT_METHOD", "PAYER_CANNOT_PAY", "CANNOT_PAY_THIS_PAYEE", "REDIRECT_REQUIRED", "PAYEE_FILTER_RESTRICTIONS"]).readonly().optional(),
  create_time: z.string().datetime().readonly().optional(),
  update_time: z.string().datetime().readonly().optional(),
  links: z.array(LinkDescriptionSchema).readonly().optional()
}).required({
    intent: true,
    payer: true
});

const PaymentHistorySchema = z.object({
  payments: z.array(PaymentSchema).optional(),
  count: z.number().int().max(20).optional(),
  next_id: z.string().readonly().optional()
});

const PatchSchema = z.object({
  op: z.enum(["add", "remove", "replace", "move", "copy", "test"]),
  path: z.string(),
  value: z.unknown().optional(),
  from: z.string().optional()
}).required({
    op: true
});

const PatchRequestSchema = z.array(PatchSchema);

const CartBaseSchema = z.object({
  reference_id: z.string().max(256).optional(),
  amount: AmountSchema,
  payee: PayeeSchema.optional(),
  description: z.string().max(127).optional(),
  note_to_payee: z.string().max(255).optional(),
  custom: z.string().max(127).optional(),
  invoice_number: z.string().max(127).optional(),
  soft_descriptor: z.string().max(22).optional(),
  payment_options: z.object({
    allowed_payment_method: z.enum(["UNRESTRICTED", "INSTANT_FUNDING_SOURCE", "IMMEDIATE_PAY"]).default("UNRESTRICTED").optional()
  }).optional(),
  item_list: z.object({
    items: z.array(ItemSchema).optional(),
    shipping_address: ShippingAddressSchemaShippingAddressSchema.optional(),
    shipping_phone_number: z.string().optional()
  }).optional(),
  notify_url: z.string().url().max(2048).optional(),
  order_url: z.string().url().max(2048).optional()
}).required({
    amount: true
});

const CurrencySchemaCurrencySchema = z.object({
  currency: z.string().optional(),
  value: z.string().optional()
}).required({
    currency: true,
    value: true
});

const PaymentExecutionSchema = z.object({
  payer_id: z.string().optional(),
  transactions: z.array(CartBaseSchema).optional()
});

const RefundRequestSchema = z.object({
  amount: AmountSchema.optional(),
  description: z.string().max(255).optional(),
  reason: z.string().max(30).optional(),
  invoice_number: z.string().max(127).optional()
});

const RefundSchemaRefundSchema = z.object({
  id: z.string().readonly().optional(),
  amount: AmountSchema,
  state: z.enum(["pending", "completed", "cancelled", "failed"]).readonly().optional(),
  reason: z.string().optional(),
  invoice_number: z.string().max(127).optional(),
  sale_id: z.string().readonly().optional(),
  capture_id: z.string().readonly().optional(),
  parent_payment: z.string().readonly().optional(),
  description: z.string().optional(),
  create_time: z.string().datetime().readonly().optional(),
  update_time: z.string().datetime().readonly().optional(),
  links: z.array(LinkDescriptionSchema).readonly().optional()
});

const DetailedRefundSchema = RefundSchemaRefundSchema.extend({
  custom: z.string().max(127).optional(),
  invoice_number: z.string().max(127).optional(),
  refund_from_transaction_fee: MoneySchema.optional(),
  refund_from_received_amount: MoneySchema.optional(),
  total_refunded_amount: MoneySchema.optional()
});

const AuthorizationSchemaAuthorizationSchema = z.object({
    id: z.string().readonly().optional(),
    amount: z.lazy(() => AmountSchema),
    payment_mode: z.enum(["INSTANT_TRANSFER"]).readonly().optional(),
    state: z.enum(["pending", "authorized", "partially_captured", "captured", "expired", "denied", "voided"]).readonly().optional(),
    reason_code: z.enum(["AUTHORIZATION"]).readonly().optional(),
    pending_reason: z.enum(["AUTHORIZATION"]).readonly().optional(),
    protection_eligibility: z.enum(["ELIGIBLE", "PARTIALLY_ELIGIBLE", "INELIGIBLE"]).readonly().optional(),
    protection_eligibility_type: z.enum(["ITEM_NOT_RECEIVED_ELIGIBLE", "UNAUTHORIZED_PAYMENT_ELIGIBLE", "ITEM_NOT_RECEIVED_ELIGIBLE,UNAUTHORIZED_PAYMENT_ELIGIBLE"]).readonly().optional(),
    fmf_details: FmfDetailsSchema.optional(),
    parent_payment: z.string().readonly().optional(),
    processor_response: ProcessorResponseSchema.optional(),
    valid_until: z.string().datetime().readonly().optional(),
    create_time: z.string().datetime().readonly().optional(),
    update_time: z.string().datetime().readonly().optional(),
    receipt_id: z.string().regex(/^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/).readonly().optional(),
    links: z.array(LinkDescriptionSchema).readonly().optional()
}).required({
    amount: true
});

const OrderSchemaOrderSchema = z.object({
  id: z.string().readonly().optional(),
  amount: AmountSchema,
  payment_mode: z.enum(["INSTANT_TRANSFER", "MANUAL_BANK_TRANSFER", "DELAYED_TRANSFER", "ECHECK"]).readonly().optional(),
  state: z.enum(["PENDING", "AUTHORIZED", "CAPTURED", "COMPLETED", "VOIDED"]).readonly().optional(),
  reason_code: z.enum(["PAYER_SHIPPING_UNCONFIRMED", "MULTI_CURRENCY", "RISK_REVIEW", "REGULATORY_REVIEW", "VERIFICATION_REQUIRED", "ORDER", "OTHER"]).readonly().optional(),
  pending_reason: z.enum(["payer_shipping_unconfirmed", "multi_currency", "risk_review", "regulatory_review", "verification_required", "order", "other"]).readonly().optional(),
  protection_eligibility: z.enum(["ELIGIBLE", "PARTIALLY_ELIGIBLE", "INELIGIBLE"]).readonly().optional(),
  protection_eligibility_type: z.enum(["ITEM_NOT_RECEIVED_ELIGIBLE", "UNAUTHORIZED_PAYMENT_ELIGIBLE", "ITEM_NOT_RECEIVED_ELIGIBLE,UNAUTHORIZED_PAYMENT_ELIGIBLE"]).readonly().optional(),
  parent_payment: z.string().readonly().optional(),
  fmf_details: FmfDetailsSchema.optional(),
  create_time: z.string().datetime().readonly().optional(),
  update_time: z.string().datetime().readonly().optional(),
  links: z.array(LinkDescriptionSchema).readonly().optional()
}).required({
    amount: true
});

const CaptureSchemaCaptureSchema = z.object({
  id: z.string().readonly().optional(),
  amount: AmountSchema,
  is_final_capture: z.boolean().default(false).optional(),
  state: z.enum(["pending", "completed", "refunded", "partially_refunded", "denied"]).readonly().optional(),
  reason_code: z.enum(["CHARGEBACK", "GUARANTEE", "BUYER_COMPLAINT", "REFUND", "UNCONFIRMED_SHIPPING_ADDRESS", "ECHECK", "INTERNATIONAL_WITHDRAWAL", "RECEIVING_PREFERENCE_MANDATES_MANUAL_ACTION", "PAYMENT_REVIEW", "REGULATORY_REVIEW", "UNILATERAL", "VERIFICATION_REQUIRED", "TRANSACTION_APPROVED_AWAITING_FUNDING", "NONE"]).readonly().optional(),
  parent_payment: z.string().readonly().optional(),
  invoice_number: z.string().max(127).optional(),
  transaction_fee: MoneySchema.optional(),
  transaction_fee_in_receivable_currency: MoneySchema.optional(),
  receivable_amount: CurrencySchemaCurrencySchema.readonly().optional(),
  exchange_rate: z.string().readonly().optional(),
  note_to_payer: z.string().max(255).optional(),
  create_time: z.string().datetime().readonly().optional(),
  update_time: z.string().datetime().readonly().optional(),
  links: z.array(LinkDescriptionSchema).readonly().optional()
});

const SaleSchema = z.object({
    id: z.string().readonly().optional(),
    amount: z.lazy(() => AmountSchema),
    payment_mode: z.enum(["INSTANT_TRANSFER", "MANUAL_BANK_TRANSFER", "DELAYED_TRANSFER", "ECHECK"]).readonly().optional(),
    state: z.enum(["completed", "partially_refunded", "pending", "refunded", "denied"]).readonly().optional(),
    reason_code: z.enum(["CHARGEBACK", "GUARANTEE", "BUYER_COMPLAINT", "REFUND", "UNCONFIRMED_SHIPPING_ADDRESS", "ECHECK", "INTERNATIONAL_WITHDRAWAL", "RECEIVING_PREFERENCE_MANDATES_MANUAL_ACTION", "PAYMENT_REVIEW", "REGULATORY_REVIEW", "UNILATERAL", "VERIFICATION_REQUIRED", "TRANSACTION_APPROVED_AWAITING_FUNDING"]).readonly().optional(),
    protection_eligibility: z.enum(["ELIGIBLE", "PARTIALLY_ELIGIBLE", "INELIGIBLE"]).readonly().optional(),
    protection_eligibility_type: z.enum(["ITEM_NOT_RECEIVED_ELIGIBLE", "UNAUTHORIZED_PAYMENT_ELIGIBLE", "ITEM_NOT_RECEIVED_ELIGIBLE,UNAUTHORIZED_PAYMENT_ELIGIBLE"]).readonly().optional(),
    clearing_time: z.string().datetime().readonly().optional(),
    payment_hold_status: z.enum(["HELD"]).readonly().optional(),
    payment_hold_reasons: z.array(PaymentHoldReasonSchema).readonly().optional(),
    transaction_fee: MoneySchema.readonly().optional(),
    receivable_amount: MoneySchema.optional(),
    transaction_fee_in_receivable_currency: MoneySchema.readonly().optional(),
    exchange_rate: z.string().readonly().optional(),
    fmf_details: FmfDetailsSchema.optional(),
    receipt_id: z.string().regex(/^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/).readonly().optional(),
    parent_payment: z.string().readonly().optional(),
    processor_response: ProcessorResponseSchema.optional(),
    billing_agreement_id: z.string().readonly().optional(),
    create_time: z.string().datetime().readonly().optional(),
    update_time: z.string().datetime().readonly().optional(),
    links: z.array(LinkDescriptionSchema).readonly().optional()
}).required({
    id: true,
    amount: true,
    state: true,
    parent_payment: true,
    create_time: true
});

const AuthorizationSchema = z.object({
    id: z.string().readonly().optional(),
    amount: z.lazy(() => AmountSchema),
    payment_mode: z.enum(["INSTANT_TRANSFER"]).readonly().optional(),
    state: z.enum(["pending", "authorized", "partially_captured", "captured", "expired", "denied", "voided"]).readonly().optional(),
    reason_code: z.enum(["AUTHORIZATION"]).readonly().optional(),
    pending_reason: z.enum(["AUTHORIZATION"]).readonly().optional(),
    protection_eligibility: z.enum(["ELIGIBLE", "PARTIALLY_ELIGIBLE", "INELIGIBLE"]).readonly().optional(),
    protection_eligibility_type: z.enum(["ITEM_NOT_RECEIVED_ELIGIBLE", "UNAUTHORIZED_PAYMENT_ELIGIBLE", "ITEM_NOT_RECEIVED_ELIGIBLE,UNAUTHORIZED_PAYMENT_ELIGIBLE"]).readonly().optional(),
    fmf_details: FmfDetailsSchema.optional(),
    parent_payment: z.string().readonly().optional(),
    processor_response: ProcessorResponseSchema.optional(),
    valid_until: z.string().datetime().readonly().optional(),
    create_time: z.string().datetime().readonly().optional(),
    update_time: z.string().datetime().readonly().optional(),
    receipt_id: z.string().regex(/^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/).readonly().optional(),
    links: z.array(LinkDescriptionSchema).readonly().optional()
}).required({
    amount: true
});

const OrderSchema = z.object({
  id: z.string().readonly().optional(),
  amount: z.lazy(() => AmountSchema),
  payment_mode: z.enum(["INSTANT_TRANSFER", "MANUAL_BANK_TRANSFER", "DELAYED_TRANSFER", "ECHECK"]).readonly().optional(),
  state: z.enum(["PENDING", "AUTHORIZED", "CAPTURED", "COMPLETED", "VOIDED"]).readonly().optional(),
  reason_code: z.enum(["PAYER_SHIPPING_UNCONFIRMED", "MULTI_CURRENCY", "RISK_REVIEW", "REGULATORY_REVIEW", "VERIFICATION_REQUIRED", "ORDER", "OTHER"]).readonly().optional(),
  pending_reason: z.enum(["payer_shipping_unconfirmed", "multi_currency", "risk_review", "regulatory_review", "verification_required", "order", "other"]).readonly().optional(),
  protection_eligibility: z.enum(["ELIGIBLE", "PARTIALLY_ELIGIBLE", "INELIGIBLE"]).readonly().optional(),
  protection_eligibility_type: z.enum(["ITEM_NOT_RECEIVED_ELIGIBLE", "UNAUTHORIZED_PAYMENT_ELIGIBLE", "ITEM_NOT_RECEIVED_ELIGIBLE,UNAUTHORIZED_PAYMENT_ELIGIBLE"]).readonly().optional(),
  parent_payment: z.string().readonly().optional(),
  fmf_details: FmfDetailsSchema.optional(),
  create_time: z.string().datetime().readonly().optional(),
  update_time: z.string().datetime().readonly().optional(),
  links: z.array(LinkDescriptionSchema).readonly().optional()
}).required({
    amount: true
});

const CaptureSchema = z.object({
  id: z.string().readonly().optional(),
  amount: z.lazy(() => AmountSchema),
  is_final_capture: z.boolean().default(false).optional(),
  state: z.enum(["pending", "completed", "refunded", "partially_refunded", "denied"]).readonly().optional(),
  reason_code: z.enum(["CHARGEBACK", "GUARANTEE", "BUYER_COMPLAINT", "REFUND", "UNCONFIRMED_SHIPPING_ADDRESS", "ECHECK", "INTERNATIONAL_WITHDRAWAL", "RECEIVING_PREFERENCE_MANDATES_MANUAL_ACTION", "PAYMENT_REVIEW", "REGULATORY_REVIEW", "UNILATERAL", "VERIFICATION_REQUIRED", "TRANSACTION_APPROVED_AWAITING_FUNDING", "NONE"]).readonly().optional(),
  parent_payment: z.string().readonly().optional(),
  invoice_number: z.string().max(127).optional(),
  transaction_fee: MoneySchema.optional(),
  transaction_fee_in_receivable_currency: MoneySchema.optional(),
  receivable_amount: CurrencySchemaCurrencySchema.readonly().optional(),
  exchange_rate: z.string().readonly().optional(),
  note_to_payer: z.string().max(255).optional(),
  create_time: z.string().datetime().readonly().optional(),
  update_time: z.string().datetime().readonly().optional(),
  links: z.array(LinkDescriptionSchema).readonly().optional()
});

const RefundSchema = z.object({
  id: z.string().readonly().optional(),
  amount: z.lazy(() => AmountSchema),
  state: z.enum(["pending", "completed", "cancelled", "failed"]).readonly().optional(),
  reason: z.string().optional(),
  invoice_number: z.string().max(127).optional(),
  sale_id: z.string().readonly().optional(),
  capture_id: z.string().readonly().optional(),
  parent_payment: z.string().readonly().optional(),
  description: z.string().optional(),
  create_time: z.string().datetime().readonly().optional(),
  update_time: z.string().datetime().readonly().optional(),
  links: z.array(LinkDescriptionSchema).readonly().optional()
});


// --- Parameters Schemas ---
const PaypalPartnerAttributionIdParameterSchema = z.string().max(32).optional();
const CountParameterSchema = z.number().int().max(20).default(10).optional();
const StartIdParameterSchema = z.string().optional();
const StartIndexParameterSchema = z.number().int().optional();
const StartTimeParameterSchema = z.string().optional();
const EndTimeParameterSchema = z.string().optional();
const PayeeIdParameterSchema = z.string().optional();
const SortByParameterSchema = z.enum(["create_time"]).optional();
const SortOrderParameterSchema = z.enum(["desc"]).optional();
const PaymentIdParameterSchema = z.string();
const PaypalRequestIdParameterSchema = z.string().max(78).optional();
const SaleIdParameterSchema = z.string();
const AuthorizationIdParameterSchema = z.string();
const OrderIdParameterSchema = z.string();
const CaptureIdParameterSchema = z.string();
const RefundIdParameterSchema = z.string();

// --- Exports ---
export {
  ErrorDetailsSchema,
  ErrorLocationSchema,
  ErrorLinkDescriptionSchema,
  CurrencyCodeSchema,
  ItemSchema,
  ShippingAddressSchema,
  ProcessorResponseSchema,
  FmfDetailsSchema,
  PaymentHoldReasonSchema,
  RelatedResourcesSchema,
  CreditCardTokenSchema,
  CreditCardTokenSchemaCreditCardTokenSchema,
  FundingInstrumentSchema,
  PayeeBaseSchema,
  AddressSchema,
  ShippingAddressSchemaShippingAddressSchema,
  PayerInfoSchema,
  PayerSchema,
  TokenSchema,
  PaymentSourceSchema,
  PaymentPatternSchema,
  ApplicationContextSchema,
  AmountSchema,
  PaymentAmountDetailsSchema,
  PayeeSchema,
  TransactionSchema,
  PaymentSchema,
  PaymentHistorySchema,
  PatchSchema,
  PatchRequestSchema,
  CartBaseSchema,
  PaymentExecutionSchema,
  RefundRequestSchema,
  RefundSchemaRefundSchema,
  DetailedRefundSchema,
  AuthorizationSchemaAuthorizationSchema,
  OrderSchemaOrderSchema,
  CaptureSchemaCaptureSchema,
  SaleSchema,
  AuthorizationSchema,
  OrderSchema,
  CaptureSchema,
  RefundSchema,
  PaypalPartnerAttributionIdParameterSchema,
  CountParameterSchema,
  StartIdParameterSchema,
  StartIndexParameterSchema,
  StartTimeParameterSchema,
  EndTimeParameterSchema,
  PayeeIdParameterSchema,
  SortByParameterSchema,
  SortOrderParameterSchema,
  PaymentIdParameterSchema,
  PaypalRequestIdParameterSchema,
  SaleIdParameterSchema,
  AuthorizationIdParameterSchema,
  OrderIdParameterSchema,
  CaptureIdParameterSchema,
  RefundIdParameterSchema
};