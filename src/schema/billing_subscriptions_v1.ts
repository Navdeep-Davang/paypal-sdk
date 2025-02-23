

// billing_subscriptions_v1 zod

// Its json has 112 types (as per ai)
// Total Exported ZodSchemas 117

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

const CurrencyCodeSchema = z.string().min(3).max(3);

const MoneySchema = z.object({
  currency_code: CurrencyCodeSchema,
  value: z.string().max(32).regex(/^((-?[0-9]+)|(-?([0-9]+)?[.][0-9]+))$/),
});

const PricingTierSchema = z.object({
  starting_quantity: z.string().min(1).max(32).regex(/^([0-9]+|([0-9]+)?[.][0-9]+)$/),
  ending_quantity: z.string().min(1).max(32).regex(/^([0-9]+|([0-9]+)?[.][0-9]+)$/).optional(),
  amount: MoneySchema,
});

const DateTimeSchema = z.string().min(20).max(64).regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$/);

const FrequencySchema = z.object({
  interval_unit: z.enum(["DAY", "WEEK", "MONTH", "YEAR"]),
  interval_count: z.number().int().min(1).max(365).default(1).optional(),
});

const PricingSchemeSchema = z.object({
  version: z.number().int().min(0).max(999).readonly().optional(), 
  fixed_price: MoneySchema.optional(), 
  pricing_model: z.enum(["VOLUME", "TIERED"]).optional(), 
  tiers: z.array(PricingTierSchema).min(1).max(32).optional(), 
  create_time: DateTimeSchema.readonly().optional(), 
  update_time: DateTimeSchema.readonly().optional(), 
});

const BillingCycleSchema = z.object({
  frequency: FrequencySchema,
  tenure_type: z.enum(["REGULAR", "TRIAL"]),
  sequence: z.number().int().min(1).max(99),
  total_cycles: z.number().int().min(0).max(999).default(1).optional(),
  pricing_scheme: z.lazy(() => PricingSchemeSchema).optional(),
});

const PaymentPreferencesSchema = z.object({
  auto_bill_outstanding: z.boolean().default(true).optional(),
  setup_fee: MoneySchema.optional(),
  setup_fee_failure_action: z.enum(["CONTINUE", "CANCEL"]).default("CANCEL").optional(),
  payment_failure_threshold: z.number().int().min(0).max(999).default(0).optional(),
});

const PercentageSchema = z.string().regex(/^((-?[0-9]+)|(-?([0-9]+)?[.][0-9]+))$/);

const TaxesSchema = z.object({
  percentage: PercentageSchema,
  inclusive: z.boolean().default(true).optional(),
});

const LinkDescriptionSchema = z.object({
  href: z.string(),
  rel: z.string(),
  method: z.enum(["GET", "POST", "PUT", "DELETE", "HEAD", "CONNECT", "OPTIONS", "PATCH"]).optional(),
});

const PlanSchema = z.object({
  id: z.string().min(3).max(50).optional(),
  product_id: z.string().min(6).max(50).optional(),
  name: z.string().min(1).max(127).optional(),
  status: z.enum(["CREATED", "INACTIVE", "ACTIVE"]).optional(),
  description: z.string().min(1).max(127).optional(),
  billing_cycles: z.array(BillingCycleSchema).min(1).max(12).optional(),
  payment_preferences: PaymentPreferencesSchema.optional(),
  taxes: TaxesSchema.optional(),
  quantity_supported: z.boolean().default(false).optional(),
  create_time: DateTimeSchema.optional(),
  update_time: DateTimeSchema.optional(),
  links: z.array(LinkDescriptionSchema).min(1).max(10).optional(),
});

const PlanCollectionSchema = z.object({
  plans: z.array(PlanSchema).min(0).max(32767).optional(),
  total_items: z.number().int().min(0).max(500000000).optional(),
  total_pages: z.number().int().min(0).max(100000000).optional(),
  links: z.array(LinkDescriptionSchema).min(1).max(10).optional(),
});

const PlanRequestPOSTSchema = z.object({
  product_id: z.string().min(6).max(50),
  name: z.string().min(1).max(127),
  status: z.enum(["CREATED", "INACTIVE", "ACTIVE"]).default("ACTIVE").optional(),
  description: z.string().min(1).max(127).optional(),
  billing_cycles: z.array(BillingCycleSchema).min(1).max(12),
  payment_preferences: PaymentPreferencesSchema,
  taxes: TaxesSchema.optional(),
  quantity_supported: z.boolean().default(false).optional(),
});

const PatchSchema = z.object({
  op: z.enum(["add", "remove", "replace", "move", "copy", "test"]),
  path: z.string(),
  value: z.any().optional(),
  from: z.string().optional(),
});

const PatchRequestSchema = z.array(PatchSchema);

const UpdatePricingSchemeRequestSchema = z.object({
  billing_cycle_sequence: z.number().int().min(1).max(99),
  pricing_scheme: z.lazy(() => PricingSchemeSchema),
});

const UpdatePricingSchemesListRequestSchema = z.object({
  pricing_schemes: z.array(UpdatePricingSchemeRequestSchema).min(1).max(99),
});

const EmailSchema = z.string().min(3).max(254).regex(/^.+@[^"\-].+$/);

const AccountIdSchema = z.string().min(13).max(13).regex(/^[2-9A-HJ-NP-Z]{13}$/);

const NameSchema = z.object({
  prefix: z.string().max(140).optional(),
  given_name: z.string().max(140).optional(),
  surname: z.string().max(140).optional(),
  middle_name: z.string().max(140).optional(),
  suffix: z.string().max(140).optional(),
  alternate_full_name: z.string().max(300).optional(),
  full_name: z.string().max(300).optional(),
});

const PhoneTypeSchema = z.enum(["FAX", "HOME", "MOBILE", "OTHER", "PAGER"]);

const PhoneSchema = z.object({
  country_code: z.string().min(1).max(3).regex(/^[0-9]{1,3}?$/),
  national_number: z.string().min(1).max(14).regex(/^[0-9]{1,14}?$/),
  extension_number: z.string().min(1).max(15).regex(/^[0-9]{1,15}?$/).optional(),
});

const PhoneWithTypeSchema = z.object({
  phone_type: PhoneTypeSchema.optional(),
  phone_number: PhoneSchema,
});

const DateNoTimeSchema = z.string().min(10).max(10).regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/);

const TaxInfoSchema = z.object({
  tax_id: z.string().max(14),
  tax_id_type: z.enum(["BR_CPF", "BR_CNPJ"]),
});

const CountryCodeSchema = z.string().min(2).max(2).regex(/^([A-Z]{2}|C2)$/);

const AddressPortableSchema = z.object({
  address_line_1: z.string().max(300).optional(),
  address_line_2: z.string().max(300).optional(),
  address_line_3: z.string().max(100).optional(),
  admin_area_4: z.string().max(100).optional(),
  admin_area_3: z.string().max(100).optional(),
  admin_area_2: z.string().max(120).optional(),
  admin_area_1: z.string().max(300).optional(),
  postal_code: z.string().max(60).optional(),
  country_code: CountryCodeSchema,
  address_details: z.lazy(() => AddressDetailsSchema).optional(),
});

const PayerBaseSchema = z.object({
  email_address: EmailSchema.optional(),
  payer_id: AccountIdSchema.optional(),
});

const PayerSchema = z.object({
  name: NameSchema.optional(),
  phone: PhoneWithTypeSchema.optional(),
  birth_date: DateNoTimeSchema.optional(),
  tax_info: TaxInfoSchema.optional(),
  address: AddressPortableSchema.optional(),
}).merge(PayerBaseSchema.partial());

const ShippingDetailSchema = z.object({
  name: NameSchema.optional(),
  type: z.enum(["SHIPPING", "PICKUP_IN_PERSON"]).optional(),
  address: AddressPortableSchema.optional(),
});

const DateYearMonthSchema = z.string().min(7).max(7).regex(/^[0-9]{4}-(0[1-9]|1[0-2])$/);

const CardBrandSchema = z.enum(["VISA", "MASTERCARD", "DISCOVER", "AMEX", "SOLO", "JCB", "STAR", "DELTA", "SWITCH", "MAESTRO", "CB_NATIONALE", "CONFIGOGA", "CONFIDIS", "ELECTRON", "CETELEM", "CHINA_UNION_PAY"]);

const CardSchema = z.object({
  id: z.string().optional(),
  name: z.string().max(300).optional(),
  number: z.string().min(13).max(19),
  expiry: DateYearMonthSchema,
  security_code: z.string().regex(/[0-9]{3,4}/).optional(),
  last_digits: z.string().regex(/[0-9]{2,}/).optional(),
  card_type: CardBrandSchema.optional(),
  billing_address: AddressPortableSchema.optional(),
});

const PaymentSourceSchema = z.object({
  card: CardSchema.optional(),
});

const SubscriberRequestSchema = z.object({
  shipping_address: ShippingDetailSchema.optional(),
  payment_source: PaymentSourceSchema.optional(),
}).merge(PayerSchema.partial());

const LanguageSchema = z.string().min(2).max(10).regex(/^[a-z]{2}(?:-[A-Z][a-z]{3})?(?:-(?:[A-Z]{2}))?$/);

const PayeePaymentMethodPreferenceSchema = z.enum(["UNRESTRICTED", "IMMEDIATE_PAYMENT_REQUIRED"]).default("UNRESTRICTED").optional();

const PaymentMethodSchema = z.object({
  payer_selected: z.string().min(1).regex(/^[0-9A-Z_]+$/).default("PAYPAL").optional(),
  payee_preferred: PayeePaymentMethodPreferenceSchema.optional(),
  standard_entry_class_code: z.enum(["TEL", "WEB", "CCD", "PPD"]).default("WEB").optional(),
});

const ApplicationContextSchema = z.object({
  brand_name: z.string().min(1).max(127).optional(),
  locale: LanguageSchema.optional(),
  shipping_preference: z.enum(["GET_FROM_FILE", "NO_SHIPPING", "SET_PROVIDED_ADDRESS"]).default("GET_FROM_FILE").optional(),
  user_action: z.enum(["CONTINUE", "SUBSCRIBE_NOW"]).default("SUBSCRIBE_NOW").optional(),
  payment_method: PaymentMethodSchema.optional(),
  return_url: z.string().url().min(10).max(4000),
  cancel_url: z.string().url().min(10).max(4000),
});

const BillingCycleOverrideSchema = z.object({
  pricing_scheme: z.lazy(() => PricingSchemeSchema).optional(),
  sequence: z.number().int().min(1).max(99),
  total_cycles: z.number().int().min(0).max(999).optional(),
});

const PaymentPreferencesOverrideSchema = z.object({
  auto_bill_outstanding: z.boolean().optional(),
  setup_fee: MoneySchema.optional(),
  setup_fee_failure_action: z.enum(["CONTINUE", "CANCEL"]).optional(),
  payment_failure_threshold: z.number().int().min(0).max(999).optional(),
});

const TaxesOverrideSchema = z.object({
  percentage: PercentageSchema.optional(),
  inclusive: z.boolean().optional(),
});

const PlanOverrideSchema = z.object({
  billing_cycles: z.array(BillingCycleOverrideSchema).min(1).max(12).optional(),
  payment_preferences: PaymentPreferencesOverrideSchema.optional(),
  taxes: TaxesOverrideSchema.optional(),
});

const SubscriptionRequestPOSTSchema = z.object({
  plan_id: z.string().min(3).max(50),
  start_time: DateTimeSchema.default("Current time").optional(),
  quantity: z.string().regex(/^([0-9]+|([0-9]+)?[.][0-9]+)$/).min(1).max(32).optional(),
  shipping_amount: MoneySchema.optional(),
  subscriber: SubscriberRequestSchema.optional(),
  auto_renewal: z.boolean().default(false).optional().describe("deprecated"),
  application_context: ApplicationContextSchema.optional(),
  custom_id: z.string().min(1).max(127).regex(/^[\x20-\x7E]+$/).optional(),
  plan: PlanOverrideSchema.optional(),
});

const SubscriptionStatusSchema = z.object({
  status: z.enum(["APPROVAL_PENDING", "APPROVED", "ACTIVE", "SUSPENDED", "CANCELLED", "EXPIRED"]).optional(),
  status_change_note: z.string().min(1).max(128).optional(),
  status_update_time: DateTimeSchema.optional(),
});

const LiabilityShiftSchema = z.enum(["YES", "NO", "POSSIBLE", "UNKNOWN"]);

const ParesStatusSchema = z.enum(["Y", "N", "U", "A", "C", "R", "D", "I"]);

const EnrolledSchema = z.enum(["Y", "N", "U", "B"]);

const ThreeDSecureAuthenticationResponseSchema = z.object({
  authentication_status: ParesStatusSchema.optional(),
  enrollment_status: EnrolledSchema.optional(),
});

const AuthenticationResponseSchema = z.object({
  liability_shift: LiabilityShiftSchema.optional(),
  three_d_secure: ThreeDSecureAuthenticationResponseSchema.optional(),
});

const CardResponseSchema = z.object({
  last_digits: z.string().regex(/[0-9]{2,}/).optional(),
  brand: CardBrandSchema.optional(),
  type: z.enum(["CREDIT", "DEBIT", "PREPAID", "UNKNOWN"]).optional(),
  authentication_result: AuthenticationResponseSchema.optional(),
});

const CardResponseWithBillingAddressSchema = z.object({
  name: z.string().min(2).max(300).optional(),
  billing_address: AddressPortableSchema.optional(),
  expiry: DateYearMonthSchema.optional(),
  currency_code: CurrencyCodeSchema.optional(),
}).merge(CardResponseSchema.partial());

const PaymentSourceResponseSchema = z.object({
  card: CardResponseWithBillingAddressSchema.optional(),
});

const SubscriberSchema = z.object({
  shipping_address: ShippingDetailSchema.optional(),
  payment_source: PaymentSourceResponseSchema.optional(),
}).merge(PayerSchema.partial());

const CycleExecutionSchema = z.object({
  tenure_type: z.enum(["REGULAR", "TRIAL"]),
  sequence: z.number().int().min(0).max(99),
  cycles_completed: z.number().int().min(0).max(9999),
  cycles_remaining: z.number().int().min(0).max(9999).optional(),
  current_pricing_scheme_version: z.number().int().min(1).max(99).optional(),
  total_cycles: z.number().int().min(0).max(999).optional(),
});

const LastPaymentDetailsSchema = z.object({
  amount: MoneySchema,
  time: DateTimeSchema,
});

const FailedPaymentDetailsSchema = z.object({
  amount: MoneySchema,
  time: DateTimeSchema,
  reason_code: z.enum(["PAYMENT_DENIED", "INTERNAL_SERVER_ERROR", "PAYEE_ACCOUNT_RESTRICTED", "PAYER_ACCOUNT_RESTRICTED", "PAYER_CANNOT_PAY", "SENDING_LIMIT_EXCEEDED", "TRANSACTION_RECEIVING_LIMIT_EXCEEDED", "CURRENCY_MISMATCH"]).optional(),
  next_payment_retry_time: DateTimeSchema.optional(),
});

const SubscriptionBillingInfoSchema = z.object({
  outstanding_balance: MoneySchema,
  cycle_executions: z.array(CycleExecutionSchema).min(0).max(3).optional(),
  last_payment: LastPaymentDetailsSchema.optional(),
  next_billing_time: DateTimeSchema.optional(),
  final_payment_time: DateTimeSchema.optional(),
  failed_payments_count: z.number().int().min(0).max(999),
  last_failed_payment: FailedPaymentDetailsSchema.optional(),
});

const SubscriptionSchema = z.object({
  id: z.string().min(3).max(50).optional(),
  plan_id: z.string().min(3).max(50).optional(),
  start_time: DateTimeSchema.optional(),
  quantity: z.string().regex(/^([0-9]+|([0-9]+)?[.][0-9]+)$/).min(1).max(32).optional(),
  shipping_amount: MoneySchema.optional(),
  subscriber: SubscriberSchema.optional(),
  billing_info: SubscriptionBillingInfoSchema.optional(),
  create_time: DateTimeSchema.optional(),
  update_time: DateTimeSchema.optional(),
  custom_id: z.string().min(1).max(127).regex(/^[\x20-\x7E]+$/).optional(),
  plan_overridden: z.boolean().optional(),
  plan: PlanSchema.optional(),
  links: z.array(LinkDescriptionSchema).optional(),
}).merge(SubscriptionStatusSchema.partial());

const SubscriptionsCreate400Schema = z.object({
  details: z.array(z.any()).optional(), // TODO:
});

const SubscriptionsPatch400Schema = z.object({
  details: z.array(z.any()).optional(), // TODO:
});

const SubscriptionsRevise400Schema = z.object({
  details: z.array(z.any()).optional(), // TODO:
});

const SubscriptionsSuspend400Schema = z.object({
  details: z.array(z.any()).optional(), // TODO:
});

const SubscriptionsCancel400Schema = z.object({
  details: z.array(z.any()).optional(), // TODO:
});

const SubscriptionsActivate400Schema = z.object({
  details: z.array(z.any()).optional(), // TODO:
});

const SubscriptionsCapture400Schema = z.object({
  details: z.array(z.any()).optional(), // TODO:
});

const SubscriptionsTransactions400Schema = z.object({
  details: z.array(z.any()).optional(), // TODO:
});

const SubscriptionReviseRequestSchema = z.object({
  plan_id: z.string().min(3).max(50).optional(),
  quantity: z.string().regex(/^([0-9]+|([0-9]+)?[.][0-9]+)$/).min(1).max(32).optional(),
  shipping_amount: MoneySchema.optional(),
  shipping_address: ShippingDetailSchema.optional(),
  application_context: ApplicationContextSchema.optional(),
  plan: PlanOverrideSchema.optional(),
});

const SubscriptionSuspendRequestSchema = z.object({
  reason: z.string().min(1).max(128),
});

const SubscriptionActivateRequestSchema = z.object({
  reason: z.string().min(1).max(128).optional(),
});

const AmountWithBreakdownSchema = z.object({
  gross_amount: MoneySchema,
  total_item_amount: MoneySchema.optional(),
  fee_amount: MoneySchema.optional(),
  shipping_amount: MoneySchema.optional(),
  tax_amount: MoneySchema.optional(),
  net_amount: MoneySchema.optional(),
});

const CaptureStatusDetailsSchema = z.object({
  reason: z.enum(["BUYER_COMPLAINT", "CHARGEBACK", "ECHECK", "INTERNATIONAL_WITHDRAWAL", "OTHER", "PENDING_REVIEW", "RECEIVING_PREFERENCE_MANDATES_MANUAL_ACTION", "REFUNDED", "TRANSACTION_APPROVED_AWAITING_FUNDING", "UNILATERAL", "VERIFICATION_REQUIRED"]).optional(),
});

const CaptureStatusSchema = z.object({
  status: z.enum(["COMPLETED", "DECLINED", "PARTIALLY_REFUNDED", "PENDING", "REFUNDED"]).optional(),
  status_details: CaptureStatusDetailsSchema.optional(),
});

const EmailAddressSchema = z.string().min(3).max(254).regex(/^.+@[^"\-].+$/);

const TransactionSchema = z.object({
  id: z.string().min(3).max(50).optional(),
  amount_with_breakdown: AmountWithBreakdownSchema,
  payer_name: NameSchema.optional(),
  payer_email: EmailAddressSchema.optional(),
  time: DateTimeSchema,
}).merge(CaptureStatusSchema.partial());

const TransactionsListSchema = z.object({
  transactions: z.array(TransactionSchema).min(0).max(32767).optional(),
  total_items: z.number().int().min(0).max(500000000).optional(),
  total_pages: z.number().int().min(0).max(100000000).optional(),
  links: z.array(LinkDescriptionSchema).min(1).max(10).optional(),
});

const AddressDetailsSchema = z.object({
  street_number: z.string().max(100).optional(),
  street_name: z.string().max(100).optional(),
  street_type: z.string().max(100).optional(),
  delivery_service: z.string().max(100).optional(),
  building_name: z.string().max(100).optional(),
  sub_building: z.string().max(100).optional(),
});

// --- Parameters Schemas ---

const PreferParameterSchema = z.enum(["return=minimal", "return=representation"]).default("return=minimal").optional();
const PaypalRequestIdParameterSchema = z.string().optional();
const ProductIdParameterSchema = z.string().min(6).max(50).optional();
const PlanIdsParameterSchema = z.string().min(3).max(270).optional();
const PageSizeParameterSchema = z.number().int().min(1).max(20).default(10).optional();
const PageParameterSchema = z.number().int().min(1).max(100000).default(1).optional();
const TotalRequiredParameterSchema = z.boolean().default(false).optional();
const IdParameterSchema = z.string();
const FieldsParameterSchema = z.string().min(1).max(100).optional();
const StartTimeParameterSchema = z.string().min(20).max(64).regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$/);
const EndTimeParameterSchema = z.string().min(20).max(64).regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$/);



// --- Remaining Types ---
const _400Schema = z.object({
  details: z
    .array(
      z.object({
        issue: z.enum(["INVALID_PARAMETER_VALUE"]).optional(),
      })
    )
    .optional(),
});

const _401Schema = z.object({
  details: z
    .array(
      z.object({
        issue: z.enum(["INVALID_ACCOUNT_STATUS"]).optional(),
      })
    )
    .optional(),
});

const _403Schema = z.object({
  details: z
    .array(
      z.object({
        issue: z.enum(["PERMISSION_DENIED"]).optional(),
      })
    )
    .optional(),
});

const _404Schema = z.object({
  details: z
    .array(
      z.object({
        issue: z.enum(["INVALID_RESOURCE_ID"]).optional(),
      })
    )
    .optional(),
});

const _422Schema = z.object({
  details: z
    .array(
      z.object({
        issue: z
          .enum([
            "USER_ACCOUNT_CLOSED",
            "CURRENCY_MISMATCH",
            "MULTIPLE_FREE_TRIAL_BILLING_CYCLES_NOT_SUPPORTED",
            "MORE_THAN_TWO_TRIAL_BILLING_CYCLE_NOT_SUPPORTED",
            "MISSING_REGULAR_BILLING_CYCLE",
            "MULTIPLE_REGULAR_BILLING_CYCLES_NOT_SUPPORTED",
            "INVALID_BILLING_CYCLE_SEQUENCE",
            "INVALID_TRIAL_BILLING_TOTAL_CYCLES",
            "INVALID_PRICING_TIER_AMOUNT",
            "MISSING_PRICING_SCHEME_TIERS",
            "OVERLAPPING_PRICING_SCHEME_TIERS",
            "INVALID_PRICING_MODEL",
            "FIXED_PRICE_NOT_SUPPORTED",
            "INVALID_PRICING_TIER_QUANTITY",
            "INVALID_QUANTITY_SUPPORTED",
            "CURRENCY_NOT_SUPPORTED_FOR_RECEIVER",
            "INVALID_METADATA_CUSTOM_NOTE",
            "INVALID_METADATA_INVOICE_ID",
          ])
          .optional(),
      })
    )
    .optional(),
});

const ErrorDefaultSchema = z.union([
  z.object({ name: z.literal("INVALID_REQUEST") }),
  z.object({ name: z.literal("AUTHENTICATION_FAILURE") }),
  z.object({ name: z.literal("NOT_AUTHORIZED") }),
  z.object({ name: z.literal("RESOURCE_NOT_FOUND") }),
  z.object({ name: z.literal("RESOURCE_CONFLICT") }),
  z.object({ name: z.literal("UNSUPPORTED_MEDIA_TYPE") }),
  z.object({ name: z.literal("UNPROCESSABLE_ENTITY") }),
  z.object({ name: z.literal("INTERNAL_SERVER_ERROR") }),
  z.object({ name: z.literal("SERVICE_UNAVAILABLE") }),
]);

const Error404Schema = z.object({
  name: z.literal("RESOURCE_NOT_FOUND").optional(),
  message: z.literal("The specified resource does not exist.").optional(),
  details: z
    .array(
      z.object({
        field: z.string().optional(),
        value: z.string().optional(),
        location: z.enum(["body", "path", "query"]).default("body").optional(),
        issue: z.string().optional(),
      })
    )
    .optional(),
  debug_id: z.string().optional(),
  links: z
    .array(
      z.object({
        href: z.string().optional(),
        rel: z.string().optional(),
        method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]).optional(),
      })
    )
    .optional(),
});

const Error409Schema = z.object({
  name: z.literal("RESOURCE_CONFLICT").optional(),
  message: z
    .literal("The server has detected a conflict while processing this request.")
    .optional(),
  details: z
    .array(
      z.object({
        field: z.string().optional(),
        value: z.string().optional(),
        location: z.enum(["body", "path", "query"]).default("body").optional(),
        issue: z.string().optional(),
      })
    )
    .optional(),
  debug_id: z.string().optional(),
  links: z
    .array(
      z.object({
        href: z.string().optional(),
        rel: z.string().optional(),
        method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]).optional(),
      })
    )
    .optional(),
});

const Error415Schema = z.object({
  name: z.literal("UNSUPPORTED_MEDIA_TYPE").optional(),
  message: z
    .literal("The server does not support the request payload's media type.")
    .optional(),
  details: z
    .array(
      z.object({
        field: z.string().optional(),
        value: z.string().optional(),
        location: z.enum(["body", "path", "query"]).default("body").optional(),
        issue: z.string().optional(),
      })
    )
    .optional(),
  debug_id: z.string().optional(),
  links: z
    .array(
      z.object({
        href: z.string().optional(),
        rel: z.string().optional(),
        method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]).optional(),
      })
    )
    .optional(),
});

const Error500Schema = z.object({
  name: z.literal("INTERNAL_SERVER_ERROR").optional(),
  message: z.literal("An internal server error occurred.").optional(),
  debug_id: z.string().optional(),
  links: z
    .array(
      z.object({
        href: z.string().optional(),
        rel: z.string().optional(),
      })
    )
    .optional(),
});

const Error503Schema = z.object({
  name: z.literal("SERVICE_UNAVAILABLE").optional(),
  message: z.literal("Service Unavailable.").optional(),
  debug_id: z.string().optional(),
  links: z
    .array(
      z.object({
        href: z.string().optional(),
        rel: z.string().optional(),
      })
    )
    .optional(),
});

const PlansCreate400Schema = z.object({
  details: z
    .array(
      z.object({
        issue: z
          .enum([
            "INVALID_PARAMETER_SYNTAX",
            "INVALID_PARAMETER_VALUE",
            "MISSING_REQUIRED_PARAMETER",
            "INVALID_STRING_MIN_LENGTH",
            "INVALID_STRING_MAX_LENGTH",
            "INVALID_INTEGER_MIN_VALUE",
            "INVALID_INTEGER_MAX_VALUE",
          ])
          .optional(),
      })
    )
    .optional(),
});

const PlansPatch422Schema = z.object({
  details: z
    .array(
      z.object({
        issue: z.enum(["USER_ACCOUNT_CLOSED", "PLAN_STATUS_INACTIVE"]).optional(),
      })
    )
    .optional(),
});

const PlansActivate422Schema = z.object({
  details: z
    .array(
      z.object({
        issue: z
          .enum(["USER_ACCOUNT_CLOSED", "PLAN_STATUS_INVALID"])
          .optional(),
      })
    )
    .optional(),
});

const PlansDeactivate422Schema = z.object({
  details: z
    .array(
      z.object({
        issue: z
          .enum(["USER_ACCOUNT_CLOSED", "PLAN_STATUS_INVALID"])
          .optional(),
      })
    )
    .optional(),
});

const PlansUpdatePricingSchemes400Schema = z.object({
  details: z
    .array(
      z.object({
        issue: z.enum(["INVALID_PARAMETER_VALUE", "MISSING_REQUIRED_PARAMETER"]).optional(),
      })
    )
    .optional(),
});

const PlansUpdatePricingSchemes422Schema = z.object({
  details: z
    .array(
      z.object({
        issue: z
          .enum([
            "CURRENCY_MISMATCH",
            "INVALID_BILLING_CYCLE_SEQUENCE",
            "INVALID_PRICING_SCHEME",
            "INVALID_PRICING_TIER_AMOUNT",
            "MISSING_PRICING_SCHEME_TIERS",
            "OVERLAPPING_PRICING_SCHEME_TIERS",
            "INVALID_PRICING_MODEL",
            "FIXED_PRICE_NOT_SUPPORTED",
            "INVALID_PRICING_TIER_QUANTITY",
            "PRICING_SCHEME_UPDATE_NOT_ALLOWED",
          ])
          .optional(),
      })
    )
    .optional(),
});

const SubscriptionsCreate422Schema = z.object({
  details: z
    .array(
      z.object({
        issue: z
          .enum([
            "USER_ACCOUNT_CLOSED",
            "PLAN_STATUS_INVALID",
            "SUBSCRIPTION_CANNOT_HAVE_QUANTITY",
            "CARD_SUBSCRIPTIONS_NOT_ENABLED",
            "3DS_CARDS_NOT_SUPPORTED",
            "INVALID_BILLING_CYCLE_SEQUENCE",
            "INVALID_PRICING_SCHEME",
            "INVALID_PRICING_TIER_AMOUNT",
            "MISSING_PRICING_SCHEME_TIERS",
            "OVERLAPPING_PRICING_SCHEME_TIERS",
            "INVALID_PRICING_MODEL",
            "FIXED_PRICE_NOT_SUPPORTED",
            "INVALID_PRICING_TIER_QUANTITY",
            "CURRENCY_MISMATCH",
          ])
          .optional(),
      })
    )
    .optional(),
});

const SubscriptionsPatch422Schema = z.object({
  details: z
    .array(
      z.object({
        issue: z
          .enum([
            "USER_ACCOUNT_CLOSED",
            "SUBSCRIPTION_STATUS_INVALID",
            "CARD_SUBSCRIPTIONS_NOT_ENABLED",
            "3DS_CARDS_NOT_SUPPORTED",
            "BILLING_CYCLE_EXECUTION_COMPLETED",
            "AMOUNT_GREATER_THAN_OUTSTANDING_BALANCE",
            "INVALID_BILLING_TOTAL_CYCLES",
            "INVALID_PRICING_TIER_AMOUNT",
            "MISSING_PRICING_SCHEME_TIERS",
            "OVERLAPPING_PRICING_SCHEME_TIERS",
            "INVALID_PRICING_MODEL",
            "FIXED_PRICE_NOT_SUPPORTED",
            "INVALID_PRICING_TIER_QUANTITY",
            "INVALID_START_TIME",
            "CURRENCY_MISMATCH",
          ])
          .optional(),
      })
    )
    .optional(),
});

const SubscriptionReviseResponseSchema = z.object({
  plan_id: z.string().min(3).max(50).optional(),
  quantity: z.string().regex(/^([0-9]+|([0-9]+)?[.][0-9]+)$/).min(1).max(32).optional(),
  shipping_amount: z.object({
      currency_code: z.string().min(3).max(3).optional(),
      value: z.string().max(32).optional(),
    })
    .optional(),
  shipping_address: z
    .object({
      name: z.object({full_name: z.string().max(300).optional()}).optional(),
      type: z.enum(["SHIPPING", "PICKUP_IN_PERSON"]).optional(),
      address: z.object({
          address_line_1: z.string().max(300).optional(),
          address_line_2: z.string().max(300).optional(),
          address_line_3: z.string().max(100).optional(),
          admin_area_4: z.string().max(100).optional(),
          admin_area_3: z.string().max(100).optional(),
          admin_area_2: z.string().max(120).optional(),
          admin_area_1: z.string().max(300).optional(),
          postal_code: z.string().max(60).optional(),
          country_code: z.string().max(2).optional(),
        }).optional(),
    }).optional(),
  application_context: z
    .object({
      brand_name: z.string().min(1).max(127).optional(),
      locale: z.string().min(2).max(10).optional(),
      shipping_preference: z.enum(["GET_FROM_FILE", "NO_SHIPPING", "SET_PROVIDED_ADDRESS"]).optional(),
      user_action: z.enum(["CONTINUE", "SUBSCRIBE_NOW"]).optional(),
      payment_method: z
        .object({
          payer_selected: z.string().min(1).regex(/^[0-9A-Z_]+$/).optional(),
          payee_preferred: z.enum(["UNRESTRICTED", "IMMEDIATE_PAYMENT_REQUIRED"]).optional(),
        })
        .optional(),
      return_url: z.string().url().min(10).max(4000).optional(),
      cancel_url: z.string().url().min(10).max(4000).optional(),
    })
    .optional(),
  plan_overridden: z.boolean().readonly().optional(),
  links: z
    .array(
      z.object({
        href: z.string().optional(),
        rel: z.string().optional(),
        method: z
          .enum([
            "GET",
            "POST",
            "PUT",
            "DELETE",
            "HEAD",
            "CONNECT",
            "OPTIONS",
            "PATCH",
          ])
          .optional(),
      })
    )
    .readonly()
    .optional(),
  plan: z.object({
      billing_cycles: z
        .array(
          z.object({
            pricing_scheme: z
              .object({
                version: z.number().int().min(0).max(999).readonly().optional(),
                fixed_price: z
                  .object({
                    currency_code: z.string().min(3).max(3).optional(),
                    value: z.string().max(32).optional(),
                  })
                  .optional(),
                pricing_model: z.enum(["VOLUME", "TIERED"]).optional(),
                tiers: z
                  .array(
                    z.object({
                      starting_quantity: z
                        .string()
                        .regex(/^([0-9]+|([0-9]+)?[.][0-9]+)$/)
                        .min(1)
                        .max(32),
                      ending_quantity: z
                        .string()
                        .regex(/^([0-9]+|([0-9]+)?[.][0-9]+)$/)
                        .min(1)
                        .max(32)
                        .optional(),
                      amount: z
                        .object({
                          currency_code: z.string().min(3).max(3).optional(),
                          value: z.string().max(32).optional(),
                        })
                        .optional(),
                    })
                  )
                  .min(1)
                  .max(32)
                  .optional(),
                create_time: z.string().readonly().optional(),
                update_time: z.string().readonly().optional(),
              })
              .optional(),
            sequence: z.number().int().min(1).max(99).optional(),
            total_cycles: z.number().int().min(0).max(999).optional(),
          })
        )
        .min(1)
        .max(12)
        .optional(),
      payment_preferences: z
        .object({
          auto_bill_outstanding: z.boolean().optional(),
          setup_fee: z
            .object({
              currency_code: z.string().min(3).max(3).optional(),
              value: z.string().max(32).optional(),
            })
            .optional(),
          setup_fee_failure_action: z.enum(["CONTINUE", "CANCEL"]).optional(),
          payment_failure_threshold: z.number().int().min(0).max(999).optional(),
        })
        .optional(),
      taxes: z
        .object({
          percentage: z.string().regex(/^((-?[0-9]+)|(-?([0-9]+)?[.][0-9]+))$/).optional(),
          inclusive: z.boolean().optional(),
        })
        .optional(),
    }).optional(),
});

const SubscriptionsRevise404Schema = z.object({
  details: z
    .array(
      z.object({
        issue: z.enum(["INVALID_RESOURCE_ID"]).optional(),
      })
    )
    .optional(),
});

const SubscriptionsRevise422Schema = z.object({
  details: z
    .array(
      z.object({
        issue: z
          .enum([
            "USER_ACCOUNT_CLOSED",
            "PLAN_PRODUCT_NOT_COMPATIBLE",
            "INVALID_BILLING_CYCLE_SEQUENCE",
            "INVALID_PRICING_SCHEME",
            "INVALID_PRICING_TIER_AMOUNT",
            "MISSING_PRICING_SCHEME_TIERS",
            "OVERLAPPING_PRICING_SCHEME_TIERS",
            "INVALID_PRICING_MODEL",
            "FIXED_PRICE_NOT_SUPPORTED",
            "INVALID_PRICING_TIER_QUANTITY",
            "CURRENCY_MISMATCH",
          ])
          .optional(),
      })
    )
    .optional(),
});

const SubscriptionsSuspend422Schema = z.object({
  details: z
    .array(
      z.object({
        issue: z.enum(["USER_ACCOUNT_CLOSED", "SUBSCRIPTION_STATUS_INVALID"]).optional(),
      })
    )
    .optional(),
});

const SubscriptionsCancel422Schema = z.object({
  details: z
    .array(
      z.object({
        issue: z.enum(["USER_ACCOUNT_CLOSED", "SUBSCRIPTION_STATUS_INVALID"]).optional(),
      })
    )
    .optional(),
});

const SubscriptionsActivate422Schema = z.object({
  details: z
    .array(
      z.object({
        issue: z
          .enum([
            "USER_ACCOUNT_CLOSED",
            "SUBSCRIPTION_STATUS_INVALID",
            "SUBSCRIPTION_CANNOT_BE_ACTIVATED",
          ])
          .optional(),
      })
    )
    .optional(),
});

const SubscriptionCaptureRequestSchema = z.object({
  note: z.string().min(1).max(128),
  capture_type: z.enum(["OUTSTANDING_BALANCE"]),
  amount: z.object({
    currency_code: z.string().min(3).max(3).optional(),
    value: z.string().max(32).optional(),
  }),
});

const SubscriptionsCapture422Schema = z.object({
  details: z
    .array(
      z.object({
        issue: z
          .enum([
            "USER_ACCOUNT_CLOSED",
            "SUBSCRIBER_ACCOUNT_LOCKED",
            "SUBSCRIBER_ACCOUNT_CLOSED",
            "SUBSCRIBER_ACCOUNT_RESTRICTED",
            "SUBSCRIPTION_STATUS_INVALID",
            "ZERO_OUTSTANDING_BALANCE",
            "CURRENCY_MISMATCH",
            "AMOUNT_GREATER_THAN_OUTSTANDING_BALANCE",
          ])
          .optional(),
      })
    )
    .optional(),
});


// --- Exports ---
export {
  ErrorDetailsSchema,
  ErrorLinkDescriptionSchema,
  CurrencyCodeSchema,
  MoneySchema,
  PricingTierSchema,
  DateTimeSchema,
  FrequencySchema,
  BillingCycleSchema,
  PaymentPreferencesSchema,
  PercentageSchema,
  TaxesSchema,
  LinkDescriptionSchema,
  PlanSchema,
  PlanCollectionSchema,
  PlanRequestPOSTSchema,
  PatchSchema,
  PatchRequestSchema,
  UpdatePricingSchemeRequestSchema,
  UpdatePricingSchemesListRequestSchema,
  EmailSchema,
  AccountIdSchema,
  NameSchema,
  PhoneTypeSchema,
  PhoneSchema,
  PhoneWithTypeSchema,
  DateNoTimeSchema,
  TaxInfoSchema,
  CountryCodeSchema,
  AddressPortableSchema,
  AddressDetailsSchema,
  PayerBaseSchema,
  PayerSchema,
  ShippingDetailSchema,
  DateYearMonthSchema,
  CardBrandSchema,
  CardSchema,
  PaymentSourceSchema,
  SubscriberRequestSchema,
  LanguageSchema,
  PayeePaymentMethodPreferenceSchema,
  PaymentMethodSchema,
  ApplicationContextSchema,
  BillingCycleOverrideSchema,
  PaymentPreferencesOverrideSchema,
  TaxesOverrideSchema,
  PlanOverrideSchema,
  SubscriptionRequestPOSTSchema,
  SubscriptionStatusSchema,
  LiabilityShiftSchema,
  ParesStatusSchema,
  EnrolledSchema,
  ThreeDSecureAuthenticationResponseSchema,
  AuthenticationResponseSchema,
  CardResponseSchema,
  CardResponseWithBillingAddressSchema,
  PaymentSourceResponseSchema,
  SubscriberSchema,
  CycleExecutionSchema,
  LastPaymentDetailsSchema,
  FailedPaymentDetailsSchema,
  SubscriptionBillingInfoSchema,
  SubscriptionSchema,
  SubscriptionsCreate400Schema,
  SubscriptionsPatch400Schema,
  SubscriptionsRevise400Schema,
  SubscriptionsSuspend400Schema,
  SubscriptionsCancel400Schema,
  SubscriptionsActivate400Schema,
  SubscriptionsCapture400Schema,
  SubscriptionsTransactions400Schema,
  SubscriptionReviseRequestSchema,
  SubscriptionSuspendRequestSchema,
  SubscriptionActivateRequestSchema,
  AmountWithBreakdownSchema,
  CaptureStatusDetailsSchema,
  CaptureStatusSchema,
  TransactionSchema,
  TransactionsListSchema,
  PreferParameterSchema,
  PaypalRequestIdParameterSchema,
  ProductIdParameterSchema,
  PlanIdsParameterSchema,
  PageSizeParameterSchema,
  PageParameterSchema,
  TotalRequiredParameterSchema,
  IdParameterSchema,
  FieldsParameterSchema,
  StartTimeParameterSchema,
  EndTimeParameterSchema,
  _400Schema,
  _401Schema,
  _403Schema,
  _404Schema,
  _422Schema,
  ErrorDefaultSchema,
  Error404Schema,
  Error409Schema,
  Error415Schema,
  Error500Schema,
  Error503Schema,
  PricingSchemeSchema,
  PlansCreate400Schema,
  PlansPatch422Schema,
  PlansActivate422Schema,
  PlansDeactivate422Schema,
  PlansUpdatePricingSchemes400Schema,
  PlansUpdatePricingSchemes422Schema,
  SubscriptionsCreate422Schema,
  SubscriptionsPatch422Schema,
  SubscriptionReviseResponseSchema,
  SubscriptionsRevise404Schema,
  SubscriptionsRevise422Schema,
  SubscriptionsSuspend422Schema,
  SubscriptionsCancel422Schema,
  SubscriptionsActivate422Schema,
  SubscriptionCaptureRequestSchema,
  SubscriptionsCapture422Schema,
};