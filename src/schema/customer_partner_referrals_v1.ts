
// customer_partner_referrals_v1 zod

// Its json has 80 types (as per ai)
// Total Exported ZodSchemas 81

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

const CountryCodeSchema = z.string().length(2).regex(/^([A-Z]{2}|C2)$/);

const NameSchema = z.object({
  prefix: z.string().max(140).optional(),
  given_name: z.string().max(140).optional(),
  surname: z.string().max(140).optional(),
  middle_name: z.string().max(140).optional(),
  suffix: z.string().max(140).optional(),
  alternate_full_name: z.string().max(300).optional().describe("deprecated"),
  full_name: z.string().max(300).optional(),
});

const PhoneSchema = z.object({
  country_code: z.string().min(1).max(3).regex(/^[0-9]{1,3}?$/),
  national_number: z.string().min(1).max(14).regex(/^[0-9]{1,14}?$/),
  extension_number: z.string().min(1).max(15).regex(/^[0-9]{1,15}?$/).optional(),
});

const PhoneTypeSchema = z.enum(["FAX", "HOME", "MOBILE", "OTHER", "PAGER"]);

const PhoneDetailsSchema = z.object({
  phone_number_details: PhoneSchema,
  phone_type: PhoneTypeSchema,
});

const AddressSchema = z.object({
  line1: z.string(),
  line2: z.string().optional(),
  city: z.string(),
  state: z.string().max(40).optional(),
  country_code: CountryCodeSchema,
  postal_code: z.string().optional(),
});

const IdentityDocumentTypeSchema = z.enum([
  "SOCIAL_SECURITY_NUMBER",
  "EMPLOYMENT_IDENTIFICATION_NUMBER",
  "TAX_IDENTIFICATION_NUMBER",
  "PASSPORT_NUMBER",
  "PENSION_FUND_ID",
  "MEDICAL_INSURANCE_ID",
  "CNPJ",
  "CPF",
  "PAN"
]);

const IdentityDocumentSchema = z.object({
  type: IdentityDocumentTypeSchema,
  value: z.string().regex(/^[A-Za-z0-9]+$/),
  partial_value: z.boolean().default(false).optional(),
  issuer_country_code: z.string().regex(/^[A-Z]([A-Z]|\d)$/),
});

const AccountOwnerRelationshipSchema = z.object({
  name: NameSchema,
  relation: z.enum(["MOTHER"]),
  country_code_of_nationality: CountryCodeSchema,
});

const CurrencySchema = z.object({
  currency: z.string(),
  value: z.string(),
});

const CurrencyRangeSchema = z.object({
  minimum_amount: CurrencySchema.optional(),
  maximum_amount: CurrencySchema.optional(),
});

const EmailAddressSchema = z.string().email().min(3).max(254);

const EmailContactSchema = z.object({
  email_address: EmailAddressSchema,
  role: z.enum(["CUSTOMER_SERVICE"]),
});

const PurposeCodeEnumSchema = z.enum([
  "P0104",
  "P0301",
  "P0801",
  "P0802",
  "P0803",
  "P0805",
  "P0806",
  "P0902",
  "P1004",
  "P1005",
  "P1006",
  "P1007",
  "P1008",
  "P1009"
]);

const BusinessNameSchema = z.object({
  type: z.enum(["LEGAL", "DOING_BUSINESS_AS", "STOCK_TRADING_NAME"]),
  name: z.string(),
});

const EventsTypeSchema = z.enum(["BIRTH", "ESTABLISHED", "INCORPORATION", "OPERATION"]);

const DateOfEventSchema = z.object({
  event_type: EventsTypeSchema,
  event_date: z.string().datetime(),
});

const BusinessTypeEnumSchema = z.enum([
  "INDIVIDUAL",
  "PROPRIETORSHIP",
  "PARTNERSHIP",
  "CORPORATION",
  "NONPROFIT",
  "GOVERNMENT",
  "GENERAL_PARTNERSHIP",
  "LIMITED_PARTNERSHIP",
  "LIMITED_LIABILITY_PARTNERSHIP",
  "PRIVATE_CORPORATION",
  "PUBLIC_CORPORATION",
  "PROPRIETORSHIP_CRAFTSMAN",
  "PUBLIC_PARTNERSHIP",
  "LIMITED_LIABILITY_PROPRIETORS",
  "LIMITED_LIABILITY_PRIVATE_CORPORATION",
  "LIMITED_PARTNERSHIP_PRIVATE_CORPORATION",
  "PRIVATE_PARTNERSHIP",
  "PROPRIETARY_COMPANY",
  "PUBLIC_COMPANY",
  "ASSOCIATION",
  "REGISTERED_COOPERATIVE",
  "OTHER_CORPORATE_BODY",
  "ANY_OTHER_BUSINESS_ENTITY",
  "ONLY_BUY_OR_SEND_MONEY"
]);

const BusinessSubTypeSchema = z.enum([
  "ASSO_TYPE_INCORPORATED",
  "ASSO_TYPE_NON_INCORPORATED",
  "GOVT_TYPE_ENTITY",
  "GOVT_TYPE_EMANATION",
  "GOVT_TYPE_ESTD_COMM",
  "GOVT_TYPE_ESTD_FC",
  "GOVT_TYPE_ESTD_ST_TR"
]);

const IdentifierSchema = z.object({
  type: z.enum([
    "ROUTING_NUMBER_1",
    "ROUTING_NUMBER_2",
    "ROUTING_NUMBER_3",
    "BI_CODE",
    "BANK_CODE",
    "BRANCH_CODE",
    "INTERMEDIARY_SWIFT_CODE",
    "BBAN",
    "BBAN_ENCRYPTED",
    "BBAN_HMAC",
    "AGGREGATOR_YODLEE"
  ]),
  value: z.string(),
});

const BankDetailsSchema = z.object({
  nick_name: z.string().optional(),
  account_number: z.string().regex(/\d+/),
  account_type: z.enum(["CHECKING", "SAVINGS"]),
  currency_code: z.string().regex(/^([A-Z]){3}$/).optional(),
  identifiers: z.array(IdentifierSchema).min(1).optional(),
  branch_location: AddressSchema.optional(),
  mandate_agreed: z.boolean().optional(),
});

const AccountIdentifierSchema = z.object({
  type: z.enum(["PAYER_ID"]),
  value: z.string(),
});

const PartnerSpecificIdentifiersSchema = z.object({
  type: z.enum(["TRACKING_ID", "ACCOUNT_LINKING_ID"]),
  value: z.string(),
});

const RestEndpointFeaturesEnumSchema = z.enum([
  "PAYMENT",
  "REFUND",
  "PARTNER_FEE",
  "DELAY_FUNDS_DISBURSEMENT",
  "READ_SELLER_DISPUTE",
  "UPDATE_SELLER_DISPUTE",
  "ACCESS_MERCHANT_INFORMATION",
  "INVOICE_READ_WRITE",
  "ADVANCED_TRANSACTIONS_SEARCH"
]);

const BillingExperiencePreferenceSchema = z.object({
  experience_id: z.string().optional(),
  billing_context_set: z.boolean().optional(),
});

const LegalConsentSchema = z.object({
  type: z.enum(["SHARE_DATA_CONSENT"]),
  granted: z.boolean(),
});

const ProductNameSchema = z.enum([
  "EXPRESS_CHECKOUT",
  "PPPLUS",
  "WP_PRO",
  "PPCP",
  "PAYMENT_METHODS",
  "ADVANCED_VAULTING"
]);

// --- Main Schemas ---

const PersonDetailsSchema = z.object({
  email_address: EmailAddressSchema.optional(),
  name: NameSchema.optional(),
  phone_contacts: z.array(PhoneDetailsSchema).optional(),
  home_address: AddressSchema.optional(),
  nationality_country_code: CountryCodeSchema.optional(),
  identity_documents: z.array(IdentityDocumentSchema).optional(),
  account_owner_relationships: z.array(AccountOwnerRelationshipSchema).optional(),
});

const BusinessDetailsSchema = z.object({
  phone_contacts: z.array(PhoneDetailsSchema).optional(),
  business_address: AddressSchema.optional(),
  business_type: z.string().optional(), // TODO: items: { "$ref": "#/components/schemas/business_type_enum" } missing
  business_subtype: BusinessSubTypeSchema.optional(),
  category: z.string().regex(/^\d+$/).optional(),
  sub_category: z.string().regex(/^\d+$/).optional(),
  merchant_category_code: z.string().regex(/^\d+$/).optional(),
  purpose_code: z.array(PurposeCodeEnumSchema).optional(), // TODO: items: { "$ref": "#/components/schemas/purpose_code_enum" } missing
  names: z.array(BusinessNameSchema).optional(),
  business_description: z.string().optional(),
  event_dates: z.array(DateOfEventSchema).optional(),
  website_urls: z.array(z.string().url()).optional(),
  annual_sales_volume_range: CurrencyRangeSchema.optional(),
  average_monthly_volume_range: CurrencyRangeSchema.optional(),
  identity_documents: z.array(IdentityDocumentSchema).optional(),
  email_contacts: z.array(EmailContactSchema).optional(),
  country_of_incorporation: CountryCodeSchema.optional(),
  beneficial_owners: z.lazy(() => BeneficialOwnersSchema.optional()),
  office_bearers: z.array(z.lazy(() => OfficeBearerSchema)).min(0).max(10).optional(),
});

const FinancialInstrumentDataSchema = z.object({
  bank_details: z.array(BankDetailsSchema).optional(),
});

const UserSchema = z.object({
  customer_type: z.enum(["CONSUMER", "MERCHANT"]).optional().describe("deprecated"),
  person_details: PersonDetailsSchema.optional(),
  business_details: BusinessDetailsSchema.optional(),
  financial_instrument_data: FinancialInstrumentDataSchema.optional(),
  preferred_language_code: z.string().regex(/^([a-z]){2}_([A-Z]){2}$/).optional().describe("deprecated"),
  primary_currency_code: z.string().optional(),
  referral_user_payer_id: AccountIdentifierSchema.optional(),
  partner_specific_identifiers: z.array(PartnerSpecificIdentifiersSchema).optional(),
});

const IntegrationDetailsSchema = z.object({
  partner_id: z.string().optional(),
  rest_api_integration: z.object({
    integration_method: z.enum(["BRAINTREE", "PAYPAL"]).default("PAYPAL").optional(),
    integration_type: z.enum(["FIRST_PARTY", "THIRD_PARTY"]).optional(),
  }).optional(),
  rest_third_party_details: z.object({
    partner_client_id: z.string().optional(),
    feature_list: z.array(RestEndpointFeaturesEnumSchema).optional(),
  }).optional(),
  rest_first_party_details: z.object({
    partner_client_id: z.string().min(1).max(50).optional(),
    feature_list: z.array(RestEndpointFeaturesEnumSchema).optional(),
    seller_nonce: z.string().min(44).max(128).optional(),
  }).optional(),
});

const BillingAgreementSchema = z.object({
  description: z.string().optional(),
  billing_experience_preference: BillingExperiencePreferenceSchema.optional(),
  merchant_custom_data: z.string().optional(),
  approval_url: z.string().url().optional(),
  ec_token: z.string().optional(),
});

const CapabilitiesSchema = z.object({
  capability: z.enum(["API_INTEGRATION", "BANK_ADDITION", "BILLING_AGREEMENT", "CONTEXTUAL_MARKETING_CONSENT"]),
  api_integration_preference: IntegrationDetailsSchema.optional(),
  billing_agreement: BillingAgreementSchema.optional(),
});

const WebExperiencePreferenceSchema = z.object({
  partner_logo_url: z.string().url().optional(),
  return_url: z.string().url().optional(),
  return_url_description: z.string().optional(),
  action_renewal_url: z.string().url().optional(),
  show_add_credit_card: z.boolean().optional(),
  show_mobile_confirm: z.boolean().optional(),
  use_mini_browser: z.boolean().optional(),
  use_hua_email_confirmation: z.boolean().optional(),
});

const ReferralDataSchema = z.object({
  customer_data: UserSchema.optional(),
  requested_capabilities: z.array(CapabilitiesSchema).optional(),
  web_experience_preference: WebExperiencePreferenceSchema.optional(),
  collected_consents: z.array(LegalConsentSchema).optional(),
  products: z.array(ProductNameSchema).optional(),
});

const ErrorSchema = z.object({
  name: z.string().optional(),
  message: z.string().optional(),
  debug_id: z.string().optional(),
  information_link: z.string().optional(),
  details: z.array(z.lazy(() => ErrorDetails2Schema)).optional(),
  links: z.array(z.lazy(() => LinkDescriptionSchema)).readonly().optional(),
});

const LinkDescriptionSchema = z.object({
  href: z.string(),
  rel: z.string(),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'CONNECT', 'OPTIONS', 'PATCH']).optional(),
});

const CreateReferralDataResponseSchema = z.object({
  links: z.array(LinkDescriptionSchema).readonly().optional(),
});

const ReferralDataResponseSchema = z.object({
  partner_referral_id: z.string().readonly().optional(),
  submitter_payer_id: z.string().readonly().optional(),
  referral_data: ReferralDataSchema.optional(),
  links: z.array(LinkDescriptionSchema).readonly().optional(),
});

const AccountCapabilityNamesSchema = z.enum([
  "PREPAID",
  "INSTANT_FUNDS",
  "SEND_MONEY",
  "RECEIVE_MONEY",
  "CARD_PROCESSING_VIRTUAL_TERMINAL",
  "AMEX_OPTBLUE",
  "CUSTOM_CARD_PROCESSING",
  "FRAUD_TOOL_ACCESS",
  "DEBIT_CARD_SWITCH",
  "COMMERCIAL_ENTITY",
  "WITHDRAW_MONEY",
  "STANDARD_CARD_PROCESSING",
  "PAYPAL_CREDIT_PROCESSING",
  "VENMO_PAY_PROCESSING",
  "ALT_PAY_PROCESSING"
]);

const ProductSchema = z.object({
  name: z.enum([
    "EXPRESS_CHECKOUT",
    "WEBSITE_PAYMENTS_STANDARD",
    "MASS_PAYMENT",
    "EMAIL_PAYMENTS",
    "EBAY_CHECKOUT",
    "PAYFLOW_LINK",
    "PAYFLOW_PRO",
    "WEBSITE_PAYMENTS_PRO_3_0",
    "WEBSITE_PAYMENTS_PRO_2_0",
    "VIRTUAL_TERMINAL",
    "HOSTED_SOLE_SOLUTION",
    "BILL_ME_LATER",
    "MOBILE_EXPRESS_CHECKOUT",
    "PAYPAL_HERE",
    "MOBILE_IN_STORE",
    "PAYPAL_STANDARD",
    "MOBILE_PAYPAL_STANDARD",
    "MOBILE_PAYMENT_ACCEPTANCE",
    "PAYPAL_ADVANCED",
    "PAYPAL_PRO",
	"ENHANCED_RECURRING_PAYMENTS",
	"PPCP_STANDARD",
    "PPCP_CUSTOM",
    "PAYMENT_METHODS",
    "ADVANCED_VAULTING"
  ]).optional(),
  vetting_status: z.enum([
    "APPROVED",
    "PENDING",
    "DECLINED",
    "SUBSCRIBED",
    "IN_REVIEW",
    "NEED_MORE_DATA",
    "DENIED"
  ]).optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "PENDING"]).optional(),
  capabilities: z.array(AccountCapabilityNamesSchema).optional(),
});

const SignatureSchema = z.object({
  api_user_name: z.string().optional(),
  api_password: z.string().optional(),
  signature: z.string().optional(),
});

const CertificateSchema = z.object({
  api_user_name: z.string().optional(),
  api_password: z.string().optional(),
  fingerprint: z.string().optional(),
  download_link: z.string().optional(),
});

const CredentialSchema = z.object({
  signature: SignatureSchema.optional(),
  certificate: CertificateSchema.optional(),
});

const OauthThirdPartySchema = z.object({
  partner_client_id: z.string().optional(),
  merchant_client_id: z.string().optional(),
  scopes: z.array(z.string()).optional(),
  access_token: z.string().optional(),
  refresh_token: z.string().optional(),
});

const OauthIntegrationSchema = z.object({
  integration_type: z.enum([
    "FIRST_PARTY_INTEGRATED",
    "FIRST_PARTY_NON_INTEGRATED",
    "THIRD_PARTY",
    "OAUTH_THIRD_PARTY"
  ]).optional(),
  integration_method: z.enum(["PAYPAL", "BRAINTREE"]).optional(),
  status: z.enum(["A", "I"]).optional(),
  oauth_third_party: z.array(OauthThirdPartySchema).optional(),
});

const LimitationSchema = z.object({
  name: z.string().optional(),
  restrictions: z.array(z.string()).optional(),
});

const AccountCapabilityStatusSchema = z.enum(["ACTIVE", "SUSPENDED", "REVOKED"]).readonly();

const CapabilityLimitTypesSchema = z.enum(["GENERAL"]);

const CapabilityLimitSchema = z.object({
  type: CapabilityLimitTypesSchema.optional(),
});

const AccountCapabilitySchema = z.object({
  name: AccountCapabilityNamesSchema.optional(),
  status: AccountCapabilityStatusSchema.optional(),
  limits: z.array(CapabilityLimitSchema).optional(),
});

const MerchantIntegrationSchema = z.object({
  tracking_id: z.string().optional(),
  merchant_id: z.string().optional(),
  given_name: z.string().max(140).min(1).regex(/^[a-zA-Z ,.'-]+$/).optional(),
  surname: z.string().max(140).min(1).regex(/^[a-zA-Z ,.'-]+$/).optional(),
  products: z.array(ProductSchema).optional(),
  payments_receivable: z.boolean().optional(),
  legal_name: z.string().optional(),
  primary_email_confirmed: z.boolean().optional(),
  primary_email: z.string().optional(),
  date_created: z.string().optional(),
  granted_permissions: z.array(z.enum([
    "EXPRESS_CHECKOUT",
    "REFUND",
    "DIRECT_PAYMENT",
    "AUTH_CAPTURE",
    "BUTTON_MANAGER",
    "ACCOUNT_BALANCE",
    "TRANSACTION_DETAILS",
    "TRANSACTION_SEARCH",
    "REFERENCE_TRANSACTION",
    "RECURRING_PAYMENTS",
    "BILLING_AGREEMENT",
    "MANAGE_PENDING_TRANSACTION_STATUS",
    "NON_REFERENCED_CREDIT",
    "MASS_PAY",
    "ENCRYPTED_WEBSITE_PAYMENTS",
    "SETTLEMENT_CONSOLIDATION",
    "SETTLEMENT_REPORTING",
    "MOBILE_CHECKOUT",
    "AIR_TRAVEL",
    "INVOICING",
    "RECURRING_PAYMENT_REPORT",
    "EXTENDED_PRO_PROCESSING_REPORT",
    "EXCEPTION_PROCESSING_REPORT",
    "TRANSACTION_DETAIL_REPORT",
    "ACCOUNT_MANAGEMENT_PERMISSION",
    "ACCESS_BASIC_PERSONAL_DATA",
    "ACCESS_ADVANCED_PERSONAL_DATA"
  ])).optional(),
  api_credentials: CredentialSchema.optional(),
  oauth_integrations: z.array(OauthIntegrationSchema).optional(),
  limitations: z.array(LimitationSchema).optional(),
  capabilities: z.array(AccountCapabilitySchema).optional(),
});

const MerchantIntegrationCredentialsSchema = z.object({
  client_id: z.string().min(1).max(255).optional(),
  client_secret: z.string().min(1).max(255).optional(),
  payer_id: z.string().min(1).max(255).optional(),
});

const ErrorDetails3Schema = z.object({
  field: z.string().optional(),
  issue: z.string(),
});

const Error2Schema = z.object({
  name: z.string().readonly().optional(),
  debug_id: z.string().readonly().optional(),
  message: z.string().readonly().optional(),
  information_link: z.string().readonly().optional(),
  details: z.array(ErrorDetails3Schema).readonly().optional(),
});

const ProductIntegrationSchema = z.object({
  product: z.enum([
    "EXPRESS_CHECKOUT",
    "WEBSITE_PAYMENTS_STANDARD",
    "MASS_PAYMENT",
    "EMAIL_PAYMENTS",
    "EBAY_CHECKOUT",
    "PAYFLOW_LINK",
    "PAYFLOW_PRO",
    "WEBSITE_PAYMENTS_PRO_3_0",
    "WEBSITE_PAYMENTS_PRO_2_0",
    "VIRTUAL_TERMINAL",
    "HOSTED_SOLE_SOLUTION",
    "BILL_ME_LATER",
    "MOBILE_EXPRESS_CHECKOUT",
    "PAYPAL_HERE",
    "MOBILE_IN_STORE",
    "PAYPAL_STANDARD",
    "MOBILE_PAYPAL_STANDARD",
    "MOBILE_PAYMENT_ACCEPTANCE",
    "PAYPAL_ADVANCED",
    "PAYPAL_PRO",
	"ENHANCED_RECURRING_PAYMENTS"
  ]).optional(),
  integration_type: z.enum(["FIRST_PARTY", "THIRD_PARTY"]).optional(),
  credential_type: z.enum(["SIGNATURE", "CERTIFICATE", "OAUTH_TOKEN"]).optional(),
  permissions: z.array(z.enum([
    "EXPRESS_CHECKOUT",
    "REFUND",
    "DIRECT_PAYMENT",
    "AUTH_CAPTURE",
    "BUTTON_MANAGER",
    "ACCOUNT_BALANCE",
    "TRANSACTION_DETAILS",
    "TRANSACTION_SEARCH",
    "REFERENCE_TRANSACTION",
    "RECURRING_PAYMENTS",
    "BILLING_AGREEMENT",
    "MANAGE_PENDING_TRANSACTION_STATUS",
    "NON_REFERENCED_CREDIT",
    "MASS_PAY",
    "ENCRYPTED_WEBSITE_PAYMENTS",
    "SETTLEMENT_CONSOLIDATION",
    "SETTLEMENT_REPORTING",
    "MOBILE_CHECKOUT",
    "AIR_TRAVEL",
    "INVOICING",
    "RECURRING_PAYMENT_REPORT",
    "EXTENDED_PRO_PROCESSING_REPORT",
    "EXCEPTION_PROCESSING_REPORT",
    "TRANSACTION_DETAIL_REPORT",
    "ACCOUNT_MANAGEMENT_PERMISSION",
    "ACCESS_BASIC_PERSONAL_DATA",
    "ACCESS_ADVANCED_PERSONAL_DATA"
  ])).optional(),
});

const ProductPreferencesSchema = z.object({
  product: z.enum([
    "EXPRESS_CHECKOUT",
    "WEBSITE_PAYMENTS_STANDARD",
    "MASS_PAYMENT",
    "EMAIL_PAYMENTS",
    "EBAY_CHECKOUT",
    "PAYFLOW_LINK",
    "PAYFLOW_PRO",
    "WEBSITE_PAYMENTS_PRO_3_0",
    "WEBSITE_PAYMENTS_PRO_2_0",
    "VIRTUAL_TERMINAL",
    "HOSTED_SOLE_SOLUTION",
    "BILL_ME_LATER",
    "MOBILE_EXPRESS_CHECKOUT",
    "PAYPAL_HERE",
    "MOBILE_IN_STORE",
    "PAYPAL_STANDARD",
    "MOBILE_PAYPAL_STANDARD",
    "MOBILE_PAYMENT_ACCEPTANCE",
    "PAYPAL_ADVANCED",
    "PAYPAL_PRO",
	"ENHANCED_RECURRING_PAYMENTS"
  ]).optional(),
  url: z.string().url().max(2048).optional(),
});

const MessageSchema = z.object({
  message: z.string().max(255).optional(),
  language_code: z.string().optional(),
});

const RegionPreferencesSchema = z.object({
  country_code: z.string().optional(),
  product_preferences: z.array(ProductPreferencesSchema).optional(),
  return_message: z.array(MessageSchema).optional(),
});

const PartnerSchema = z.object({
  partner_id: z.string().optional(),
  launch_type: z.enum(["FULL_BROWSER", "LIGHT_BOX", "EMBEDDED", "MINI_BROWSER"]).default("FULL_BROWSER").optional(),
  receives_credential: z.boolean().default(false).optional(),
  product_selection: z.enum(["Y", "N", "P"]).optional(),
  logo_url: z.string().url().optional(),
  notification_url: z.string().url().optional(),
  integration_preferences: z.array(ProductIntegrationSchema).optional(),
  region_preferences: z.array(RegionPreferencesSchema).optional(),
  agreement_types: z.array(z.enum(["VENDOR_SECURITY_POLICY_AGREEMENT"])).optional(),
  display_name: z.string().readonly().optional(),
});

const IndividualBeneficialOwnerSchema = z.intersection(
    z.lazy(() => PersonSchema),
    z.object({
        percentage_of_ownership: z.string().min(1).max(20).optional()
    })
)

const BusinessBeneficialOwnerSchema =  z.intersection(
    z.lazy(() => BusinessSchema),
    z.object({
        percentage_of_ownership: z.string().min(1).max(20).optional()
    })
)

const PersonSchema = z.object({
    name: NameSchema.optional(),
    phone_contacts: z.array(PhoneDetailsSchema).min(1).max(10).optional(),
    home_address: AddressSchema.optional(),
    nationality_country_code: CountryCodeSchema.optional()
})

const BusinessSchema = z.object({
    names: z.array(BusinessNameSchema).min(1).max(20).optional(),
    phone_contacts: z.array(PhoneDetailsSchema).min(1).max(20).optional(),
    business_address: AddressSchema.optional(),
    business_type: z.string().optional(),
    business_subtype: BusinessSubTypeSchema.optional(),
    category: z.string().optional(),
    sub_category: z.string().optional(),
    merchant_category_code: z.string().optional(),
    purpose_code: z.array(z.string()).optional(),
    website_urls: z.array(z.string()).optional(),
    annual_sales_volume_range: CurrencyRangeSchema.optional(),
    average_monthly_volume_range: CurrencyRangeSchema.optional()
})

const BeneficialOwnersSchema = z.object({
    individual_beneficial_owners: z.array(IndividualBeneficialOwnerSchema).min(0).max(20).optional(),
    business_beneficial_owners: z.array(BusinessBeneficialOwnerSchema).min(0).max(20).optional()
})

const OfficeBearerSchema = z.intersection(
    z.lazy(() => PersonSchema),
    z.object({
        role: z.enum(["CEO", "CHAIRMAN", "DIRECTOR", "SECRETARY", "TREASURER", "TRUSTEE"]).optional()
    })
)

const ErrorDetails2Schema = z.object({
  field: z.string().optional(),
  value: z.string().optional(),
  location: ErrorLocationSchema.optional(),
  issue: z.string(),
  description: z.string().optional(),
});

// --- Parameters Schemas ---

const PartnerReferralIdParameterSchema = z.string();
const PartnerIdParameterSchema = z.string();
const TrackingIdParameterSchema = z.string();
const MerchantIdParameterSchema = z.string();
const FieldsParameterSchema = z.string().optional();
const IdParameterSchema = z.string().min(1).max(20).regex(/^.*$/);
const CountryCodeParameterSchema = z.string().length(2).regex(/^([a-zA-Z]{2})$/).optional();
const ProductParameterSchema = z.string().min(1).max(20).regex(/^.*$/).optional();
const ContentTypeParameterSchema = z.string().min(1).max(4000).regex(/^.*$/).optional();
const XPaypalSecurityContextParameterSchema = z.string().min(1).max(4000).regex(/^.*$/).optional();

// --- Exports ---
export {
  ErrorDetailsSchema,
  ErrorLocationSchema,
  ErrorLinkDescriptionSchema,
  CountryCodeSchema,
  NameSchema,
  PhoneSchema,
  PhoneTypeSchema,
  PhoneDetailsSchema,
  AddressSchema,
  IdentityDocumentTypeSchema,
  IdentityDocumentSchema,
  AccountOwnerRelationshipSchema,
  CurrencySchema,
  CurrencyRangeSchema,
  EmailAddressSchema,
  EmailContactSchema,
  PurposeCodeEnumSchema,
  BusinessNameSchema,
  EventsTypeSchema,
  DateOfEventSchema,
  BusinessTypeEnumSchema,
  BusinessSubTypeSchema,
  IdentifierSchema,
  BankDetailsSchema,
  AccountIdentifierSchema,
  PartnerSpecificIdentifiersSchema,
  RestEndpointFeaturesEnumSchema,
  BillingExperiencePreferenceSchema,
  LegalConsentSchema,
  ProductNameSchema,
  PersonDetailsSchema,
  BusinessDetailsSchema,
  FinancialInstrumentDataSchema,
  UserSchema,
  IntegrationDetailsSchema,
  BillingAgreementSchema,
  CapabilitiesSchema,
  WebExperiencePreferenceSchema,
  ReferralDataSchema,
  ErrorSchema,
  LinkDescriptionSchema,
  CreateReferralDataResponseSchema,
  ReferralDataResponseSchema,
  AccountCapabilityNamesSchema,
  ProductSchema,
  SignatureSchema,
  CertificateSchema,
  CredentialSchema,
  OauthThirdPartySchema,
  OauthIntegrationSchema,
  LimitationSchema,
  AccountCapabilityStatusSchema,
  CapabilityLimitTypesSchema,
  CapabilityLimitSchema,
  AccountCapabilitySchema,
  MerchantIntegrationSchema,
  MerchantIntegrationCredentialsSchema,
  ErrorDetails3Schema,
  Error2Schema,
  ProductIntegrationSchema,
  ProductPreferencesSchema,
  MessageSchema,
  RegionPreferencesSchema,
  PartnerSchema,
  PartnerReferralIdParameterSchema,
  PartnerIdParameterSchema,
  TrackingIdParameterSchema,
  MerchantIdParameterSchema,
  FieldsParameterSchema,
  IdParameterSchema,
  CountryCodeParameterSchema,
  ProductParameterSchema,
  ContentTypeParameterSchema,
  XPaypalSecurityContextParameterSchema,
  BusinessBeneficialOwnerSchema,
  BeneficialOwnersSchema,
  IndividualBeneficialOwnerSchema,
  PersonSchema,
  BusinessSchema,
  OfficeBearerSchema,
  ErrorDetails2Schema
};