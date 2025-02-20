// vault_payment_tokens_v3 zod

import { z } from 'zod';

// --- Shared Schemas ---

const ErrorDetailsSchema = z.object({
  field: z.string().optional(),
  value: z.string().optional(),
  location: z.string().optional(), // TODO: Should reference ErrorLocationSchema
  issue: z.string(),
  description: z.string().optional(),
});

const ErrorLocationSchema = z.enum(['body', 'path', 'query']).default('body');

const ErrorLinkDescriptionSchema = z.object({
  href: z.string().min(0).max(20000).regex(/^.*$/),
  rel: z.string().min(0).max(100).regex(/^.*$/),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'CONNECT', 'OPTIONS']).optional(),
});

const MerchantPartnerCustomerIdSchema = z.string().min(1).max(22).regex(/^[0-9a-zA-Z_-]+$/);

const VaultIdSchema = z.string().min(1).max(36).regex(/^[0-9a-zA-Z_-]+$/);

const CardBrandSchema = z.enum([
  'VISA', 'MASTERCARD', 'DISCOVER', 'AMEX', 'SOLO', 'JCB', 'STAR', 'DELTA', 'SWITCH', 'MAESTRO',
  'CB_NATIONALE', 'CONFIGOGA', 'CONFIDIS', 'ELECTRON', 'CETELEM', 'CHINA_UNION_PAY'
]);

const DateYearMonthSchema = z.string().min(7).max(7).regex(/^[0-9]{4}-(0[1-9]|1[0-2])$/);

//Address Entity Schema is empty object. Check AddressportableSchema
const AddressEntitySchema = z.object({});

const CardVerificationStatusSchema = z.string().min(1).max(255).regex(/^[0-9A-Z_]+$/);

const DateTimeSchema = z.string().min(20).max(64).regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$/);

const CurrencyCodeSchema = z.string().min(3).max(3);

const MoneySchema = z.object({
  currency_code: CurrencyCodeSchema,
  value: z.string().max(32).regex(/^((-?[0-9]+)|(-?([0-9]+)?[.][0-9]+))$/),
});

const ProcessorResponseSchema = z.object({
  avs_code: z.enum(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'I', 'M', 'N', 'P', 'R', 'S', 'U', 'W', 'X', 'Y', 'Z', 'Null', '0', '1', '2', '3', '4']).optional(),
  cvv_code: z.enum(['E', 'I', 'M', 'N', 'P', 'S', 'U', 'X', 'All others', '0', '1', '2', '3', '4']).optional(),
  response_code: z.enum([
    '0000', '00N7', '0100', '0390', '0500', '0580', '0800', '0880', '0R00', '1000', '10BR', '1300', '1310', '1312',
    '1317', '1320', '1330', '1335', '1340', '1350', '1360', '1370', '1380', '1382', '1384', '1390', '1393', '5100',
    '5110', '5120', '5130', '5135', '5140', '5150', '5160', '5170', '5180', '5190', '5200', '5210', '5400', '5500',
    '5650', '5700', '5710', '5800', '5900', '5910', '5920', '5930', '6300', '7600', '7700', '7710', '7800', '7900',
    '8000', '8010', '8020', '8030', '8100', '8110', '8220', '9100', '9500', '9510', '9520', '9530', '9540', '9600',
    'PCNR', 'PCVV', 'PPAD', 'PPAE', 'PPAG', 'PPAI', 'PPAR', 'PPAU', 'PPAV', 'PPAX', 'PPBG', 'PPC2', 'PPCE', 'PPCO',
    'PPCR', 'PPCT', 'PPCU', 'PPD3', 'PPDC', 'PPDI', 'PPDV', 'PPEF', 'PPEL', 'PPER', 'PPEX', 'PPFE', 'PPFI', 'PPFR',
    'PPFV', 'PPGR', 'PPH1', 'PPIF', 'PPII', 'PPIM', 'PPIT', 'PPLR', 'PPLS', 'PPMB', 'PPMC', 'PPMD', 'PPNC', 'PPNL',
    'PPNT', 'PPPH', 'PPPI', 'PPPM', 'PPQC', 'PPRE', 'PPRF', 'PPRR', 'PPS0', 'PPS1', 'PPS2', 'PPS3', 'PPS4', 'PPS5',
    'PPS6', 'PPSC', 'PPSD', 'PPSE', 'PPTE', 'PPTF', 'PPTI', 'PPTR', 'PPTT', 'PPTV', 'PPUA', 'PPUC', 'PPUE', 'PPUI',
    'PPUP', 'PPUR', 'PPVC', 'PPVE', 'PPVT'
  ]).optional(),
  payment_advice_code: z.enum(['01', '02', '03', '21']).optional(),
});

//3ds_result, ACHDebitResponse. Check to see if it is required.
const ThreeDSResultSchema = z.object({});
const ACHDebitResponseSchema = z.object({});

const CardVerificationDetailsSchema = z.object({
  network_transaction_id: z.string().min(1).max(1024).regex(/^[a-zA-Z0-9-_@.:&+=*^'~#!$%()]+$/).optional(),
  time: DateTimeSchema.optional(),
  amount: MoneySchema.optional(),
  processor_response: ProcessorResponseSchema.optional(),
  three_d_secure: ThreeDSResultSchema.optional(),
});

const CardBrand = z.enum(['VISA', 'MASTERCARD', 'DISCOVER', 'AMEX', 'SOLO', 'JCB', 'STAR', 'DELTA', 'SWITCH', 'MAESTRO',
  'CB_NATIONALE', 'CONFIGOGA', 'CONFIDIS', 'ELECTRON', 'CETELEM', 'CHINA_UNION_PAY'])

const CardResponseSchema = z.object({
  name: z.string().min(2).max(300).regex(/^[A-Za-z ]+$/).optional(),
  last_digits: z.string().regex(/[0-9]{2,}/).min(2).max(4).readonly().optional(),
  brand: CardBrandSchema.readonly().optional(),
  expiry: DateYearMonthSchema.optional(),
  billing_address: AddressEntitySchema.optional(), //TODO: Should reference AddressPortableSchema
  verification_status: CardVerificationStatusSchema.optional(),
  verification: CardVerificationDetailsSchema.optional(),
});

const NameSchema = z.object({
  prefix: z.string().max(140).optional(),
  given_name: z.string().max(140).optional(),
  surname: z.string().max(140).optional(),
  middle_name: z.string().max(140).optional(),
  suffix: z.string().max(140).optional(),
  alternate_full_name: z.string().max(300).optional(),
  full_name: z.string().max(300).optional(),
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
  address_details: z.object({
    street_number: z.string().max(100).optional(),
    street_name: z.string().max(100).optional(),
    street_type: z.string().max(100).optional(),
    delivery_service: z.string().max(100).optional(),
    building_name: z.string().max(100).optional(),
    sub_building: z.string().max(100).optional(),
  }).optional()
});

const ShippingDetailSchema = z.object({
  name: NameSchema.optional(), //TODO: Should reference NameSchema
  type: z.enum(['SHIPPING', 'PICKUP_IN_PERSON']).optional(),
  address: AddressPortableSchema.optional(),
});

const WalletBaseSchema = z.object({
  description: z.string().min(1).max(128).regex(/^[a-zA-Z0-9_'\-., :;\!?"]*$/).optional(),
  shipping: ShippingDetailSchema.optional(),
  permit_multiple_payment_tokens: z.boolean().default(false).optional(),
  usage_type: z.string().min(1).max(255).regex(/^[0-9A-Z_]+$/).optional(),
  customer_type: z.string().min(1).max(255).regex(/^[0-9A-Z_]+$/).optional(),
});

const EmailSchema = z.string().max(254).min(3).regex(/(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|(?:"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*"))@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);

const AccountIdSchema = z.string().min(13).max(13).regex(/^[2-9A-HJ-NP-Z]{13}$/);

const PayerBaseSchema = z.object({
  email_address: EmailSchema.optional(),
  payer_id: AccountIdSchema.readonly().optional(),
});

const PhoneTypeSchema = z.enum(['FAX', 'HOME', 'MOBILE', 'OTHER', 'PAGER']);

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
  tax_id: z.string().min(1).max(14).regex(/([a-zA-Z0-9])/),
  tax_id_type: z.enum(['BR_CPF', 'BR_CNPJ']),
});

const PayerSchema = PayerBaseSchema.extend({
  name: NameSchema.optional(),
  phone: PhoneWithTypeSchema.optional(),
  birth_date: DateNoTimeSchema.optional(),
  tax_info: TaxInfoSchema.optional(),
  address: AddressPortableSchema.optional(),
});

const PayPalWalletResponseSchema = WalletBaseSchema.extend({
  account_id: AccountIdSchema.readonly().optional(),
  phone_number: PhoneSchema.readonly().optional(),
}).readonly();

const VenmoResponseSchema = WalletBaseSchema.extend({
  user_name: z.string().regex(/^[-a-zA-Z0-9_]*$/).min(1).max(50).optional(),
}).readonly();

const InstrumentIdSchema = z.string().min(1).max(256).regex(/^[A-Za-z0-9-_.+=]+$/);

const CardTypeSchema = z.enum(['CREDIT', 'DEBIT', 'PREPAID', 'STORE', 'UNKNOWN']);

const CardSchema = z.object({
  id: InstrumentIdSchema.readonly().optional(),
  name: z.string().max(300).min(1).regex(/^.{1,300}$/).optional(),
  number: z.string().regex(/^[0-9]{13,19}$/).min(13).max(19).optional(),
  expiry: DateYearMonthSchema.optional(),
  security_code: z.string().regex(/^[0-9]{3,4}$/).min(3).max(4).optional(),
  last_digits: z.string().regex(/^[0-9]{2,4}$/).min(2).max(4).readonly().optional(),
  card_type: CardBrandSchema.readonly().optional(),
  type: CardTypeSchema.optional(),
  brand: CardBrandSchema.optional(),
  billing_address: AddressPortableSchema.optional(),
});

const ApplePayCardSchema = CardSchema.extend({});

const ApplePayPaymentTokenResponseSchema = z.object({
  card: ApplePayCardSchema.optional(),
});


const ACHDebitVerificationStatusSchema = z.string().min(1).max(255).default('NOT_VERIFIED');

const ACHDebitResponse2Schema = z.object({
  verification_status: ACHDebitVerificationStatusSchema.optional(),
});

const BankResponseSchema = z.object({
  ach_debit: ACHDebitResponseSchema.optional(),
});

const LinkDescriptionSchema = z.object({
  href: z.string(),
  rel: z.string(),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'CONNECT', 'OPTIONS', 'PATCH']).optional(),
});

const PaymentTokenResponseSchema = z.object({
  id: VaultIdSchema.optional(),
  customer: z.lazy(() => CustomerSchema.optional()),
  payment_source: z.object({
    card: CardResponseSchema.optional(),
    paypal: PayPalWalletResponseSchema.optional(),
    venmo: VenmoResponseSchema.optional(),
    apple_pay: ApplePayPaymentTokenResponseSchema.optional(),
    bank: BankResponseSchema.optional()
  }).optional(),
  links: z.array(LinkDescriptionSchema).min(1).max(32).readonly().optional(),
});

const CustomerSchema = z.object({
  id: MerchantPartnerCustomerIdSchema.optional(),
});

const CustomerVaultPaymentTokensResponseSchema = z.object({
  total_items: z.number().int().min(1).max(50).optional(),
  total_pages: z.number().int().min(1).max(10).optional(),
  customer: CustomerSchema.optional(),
  payment_tokens: z.array(PaymentTokenResponseSchema).min(0).max(64).optional(),
  links: z.array(LinkDescriptionSchema).min(1).max(32).readonly().optional(),
});

const ErrorDetails2Schema = z.object({
  field: z.string().optional(),
  value: z.string().optional(),
  location: z.string().default('body'),
  issue: z.string(),
  description: z.string().optional(),
});

const ErrorSchema = z.object({
  name: z.string(),
  message: z.string(),
  debug_id: z.string(),
  information_link: z.string().readonly().optional(),
  details: z.array(ErrorDetails2Schema).optional(),
  links: z.array(LinkDescriptionSchema).readonly().optional(),
});

const CardVerificationMethodSchema = z.string().min(1).max(255).regex(/^[0-9A-Z_]+$/).optional();

const LanguageSchema = z.string().min(2).max(10).regex(/^[a-z]{2}(?:-[A-Z][a-z]{3})?(?:-(?:[A-Z]{2}|[0-9]{3}))?$/).optional();

const VaultInstructionSchema = z.string().min(1).max(255).regex(/^[A-Z_]+$/).default('ON_CREATE_PAYMENT_TOKENS').optional();

const ExperienceContextSchema = z.object({
  brand_name: z.string().min(1).max(300).regex(/^.*$/).optional(),
  locale: LanguageSchema.optional(),
  return_url: z.string().url().min(1).max(4000).optional(),
  cancel_url: z.string().url().min(1).max(4000).optional(),
  shipping_preference: z.string().min(1).max(255).regex(/^[0-9A-Z_]+$/).default('GET_FROM_FILE').optional(),
  vault_instruction: VaultInstructionSchema.optional(),
});

const CardRequestSchema = CardSchema.extend({
  verification_method: CardVerificationMethodSchema,
  experience_context: ExperienceContextSchema.optional(),
});

//Token Attributes Schema is empty object. Check to see if it is required.
const TokenAttributesSchema = z.object({});

const TokenIdRequestSchema = z.object({
  id: z.string().min(1).max(255).regex(/^[0-9A-Z_-]+$/),
  type: z.enum(['BILLING_AGREEMENT']),
  attributes: TokenAttributesSchema.optional(),
});

//Metadata Schema is empty object. Check to see if it is required.
const MetadataSchema = z.object({});

const PaymentTokenRequestSchema = z.object({
  customer: CustomerSchema.optional(),
  payment_source: z.object({
    card: CardRequestSchema.optional(),
    token: TokenIdRequestSchema.optional(),
  }),
  metadata: MetadataSchema.optional(),
});

const PayPalWalletRequestSchema = WalletBaseSchema.extend({
  experience_context: ExperienceContextSchema.optional(),
});

const VenmoRequestSchema = WalletBaseSchema.extend({
  experience_context: ExperienceContextSchema.optional(),
});

const SetupTokenRequestSchema = z.object({
  customer: CustomerSchema.optional(),
  payment_source: z.object({
    card: CardRequestSchema.optional(),
    paypal: PayPalWalletRequestSchema.optional(),
    venmo: VenmoRequestSchema.optional(),
    token: TokenIdRequestSchema.optional(),
  }),
  metadata: MetadataSchema.optional(),
});

const OrdinalSchema = z.number().int().min(1).max(99).optional();

const PaymentTokenStatusSchema = z.string().min(1).max(255).regex(/^[0-9A-Z_]+$/).default('CREATED').optional();

const SetupTokenResponseSchema = z.object({
  id: VaultIdSchema.optional(),
  ordinal: OrdinalSchema.optional(),
  customer: CustomerSchema.optional(),
  status: PaymentTokenStatusSchema.optional(),
  payment_source: z.object({
    card: CardResponseSchema.optional(),
    paypal: PayPalWalletResponseSchema.optional(),
    venmo: VenmoResponseSchema.optional(),
  }).optional(),
  links: z.array(LinkDescriptionSchema).min(1).max(32).readonly().optional(),
});

// --- Parameters Schemas ---

const PayPalRequestIdParameterSchema = z.string();
const CustomerIdParameterSchema = z.string().min(7).max(36).regex(/^[0-9a-zA-Z_-]+$/);
const PageSizeParameterSchema = z.number().int().min(1).default(5).optional();
const PageParameterSchema = z.number().int().min(1).default(1).optional();
const TotalRequiredParameterSchema = z.boolean().default(false).optional();
const IdParameterSchema = z.string().min(7).max(36).regex(/^[0-9a-zA-Z_-]+$/);

// --- Exports ---

export {
  ErrorDetailsSchema,
  ErrorLocationSchema,
  ErrorLinkDescriptionSchema,
  MerchantPartnerCustomerIdSchema,
  CustomerSchema,
  VaultIdSchema,
  CardBrandSchema,
  DateYearMonthSchema,
  AddressEntitySchema,
  CardVerificationStatusSchema,
  DateTimeSchema,
  CurrencyCodeSchema,
  MoneySchema,
  ProcessorResponseSchema,
  ThreeDSResultSchema,
  ACHDebitResponseSchema,
  CardVerificationDetailsSchema,
  CardResponseSchema,
  NameSchema,
  CountryCodeSchema,
  AddressPortableSchema,
  ShippingDetailSchema,
  WalletBaseSchema,
  EmailSchema,
  AccountIdSchema,
  PayerBaseSchema,
  PhoneTypeSchema,
  PhoneSchema,
  PhoneWithTypeSchema,
  DateNoTimeSchema,
  TaxInfoSchema,
  PayerSchema,
  PayPalWalletResponseSchema,
  VenmoResponseSchema,
  InstrumentIdSchema,
  CardTypeSchema,
  CardSchema,
  ApplePayCardSchema,
  ApplePayPaymentTokenResponseSchema,
  ACHDebitResponse2Schema,
  ACHDebitVerificationStatusSchema,
  BankResponseSchema,
  LinkDescriptionSchema,
  PaymentTokenResponseSchema,
  CustomerVaultPaymentTokensResponseSchema,
  ErrorDetails2Schema,
  ErrorSchema,
  CardVerificationMethodSchema,
  LanguageSchema,
  VaultInstructionSchema,
  ExperienceContextSchema,
  CardRequestSchema,
  TokenAttributesSchema,
  TokenIdRequestSchema,
  MetadataSchema,
  PaymentTokenRequestSchema,
  PayPalWalletRequestSchema,
  VenmoRequestSchema,
  SetupTokenRequestSchema,
  OrdinalSchema,
  PaymentTokenStatusSchema,
  SetupTokenResponseSchema,
  PayPalRequestIdParameterSchema,
  CustomerIdParameterSchema,
  PageSizeParameterSchema,
  PageParameterSchema,
  TotalRequiredParameterSchema,
  IdParameterSchema
};