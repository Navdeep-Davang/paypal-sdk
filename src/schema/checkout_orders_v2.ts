// checkout_orders_v2 zod

// Its json has 204 (as by ai)
// Total Exported ZodSchemas 204


import { z } from 'zod';

// -- First Secssion --
const ErrorDetailsSchema = z.object({
  field: z.string().optional(),
  value: z.string().optional(),
  location: z.enum(['body', 'path', 'query']).default('body').optional(),
  issue: z.string(),
  description: z.string().optional(),
});

const ErrorLocationSchema = z.enum(['body', 'path', 'query']).default('body');

const ErrorDefaultSchema = z.union([
  z.lazy(() => Error400Schema),
  z.lazy(() => Error401Schema),
  z.lazy(() => Error403Schema),
  z.lazy(() => Error404Schema),
  z.lazy(() => Error409Schema),
  z.lazy(() => Error415Schema),
  z.lazy(() => Error422Schema),
  z.lazy(() => Error500Schema),
  z.lazy(() => Error503Schema),
]);

const Error400Schema = z.object({
  name: z.literal('INVALID_REQUEST'),
  message: z.literal('Request is not well-formed, syntactically incorrect, or violates schema.'),
  details: z.array(ErrorDetailsSchema).optional(),
  debug_id: z.string().optional(),
  links: z.array(z.object({
    href: z.string(),
    rel: z.string(),
    method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']).optional()
  })).optional()
});

const Error401Schema = z.object({
  name: z.literal('AUTHENTICATION_FAILURE'),
  message: z.literal('Authentication failed due to missing authorization header, or invalid authentication credentials.'),
  details: z.array(ErrorDetailsSchema).optional(),
  debug_id: z.string().optional(),
  links: z.array(z.object({
    href: z.string(),
    rel: z.string(),
    method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']).optional()
  })).optional()
});

const Error403Schema = z.object({
  name: z.literal('NOT_AUTHORIZED'),
  message: z.literal('Authorization failed due to insufficient permissions.'),
  details: z.array(ErrorDetailsSchema).optional(),
  debug_id: z.string().optional(),
  links: z.array(z.object({
    href: z.string(),
    rel: z.string(),
    method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']).optional()
  })).optional()
});

const Error404Schema = z.object({
  name: z.literal('RESOURCE_NOT_FOUND'),
  message: z.literal('The specified resource does not exist.'),
  details: z.array(ErrorDetailsSchema).optional(),
  debug_id: z.string().optional(),
  links: z.array(z.object({
    href: z.string(),
    rel: z.string(),
    method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']).optional()
  })).optional()
});

const Error409Schema = z.object({
  name: z.literal('RESOURCE_CONFLICT'),
  message: z.literal('The server has detected a conflict while processing this request.'),
  details: z.array(ErrorDetailsSchema).optional(),
  debug_id: z.string().optional(),
  links: z.array(z.object({
    href: z.string(),
    rel: z.string(),
    method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']).optional()
  })).optional()
});

const Error415Schema = z.object({
  name: z.literal('UNSUPPORTED_MEDIA_TYPE'),
  message: z.literal('The server does not support the request payload\'s media type.'),
  details: z.array(ErrorDetailsSchema).optional(),
  debug_id: z.string().optional(),
  links: z.array(z.object({
    href: z.string(),
    rel: z.string(),
    method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']).optional()
  })).optional()
});

const Error422Schema = z.object({
  name: z.literal('UNPROCESSABLE_ENTITY'),
  message: z.literal('The requested action could not be performed, semantically incorrect, or failed business validation.'),
  details: z.array(ErrorDetailsSchema).optional(),
  debug_id: z.string().optional(),
  links: z.array(z.object({
    href: z.string(),
    rel: z.string(),
    method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']).optional()
  })).optional()
});

const Error500Schema = z.object({
  name: z.literal('INTERNAL_SERVER_ERROR'),
  message: z.literal('An internal server error occurred.'),
  debug_id: z.string().optional(),
  links: z.array(z.object({
    href: z.string(),
    rel: z.string(),
    method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']).optional()
  })).optional()
});

const Error503Schema = z.object({
  name: z.literal('SERVICE_UNAVAILABLE'),
  message: z.literal('Service Unavailable.'),
  debug_id: z.string().optional(),
  links: z.array(z.object({
    href: z.string(),
    rel: z.string(),
    method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']).optional()
  })).optional()
});

const CheckoutPaymentIntentSchema = z.enum(['CAPTURE', 'AUTHORIZE']);

const EmailSchema = z.string()
  .regex(
    new RegExp(
      "(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])"
    )
  )
  .max(254)
  .min(3);

const AccountIdSchema = z.string()
  .regex(new RegExp('^[2-9A-HJ-NP-Z]{13}$'))
  .length(13);

const PayerBaseSchema = z.object({
  email_address: EmailSchema.optional(),
  payer_id: AccountIdSchema.readonly().optional(),
});

const NameSchema = z.object({
  prefix: z.string().max(140).optional(),
  given_name: z.string().max(140).optional(),
  surname: z.string().max(140).optional(),
  middle_name: z.string().max(140).optional(),
  suffix: z.string().max(140).optional(),
  alternate_full_name: z.string().max(300).optional(),
  full_name: z.string().max(300).optional()
});

const PhoneTypeSchema = z.enum(['FAX', 'HOME', 'MOBILE', 'OTHER', 'PAGER']);

const PhoneSchema = z.object({
  country_code: z.string().regex(new RegExp('^[0-9]{1,3}?$')).min(1).max(3),
  national_number: z.string().regex(new RegExp('^[0-9]{1,14}?$')).min(1).max(14),
  extension_number: z.string().regex(new RegExp('^[0-9]{1,15}?$')).min(1).max(15).optional()
});

const PhoneWithTypeSchema = z.object({
  phone_type: PhoneTypeSchema.optional(),
  phone_number: PhoneSchema,
});

const DateNoTimeSchema = z.string()
  .regex(new RegExp('^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$'))
  .length(10);

const TaxInfoSchema = z.object({
  tax_id: z.string().regex(new RegExp('([a-zA-Z0-9])')).min(1).max(14),
  tax_id_type: z.enum(['BR_CPF', 'BR_CNPJ'])
});

const CountryCodeSchema = z.string().regex(new RegExp('^([A-Z]{2}|C2)$')).length(2);

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
  address_details: z.object({
    street_number: z.string().max(100).optional(),
    street_name: z.string().max(100).optional(),
    street_type: z.string().max(100).optional(),
    delivery_service: z.string().max(100).optional(),
    building_name: z.string().max(100).optional(),
    sub_building: z.string().max(100).optional()
  }).optional()
});

const PayerSchema = PayerBaseSchema.extend({
  name: NameSchema.optional(),
  phone: PhoneWithTypeSchema.optional(),
  birth_date: DateNoTimeSchema.optional(),
  tax_info: TaxInfoSchema.optional(),
  address: AddressPortableSchema.optional()
});

const CurrencyCodeSchema = z.string().length(3);

const MoneySchema = z.object({
  currency_code: CurrencyCodeSchema,
  value: z.string().regex(new RegExp('^((-?[0-9]+)|(-?([0-9]+)?[.][0-9]+))$')).max(32)
});

const AmountBreakdownSchema = z.object({
  item_total: MoneySchema.optional(),
  shipping: MoneySchema.optional(),
  handling: MoneySchema.optional(),
  tax_total: MoneySchema.optional(),
  insurance: MoneySchema.optional(),
  shipping_discount: MoneySchema.optional(),
  discount: MoneySchema.optional()
});

const AmountWithBreakdownSchema = MoneySchema.extend({
  breakdown: AmountBreakdownSchema.optional()
});

const PayeeBaseSchema = z.object({
  email_address: EmailSchema.optional(),
  merchant_id: AccountIdSchema.optional()
});

const PayeeSchema = PayeeBaseSchema.extend({});

const PlatformFeeSchema = z.object({
  amount: MoneySchema,
  payee: PayeeBaseSchema.optional()
});

const DisbursementModeSchema = z.enum(['INSTANT', 'DELAYED']).default('INSTANT');

const PaymentInstructionSchema = z.object({
  platform_fees: z.array(PlatformFeeSchema).max(1).optional(),
  disbursement_mode: DisbursementModeSchema.optional(),
  payee_pricing_tier_id: z.string().min(1).max(20).optional(),
  payee_receivable_fx_rate_id: z.string().min(1).max(4000).optional()
});

const ItemSchema = z.object({
  name: z.string().min(1).max(127),
  unit_amount: MoneySchema,
  tax: MoneySchema.optional(),
  quantity: z.string().regex(new RegExp('^[1-9][0-9]{0,9}$')).max(10),
  description: z.string().max(127).optional(),
  sku: z.string().max(127).optional(),
  category: z.enum(['DIGITAL_GOODS', 'PHYSICAL_GOODS', 'DONATION']).optional()
});

const ShippingTypeSchema = z.enum(['SHIPPING', 'PICKUP', 'PICKUP_IN_STORE', 'PICKUP_FROM_PERSON']);

const ShippingOptionSchema = z.object({
  id: z.string().max(127),
  label: z.string().max(127),
  type: ShippingTypeSchema.optional(),
  amount: MoneySchema,
  selected: z.boolean()
});

const ShippingDetailSchema = z.object({
  name: NameSchema.optional(),
  type: z.enum(['SHIPPING', 'PICKUP_IN_PERSON', 'PICKUP_IN_STORE', 'PICKUP_FROM_PERSON']).optional(),
  options: z.array(ShippingOptionSchema).max(10).optional(),
  address: AddressPortableSchema.optional()
});

const Level2CardProcessingDataSchema = z.object({
  invoice_id: z.string().min(1).max(17).regex(new RegExp('^[\\w‘\\-.,":;\\!?]*$')).optional(),
  tax_total: MoneySchema.optional()
});

const LineItemSchema = ItemSchema.extend({
  commodity_code: z.string().min(1).max(12).regex(new RegExp("^[a-zA-Z0-9_'.-]*$")).optional(),
  discount_amount: MoneySchema.optional(),
  total_amount: MoneySchema.optional(),
  unit_of_measure: z.string().min(1).max(12).regex(new RegExp("^[a-zA-Z0-9_'.-]*$")).optional()
});

const Level3CardProcessingDataSchema = z.object({
  shipping_amount: MoneySchema.optional(),
  duty_amount: MoneySchema.optional(),
  discount_amount: MoneySchema.optional(),
  shipping_address: AddressPortableSchema.optional(),
  ships_from_postal_code: z.string().min(1).max(60).regex(new RegExp("^[a-zA-Z0-9_'.-]*$")).optional(),
  line_items: z.array(LineItemSchema).min(1).max(100).optional()
});


const CardSupplementaryDataSchema = z.object({
  level_2: Level2CardProcessingDataSchema.optional(),
  level_3: Level3CardProcessingDataSchema.optional()
});

const SupplementaryDataSchema = z.object({
  card: CardSupplementaryDataSchema.optional()
});

const PurchaseUnitRequestSchema = z.object({
  reference_id: z.string().min(1).max(256).optional(),
  amount: AmountWithBreakdownSchema,
  payee: PayeeSchema.optional(),
  payment_instruction: PaymentInstructionSchema.optional(),
  description: z.string().min(1).max(127).optional(),
  custom_id: z.string().min(1).max(127).optional(),
  invoice_id: z.string().min(1).max(127).optional(),
  soft_descriptor: z.string().min(1).max(22).optional(),
  items: z.array(ItemSchema).optional(),
  shipping: ShippingDetailSchema.optional(),
  supplementary_data: SupplementaryDataSchema.optional()
});

const InstrumentIdSchema = z.string().min(1).max(256).regex(new RegExp('^[A-Za-z0-9-_.\+=]+$'));

const DateYearMonthSchema = z.string().regex(new RegExp('^[0-9]{4}-(0[1-9]|1[0-2])$')).length(7);

const CardBrandSchema = z.enum([
  'VISA', 'MASTERCARD', 'DISCOVER', 'AMEX', 'SOLO', 'JCB', 'STAR', 'DELTA', 'SWITCH', 'MAESTRO', 'CB_NATIONALE',
  'CONFIGOGA', 'CONFIDIS', 'ELECTRON', 'CETELEM', 'CHINA_UNION_PAY'
]);

const CardTypeSchema = z.enum(['CREDIT', 'DEBIT', 'PREPAID', 'STORE', 'UNKNOWN']);

const MerchantPartnerCustomerIdSchema = z.string().min(1).max(22).regex(new RegExp('^[0-9a-zA-Z_-]+$'));

const CustomerSchema = z.object({
  id: MerchantPartnerCustomerIdSchema.optional(),
  email_address: EmailSchema.optional(),
  phone: PhoneWithTypeSchema.optional()
});

const StoreInVaultInstructionSchema = z.enum(['ON_SUCCESS']);

const VaultInstructionBaseSchema = z.object({
  store_in_vault: StoreInVaultInstructionSchema.optional()
});

const CardAttributesSchema = z.object({
  customer: CustomerSchema.optional(),
  vault: VaultInstructionBaseSchema.optional()
});

const CardSchema = z.object({
  id: InstrumentIdSchema.optional().readonly(),
  name: z.string().min(1).max(300).regex(new RegExp('^.{1,300}$')).optional(),
  number: z.string().regex(new RegExp('^[0-9]{13,19}$')).min(13).max(19).optional(),
  expiry: DateYearMonthSchema.optional(),
  security_code: z.string().regex(new RegExp('^[0-9]{3,4}$')).min(3).max(4).optional(),
  last_digits: z.string().regex(new RegExp('^[0-9]{2,4}$')).min(2).max(4).readonly().optional(),
  card_type: CardBrandSchema.optional().readonly(),
  type: CardTypeSchema.optional(),
  brand: CardBrandSchema.optional(),
  billing_address: AddressPortableSchema.optional(),
  attributes: CardAttributesSchema.optional()
});

const VaultIdSchema = z.string().min(1).max(255).regex(new RegExp('^[0-9a-zA-Z_-]+$'));

const PaymentInitiatorSchema = z.enum(['CUSTOMER', 'MERCHANT']);

const StoredPaymentSourcePaymentTypeSchema = z.enum(['ONE_TIME', 'RECURRING', 'UNSCHEDULED']);

const StoredPaymentSourceUsageTypeSchema = z.enum(['FIRST', 'SUBSEQUENT', 'DERIVED']).default('DERIVED');

const NetworkTransactionReferenceSchema = z.object({
  id: z.string().min(9).max(36).regex(new RegExp('^[a-zA-Z0-9-_@.:&\+=*^\'~#!$%()]+$')),
  date: z.string().min(4).max(4).regex(new RegExp('^[0-9]+$')).optional(),
  network: CardBrandSchema.optional(),
  acquirer_reference_number: z.string().min(1).max(36).regex(new RegExp('^[a-zA-Z0-9]+$')).optional()
});

const CardStoredCredentialSchema = z.object({
  payment_initiator: PaymentInitiatorSchema,
  payment_type: StoredPaymentSourcePaymentTypeSchema,
  usage: StoredPaymentSourceUsageTypeSchema.optional(),
  previous_network_transaction_reference: NetworkTransactionReferenceSchema.optional()
});

const EciFlagSchema = z.enum([
  "MASTERCARD_NON_3D_SECURE_TRANSACTION",
  "MASTERCARD_ATTEMPTED_AUTHENTICATION_TRANSACTION",
  "MASTERCARD_FULLY_AUTHENTICATED_TRANSACTION",
  "FULLY_AUTHENTICATED_TRANSACTION",
  "ATTEMPTED_AUTHENTICATION_TRANSACTION",
  "NON_3D_SECURE_TRANSACTION"
]);

const NetworkTokenRequestSchema = z.object({
  number: z.string().regex(new RegExp('^[0-9]{13,19}$')).min(13).max(19),
  expiry: DateYearMonthSchema,
  cryptogram: z.string().regex(new RegExp('^.*$')).min(28).max(32).optional(),
  eci_flag: EciFlagSchema.optional(),
  token_requestor_id: z.string().regex(new RegExp('^[0-9A-Z_]+$')).min(1).max(11).optional()
});

const UrlSchema = z.string().url();







// -- Second Secssion --
const CardExperienceContextSchema = z.object({
  return_url: z.string().min(10).max(4000).url().optional(),
  cancel_url: z.string().min(10).max(4000).url().optional()
});

const CardRequestSchema = z.object({
  id: z.string().optional().readonly(),
  name: z.string().min(1).max(300).optional(),
  number: z.string().regex(new RegExp('^[0-9]{13,19}$')).min(13).max(19).optional(),
  expiry: z.string().regex(new RegExp('^[0-9]{4}-(0[1-9]|1[0-2])$')).length(7).optional(),
  security_code: z.string().regex(new RegExp('^[0-9]{3,4}$')).min(3).max(4).optional(),
  last_digits: z.string().regex(new RegExp('^[0-9]{2,4}$')).min(2).max(4).readonly().optional(),
  card_type: z.enum([
    'VISA', 'MASTERCARD', 'DISCOVER', 'AMEX', 'SOLO', 'JCB', 'STAR', 'DELTA', 'SWITCH', 'MAESTRO', 'CB_NATIONALE',
    'CONFIGOGA', 'CONFIDIS', 'ELECTRON', 'CETELEM', 'CHINA_UNION_PAY'
  ]).optional().readonly(), // deprecated
  type: z.enum(['CREDIT', 'DEBIT', 'PREPAID', 'STORE', 'UNKNOWN']).optional(),
  brand: z.enum([
    'VISA', 'MASTERCARD', 'DISCOVER', 'AMEX', 'SOLO', 'JCB', 'STAR', 'DELTA', 'SWITCH', 'MAESTRO', 'CB_NATIONALE',
    'CONFIGOGA', 'CONFIDIS', 'ELECTRON', 'CETELEM', 'CHINA_UNION_PAY'
  ]).optional(),
  billing_address: AddressPortableSchema.optional(),
  attributes: CardAttributesSchema.optional(),
  vault_id: VaultIdSchema.optional(),
  stored_credential: CardStoredCredentialSchema.optional(),
  network_token: NetworkTokenRequestSchema.optional(),
  experience_context: CardExperienceContextSchema.optional()
});

const TokenSchema = z.object({
  id: z.string().regex(new RegExp('^[0-9a-zA-Z_-]+$')).min(1).max(255),
  type: z.enum(['BILLING_AGREEMENT'])
});

const Name2Schema = z.object({
  prefix: z.string().max(140).optional(),
  given_name: z.string().max(140).optional(),
  surname: z.string().max(140).optional(),
  middle_name: z.string().max(140).optional(),
  suffix: z.string().max(140).optional(),
  full_name: z.string().max(300).optional()
});

const CountryCode2Schema = z.string().regex(new RegExp('^([A-Z]{2}|C2)$')).length(2);

const AddressPortable2Schema = z.object({
  address_line_1: z.string().max(300).optional(),
  address_line_2: z.string().max(300).optional(),
  address_line_3: z.string().max(100).optional(),
  admin_area_4: z.string().max(100).optional(),
  admin_area_3: z.string().max(100).optional(),
  admin_area_2: z.string().max(120).optional(),
  admin_area_1: z.string().max(300).optional(),
  postal_code: z.string().max(60).optional(),
  country_code: CountryCode2Schema,
  address_details: z.object({
    street_number: z.string().max(100).optional(),
    street_name: z.string().max(100).optional(),
    street_type: z.string().max(100).optional(),
    delivery_service: z.string().max(100).optional(),
    building_name: z.string().max(100).optional(),
    sub_building: z.string().max(100).optional()
  }).optional()
});

const PaypalWalletCustomerSchema = CustomerSchema.extend({});

const VaultOwnerIdSchema = z.any(); // No properties defined

const VaultPaypalWalletBaseSchema = z.object({
  store_in_vault: StoreInVaultInstructionSchema.optional(),
  description: z.string().min(1).max(128).optional(),
  usage_pattern: z.enum([
    "IMMEDIATE",
    "DEFERRED",
    "RECURRING_PREPAID",
    "RECURRING_POSTPAID",
    "THRESHOLD_PREPAID",
    "THRESHOLD_POSTPAID"
  ]).optional(),
  shipping: ShippingDetailSchema.optional(),
  usage_type: z.enum(["MERCHANT", "PLATFORM"]),
  customer_type: z.enum(["CONSUMER", "BUSINESS"]).default("CONSUMER").optional(),
  permit_multiple_payment_tokens: z.boolean().default(false).optional(),
  owner_id: VaultOwnerIdSchema.optional()
});

const PaypalWalletAttributesSchema = z.object({
  customer: PaypalWalletCustomerSchema.optional(),
  vault: VaultPaypalWalletBaseSchema.optional()
});

const LanguageSchema = z.string().regex(new RegExp('^[a-z]{2}(?:-[A-Z][a-z]{3})?(?:-(?:[A-Z]{2}|[0-9]{3}))?$')).min(2).max(10);

const PaypalWalletExperienceContextSchema = z.object({
  brand_name: z.string().min(1).max(127).regex(new RegExp('^.*$')).optional(),
  locale: LanguageSchema.optional(),
  shipping_preference: z.enum(['GET_FROM_FILE', 'NO_SHIPPING', 'SET_PROVIDED_ADDRESS']).default('GET_FROM_FILE').optional(),
  return_url: UrlSchema.optional(),
  cancel_url: UrlSchema.optional(),
  landing_page: z.enum(['LOGIN', 'GUEST_CHECKOUT', 'NO_PREFERENCE']).default('NO_PREFERENCE').optional(),
  user_action: z.enum(['CONTINUE', 'PAY_NOW']).default('CONTINUE').optional(),
  payment_method_preference: z.enum(['UNRESTRICTED', 'IMMEDIATE_PAYMENT_REQUIRED']).default('UNRESTRICTED').optional()
});

const BillingAgreementIdSchema = z.string().regex(new RegExp('^[a-zA-Z0-9-]+$')).min(2).max(128);

const PaypalWalletSchema = z.object({
  vault_id: VaultIdSchema.optional(),
  email_address: EmailSchema.optional(),
  name: Name2Schema.optional(),
  phone: PhoneWithTypeSchema.optional(),
  birth_date: DateNoTimeSchema.optional(),
  tax_info: TaxInfoSchema.optional(),
  address: AddressPortable2Schema.optional(),
  attributes: PaypalWalletAttributesSchema.optional(),
  experience_context: PaypalWalletExperienceContextSchema.optional(),
  billing_agreement_id: BillingAgreementIdSchema.optional()
});

const FullNameSchema = z.string().min(3).max(300);

const ExperienceContextBaseSchema = z.object({
  brand_name: z.string().min(1).max(127).regex(new RegExp('^.*$')).optional(),
  locale: LanguageSchema.optional(),
  shipping_preference: z.enum(['GET_FROM_FILE', 'NO_SHIPPING', 'SET_PROVIDED_ADDRESS']).default('GET_FROM_FILE').optional(),
  return_url: UrlSchema.optional(),
  cancel_url: UrlSchema.optional()
});

const AltpayRecurringAttributesRequestSchema = z.any(); // No properties defined

const BancontactRequestSchema = z.object({
  name: FullNameSchema,
  country_code: CountryCodeSchema,
  experience_context: ExperienceContextBaseSchema.optional(),
  attributes: AltpayRecurringAttributesRequestSchema.optional()
});

const EmailAddressSchema = z.string()
  .regex(
    new RegExp(
      "^(?:[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[A-Za-z0-9-]*[A-Za-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])$"
    )
  )
  .max(254)
  .min(3);

  const IpAddressSchema = z
  .string()
  .regex(
    new RegExp(
      "^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$" +
        "|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\\-]*[a-zA-Z0-9])\\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\\-]*[A-Za-z0-9])$" +
        "|^\\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))" +
        "|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))" +
        "|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))" +
        "|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))" +
        "|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))" +
        "|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))" +
        "|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))" +
        "|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:)))(%.+)?\\s*$"
    )
  )
  .min(7)
  .max(39);


const BlikExperienceContextSchema = ExperienceContextBaseSchema.extend({
  consumer_ip: IpAddressSchema.optional(),
  consumer_user_agent: z.string().min(1).max(256).regex(new RegExp('^.*$')).optional()
});

const BlikSeamlessSchema = z.object({
  auth_code: z.string().regex(new RegExp('^[0-9]{6}$')).length(6)
});

const BlikOneClickSchema = z.object({
  auth_code: z.string().regex(new RegExp('^[0-9]{6}$')).length(6).optional(),
  consumer_reference: z.string().regex(new RegExp('^[ -~]{3,64}$')).min(3).max(64),
  alias_label: z.string().regex(new RegExp('^[ -~]{8,35}$')).min(8).max(35).optional(),
  alias_key: z.string().regex(new RegExp('^[0-9]+$')).min(1).max(19).optional()
});

const BlikRequestSchema = z.object({
  name: FullNameSchema,
  country_code: CountryCodeSchema,
  email: EmailAddressSchema.optional(),
  experience_context: BlikExperienceContextSchema.optional(),
  level_0: BlikSeamlessSchema.optional(),
  one_click: BlikOneClickSchema.optional()
});

const EpsRequestSchema = z.object({
  name: FullNameSchema,
  country_code: CountryCodeSchema,
  experience_context: ExperienceContextBaseSchema.optional()
});

const GiropayRequestSchema = z.object({
  name: FullNameSchema,
  country_code: CountryCodeSchema,
  experience_context: ExperienceContextBaseSchema.optional()
});

const BicSchema = z.string().regex(new RegExp('^[A-Z-a-z0-9]{4}[A-Z-a-z]{2}[A-Z-a-z0-9]{2}([A-Z-a-z0-9]{3})?$')).min(8).max(11);

const IdealRequestSchema = z.object({
  name: FullNameSchema,
  country_code: CountryCodeSchema,
  bic: BicSchema,
  experience_context: ExperienceContextBaseSchema.optional(),
  attributes: AltpayRecurringAttributesRequestSchema.optional()
});

const MybankRequestSchema = z.object({
  name: FullNameSchema,
  country_code: CountryCodeSchema,
  experience_context: ExperienceContextBaseSchema.optional()
});

const P24RequestSchema = z.object({
  name: FullNameSchema,
  email: EmailAddressSchema,
  country_code: CountryCodeSchema,
  experience_context: ExperienceContextBaseSchema.optional()
});

const SofortRequestSchema = z.object({
  name: FullNameSchema,
  country_code: CountryCodeSchema,
  experience_context: ExperienceContextBaseSchema.optional()
});

const TrustlyRequestSchema = z.object({
  name: FullNameSchema,
  country_code: CountryCodeSchema,
  experience_context: ExperienceContextBaseSchema.optional()
});

const CurrencyCode2Schema = z.string().length(3);

const Money2Schema = z.object({
  currency_code: CurrencyCode2Schema,
  value: z.string().regex(new RegExp('^((-?[0-9]+)|(-?([0-9]+)?[.][0-9]+))$')).max(32)
});

const ApplePayPaymentDataSchema = z.object({
  cryptogram: z.string().min(1).max(2000).regex(new RegExp('^.*$')).optional(),
  eci_indicator: z.string().min(1).max(256).regex(new RegExp('^.*$')).optional(),
  emv_data: z.string().min(1).max(2000).regex(new RegExp('^.*$')).optional(),
  pin: z.string().min(1).max(2000).regex(new RegExp('^.*$')).optional()
});

const ApplePayDecryptedTokenDataSchema = z.object({
  transaction_amount: Money2Schema,
  tokenized_card: CardSchema,
  device_manufacturer_id: z.string().min(1).max(2000).regex(new RegExp('^.*$')).optional(),
  payment_data_type: z.enum(['3DSECURE', 'EMV']).optional(),
  payment_data: ApplePayPaymentDataSchema.optional()
});

const ApplePayAttributesSchema = z.any(); // No properties defined

const ApplePayRequestSchema = z.object({
  id: z.string().min(1).max(250).regex(new RegExp('^.*$')).optional(),
  name: FullNameSchema.optional(),
  email_address: EmailAddressSchema.optional(),
  phone_number: PhoneSchema.optional(),
  decrypted_token: ApplePayDecryptedTokenDataSchema.optional(),
  stored_credential: CardStoredCredentialSchema.optional(),
  vault_id: VaultIdSchema.optional(),
  attributes: ApplePayAttributesSchema.optional()
});

const GooglePayRequestSchema = z.any(); // No properties defined

const VenmoWalletExperienceContextSchema = z.object({
  brand_name: z.string().min(1).max(127).regex(new RegExp('^.*$')).optional(),
  shipping_preference: z.enum(['GET_FROM_FILE', 'NO_SHIPPING', 'SET_PROVIDED_ADDRESS']).default('GET_FROM_FILE').optional()
});

const V3VaultInstructionBaseSchema = z.object({
  store_in_vault: StoreInVaultInstructionSchema
});

const VaultVenmoWalletBaseSchema = z.object({
  store_in_vault: StoreInVaultInstructionSchema,
  description: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z0-9_'\\-., :;\\!?\"]*$")).optional(),
  usage_pattern: z.enum([
    "IMMEDIATE",
    "DEFERRED",
    "RECURRING_PREPAID",
    "RECURRING_POSTPAID",
    "THRESHOLD_PREPAID",
    "THRESHOLD_POSTPAID"
  ]).optional(),
  usage_type: z.enum(["MERCHANT", "PLATFORM"]),
  customer_type: z.enum(["CONSUMER", "BUSINESS"]).default("CONSUMER").optional(),
  permit_multiple_payment_tokens: z.boolean().default(false).optional()
});

const VenmoWalletAttributesSchema = z.object({
  customer: CustomerSchema.optional(),
  vault: VaultVenmoWalletBaseSchema.optional()
});

const VenmoWalletRequestSchema = z.object({
  vault_id: VaultIdSchema.optional(),
  email_address: EmailSchema.optional(),
  experience_context: VenmoWalletExperienceContextSchema.optional(),
  attributes: VenmoWalletAttributesSchema.optional()
});

const PaymentSourceSchema = z.object({
  card: CardRequestSchema.optional(),
  token: TokenSchema.optional(),
  paypal: PaypalWalletSchema.optional(),
  bancontact: BancontactRequestSchema.optional(),
  blik: BlikRequestSchema.optional(),
  eps: EpsRequestSchema.optional(),
  giropay: GiropayRequestSchema.optional(),
  ideal: IdealRequestSchema.optional(),
  mybank: MybankRequestSchema.optional(),
  p24: P24RequestSchema.optional(),
  sofort: SofortRequestSchema.optional(),
  trustly: TrustlyRequestSchema.optional(),
  apple_pay: ApplePayRequestSchema.optional(),
  google_pay: GooglePayRequestSchema.optional(),
  venmo: VenmoWalletRequestSchema.optional()
});

const PayeePaymentMethodPreferenceSchema = z.enum(['UNRESTRICTED', 'IMMEDIATE_PAYMENT_REQUIRED']).default('UNRESTRICTED');

const PaymentMethodSchema = z.object({
  payee_preferred: PayeePaymentMethodPreferenceSchema.optional(),
  standard_entry_class_code: z.enum(['TEL', 'WEB', 'CCD', 'PPD']).default('WEB').optional()
});

const StoredPaymentSourceSchema = z.object({
  payment_initiator: PaymentInitiatorSchema,
  payment_type: StoredPaymentSourcePaymentTypeSchema,
  usage: StoredPaymentSourceUsageTypeSchema.optional(),
  previous_network_transaction_reference: NetworkTransactionReferenceSchema.optional()
});

const OrderApplicationContextSchema = z.object({
  brand_name: z.string().min(1).max(127).optional(), // deprecated
  locale: LanguageSchema.optional(), // deprecated
  landing_page: z.enum(['LOGIN', 'BILLING', 'NO_PREFERENCE']).default('NO_PREFERENCE').optional(), // deprecated
  shipping_preference: z.enum(['GET_FROM_FILE', 'NO_SHIPPING', 'SET_PROVIDED_ADDRESS']).default('GET_FROM_FILE').optional(), // deprecated
  user_action: z.enum(['CONTINUE', 'PAY_NOW']).default('CONTINUE').optional(),
  payment_method: PaymentMethodSchema.optional(), // deprecated
  return_url: z.string().url().optional(), // deprecated
  cancel_url: z.string().url().optional(), // deprecated
  stored_payment_source: StoredPaymentSourceSchema.optional() // deprecated
});

const OrderRequestSchema = z.object({
  intent: CheckoutPaymentIntentSchema,
  payer: PayerSchema.optional(), // deprecated
  purchase_units: z.array(PurchaseUnitRequestSchema).min(1).max(10),
  payment_source: PaymentSourceSchema.optional(),
  application_context: OrderApplicationContextSchema.optional()
});

const DateTimeSchema = z.string().regex(new RegExp('^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$')).min(20).max(64);

const ActivityTimestampsSchema = z.object({
  create_time: DateTimeSchema.optional().readonly(),
  update_time: DateTimeSchema.optional().readonly()
});

const LiabilityShiftSchema = z.enum(['NO', 'POSSIBLE', 'UNKNOWN']);

const ParesStatusSchema = z.enum(['Y', 'N', 'U', 'A', 'C', 'R', 'D', 'I']);

const EnrolledSchema = z.enum(['Y', 'N', 'U', 'B']);

const ThreeDSecureAuthenticationResponseSchema = z.object({
  authentication_status: ParesStatusSchema.optional(),
  enrollment_status: EnrolledSchema.optional()
});

const AuthenticationFlowSchema = z.any(); // No properties defined

const ExemptionDetailsSchema = z.any(); // No properties defined

const AuthenticationResponseSchema = z.object({
  liability_shift: LiabilityShiftSchema.optional(),
  three_d_secure: ThreeDSecureAuthenticationResponseSchema.optional(),
  authentication_flow: AuthenticationFlowSchema.optional(),
  exemption_details: ExemptionDetailsSchema.optional()
});

const LinkDescriptionSchema = z.object({
  href: z.string(),
  rel: z.string(),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'CONNECT', 'OPTIONS', 'PATCH']).optional()
});

const VaultResponseSchema = z.object({
  id: z.string().min(1).max(255).optional(),
  status: z.enum(['VAULTED', 'CREATED', 'APPROVED']).optional(),
  customer: CustomerSchema.optional(),
  links: z.array(LinkDescriptionSchema).min(1).max(10).readonly().optional()
});

const CardAttributesResponseSchema = z.object({
  vault: VaultResponseSchema.optional()
});

const CardFromRequestSchema = z.object({
  expiry: DateYearMonthSchema.optional(),
  last_digits: z.string().regex(new RegExp('[0-9]{2,}')).min(2).max(4).readonly().optional()
});

const BinDetailsSchema = z.object({
  bin: z.string().regex(new RegExp('^[0-9]+$')).min(1).max(25).optional(),
  issuing_bank: z.string().min(1).max(64).optional(),
  bin_country_code: CountryCodeSchema.optional(),
  products: z.array(z.string().min(1).max(255)).min(1).max(256).optional()
});

const CardResponseSchema = z.object({
  name: z.string().min(2).max(300).optional(),
  last_digits: z.string().regex(new RegExp('[0-9]{2,}')).readonly().optional(),
  brand: CardBrandSchema.optional().readonly(),
  available_networks: z.array(CardBrandSchema).min(1).max(256).readonly().optional(),
  type: z.enum(['CREDIT', 'DEBIT', 'PREPAID', 'UNKNOWN']).readonly().optional(),
  authentication_result: AuthenticationResponseSchema.optional(),
  attributes: CardAttributesResponseSchema.optional(),
  from_request: CardFromRequestSchema.optional(),
  expiry: DateYearMonthSchema.optional(),
  bin_details: BinDetailsSchema.optional()
});

const AccountId2Schema = z.string().regex(new RegExp('^[2-9A-HJ-NP-Z]{13}$')).length(13);

const PhoneType2Schema = z.enum(['FAX', 'HOME', 'MOBILE', 'OTHER', 'PAGER', 'WORK']);

const Phone2Schema = z.object({
  national_number: z.string().regex(new RegExp('^[0-9]{1,14}?$')).min(1).max(14)
});








// -- Third Secssion --
const PaypalWalletVaultResponseSchema = z.object({
  id: z.string().min(1).max(255).optional(),
  status: z.enum(['VAULTED', 'CREATED', 'APPROVED']).optional(),  // deprecated
  customer: CustomerSchema.optional(),
  links: z.array(LinkDescriptionSchema).min(1).max(10).readonly().optional()
});

const CobrandedCardSchema = z.object({
  labels: z.array(z.string().min(1).max(256)).min(1).max(25).optional(),
  payee: PayeeBaseSchema.optional(),
  amount: MoneySchema.optional()
});

const PaypalWalletAttributesResponseSchema = z.object({
  vault: PaypalWalletVaultResponseSchema.optional(),
  cobranded_cards: z.array(CobrandedCardSchema).min(0).max(25).optional()
});

const PaypalWalletResponseSchema = z.object({
  email_address: EmailSchema.optional(),
  account_id: AccountId2Schema.optional().readonly(),
  account_status: z.enum(['VERIFIED', 'UNVERIFIED']).readonly().optional(),
  name: Name2Schema.optional(),
  phone_type: PhoneType2Schema.optional(),
  phone_number: Phone2Schema.optional(),
  birth_date: DateNoTimeSchema.optional(),
  tax_info: TaxInfoSchema.optional(),
  address: AddressPortable2Schema.optional(),
  attributes: PaypalWalletAttributesResponseSchema.optional()
});

const IbanLastCharsSchema = z.string().regex(new RegExp('[a-zA-Z0-9]{4}')).min(4).max(34);

const AltpayRecurringAttributesSchema = z.any(); // No properties defined

const BancontactSchema = z.object({
  name: FullNameSchema,
  country_code: CountryCodeSchema,
  bic: BicSchema.optional(),
  iban_last_chars: IbanLastCharsSchema.optional(),
  card_last_digits: z.string().regex(new RegExp('[0-9]{4}')).length(4).optional(),
  attributes: AltpayRecurringAttributesSchema.optional()
});

const BlikOneClickResponseSchema = z.object({
  consumer_reference: z.string().regex(new RegExp('^[ -~]{3,64}$')).min(3).max(64)
});

const BlikSchema = z.object({
  name: FullNameSchema,
  country_code: CountryCodeSchema,
  email: EmailAddressSchema.optional(),
  one_click: BlikOneClickResponseSchema.optional()
});

const EpsSchema = z.object({
  name: FullNameSchema,
  country_code: CountryCodeSchema,
  bic: BicSchema.optional()
});

const GiropaySchema = z.object({
  name: FullNameSchema,
  country_code: CountryCodeSchema,
  bic: BicSchema.optional()
});

const IdealSchema = z.object({
  name: FullNameSchema,
  country_code: CountryCodeSchema,
  bic: BicSchema,
  iban_last_chars: IbanLastCharsSchema.optional(),
  attributes: AltpayRecurringAttributesSchema.optional()
});

const MybankSchema = z.object({
  name: FullNameSchema,
  country_code: CountryCodeSchema,
  bic: BicSchema.optional(),
  iban_last_chars: IbanLastCharsSchema.optional()
});

const P24Schema = z.object({
  name: FullNameSchema,
  email: EmailAddressSchema,
  country_code: CountryCodeSchema,
  payment_descriptor: z.string().min(1).max(2000).optional(),
  method_id: z.string().min(1).max(300).optional(),
  method_description: z.string().min(1).max(2000).optional()
});

const SofortSchema = z.object({
  name: FullNameSchema,
  country_code: CountryCodeSchema,
  bic: BicSchema.optional(),
  iban_last_chars: IbanLastCharsSchema.optional()
});

const TrustlySchema = z.object({
  name: FullNameSchema,
  country_code: CountryCodeSchema,
  bic: BicSchema.optional(),
  iban_last_chars: IbanLastCharsSchema.optional()
});

const VenmoWalletAttributesResponseSchema = z.object({
  vault: VaultResponseSchema.optional()
});

const VenmoWalletResponseSchema = z.object({
  email_address: EmailSchema.optional(),
  account_id: AccountId2Schema.optional().readonly(),
  user_name: z.string().regex(new RegExp('^[-a-zA-Z0-9_]*$')).min(1).max(50).optional(),
  name: Name2Schema.optional(),
  phone_number: Phone2Schema.optional(),
  address: AddressPortable2Schema.optional(),
  attributes: VenmoWalletAttributesResponseSchema.optional()
});

const PaymentSourceResponseSchema = z.object({
  card: CardResponseSchema.optional(),
  paypal: PaypalWalletResponseSchema.optional(),
  bancontact: BancontactSchema.optional(),
  blik: BlikSchema.optional(),
  eps: EpsSchema.optional(),
  giropay: GiropaySchema.optional(),
  ideal: IdealSchema.optional(),
  mybank: MybankSchema.optional(),
  p24: P24Schema.optional(),
  sofort: SofortSchema.optional(),
  trustly: TrustlySchema.optional(),
  venmo: VenmoWalletResponseSchema.optional()
});

const ProcessingInstructionSchema = z.enum(['ORDER_COMPLETE_ON_PAYMENT_APPROVAL', 'NO_INSTRUCTION']).default('NO_INSTRUCTION');

const TrackerStatusSchema = z.any(); // No properties defined

const UniversalProductCodeSchema = z.any(); // No properties defined

const TrackerItemSchema = z.object({
  name: z.string().min(1).max(127).optional(),
  quantity: z.string().regex(new RegExp('^[1-9][0-9]{0,9}$')).min(1).max(10).optional(),
  sku: z.string().min(1).max(127).optional(),
  url: z.string().url().min(1).max(2048).optional(),
  image_url: z.string().url().regex(new RegExp('^(https:)([/|.|\\w|\\s|-])*\\.(?:jpg|gif|png|jpeg|JPG|GIF|PNG|JPEG)')).optional(),
  upc: z.any().optional()
});

const TrackerSchema = z.object({
  id: z.string().readonly().optional(),
  status: z.any().optional(),
  items: z.array(TrackerItemSchema).optional(),
  links: z.array(LinkDescriptionSchema).readonly().optional(),
}).and(ActivityTimestampsSchema);

const ShippingWithTrackingDetailsSchema = ShippingDetailSchema.extend({
  trackers: z.array(TrackerSchema).optional()
});

const AuthorizationStatusDetailsSchema = z.object({
  reason: z.enum(['PENDING_REVIEW']).optional()
});

const AuthorizationStatusSchema = z.object({
  status: z.enum(['CREATED', 'CAPTURED', 'DENIED', 'PARTIALLY_CAPTURED', 'VOIDED', 'PENDING']).readonly().optional(),
  status_details: AuthorizationStatusDetailsSchema.optional().readonly()
});

const SellerProtectionSchema = z.object({
  status: z.enum(['ELIGIBLE', 'PARTIALLY_ELIGIBLE', 'NOT_ELIGIBLE']).readonly().optional(),
  dispute_categories: z.array(z.enum(['ITEM_NOT_RECEIVED', 'UNAUTHORIZED_TRANSACTION'])).readonly().optional()
});

const AuthorizationSchema = AuthorizationStatusSchema.extend({
  ...ActivityTimestampsSchema.shape,
  id: z.string().readonly().optional(),
  amount: MoneySchema.optional().readonly(),
  invoice_id: z.string().readonly().optional(),
  custom_id: z.string().max(127).optional(),
  network_transaction_reference: NetworkTransactionReferenceSchema.optional(),
  seller_protection: SellerProtectionSchema.optional().readonly(),
  expiration_time: DateTimeSchema.optional().readonly(),
  links: z.array(LinkDescriptionSchema).readonly().optional()
})

const ProcessorResponseSchema = z.object({
  avs_code: z.enum(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'I', 'M', 'N', 'P', 'R', 'S', 'U', 'W', 'X', 'Y', 'Z', 'Null', '0', '1', '2', '3', '4']).readonly().optional(),
  cvv_code: z.enum(['E', 'I', 'M', 'N', 'P', 'S', 'U', 'X', 'All others', '0', '1', '2', '3', '4']).readonly().optional(),
  response_code: z.enum([
    "0000", "00N7", "0100", "0390", "0500", "0580", "0800", "0880", "0890", "0960", "0R00", "1000", "10BR", "1300",
    "1310", "1312", "1317", "1320", "1330", "1335", "1340", "1350", "1352", "1360", "1370", "1380", "1382", "1384",
    "1390", "1393", "5100", "5110", "5120", "5130", "5135", "5140", "5150", "5160", "5170", "5180", "5190", "5200",
    "5210", "5400", "5500", "5650", "5700", "5710", "5800", "5900", "5910", "5920", "5930", "5950", "6300", "7600",
    "7700", "7710", "7800", "7900", "8000", "8010", "8020", "8030", "8100", "8110", "8220", "9100", "9500", "9510",
    "9520", "9530", "9540", "9600", "PCNR", "PCVV", "PP06", "PPRN", "PPAD", "PPAB", "PPAE", "PPAG", "PPAI", "PPAR",
    "PPAU", "PPAV", "PPAX", "PPBG", "PPC2", "PPCE", "PPCO", "PPCR", "PPCT", "PPCU", "PPD3", "PPDC", "PPDI", "PPDV",
    "PPDT", "PPEF", "PPEL", "PPER", "PPEX", "PPFE", "PPFI", "PPFR", "PPFV", "PPGR", "PPH1", "PPIF", "PPII", "PPIM",
    "PPIT", "PPLR", "PPLS", "PPMB", "PPMC", "PPMD", "PPNC", "PPNL", "PPNM", "PPNT", "PPPH", "PPPI", "PPPM", "PPQC",
    "PPRE", "PPRF", "PPRR", "PPS0", "PPS1", "PPS2", "PPS3", "PPS4", "PPS5", "PPS6", "PPSC", "PPSD", "PPSE", "PPTE",
    "PPTF", "PPTI", "PPTR", "PPTT", "PPTV", "PPUA", "PPUC", "PPUE", "PPUI", "PPUP", "PPUR", "PPVC", "PPVE", "PPVT"
  ]).readonly().optional(),
  payment_advice_code: z.enum(['01', '02', '03', '21']).readonly().optional()
});

const AuthorizationWithAdditionalDataSchema = AuthorizationSchema.extend({
  processor_response: ProcessorResponseSchema.optional().readonly()
});

const CaptureStatusDetailsSchema = z.object({
  reason: z.enum([
    'BUYER_COMPLAINT', 'CHARGEBACK', 'ECHECK', 'INTERNATIONAL_WITHDRAWAL', 'OTHER', 'PENDING_REVIEW',
    'RECEIVING_PREFERENCE_MANDATES_MANUAL_ACTION', 'REFUNDED', 'TRANSACTION_APPROVED_AWAITING_FUNDING', 'UNILATERAL', 'VERIFICATION_REQUIRED'
  ]).optional()
});

const CaptureStatusSchema = z.object({
  status: z.enum(['COMPLETED', 'DECLINED', 'PARTIALLY_REFUNDED', 'PENDING', 'REFUNDED', 'FAILED']).readonly().optional(),
  status_details: CaptureStatusDetailsSchema.optional().readonly()
});

const ExchangeRateSchema = z.object({
  source_currency: CurrencyCodeSchema.optional(),
  target_currency: CurrencyCodeSchema.optional(),
  value: z.string().optional()
}).readonly();

const SellerReceivableBreakdownSchema = z.object({
  gross_amount: MoneySchema,
  paypal_fee: MoneySchema.optional().readonly(),
  paypal_fee_in_receivable_currency: MoneySchema.optional().readonly(),
  net_amount: MoneySchema.optional().readonly(),
  receivable_amount: MoneySchema.optional().readonly(),
  exchange_rate: ExchangeRateSchema.optional().readonly(),
  platform_fees: z.array(PlatformFeeSchema).min(0).max(1).optional()
});

const CaptureSchema = CaptureStatusSchema.extend({
  id: z.string().readonly().optional(),
  amount: MoneySchema.optional().readonly(),
  invoice_id: z.string().readonly().optional(),
  custom_id: z.string().max(127).optional(),
  network_transaction_reference: NetworkTransactionReferenceSchema.optional(),
  seller_protection: SellerProtectionSchema.optional().readonly(),
  final_capture: z.boolean().default(false).readonly().optional(),
  seller_receivable_breakdown: SellerReceivableBreakdownSchema.optional().readonly(),
  disbursement_mode: DisbursementModeSchema.optional(),
  links: z.array(LinkDescriptionSchema).readonly().optional(),
  processor_response: ProcessorResponseSchema.optional()
}).and(ActivityTimestampsSchema);

const RefundStatusDetailsSchema = z.object({
  reason: z.enum(['ECHECK']).optional()
});

const RefundStatusSchema = z.object({
  status: z.enum(['CANCELLED', 'FAILED', 'PENDING', 'COMPLETED']).readonly().optional(),
  status_details: RefundStatusDetailsSchema.optional().readonly()
});

const NetAmountBreakdownItemSchema = z.object({
  payable_amount: MoneySchema.optional().readonly(),
  converted_amount: MoneySchema.optional().readonly(),
  exchange_rate: ExchangeRateSchema.optional().readonly()
});

const RefundSchema = RefundStatusSchema.extend({
  id: z.string().readonly().optional(),
  amount: MoneySchema.optional().readonly(),
  invoice_id: z.string().readonly().optional(),
  custom_id: z.string().min(1).max(127).regex(new RegExp('^[A-Za-z0-9-_.,]*$')).optional(),
  acquirer_reference_number: z.string().min(1).max(36).regex(new RegExp('^[a-zA-Z0-9]+$')).optional(),
  note_to_payer: z.string().readonly().optional(),
  seller_payable_breakdown: z.object({
    gross_amount: MoneySchema.optional().readonly(),
    paypal_fee: MoneySchema.optional().readonly(),
    paypal_fee_in_receivable_currency: MoneySchema.optional().readonly(),
    net_amount: MoneySchema.optional().readonly(),
    net_amount_in_receivable_currency: MoneySchema.optional().readonly(),
    platform_fees: z.array(PlatformFeeSchema).min(0).max(1).optional(),
    net_amount_breakdown: z.array(NetAmountBreakdownItemSchema).optional().readonly(),
    total_refunded_amount: MoneySchema.optional()
  }).optional().readonly(),
  payer: PayeeBaseSchema.optional().readonly(),
  links: z.array(LinkDescriptionSchema).readonly().optional()
}).and(ActivityTimestampsSchema);

const PaymentCollectionSchema = z.object({
  authorizations: z.array(AuthorizationWithAdditionalDataSchema).optional(),
  captures: z.array(CaptureSchema).optional(),
  refunds: z.array(RefundSchema).optional()
});

const PurchaseUnitSchema = z.object({
  reference_id: z.string().min(1).max(256).optional(),
  amount: AmountWithBreakdownSchema.optional(),
  payee: PayeeSchema.optional(),
  payment_instruction: PaymentInstructionSchema.optional(),
  description: z.string().min(1).max(127).optional(),
  custom_id: z.string().min(1).max(127).optional(),
  invoice_id: z.string().min(1).max(127).optional(),
  id: z.string().min(1).max(19).optional(),
  soft_descriptor: z.string().min(1).max(22).optional(),
  items: z.array(ItemSchema).optional(),
  shipping: ShippingWithTrackingDetailsSchema.optional(),
  supplementary_data: SupplementaryDataSchema.optional(),
  payments: PaymentCollectionSchema.optional().readonly()
});

const OrderStatusSchema = z.enum(['CREATED', 'SAVED', 'APPROVED', 'VOIDED', 'COMPLETED', 'PAYER_ACTION_REQUIRED']);

const OrderSchema = ActivityTimestampsSchema.extend({
  id: z.string().readonly().optional(),
  payment_source: PaymentSourceResponseSchema.optional(),
  intent: CheckoutPaymentIntentSchema.optional(),
  processing_instruction: ProcessingInstructionSchema.optional(),
  payer: PayerSchema.optional(), // deprecated
  purchase_units: z.array(PurchaseUnitSchema).min(1).max(10),
  status: OrderStatusSchema.optional().readonly(),
  links: z.array(LinkDescriptionSchema).readonly().optional()
});

const PatchSchema = z.object({
  op: z.enum(['add', 'remove', 'replace', 'move', 'copy', 'test']),
  path: z.string(),
  value: z.any().optional(),
  from: z.string().optional()
});

const PatchRequestSchema = z.array(PatchSchema);

const OrdersPatch400Schema = z.object({
  details: z.array(z.any()).optional()
});

const OrdersPatch422Schema = z.object({
  details: z.array(z.any()).optional()
});

const OrderConfirmApplicationContextSchema = z.object({
  brand_name: z.string().min(1).max(127).optional(),
  locale: LanguageSchema.optional(),
  return_url: z.string().url().min(10).max(4000).optional(),
  cancel_url: z.string().url().min(10).max(4000).optional(),
  stored_payment_source: StoredPaymentSourceSchema.optional()
});

const ConfirmOrderRequestSchema = z.object({
  payment_source: PaymentSourceSchema,
  processing_instruction: ProcessingInstructionSchema.optional(),
  application_context: OrderConfirmApplicationContextSchema.optional()
});

const OrdersConfirm400Schema = z.object({
  details: z.array(z.any()).optional()
});

const OrdersConfirm422Schema = z.object({
  details: z.array(z.any()).optional()
});

const OrderAuthorizeRequestSchema = z.object({
  payment_source: PaymentSourceSchema.optional()
});

const OrderAuthorizeResponseSchema = OrderSchema;

const OrdersAuthorize400Schema = z.object({
  details: z.array(z.any()).optional()
});

const OrdersAuthorize403Schema = z.object({
  details: z.array(z.any()).optional()
});

const OrdersAuthorize422Schema = z.object({
  details: z.array(z.any()).optional()
});

const OrderCaptureRequestSchema = z.object({
  payment_source: PaymentSourceSchema.optional()
});

const OrdersCapture400Schema = z.object({
  details: z.array(z.any()).optional()
});

const OrdersCapture403Schema = z.object({
  details: z.array(z.any()).optional()
});

const OrdersCapture422Schema = z.object({
  details: z.array(z.any()).optional()
});

const ShipmentTrackingNumberTypeSchema = z.enum(['CARRIER_PROVIDED', 'E2E_PARTNER_PROVIDED']);

const ShipmentTrackingStatusSchema = z.enum([
  'CANCELLED', 'DELIVERED', 'LOCAL_PICKUP', 'ON_HOLD', 'SHIPPED', 'SHIPMENT_CREATED', 'DROPPED_OFF', 'IN_TRANSIT',
  'RETURNED', 'LABEL_PRINTED', 'ERROR', 'UNCONFIRMED', 'PICKUP_FAILED', 'DELIVERY_DELAYED', 'DELIVERY_SCHEDULED',
  'DELIVERY_FAILED', 'INRETURN', 'IN_PROCESS', 'NEW', 'VOID', 'PROCESSED', 'NOT_SHIPPED', 'COMPLETED'
]);

const ShipmentCarrierSchema = z.enum([
  "DPD_RU", "BG_BULGARIAN_POST", "KR_KOREA_POST", "ZA_COURIERIT", "FR_EXAPAQ", "ARE_EMIRATES_POST", "GAC", "GEIS", "SF_EX",
  "PAGO", "MYHERMES", "DIAMOND_EUROGISTICS", "CORPORATECOURIERS_WEBHOOK", "BOND", "OMNIPARCEL", "SK_POSTA", "PUROLATOR",
  "FETCHR_WEBHOOK", "THEDELIVERYGROUP", "CELLO_SQUARE", "TARRIVE", "COLLIVERY", "MAINFREIGHT", "IND_FIRSTFLIGHT",
  "ACSWORLDWIDE", "AMSTAN", "OKAYPARCEL", "ENVIALIA_REFERENCE", "SEUR_ES", "CONTINENTAL", "FDSEXPRESS",
  "AMAZON_FBA_SWISHIP", "WYNGS", "DHL_ACTIVE_TRACING", "ZYLLEM", "RUSTON", "XPOST", "CORREOS_ES", "DHL_FR",
  "PAN_ASIA", "BRT_IT", "SRE_KOREA", "SPEEDEE", "TNT_UK", "VENIPAK", "SHREENANDANCOURIER", "CROSHOT", "NIPOST_NG",
  "EPST_GLBL", "NEWGISTICS", "POST_SLOVENIA", "JERSEY_POST", "BOMBINOEXP", "WMG", "XQ_EXPRESS", "FURDECO",
  "LHT_EXPRESS", "SOUTH_AFRICAN_POST_OFFICE", "SPOTON", "DIMERCO", "CYPRUS_POST_CYP", "ABCUSTOM", "IND_DELIVREE",
  "CN_BESTEXPRESS", "DX_SFTP", "PICKUPP_MYS", "FMX", "HELLMANN", "SHIP_IT_ASIA", "KERRY_ECOMMERCE", "FRETERAPIDO",
  "PITNEY_BOWES", "XPRESSEN_DK", "SEUR_SP_API", "DELIVERYONTIME", "JINSUNG", "TRANS_KARGO", "SWISHIP_DE",
  "IVOY_WEBHOOK", "AIRMEE_WEBHOOK", "DHL_BENELUX", "FIRSTMILE", "FASTWAY_IR", "HH_EXP", "MYS_MYPOST_ONLINE",
  "TNT_NL", "TIPSA", "TAQBIN_MY", "KGMHUB", "INTEXPRESS", "OVERSE_EXP", "ONECLICK", "ROADRUNNER_FREIGHT",
  "GLS_CROTIA", "MRW_FTP", "BLUEX", "DYLT", "DPD_IR", "SIN_GLBL", "TUFFNELLS_REFERENCE", "CJPACKET",
  "MILKMAN", "ASIGNA", "ONEWORLDEXPRESS", "ROYAL_MAIL", "VIA_EXPRESS", "TIGFREIGHT", "ZTO_EXPRESS", "TWO_GO",
  "IML", "INTEL_VALLEY", "EFS", "UK_UK_MAIL", "RAM", "ALLIEDEXPRESS", "APC_OVERNIGHT", "SHIPPIT",
  "TFM", "M_XPRESS", "HDB_BOX", "CLEVY_LINKS", "IBEONE", "FIEGE_NL", "KWE_GLOBAL", "CTC_EXPRESS",
  "LAO_POST", "AMAZON", "MORE_LINK", "JX", "EASY_MAIL", "ADUIEPYLE", "GB_PANTHER", "EXPRESSSALE",
  "SG_DETRACK", "TRUNKRS_WEBHOOK", "MATDESPATCH", "DICOM", "MBW", "KHM_CAMBODIA_POST", "SINOTRANS",
  "BRT_IT_PARCELID", "DHL_SUPPLY_CHAIN", "DHL_PL", "TOPYOU", "PALEXPRESS", "DHL_SG", "CN_WEDO", "FULFILLME",
  "DPD_DELISTRACK", "UPS_REFERENCE", "CARIBOU", "LOCUS_WEBHOOK", "DSV", "CN_GOFLY", "P2P_TRC", "DIRECTPARCELS",
  "NOVA_POSHTA_INT", "FEDEX_POLAND", "CN_JCEX", "FAR_INTERNATIONAL", "IDEXPRESS", "GANGBAO", "NEWAY",
  "POSTNL_INT_3_S", "RPX_ID", "DESIGNERTRANSPORT_WEBHOOK", "GLS_SLOVEN", "PARCELLED_IN", "GSI_EXPRESS",
  "CON_WAY", "BROUWER_TRANSPORT", "CPEX", "ISRAEL_POST", "DTDC_IN", "PTT_POST", "XDE_WEBHOOK", "TOLOS",
  "GIAO_HANG", "GEODIS_ESPACE", "MAGYAR_HU", "DOORDASH_WEBHOOK", "TIKI_ID", "CJ_HK_INTERNATIONAL",
  "STAR_TRACK_EXPRESS", "HELTHJEM", "SFB2C", "FREIGHTQUOTE", "LANDMARK_GLOBAL_REFERENCE", "PARCEL2GO",
  "DELNEXT", "RCL", "CGS_EXPRESS", "HK_POST", "SAP_EXPRESS", "PARCELPOST_SG", "HERMES", "IND_SAFEEXPRESS",
  "TOPHATTEREXPRESS", "MGLOBAL", "AVERITT", "LEADER", "_2EBOX", "SG_SPEEDPOST", "DBSCHENKER_SE",
  "ISR_POST_DOMESTIC", "BESTWAYPARCEL", "ASENDIA_DE", "NIGHTLINE_UK", "TAQBIN_SG", "TCK_EXPRESS",
  "ENDEAVOUR_DELIVERY", "NANJINGWOYUAN", "HEPPNER_FR", "EMPS_CN", "FONSEN", "PICKRR", "APC_OVERNIGHT_CONNUM",
  "STAR_TRACK_NEXT_FLIGHT", "DAJIN", "UPS_FREIGHT", "POSTA_PLUS", "CEVA", "ANSERX", "JS_EXPRESS",
  "PADTF", "UPS_MAIL_INNOVATIONS", "EZSHIP", "SYPOST", "AMAZON_SHIP_MCF", "YUSEN", "BRING", "SDA_IT",
  "GBA", "NEWEGGEXPRESS", "SPEEDCOURIERS_GR", "FORRUN", "PICKUP", "ECMS", "INTELIPOST", "FLASHEXPRESS",
  "CN_STO", "SEKO_SFTP", "HOME_DELIVERY_SOLUTIONS", "DPD_HGRY", "KERRYTTC_VN", "JOYING_BOX", "TOTAL_EXPRESS",
  "ZJS_EXPRESS", "STARKEN", "DEMANDSHIP", "CN_DPEX", "AUPOST_CN", "LOGISTERS", "GOGLOBALPOST", "GLS_CZ",
  "PAACK_WEBHOOK", "GRAB_WEBHOOK", "PARCELPOINT", "ICUMULUS", "DAIGLOBALTRACK", "GLOBAL_IPARCEL",
  "YURTICI_KARGO", "CN_PAYPAL_PACKAGE", "PARCEL_2_POST", "GLS_IT", "PIL_LOGISTICS", "HEPPNER", "GENERAL_OVERNIGHT",
  "HAPPY2POINT", "CHITCHATS", "SMOOTH", "CLE_LOGISTICS", "FIEGE", "MX_CARGO", "ZIINGFINALMILE",
  "DAYTON_FREIGHT", "TCS", "AEX", "HERMES_DE", "ROUTIFIC_WEBHOOK", "GLOBAVEND", "CJ_LOGISTICS",
  "PALLET_NETWORK", "RAF_PH", "UK_XDP", "PAPER_EXPRESS", "LA_POSTE_SUIVI", "PAQUETEXPRESS", "LIEFERY",
  "STRECK_TRANSPORT", "PONY_EXPRESS", "ALWAYS_EXPRESS", "GBS_BROKER", "CITYLINK_MY", "ALLJOY", "YODEL",
  "YODEL_DIR", "STONE3PL", "PARCELPAL_WEBHOOK", "DHL_ECOMERCE_ASA", "SIMPLYPOST", "KY_EXPRESS", "SHENZHEN",
  "US_LASERSHIP", "UC_EXPRE", "DIDADI", "CJ_KR", "DBSCHENKER_B2B", "MXE", "CAE_DELIVERS", "PFCEXPRESS",
  "WHISTL", "WEPOST", "DHL_PARCEL_ES", "DDEXPRESS", "ARAMEX_AU", "BNEED", "HK_TGX", "LATVIJAS_PASTS",
  "VIAEUROPE", "CORREO_UY", "CHRONOPOST_FR", "J_NET", "_6LS", "BLR_BELPOST", "BIRDSYSTEM", "DOBROPOST",
  "WAHANA_ID", "WEASHIP", "SONICTL", "KWT", "AFLLOG_FTP", "SKYNET_WORLDWIDE", "NOVA_POSHTA", "SEINO",
  "SZENDEX", "BPOST_INT", "DBSCHENKER_SV", "AO_DEUTSCHLAND", "EU_FLEET_SOLUTIONS", "PCFCORP", "LINKBRIDGE",
  "PRIMAMULTICIPTA", "COUREX", "ZAJIL_EXPRESS", "COLLECTCO", "JTEXPRESS", "FEDEX_UK", "USHIP", "PIXSELL",
  "SHIPTOR", "CDEK", "VNM_VIETTELPOST", "CJ_CENTURY", "GSO", "VIWO", "SKYBOX", "KERRYTJ",
  "NTLOGISTICS_VN", "SDH_SCM", "ZINC", "DPE_SOUTH_AFRC", "CESKA_CZ", "ACS_GR", "DEALERSEND", "JOCOM",
  "CSE", "TFORCE_FINALMILE", "SHIP_GATE", "SHIPTER", "NATIONAL_SAMEDAY", "YUNEXPRESS", "CAINIAO", "DMS_MATRIX",
  "DIRECTLOG", "ASENDIA_US", "_3JMSLOGISTICS", "LICCARDI_EXPRESS", "SKY_POSTAL", "CNWANGTONG",
  "POSTNORD_LOGISTICS_DK", "LOGISTIKA", "CELERITAS", "PRESSIODE", "SHREE_MARUTI", "LOGISTICSWORLDWIDE_HK",
  "EFEX", "LOTTE", "LONESTAR", "APRISAEXPRESS", "BEL_RS", "OSM_WORLDWIDE", "WESTGATE_GL", "FASTRACK",
  "DTD_EXPR", "ALFATREX", "PROMEDDELIVERY", "THABIT_LOGISTICS", "HCT_LOGISTICS", "CARRY_FLAP", "US_OLD_DOMINION",
  "ANICAM_BOX", "WANBEXPRESS", "AN_POST", "DPD_LOCAL", "STALLIONEXPRESS", "RAIDEREX", "SHOPFANS",
  "KYUNGDONG_PARCEL", "CHAMPION_LOGISTICS", "PICKUPP_SGP", "MORNING_EXPRESS", "NACEX", "THENILE_WEBHOOK",
  "HOLISOL", "LBCEXPRESS_FTP", "KURASI", "USF_REDDAWAY", "APG", "CN_BOXC", "ECOSCOOTING", "MAINWAY",
  "PAPERFLY", "HOUNDEXPRESS", "BOX_BERRY", "EP_BOX", "PLUS_LOG_UK", "FULFILLA", "ASE", "MAIL_PLUS",
  "XPO_LOGISTICS", "WNDIRECT", "CLOUDWISH_ASIA", "ZELERIS", "GIO_EXPRESS", "OCS_WORLDWIDE", "ARK_LOGISTICS",
  "AQUILINE", "PILOT_FREIGHT", "QWINTRY", "DANSKE_FRAGT", "CARRIERS", "AIR_CANADA_GLOBAL", "PRESIDENT_TRANS",
  "STEPFORWARDFS", "SKYNET_UK", "PITTOHIO", "CORREOS_EXPRESS", "RL_US", "MARA_XPRESS", "DESTINY",
  "UK_YODEL", "COMET_TECH", "DHL_PARCEL_RU", "TNT_REFR", "SHREE_ANJANI_COURIER", "MIKROPAKKET_BE",
  "ETS_EXPRESS", "COLIS_PRIVE", "CN_YUNDA", "AAA_COOPER", "ROCKET_PARCEL", "_360LION", "PANDU",
  "PROFESSIONAL_COURIERS", "FLYTEXPRESS", "LOGISTICSWORLDWIDE_MY", "CORREOS_DE_ESPANA", "IMX",
  "FOUR_PX_EXPRESS", "XPRESSBEES", "PICKUPP_VNM", "STARTRACK_EXPRESS", "FR_COLISSIMO", "NACEX_SPAIN_REFERENCE",
  "DHL_SUPPLY_CHAIN_AU", "ESHIPPING", "SHREETIRUPATI", "HX_EXPRESS", "INDOPAKET", "CN_17POST", "K1_EXPRESS",
  "CJ_GLS", "MYS_GDEX", "NATIONEX", "ANJUN", "FARGOOD", "SMG_EXPRESS", "RZYEXPRESS", "SEFL",
  "TNT_CLICK_IT", "HDB", "HIPSHIPPER", "RPXLOGISTICS", "KUEHNE", "IT_NEXIVE", "PTS", "SWISS_POST_FTP",
  "FASTRK_SERV", "_4_72", "US_YRC", "POSTNL_INTL_3S", "ELIAN_POST", "CUBYN", "SAU_SAUDI_POST",
  "ABXEXPRESS_MY", "HUAHAN_EXPRESS", "IND_JAYONEXPRESS", "ZES_EXPRESS", "ZEPTO_EXPRESS", "SKYNET_ZA",
  "ZEEK_2_DOOR", "BLINKLASTMILE", "POSTA_UKR", "CHROBINSON", "CN_POST56", "COURANT_PLUS", "SCUDEX_EXPRESS",
  "SHIPENTEGRA", "B_TWO_C_EUROPE", "COPE", "IND_GATI", "CN_WISHPOST", "NACEX_ES", "TAQBIN_HK",
  "GLOBALTRANZ", "HKD", "BJSHOMEDELIVERY", "OMNIVA", "SUTTON", "PANTHER_REFERENCE", "SFCSERVICE",
  "LTL", "PARKNPARCEL", "SPRING_GDS", "ECEXPRESS", "INTERPARCEL_AU", "AGILITY", "XL_EXPRESS",
  "ADERONLINE", "DIRECTCOURIERS", "PLANZER", "SENDING", "NINJAVAN_WB", "NATIONWIDE_MY", "SENDIT",
  "GB_ARROW", "IND_GOJAVAS", "KPOST", "DHL_FREIGHT", "BLUECARE", "JINDOUYUN", "TRACKON",
  "GB_TUFFNELLS", "TRUMPCARD", "ETOTAL", "SFPLUS_WEBHOOK", "SEKOLOGISTICS", "HERMES_2MANN_HANDLING",
  "DPD_LOCAL_REF", "UDS", "ZA_SPECIALISED_FREIGHT", "THA_KERRY", "PRT_INT_SEUR", "BRA_CORREIOS",
  "NZ_NZ_POST", "CN_EQUICK", "MYS_EMS", "GB_NORSK", "ESP_MRW", "ESP_PACKLINK", "KANGAROO_MY",
  "RPX", "XDP_UK_REFERENCE", "NINJAVAN_MY", "ADICIONAL", "NINJAVAN_ID", "ROADBULL", "YAKIT",
  "MAILAMERICAS", "MIKROPAKKET", "DYNALOGIC", "DHL_ES", "DHL_PARCEL_NL", "DHL_GLOBAL_MAIL_ASIA",
  "DAWN_WING", "GENIKI_GR", "HERMESWORLD_UK", "ALPHAFAST", "BUYLOGIC", "EKART", "MEX_SENDA",
  "SFC_LOGISTICS", "POST_SERBIA", "IND_DELHIVERY", "DE_DPD_DELISTRACK", "RPD2MAN", "CN_SF_EXPRESS",
  "YANWEN", "MYS_SKYNET", "CORREOS_DE_MEXICO", "CBL_LOGISTICA", "MEX_ESTAFETA", "AU_AUSTRIAN_POST",
  "RINCOS", "NLD_DHL", "RUSSIAN_POST", "COURIERS_PLEASE", "POSTNORD_LOGISTICS", "FEDEX", "DPE_EXPRESS",
  "DPD", "ADSONE", "IDN_JNE", "THECOURIERGUY", "CNEXPS", "PRT_CHRONOPOST", "LANDMARK_GLOBAL",
  "IT_DHL_ECOMMERCE", "ESP_NACEX", "PRT_CTT", "BE_KIALA", "ASENDIA_UK", "GLOBAL_TNT", "POSTUR_IS",
  "EPARCEL_KR", "INPOST_PACZKOMATY", "IT_POSTE_ITALIA", "BE_BPOST", "PL_POCZTA_POLSKA", "MYS_MYS_POST",
  "SG_SG_POST", "THA_THAILAND_POST", "LEXSHIP", "FASTWAY_NZ", "DHL_AU", "COSTMETICSNOW", "PFLOGISTICS",
  "LOOMIS_EXPRESS", "GLS_ITALY", "LINE", "GEL_EXPRESS", "HUODULL", "NINJAVAN_SG", "JANIO",
  "AO_COURIER", "BRT_IT_SENDER_REF", "SAILPOST", "LALAMOVE", "NEWZEALAND_COURIERS", "ETOMARS",
  "VIRTRANSPORT", "WIZMO", "PALLETWAYS", "I_DIKA", "CFL_LOGISTICS", "GEMWORLDWIDE", "GLOBAL_EXPRESS",
  "LOGISTYX_TRANSGROUP", "WESTBANK_COURIER", "ARCO_SPEDIZIONI", "YDH_EXPRESS", "PARCELINKLOGISTICS",
  "CNDEXPRESS", "NOX_NIGHT_TIME_EXPRESS", "AERONET", "LTIANEXP", "INTEGRA2_FTP", "PARCELONE",
  "NOX_NACHTEXPRESS", "CN_CHINA_POST_EMS", "CHUKOU1", "GLS_SLOV", "ORANGE_DS", "JOOM_LOGIS",
  "AUS_STARTRACK", "DHL", "GB_APC", "BONDSCOURIERS", "JPN_JAPAN_POST", "USPS", "WINIT",
  "ARG_OCA", "TW_TAIWAN_POST", "DMM_NETWORK", "TNT", "BH_POSTA", "SWE_POSTNORD", "CA_CANADA_POST",
  "WISELOADS", "ASENDIA_HK", "NLD_GLS", "MEX_REDPACK", "JET_SHIP", "DE_DHL_EXPRESS", "NINJAVAN_THAI",
  "RABEN_GROUP", "ESP_ASM", "HRV_HRVATSKA", "GLOBAL_ESTES", "LTU_LIETUVOS", "BEL_DHL", "AU_AU_POST",
  "SPEEDEXCOURIER", "FR_COLIS", "ARAMEX", "DPEX", "MYS_AIRPAK", "CUCKOOEXPRESS", "DPD_POLAND",
  "NLD_POSTNL", "NIM_EXPRESS", "QUANTIUM", "SENDLE", "ESP_REDUR", "MATKAHUOLTO", "CPACKET",
  "POSTI", "HUNTER_EXPRESS", "CHOIR_EXP", "LEGION_EXPRESS", "AUSTRIAN_POST_EXPRESS", "GRUPO",
  "POSTA_RO", "INTERPARCEL_UK", "GLOBAL_ABF", "POSTEN_NORGE", "XPERT_DELIVERY", "DHL_REFR",
  "DHL_HK", "SKYNET_UAE", "GOJEK", "YODEL_INTNL", "JANCO", "YTO", "WISE_EXPRESS", "JTEXPRESS_VN",
  "FEDEX_INTL_MLSERV", "VAMOX", "AMS_GRP", "DHL_JP", "HRPARCEL", "GESWL", "BLUESTAR", "CDEK_TR",
  "DESCARTES", "DELTEC_UK", "DTDC_EXPRESS", "TOURLINE", "BH_WORLDWIDE", "OCS", "YINGNUO_LOGISTICS",
  "UPS", "TOLL", "PRT_SEUR", "DTDC_AU", "THA_DYNAMIC_LOGISTICS", "UBI_LOGISTICS", "FEDEX_CROSSBORDER",
  "A1POST", "TAZMANIAN_FREIGHT", "CJ_INT_MY", "SAIA_FREIGHT", "SG_QXPRESS", "NHANS_SOLUTIONS",
  "DPD_FR", "COORDINADORA", "ANDREANI", "DOORA", "INTERPARCEL_NZ", "PHL_JAMEXPRESS", "BEL_BELGIUM_POST",
  "US_APC", "IDN_POS", "FR_MONDIAL", "DE_DHL", "HK_RPX", "DHL_PIECEID", "VNPOST_EMS", "RRDONNELLEY",
  "DPD_DE", "DELCART_IN", "IMEXGLOBALSOLUTIONS", "ACOMMERCE", "EURODIS", "CANPAR", "GLS",
  "IND_ECOM", "ESP_ENVIALIA", "DHL_UK", "SMSA_EXPRESS", "TNT_FR", "DEX_I", "BUDBEE_WEBHOOK",
  "COPA_COURIER", "VNM_VIETNAM_POST", "DPD_HK", "TOLL_NZ", "ECHO", "FEDEX_FR", "BORDEREXPRESS",
  "MAILPLUS_JPN", "TNT_UK_REFR", "KEC", "DPD_RO", "TNT_JP", "TH_CJ", "EC_CN", "FASTWAY_UK",
  "FASTWAY_US", "GLS_DE", "GLS_ES", "GLS_FR", "MONDIAL_BE", "SGT_IT", "TNT_CN", "TNT_DE",
  "TNT_ES", "TNT_PL", "PARCELFORCE", "SWISS_POST", "TOLL_IPEC", "AIR_21", "AIRSPEED", "BERT",
  "BLUEDART", "COLLECTPLUS", "COURIERPLUS", "COURIER_POST", "DHL_GLOBAL_MAIL", "DPD_UK", "DELTEC_DE",
  "DEUTSCHE_DE", "DOTZOT", "ELTA_GR", "EMS_CN", "ECARGO", "ENSENDA", "FERCAM_IT", "FASTWAY_ZA",
  "FASTWAY_AU", "FIRST_LOGISITCS", "GEODIS", "GLOBEGISTICS", "GREYHOUND", "JETSHIP_MY", "LION_PARCEL",
  "AEROFLASH", "ONTRAC", "SAGAWA", "SIODEMKA", "STARTRACK", "TNT_AU", "TNT_IT", "TRANSMISSION",
  "YAMATO", "DHL_IT", "DHL_AT", "LOGISTICSWORLDWIDE_KR", "GLS_SPAIN", "AMAZON_UK_API", "DPD_FR_REFERENCE",
  "DHLPARCEL_UK", "MEGASAVE", "QUALITYPOST", "IDS_LOGISTICS", "JOYINGBOX", "PANTHER_ORDER_NUMBER",
  "WATKINS_SHEPARD", "FASTTRACK", "UP_EXPRESS", "ELOGISTICA", "ECOURIER", "CJ_PHILIPPINES",
  "SPEEDEX", "ORANGECONNEX", "TECOR", "SAEE", "GLS_ITALY_FTP", "DELIVERE", "YYCOM", "ADICIONAL_PT",
  "DKSH", "NIPPON_EXPRESS_FTP", "GOLS", "FUJEXP", "QTRACK", "OMLOGISTICS_API", "GDPHARM",
  "MISUMI_CN", "AIR_CANADA", "CITY56_WEBHOOK", "SAGAWA_API", "KEDAEX", "PGEON_API", "WEWORLDEXPRESS",
  "JT_LOGISTICS", "TRUSK", "VIAXPRESS", "DHL_SUPPLYCHAIN_ID", "ZUELLIGPHARMA_SFTP", "MEEST",
  "TOLL_PRIORITY", "MOTHERSHIP_API", "CAPITAL", "EUROPAKET_API", "HFD", "TOURLINE_REFERENCE",
  "GIO_ECOURIER", "CN_LOGISTICS", "PANDION", "BPOST_API", "PASSPORTSHIPPING", "PAKAJO", "DACHSER",
  "YUSEN_SFTP", "SHYPLITE", "XYY", "MWD", "FAXECARGO", "MAZET", "FIRST_LOGISTICS_API",
  "SPRINT_PACK", "HERMES_DE_FTP", "CONCISE", "KERRY_EXPRESS_TW_API", "EWE", "FASTDESPATCH",
  "ABCUSTOM_SFTP", "CHAZKI", "SHIPPIE", "GEODIS_API", "NAQEL_EXPRESS", "PAPA_WEBHOOK", "FORWARDAIR",
  "DIALOGO_LOGISTICA_API", "LALAMOVE_API", "TOMYDOOR", "KRONOS_WEBHOOK", "JTCARGO", "T_CAT",
  "CONCISE_WEBHOOK", "TELEPORT_WEBHOOK", "CUSTOMCO_API", "SPX_TH", "BOLLORE_LOGISTICS", "CLICKLINK_SFTP",
  "M3LOGISTICS", "VNPOST_API", "AXLEHIRE_FTP", "SHADOWFAX", "MYHERMES_UK_API", "DAIICHI",
  "MENSAJEROSURBANOS_API", "POLARSPEED", "IDEXPRESS_ID", "PAYO", "WHISTL_SFTP", "INTEX_DE",
  "TRANS2U", "PRODUCTCAREGROUP_SFTP", "BIGSMART", "EXPEDITORS_API_REF", "AITWORLDWIDE_API",
  "WORLDCOURIER", "QUIQUP", "AGEDISS_SFTP", "ANDREANI_API", "CRLEXPRESS", "SMARTCAT", "CROSSFLIGHT",
  "PROCARRIER", "DHL_REFERENCE_API", "SEINO_API", "WSPEXPRESS", "KRONOS", "TOTAL_EXPRESS_API",
  "PARCLL", "XPEDIGO", "STAR_TRACK_WEBHOOK", "GPOST", "UCS", "DMFGROUP", "COORDINADORA_API",
  "MARKEN", "NTL", "REDJEPAKKETJE", "ALLIED_EXPRESS_FTP", "MONDIALRELAY_ES", "NAEKO_FTP",
  "MHI", "SHIPPIFY", "MALCA_AMIT_API", "JTEXPRESS_SG_API", "DACHSER_WEB", "FLIGHTLG", "CAGO",
  "COM1EXPRESS", "TONAMI_FTP", "PACKFLEET", "PUROLATOR_INTERNATIONAL", "WINESHIPPING_WEBHOOK",
  "DHL_ES_SFTP", "PCHOME_API", "CESKAPOSTA_API", "GORUSH", "HOMERUNNER", "AMAZON_ORDER",
  "EFWNOW_API", "CBL_LOGISTICA_API", "NIMBUSPOST", "LOGWIN_LOGISTICS", "NOWLOG_API", "DPD_NL",
  "GODEPENDABLE", "ESDEX", "LOGISYSTEMS_SFTP", "EXPEDITORS", "SNTGLOBAL_API", "SHIPX",
  "QINTL_API", "PACKS", "POSTNL_INTERNATIONAL", "AMAZON_EMAIL_PUSH", "DHL_API", "SPX",
  "AXLEHIRE", "ICSCOURIER", "DIALOGO_LOGISTICA", "SHUNBANG_EXPRESS", "TCS_API", "SF_EXPRESS_CN",
  "PACKETA", "SIC_TELIWAY", "MONDIALRELAY_FR", "INTIME_FTP", "JD_EXPRESS", "FASTBOX", "PATHEON",
  "INDIA_POST", "TIPSA_REF", "ECOFREIGHT", "VOX", "DIRECTFREIGHT_AU_REF", "BESTTRANSPORT_SFTP",
  "AUSTRALIA_POST_API", "FRAGILEPAK_SFTP", "FLIPXP", "VALUE_WEBHOOK", "DAESHIN", "SHERPA",
  "MWD_API", "SMARTKARGO", "DNJ_EXPRESS", "GOPEOPLE", "MYSENDLE_API", "ARAMEX_API", "PIDGE",
  "THAIPARCELS", "PANTHER_REFERENCE_API", "POSTAPLUS", "BUFFALO", "U_ENVIOS", "ELITE_CO",
  "BARQEXP", "ROCHE_INTERNAL_SFTP", "DBSCHENKER_ICELAND", "TNT_FR_REFERENCE", "NEWGISTICSAPI",
  "GLOVO", "GWLOGIS_API", "SPREETAIL_API", "MOOVA", "PLYCONGROUP", "USPS_WEBHOOK", "REIMAGINEDELIVERY",
  "EDF_FTP", "DAO365", "BIOCAIR_FTP", "RANSA_WEBHOOK", "SHIPXPRES", "COURANT_PLUS_API", "SHIPA",
  "HOMELOGISTICS", "DX", "POSTE_ITALIANE_PACCOCELERE", "TOLL_WEBHOOK", "LCTBR_API", "DX_FREIGHT",
  "DHL_SFTP", "SHIPROCKET", "UBER_WEBHOOK", "STATOVERNIGHT", "BURD", "FASTSHIP", "IBVENTURE_WEBHOOK",
  "GATI_KWE_API", "CRYOPDP_FTP", "HUBBED", "TIPSA_API", "ARASKARGO", "THIJS_NL", "ATSHEALTHCARE_REFERENCE",
  "99MINUTOS", "HELLENIC_POST", "HSM_GLOBAL", "MNX", "NMTRANSFER", "LOGYSTO", "INDIA_POST_INT",
  "AMAZON_FBA_SWISHIP_IN", "SRT_TRANSPORT", "BOMI", "DELIVERR_SFTP", "HSDEXPRESS", "SIMPLETIRE_WEBHOOK",
  "HUNTER_EXPRESS_SFTP", "UPS_API", "WOOYOUNG_LOGISTICS_SFTP", "PHSE_API", "WISH_EMAIL_PUSH",
  "NORTHLINE", "MEDAFRICA", "DPD_AT_SFTP", "ANTERAJA", "DHL_GLOBAL_FORWARDING_API", "LBCEXPRESS_API",
  "SIMSGLOBAL", "CDLDELIVERS", "TYP", "TESTING_COURIER_WEBHOOK", "PANDAGO_API", "ROYAL_MAIL_FTP",
  "THUNDEREXPRESS", "SECRETLAB_WEBHOOK", "SETEL", "JD_WORLDWIDE", "DPD_RU_API", "ARGENTS_WEBHOOK",
  "POSTONE", "TUSKLOGISTICS", "RHENUS_UK_API", "TAQBIN_SG_API", "INNTRALOG_SFTP", "DAYROSS",
  "CORREOSEXPRESS_API", "INTERNATIONAL_SEUR_API", "YODEL_API", "HEROEXPRESS", "DHL_SUPPLYCHAIN_IN",
  "URGENT_CARGUS", "FRONTDOORCORP", "JTEXPRESS_PH", "PARCELSTARS_WEBHOOK", "DPD_SK_SFTP",
  "MOVIANTO", "OZEPARTS_SHIPPING", "KARGOMKOLAY", "TRUNKRS", "OMNIRPS_WEBHOOK", "CHILEXPRESS",
  "TESTING_COURIER", "JNE_API", "BJSHOMEDELIVERY_FTP", "DEXPRESS_WEBHOOK", "USPS_API", "TRANSVIRTUAL",
  "SOLISTICA_API", "CHIENVENTURE_WEBHOOK", "DPD_UK_SFTP", "INPOST_UK", "JAVIT", "ZTO_DOMESTIC",
  "DHL_GT_API", "CEVA_TRACKING", "KOMON_EXPRESS", "EASTWESTCOURIER_FTP", "DANNIAO", "SPECTRAN",
  "DELIVER_IT", "RELAISCOLIS", "GLS_SPAIN_API", "POSTPLUS", "AIRTERRA", "GIO_ECOURIER_API",
  "DPD_CH_SFTP", "FEDEX_API", "INTERSMARTTRANS", "HERMES_UK_SFTP", "EXELOT_FTP", "DHL_PA_API",
  "VIRTRANSPORT_SFTP", "WORLDNET", "INSTABOX_WEBHOOK", "KNG", "FLASHEXPRESS_WEBHOOK",
  "MAGYAR_POSTA_API", "WESHIP_API", "OHI_WEBHOOK", "MUDITA", "BLUEDART_API", "T_CAT_API",
  "ADS", "HERMES_IT", "FITZMARK_API", "POSTI_API", "SMSA_EXPRESS_WEBHOOK", "TAMERGROUP_WEBHOOK",
  "LIVRAPIDE", "NIPPON_EXPRESS", "BETTERTRUCKS", "FAN", "PB_USPSFLATS_FTP", "PARCELRIGHT",
  "ITHINKLOGISTICS", "KERRY_EXPRESS_TH_WEBHOOK", "ECOUTIER", "SHOWL", "BRT_IT_API", "RIXONHK_API",
  "DBSCHENKER_API", "ILYANGLOGIS", "MAIL_BOX_ETC", "WESHIP", "DHL_GLOBAL_MAIL_API", "ACTIVOS24_API",
  "ATSHEALTHCARE", "LUWJISTIK", "GW_WORLD", "FAIRSENDEN_API", "SERVIP_WEBHOOK", "SWISHIP",
  "TANET", "HOTSIN_CARGO", "DIREX", "HUANTONG", "IMILE_API", "BDMNET",
  "AUEXPRESS", "NYTLOGISTICS", "DSV_REFERENCE", "NOVOFARMA_WEBHOOK", "AITWORLDWIDE_SFTP", "SHOPOLIVE",
  "FNF_ZA", "DHL_ECOMMERCE_GC", "FETCHR", "STARLINKS_API", "YYEXPRESS", "SERVIENTREGA",
  "HANJIN", "SPANISH_SEUR_FTP", "DX_B2B_CONNUM", "HELTHJEM_API", "INEXPOST", "A2B_BA",
  "RHENUS_GROUP", "SBERLOGISTICS_RU", "MALCA_AMIT", "PPL", "OSM_WORLDWIDE_SFTP", "ACILOGISTIX",
  "OPTIMACOURIER", "NOVA_POSHTA_API", "LOGGI", "YIFAN", "MYDYNALOGIC", "MORNINGLOBAL",
  "CONCISE_API", "FXTRAN", "DELIVERYOURPARCEL_ZA", "UPARCEL", "MOBI_BR", "LOGINEXT_WEBHOOK",
  "EMS", "SPEEDY"
])

const ShipmentTrackerSchema = z.object({
  transaction_id: z.string().min(1).max(50).regex(new RegExp('^[a-zA-Z0-9]*$')),
  tracking_number: z.string().min(1).max(64),
  tracking_number_type: z.enum(['CARRIER_PROVIDED', 'E2E_PARTNER_PROVIDED']).optional(),
  status: ShipmentTrackingStatusSchema, 
  shipment_date: DateNoTimeSchema.optional(),
  carrier: ShipmentCarrierSchema.optional(),
  carrier_name_other: z.string().min(1).max(64).optional(),
  postage_payment_id: z.string().min(1).max(64).readonly().optional(),
  notify_buyer: z.boolean().default(false).optional(),
  quantity: z.number().int().min(1).max(100).readonly().optional(),
  tracking_number_validated: z.boolean().readonly().optional(),
  last_updated_time: DateNoTimeSchema.optional(),
  shipment_direction: z.enum(["FORWARD", "RETURN"]).optional(),
  shipment_uploader: z.enum(["MERCHANT", "CONSUMER", "PARTNER"]).readonly().optional()
});

const OrderTrackerRequestSchema = ShipmentTrackerSchema.extend({
  capture_id: z.string().min(1).max(50).regex(new RegExp('^[a-zA-Z0-9]*$')),
  notify_payer: z.boolean().default(false).optional(),
  items: z.array(TrackerItemSchema).optional() 
});

const OrdersTrackCreate400Schema = z.object({
  details: z.array(z.object({
    issue: z.enum([
      "MISSING_REQUIRED_PARAMETER",
      "INVALID_STRING_LENGTH",
      "INVALID_PARAMETER_VALUE",
      "INVALID_PARAMETER_SYNTAX"
    ]),
    description: z.string()
  })).optional()
});

const OrdersTrackCreate403Schema = z.object({
  details: z.array(z.object({
    issue: z.enum(["PERMISSION_DENIED"]),
    description: z.string()
  })).optional()
});

const OrdersTrackCreate422Schema = z.object({
  details: z.array(z.object({
    issue: z.enum([
      "CAPTURE_STATUS_NOT_VALID",
      "ITEM_SKU_MISMATCH",
      "CAPTURE_ID_NOT_FOUND",
      "MSP_NOT_SUPPORTED"
    ]),
    description: z.string()
  })).optional()
});

const OrdersTrackersPatch400Schema = z.object({
  details: z.array(z.object({
    issue: z.enum([
      "FIELD_NOT_PATCHABLE",
      "INVALID_PARAMETER_VALUE",
      "MISSING_REQUIRED_PARAMETER",
      "INVALID_STRING_LENGTH",
      "INVALID_PATCH_OPERATION",
      "MALFORMED_REQUEST_JSON"
    ]),
    description: z.string()
  })).optional()
});

const OrdersTrackersPatch403Schema = z.object({
  details: z.array(z.object({
    issue: z.enum(["PERMISSION_DENIED"]),
    description: z.string()
  })).optional()
});

const OrdersTrackersPatch404Schema = z.object({
  details: z.array(z.object({
    issue: z.enum(["TRACKER_ID_NOT_FOUND"]),
    description: z.string()
  })).optional()
});

const OrdersTrackersPatch422Schema = z.object({
  details: z.array(z.object({
    issue: z.enum([
      "INVALID_JSON_POINTER_FORMAT",
      "NOT_PATCHABLE",
      "PATCH_VALUE_REQUIRED",
      "PATCH_PATH_REQUIRED",
      "ITEM_SKU_MISMATCH"
    ]),
    description: z.string()
  })).optional()
});




// --- Exports ---

export {
  ErrorDetailsSchema,
  ErrorLocationSchema,
  ErrorDefaultSchema,
  Error400Schema,
  Error401Schema,
  Error403Schema,
  Error404Schema,
  Error409Schema,
  Error415Schema,
  Error422Schema,
  Error500Schema,
  Error503Schema,
  CheckoutPaymentIntentSchema,
  EmailSchema,
  AccountIdSchema,
  PayerBaseSchema,
  NameSchema,
  PhoneTypeSchema,
  PhoneSchema,
  PhoneWithTypeSchema,
  DateNoTimeSchema,
  TaxInfoSchema,
  CountryCodeSchema,
  AddressPortableSchema,
  PayerSchema,
  CurrencyCodeSchema,
  MoneySchema,
  AmountBreakdownSchema,
  AmountWithBreakdownSchema,
  PayeeBaseSchema,
  PayeeSchema,
  PlatformFeeSchema,
  DisbursementModeSchema,
  PaymentInstructionSchema,
  ItemSchema,
  ShippingTypeSchema,
  ShippingOptionSchema,
  ShippingDetailSchema,
  Level2CardProcessingDataSchema,
  LineItemSchema,
  Level3CardProcessingDataSchema,
  CardSupplementaryDataSchema,
  SupplementaryDataSchema,
  PurchaseUnitRequestSchema,
  InstrumentIdSchema,
  DateYearMonthSchema,
  CardBrandSchema,
  CardTypeSchema,
  MerchantPartnerCustomerIdSchema,
  CustomerSchema,
  StoreInVaultInstructionSchema,
  VaultInstructionBaseSchema,
  CardAttributesSchema,
  CardSchema,
  VaultIdSchema,
  PaymentInitiatorSchema,
  StoredPaymentSourcePaymentTypeSchema,
  StoredPaymentSourceUsageTypeSchema,
  NetworkTransactionReferenceSchema,
  CardStoredCredentialSchema,
  EciFlagSchema,
  NetworkTokenRequestSchema,
  UrlSchema,


  CardExperienceContextSchema,
  CardRequestSchema,
  TokenSchema,
  Name2Schema,
  CountryCode2Schema,
  AddressPortable2Schema,
  PaypalWalletCustomerSchema,
  VaultOwnerIdSchema,
  VaultPaypalWalletBaseSchema,
  PaypalWalletAttributesSchema,
  LanguageSchema,
  PaypalWalletExperienceContextSchema,
  BillingAgreementIdSchema,
  PaypalWalletSchema,
  FullNameSchema,
  ExperienceContextBaseSchema,
  AltpayRecurringAttributesRequestSchema,
  BancontactRequestSchema,
  EmailAddressSchema,
  IpAddressSchema,
  BlikExperienceContextSchema,
  BlikSeamlessSchema,
  BlikOneClickSchema,
  BlikRequestSchema,
  EpsRequestSchema,
  GiropayRequestSchema,
  BicSchema,
  IdealRequestSchema,
  MybankRequestSchema,
  P24RequestSchema,
  SofortRequestSchema,
  TrustlyRequestSchema,
  CurrencyCode2Schema,
  Money2Schema,
  ApplePayPaymentDataSchema,
  ApplePayDecryptedTokenDataSchema,
  ApplePayAttributesSchema,
  ApplePayRequestSchema,
  GooglePayRequestSchema,
  VenmoWalletExperienceContextSchema,
  V3VaultInstructionBaseSchema,
  VaultVenmoWalletBaseSchema,
  VenmoWalletAttributesSchema,
  VenmoWalletRequestSchema,
  PaymentSourceSchema,
  PayeePaymentMethodPreferenceSchema,
  PaymentMethodSchema,
  StoredPaymentSourceSchema,
  OrderApplicationContextSchema,
  OrderRequestSchema,
  DateTimeSchema,
  ActivityTimestampsSchema,
  LiabilityShiftSchema,
  ParesStatusSchema,
  EnrolledSchema,
  ThreeDSecureAuthenticationResponseSchema,
  AuthenticationFlowSchema,
  ExemptionDetailsSchema,
  AuthenticationResponseSchema,
  LinkDescriptionSchema,
  VaultResponseSchema,
  CardAttributesResponseSchema,
  CardFromRequestSchema,
  BinDetailsSchema,
  CardResponseSchema,
  AccountId2Schema,
  PhoneType2Schema,
  Phone2Schema,


  PaypalWalletVaultResponseSchema,
  CobrandedCardSchema,
  PaypalWalletAttributesResponseSchema,
  PaypalWalletResponseSchema,
  IbanLastCharsSchema,
  AltpayRecurringAttributesSchema,
  BancontactSchema,
  BlikOneClickResponseSchema,
  BlikSchema,
  EpsSchema,
  GiropaySchema,
  IdealSchema,
  MybankSchema,
  P24Schema,
  SofortSchema,
  TrustlySchema,
  VenmoWalletAttributesResponseSchema,
  VenmoWalletResponseSchema,
  PaymentSourceResponseSchema,
  ProcessingInstructionSchema,
  TrackerStatusSchema,
  UniversalProductCodeSchema,
  TrackerItemSchema,
  TrackerSchema,
  ShippingWithTrackingDetailsSchema,
  AuthorizationStatusDetailsSchema,
  AuthorizationStatusSchema,
  SellerProtectionSchema,
  AuthorizationSchema,
  ProcessorResponseSchema,
  AuthorizationWithAdditionalDataSchema,
  CaptureStatusDetailsSchema,
  CaptureStatusSchema,
  ExchangeRateSchema,
  SellerReceivableBreakdownSchema,
  CaptureSchema,
  RefundStatusDetailsSchema,
  RefundStatusSchema,
  NetAmountBreakdownItemSchema,
  RefundSchema,
  PaymentCollectionSchema,
  PurchaseUnitSchema,
  OrderStatusSchema,
  OrderSchema,
  PatchSchema,
  PatchRequestSchema,
  OrdersPatch400Schema,
  OrdersPatch422Schema,
  OrderConfirmApplicationContextSchema,
  ConfirmOrderRequestSchema,
  OrdersConfirm400Schema,
  OrdersConfirm422Schema,
  OrderAuthorizeRequestSchema,
  OrderAuthorizeResponseSchema,
  OrdersAuthorize400Schema,
  OrdersAuthorize403Schema,
  OrdersAuthorize422Schema,
  OrderCaptureRequestSchema,
  OrdersCapture400Schema,
  OrdersCapture403Schema,
  OrdersCapture422Schema,
  ShipmentTrackingNumberTypeSchema,
  ShipmentTrackingStatusSchema,
  ShipmentCarrierSchema,
  ShipmentTrackerSchema,
  OrderTrackerRequestSchema,
  OrdersTrackCreate400Schema,
  OrdersTrackCreate403Schema,
  OrdersTrackCreate422Schema,
  OrdersTrackersPatch400Schema,
  OrdersTrackersPatch403Schema,
  OrdersTrackersPatch404Schema,
  OrdersTrackersPatch422Schema,
};