
// payments_payment_v2 zod 

// Total Exported ZodSchemas 67

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

const CurrencyCodeSchema = z.string().min(3).max(3);

const MoneySchema = z.object({
  currency_code: CurrencyCodeSchema,
  value: z.string().max(32).regex(/^((-?[0-9]+)|(-?([0-9]+)?[.][0-9]+))$/),
});

const CardBrandSchema = z.enum([
  "VISA",
  "MASTERCARD",
  "DISCOVER",
  "AMEX",
  "SOLO",
  "JCB",
  "STAR",
  "DELTA",
  "SWITCH",
  "MAESTRO",
  "CB_NATIONALE",
  "CONFIGOGA",
  "CONFIDIS",
  "ELECTRON",
  "CETELEM",
  "CHINA_UNION_PAY"
]);

const DateTimeSchema = z.string().min(20).max(64).regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$/);

const LinkDescriptionSchema = z.object({
  href: z.string(),
  rel: z.string(),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'CONNECT', 'OPTIONS', 'PATCH']).optional(),
});

const DisbursementModeSchema = z.enum(["INSTANT", "DELAYED"]).default("INSTANT");

// --- Main Schemas ---

const Error400DetailsItemSchema = z.object({
  issue: z.enum(["INVALID_PARAMETER_VALUE", "MISSING_REQUIRED_PARAMETER", "INVALID_STRING_LENGTH", "INVALID_STRING_MAX_LENGTH", "INVALID_PARAMETER_SYNTAX"]),
  description: z.string()
}).partial();

const Error400Schema = z.object({
  details: z.array(Error400DetailsItemSchema).optional()
}).partial();

const Error401DetailsItemSchema = z.object({
  issue: z.enum(["INVALID_ACCOUNT_STATUS"]),
  description: z.string()
}).partial();

const Error401Schema = z.object({
  details: z.array(Error401DetailsItemSchema).optional()
}).partial();

const Error403DetailsItemSchema = z.object({
  issue: z.enum(["PERMISSION_DENIED"]),
  description: z.string()
}).partial();

const Error403Schema = z.object({
  details: z.array(Error403DetailsItemSchema).optional()
}).partial();

const Error404DetailsItemSchema = z.object({
  issue: z.enum(["INVALID_RESOURCE_ID"]),
  description: z.string()
}).partial();

const Error404Schema = z.object({
  details: z.array(Error404DetailsItemSchema).optional()
}).partial();

const Error409DetailsItemSchema = z.object({
  issue: z.enum(["PREVIOUS_REQUEST_IN_PROGRESS"]),
  description: z.string()
}).partial();

const Error409Schema = z.object({
  details: z.array(Error409DetailsItemSchema).optional()
}).partial();

const Error422DetailsItemSchema = z.object({
  issue: z.enum([
    "INVALID_CURRENCY_CODE",
    "CANNOT_BE_ZERO_OR_NEGATIVE",
    "DECIMAL_PRECISION",
    "DECIMALS_NOT_SUPPORTED",
    "TRANSACTION_REFUSED",
    "AUTHORIZATION_VOIDED",
    "MAX_CAPTURE_COUNT_EXCEEDED",
    "DUPLICATE_INVOICE_ID",
    "AUTH_CAPTURE_CURRENCY_MISMATCH",
    "PAYER_CANNOT_PAY",
    "AUTHORIZATION_DENIED",
    "AUTHORIZATION_EXPIRED",
    "AUTHORIZATION_ALREADY_CAPTURED",
    "MAX_CAPTURE_AMOUNT_EXCEEDED",
    "PAYEE_ACCOUNT_LOCKED_OR_CLOSED",
    "PAYER_ACCOUNT_LOCKED_OR_CLOSED",
    "PAYEE_ACCOUNT_RESTRICTED"
  ]),
  description: z.string()
}).partial();

const Error422Schema = z.object({
  details: z.array(Error422DetailsItemSchema).optional()
}).partial();

const AuthorizationStatusDetailsSchema = z.object({
  reason: z.enum(["PENDING_REVIEW"]).optional(),
});


const NetworkTransactionReferenceSchema = z.object({
    id: z.string().min(9).max(36).regex(/^[a-zA-Z0-9-]+$/),
    date: z.string().min(4).max(4).regex(/^[0-9]+$/).optional(),
    network: CardBrandSchema.optional(),
    acquirer_reference_number: z.string().min(1).max(36).regex(/^[a-zA-Z0-9]+$/).optional()
}).required({id: true});

const SellerProtectionSchema = z.object({
    status: z.enum(["ELIGIBLE", "PARTIALLY_ELIGIBLE", "NOT_ELIGIBLE"]).readonly().optional(),
    dispute_categories: z.array(z.enum(["ITEM_NOT_RECEIVED", "UNAUTHORIZED_TRANSACTION"])).readonly().optional(),
});

const AuthorizationStatusSchema = z.object({
  status: z.enum(["CREATED", "CAPTURED", "DENIED", "PARTIALLY_CAPTURED", "VOIDED", "PENDING"]).readonly().optional(),
  status_details: AuthorizationStatusDetailsSchema.readonly().optional(),
});

const ActivityTimestampsSchema = z.object({
  create_time: DateTimeSchema.readonly().optional(),
  update_time: DateTimeSchema.readonly().optional(),
});

const AuthorizationBaseSchema = z.object({
    id: z.string().readonly().optional(),
    amount: MoneySchema.readonly().optional(),
    invoice_id: z.string().readonly().optional(),
    custom_id: z.string().max(127).optional(),
    network_transaction_reference: NetworkTransactionReferenceSchema.optional(),
    seller_protection: SellerProtectionSchema.readonly().optional(),
    expiration_time: DateTimeSchema.readonly().optional(),
    links: z.array(LinkDescriptionSchema).readonly().optional(),
});

const AuthorizationSchema = z.object({
    ...AuthorizationBaseSchema.shape,
    ...AuthorizationStatusSchema.shape,
    ...ActivityTimestampsSchema.shape
});

const RelatedIdsSchema = z.object({
  order_id: z.string().min(1).max(20).regex(/^[A-Z0-9]+$/).optional(),
  authorization_id: z.string().min(1).max(20).regex(/^[A-Z0-9]+$/).optional(),
  capture_id: z.string().min(1).max(20).regex(/^[A-Z0-9]+$/).optional()
});

const SupplementaryDataSchema = z.object({
  related_ids: RelatedIdsSchema.readonly().optional()
});

const EmailSchema = z.string().max(254).min(3).regex(/(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|(?:"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*"))@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);

const AccountIdSchema = z.string().min(13).max(13).regex(/^[2-9A-HJ-NP-Z]{13}$/);

const PayeeBaseSchema = z.object({
  email_address: EmailSchema.optional(),
  merchant_id: AccountIdSchema.optional()
});

const Authorization2Schema = AuthorizationSchema.extend({
  supplementary_data: SupplementaryDataSchema.readonly().optional(),
  payee: PayeeBaseSchema.readonly().optional()
});

const SupplementaryPurchaseDataSchema = z.object({
  invoice_id: z.string().min(1).max(127).regex(/^.{1,127}$/).optional(),
  note_to_payer: z.string().min(1).max(255).regex(/^.{1,255}$/).optional()
});

const PlatformFeeSchema = z.object({
  amount: MoneySchema,
  payee: PayeeBaseSchema.optional()
}).required({amount: true});

const PaymentInstructionSchema = z.object({
  platform_fees: z.array(PlatformFeeSchema).min(0).max(1).optional(),
  disbursement_mode: DisbursementModeSchema.optional(),
  payee_pricing_tier_id: z.string().min(1).max(20).regex(/^.*$/).optional(),
  payee_receivable_fx_rate_id: z.string().min(1).max(4000).regex(/^.*$/).optional()
});

const CaptureRequestSchema = SupplementaryPurchaseDataSchema.extend({
  amount: MoneySchema.optional(),
  invoice_id: z.string().max(127).optional(),
  final_capture: z.boolean().default(false).optional(),
  payment_instruction: PaymentInstructionSchema.optional(),
  note_to_payer: z.string().max(255).optional(),
  soft_descriptor: z.string().max(22).optional()
});

const CaptureStatusDetailsSchema = z.object({
  reason: z.enum([
    "BUYER_COMPLAINT",
    "CHARGEBACK",
    "ECHECK",
    "INTERNATIONAL_WITHDRAWAL",
    "OTHER",
    "PENDING_REVIEW",
    "RECEIVING_PREFERENCE_MANDATES_MANUAL_ACTION",
    "REFUNDED",
    "TRANSACTION_APPROVED_AWAITING_FUNDING",
    "UNILATERAL",
    "VERIFICATION_REQUIRED"
  ]).optional()
});

const CaptureStatusSchema = z.object({
  status: z.enum(["COMPLETED", "DECLINED", "PARTIALLY_REFUNDED", "PENDING", "REFUNDED", "FAILED"]).readonly().optional(),
  status_details: CaptureStatusDetailsSchema.readonly().optional()
});

const ExchangeRateSchema = z.object({
  source_currency: CurrencyCodeSchema.optional(),
  target_currency: CurrencyCodeSchema.optional(),
  value: z.string().optional()
}).readonly();

const SellerReceivableBreakdownSchema = z.object({
  gross_amount: MoneySchema,
  paypal_fee: MoneySchema.optional(),
  paypal_fee_in_receivable_currency: MoneySchema.optional(),
  net_amount: MoneySchema.optional(),
  receivable_amount: MoneySchema.optional(),
  exchange_rate: ExchangeRateSchema.optional(),
  platform_fees: z.array(PlatformFeeSchema).min(0).max(1).optional()
}).required({gross_amount: true});

const ProcessorResponseSchema = z.object({
  avs_code: z.enum(["A", "B", "C", "D", "E", "F", "G", "I", "M", "N", "P", "R", "S", "U", "W", "X", "Y", "Z", "Null", "0", "1", "2", "3", "4"]).readonly().optional(),
  cvv_code: z.enum(["E", "I", "M", "N", "P", "S", "U", "X", "All others", "0", "1", "2", "3", "4"]).readonly().optional(),
  response_code: z.enum([
    "0000", "00N7", "0100", "0390", "0500", "0580", "0800", "0880", "0890", "0960", "0R00", "1000", "10BR", "1300", "1310", "1312",
    "1317", "1320", "1330", "1335", "1340", "1350", "1352", "1360", "1370", "1380", "1382", "1384", "1390", "1393", "5100", "5110",
    "5120", "5130", "5135", "5140", "5150", "5160", "5170", "5180", "5190", "5200", "5210", "5400", "5500", "5650", "5700", "5710",
    "5800", "5900", "5910", "5920", "5930", "5950", "6300", "7600", "7700", "7710", "7800", "7900", "8000", "8010", "8020", "8030",
    "8100", "8110", "8220", "9100", "9500", "9510", "9520", "9530", "9540", "9600", "PCNR", "PCVV", "PP06", "PPRN", "PPAD", "PPAB",
    "PPAE", "PPAG", "PPAI", "PPAR", "PPAU", "PPAV", "PPAX", "PPBG", "PPC2", "PPCE", "PPCO", "PPCR", "PPCT", "PPCU", "PPD3", "PPDC",
    "PPDI", "PPDV", "PPDT", "PPEF", "PPEL", "PPER", "PPEX", "PPFE", "PPFI", "PPFR", "PPFV", "PPGR", "PPH1", "PPIF", "PPII", "PPIM",
    "PPIT", "PPLR", "PPLS", "PPMB", "PPMC", "PPMD", "PPNC", "PPNL", "PPNM", "PPNT", "PPPH", "PPPI", "PPPM", "PPQC", "PPRE", "PPRF",
    "PPRR", "PPS0", "PPS1", "PPS2", "PPS3", "PPS4", "PPS5", "PPS6", "PPSC", "PPSD", "PPSE", "PPTE", "PPTF", "PPTI", "PPTR", "PPTT",
    "PPTV", "PPUA", "PPUC", "PPUE", "PPUI", "PPUP", "PPUR", "PPVC", "PPVE", "PPVT"
  ]).readonly().optional(),
  payment_advice_code: z.enum(["01", "02", "03", "21"]).readonly().optional()
});

const CaptureBaseSchema = z.object({
    id: z.string().readonly().optional(),
    amount: MoneySchema.readonly().optional(),
    invoice_id: z.string().readonly().optional(),
    custom_id: z.string().max(127).optional(),
    network_transaction_reference: NetworkTransactionReferenceSchema.optional(),
    seller_protection: SellerProtectionSchema.readonly().optional(),
    final_capture: z.boolean().default(false).readonly().optional(),
    seller_receivable_breakdown: SellerReceivableBreakdownSchema.readonly().optional(),
    disbursement_mode: DisbursementModeSchema.optional(),
    links: z.array(LinkDescriptionSchema).readonly().optional(),
    processor_response: ProcessorResponseSchema.optional(),
  });

const CaptureSchema = z.object({
  ...CaptureBaseSchema.shape,
  ...CaptureStatusSchema.shape,
  ...ActivityTimestampsSchema.shape,
});

const Capture2Schema = CaptureSchema.extend({
  supplementary_data: SupplementaryDataSchema.readonly().optional(),
  payee: PayeeBaseSchema.readonly().optional()
});

const ReauthorizeRequestSchema = z.object({
  amount: MoneySchema.optional()
});

const AuthorizationsReauthorize400DetailsItemSchema = z.object({
  issue: z.enum(["MISSING_REQUIRED_PARAMETER", "INVALID_STRING_LENGTH", "INVALID_STRING_MAX_LENGTH", "INVALID_PARAMETER_SYNTAX"]),
  description: z.string()
}).partial();

const AuthorizationsReauthorize400Schema = z.object({
  details: z.array(AuthorizationsReauthorize400DetailsItemSchema).optional()
}).partial();

const AuthorizationsReauthorize422DetailsItemSchema = z.object({
  issue: z.enum([
    "INVALID_CURRENCY_CODE",
    "CANNOT_BE_ZERO_OR_NEGATIVE",
    "DECIMAL_PRECISION",
    "DECIMALS_NOT_SUPPORTED",
    "TRANSACTION_REFUSED",
    "AUTHORIZATION_VOIDED",
    "PAYER_CANNOT_PAY",
    "AUTHORIZATION_ALREADY_CAPTURED",
    "PAYEE_ACCOUNT_LOCKED_OR_CLOSED",
    "PAYER_ACCOUNT_LOCKED_OR_CLOSED",
    "PAYEE_ACCOUNT_RESTRICTED",
    "REAUTHORIZATION_NOT_SUPPORTED",
    "AUTH_CURRENCY_MISMATCH"
  ]),
  description: z.string()
}).partial();

const AuthorizationsReauthorize422Schema = z.object({
  details: z.array(AuthorizationsReauthorize422DetailsItemSchema).optional()
}).partial();

const AuthorizationsVoid422DetailsItemSchema = z.object({
  issue: z.enum(["PREVIOUSLY_CAPTURED", "PREVIOUSLY_VOIDED", "CANNOT_BE_VOIDED"]),
  description: z.string()
}).partial();

const AuthorizationsVoid422Schema = z.object({
  details: z.array(AuthorizationsVoid422DetailsItemSchema).optional()
}).partial();

const PaymentInstruction2Schema = z.object({
  platform_fees: z.array(PlatformFeeSchema).min(0).max(1).optional()
});

const RefundRequestSchema = z.object({
  amount: MoneySchema.optional(),
  custom_id: z.string().min(1).max(127).regex(/^.*$/).optional(),
  invoice_id: z.string().min(1).max(127).regex(/^.*$/).optional(),
  note_to_payer: z.string().min(1).max(255).regex(/^.*$/).optional(),
  payment_instruction: PaymentInstruction2Schema.optional()
});

const RefundStatusDetailsSchema = z.object({
  reason: z.enum(["ECHECK"]).optional()
});

const RefundStatusSchema = z.object({
  status: z.enum(["CANCELLED", "FAILED", "PENDING", "COMPLETED"]).readonly().optional(),
  status_details: RefundStatusDetailsSchema.readonly().optional()
});

const NetAmountBreakdownItemSchema = z.object({
  payable_amount: MoneySchema.readonly().optional(),
  converted_amount: MoneySchema.readonly().optional(),
  exchange_rate: ExchangeRateSchema.readonly().optional()
});

const RefundSchema = z.object({
  id: z.string().readonly().optional(),
  amount: MoneySchema.readonly().optional(),
  invoice_id: z.string().readonly().optional(),
  custom_id: z.string().min(1).max(127).regex(/^[A-Za-z0-9-_.,]*$/).optional(),
  acquirer_reference_number: z.string().min(1).max(36).regex(/^[a-zA-Z0-9]+$/).optional(),
  note_to_payer: z.string().readonly().optional(),
  seller_payable_breakdown: z.object({
    gross_amount: MoneySchema.readonly().optional(),
    paypal_fee: MoneySchema.readonly().optional(),
    paypal_fee_in_receivable_currency: MoneySchema.readonly().optional(),
    net_amount: MoneySchema.readonly().optional(),
    net_amount_in_receivable_currency: MoneySchema.readonly().optional(),
    platform_fees: z.array(PlatformFeeSchema).min(0).max(1).optional(),
    net_amount_breakdown: z.array(NetAmountBreakdownItemSchema).readonly().optional(),
    total_refunded_amount: MoneySchema.optional()
  }).readonly().optional(),
  payer: PayeeBaseSchema.readonly().optional(),
  links: z.array(LinkDescriptionSchema).readonly().optional()
}).and(RefundStatusSchema).and(ActivityTimestampsSchema);

const CapturesRefund400DetailsItemSchema = z.object({
  issue: z.enum(["MISSING_REQUIRED_PARAMETER", "INVALID_PARAMETER_SYNTAX", "INVALID_STRING_LENGTH"]),
  description: z.string().optional()
}).partial();

const CapturesRefund400Schema = z.object({
  details: z.array(CapturesRefund400DetailsItemSchema).optional()
}).partial();

const CapturesRefund422DetailsItemSchema = z.object({
  issue: z.enum([
    "CANNOT_BE_ZERO_OR_NEGATIVE",
    "DECIMAL_PRECISION",
    "DECIMALS_NOT_SUPPORTED",
    "INVALID_CURRENCY_CODE",
    "CURRENCY_MISMATCH",
    "CANNOT_BE_NEGATIVE",
    "CAPTURE_FULLY_REFUNDED",
    "REFUND_CAPTURE_CURRENCY_MISMATCH",
    "REFUND_NOT_ALLOWED",
    "REFUND_TIME_LIMIT_EXCEEDED",
    "REFUND_AMOUNT_EXCEEDED",
    "REFUND_AMOUNT_TOO_LOW",
    "REFUND_FAILED_INSUFFICIENT_FUNDS",
    "PARTIAL_REFUND_NOT_ALLOWED",
    "MAX_NUMBER_OF_REFUNDS_EXCEEDED",
    "PENDING_CAPTURE",
    "DUPLICATE_INVOICE_ID",
    "PAYEE_ACCOUNT_LOCKED_OR_CLOSED",
    "PAYER_ACCOUNT_LOCKED_OR_CLOSED",
    "PAYEE_ACCOUNT_RESTRICTED",
    "REFUND_NOT_PERMITTED_DUE_TO_CHARGEBACK",
    "TRANSACTION_DISPUTED",
    "PLATFORM_FEE_EXCEEDED",
    "REFUND_IS_RESTRICTED",
    "PLATFORM_FEE_NOT_ENABLED"
  ]),
  description: z.string().optional()
}).partial();

const CapturesRefund422Schema = z.object({
  details: z.array(CapturesRefund422DetailsItemSchema).optional()
}).partial();

// --- Parameters Schemas ---
const AuthorizationIdParameterSchema = z.string();
const PaypalRequestIdParameterSchema = z.string().optional();
const PreferParameterSchema = z.string().default("return=minimal").optional();
const PaypalAuthAssertionParameterSchema = z.string().optional();
const CaptureIdParameterSchema = z.string();
const RefundIdParameterSchema = z.string();

// --- Exports ---
export {
  ErrorDetailsSchema,
  ErrorLocationSchema,
  ErrorLinkDescriptionSchema,
  CurrencyCodeSchema,
  MoneySchema,
  CardBrandSchema,
  DateTimeSchema,
  LinkDescriptionSchema,
  Error400DetailsItemSchema,
  Error400Schema,
  Error401DetailsItemSchema,
  Error401Schema,
  Error403DetailsItemSchema,
  Error403Schema,
  Error404DetailsItemSchema,
  Error404Schema,
  Error409DetailsItemSchema,
  Error409Schema,
  Error422DetailsItemSchema,
  Error422Schema,
  AuthorizationStatusDetailsSchema,
  AuthorizationStatusSchema,
  NetworkTransactionReferenceSchema,
  SellerProtectionSchema,
  ActivityTimestampsSchema,
  AuthorizationSchema,
  RelatedIdsSchema,
  SupplementaryDataSchema,
  EmailSchema,
  AccountIdSchema,
  PayeeBaseSchema,
  Authorization2Schema,
  SupplementaryPurchaseDataSchema,
  PlatformFeeSchema,
  PaymentInstructionSchema,
  CaptureRequestSchema,
  CaptureStatusDetailsSchema,
  CaptureStatusSchema,
  ExchangeRateSchema,
  SellerReceivableBreakdownSchema,
  ProcessorResponseSchema,
  CaptureSchema,
  Capture2Schema,
  ReauthorizeRequestSchema,
  AuthorizationsReauthorize400DetailsItemSchema,
  AuthorizationsReauthorize400Schema,
  AuthorizationsReauthorize422DetailsItemSchema,
  AuthorizationsReauthorize422Schema,
  AuthorizationsVoid422DetailsItemSchema,
  AuthorizationsVoid422Schema,
  PaymentInstruction2Schema,
  RefundRequestSchema,
  RefundStatusDetailsSchema,
  RefundStatusSchema,
  NetAmountBreakdownItemSchema,
  RefundSchema,
  CapturesRefund400DetailsItemSchema,
  CapturesRefund400Schema,
  CapturesRefund422DetailsItemSchema,
  CapturesRefund422Schema,
  AuthorizationIdParameterSchema,
  PaypalRequestIdParameterSchema,
  PreferParameterSchema,
  PaypalAuthAssertionParameterSchema,
  CaptureIdParameterSchema,
  RefundIdParameterSchema,
  DisbursementModeSchema
};