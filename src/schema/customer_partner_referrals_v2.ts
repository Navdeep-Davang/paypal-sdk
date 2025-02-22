// customer_partner_referrals_v2 zod

// Its json has 94 types (given by ai)
// Total Exported ZodSchemas 95

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
  }).optional(),
});

const PhoneSchema = z.object({
  country_code: z.string().min(1).max(3).regex(/^[0-9]{1,3}?$/),
  national_number: z.string().min(1).max(14).regex(/^[0-9]{1,14}?$/),
  extension_number: z.string().min(1).max(15).regex(/^[0-9]{1,15}?$/).optional(),
});

const DateTimeSchema = z.string().min(20).max(64).regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$/);

const MoneySchema = z.object({
  currency_code: z.string().min(3).max(3),
  value: z.string().max(32).regex(/^((-?[0-9]+)|(-?([0-9]+)?[.][0-9]+))$/),
});

const LinkDescriptionSchema = z.object({
  href: z.string(),
  rel: z.string(),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'CONNECT', 'OPTIONS', 'PATCH']).optional(),
});

const PurposeCodeEnumSchema = z.enum([
  "P0104", "P0301", "P0801", "P0802", "P0803", "P0805", "P0806", "P0902", "P1004", "P1005", "P1006", "P1007", "P1008", "P1009"
]);

const PercentageSchema = z.string().regex(/^((-?[0-9]+)|(-?([0-9]+)?[.][0-9]+))$/);

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
  details: z.array(z.any()).optional(), 
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
  links: z.array(ErrorLinkDescriptionSchema).optional(), // Assuming ErrorLinkDescriptionSchema exists
});


const ErrorDefaultSchema = z.any()

const NameSchema = z.object({
  prefix: z.string().max(140).optional(),
  given_name: z.string().max(140).optional(),
  surname: z.string().max(140).optional(),
  middle_name: z.string().max(140).optional(),
  suffix: z.string().max(140).optional(),
  full_name: z.string().max(300).optional()
});

const PersonNameTypeSchema = z.enum(["LEGAL"]);

const PersonNameSchema = z.object({
  type: PersonNameTypeSchema,
}).and(NameSchema).and(z.object({
    type: PersonNameTypeSchema
}))

const PersonAddressTypeSchema = z.enum(["HOME"]);

const PersonAddressDetailSchema = z.object({
  type: PersonAddressTypeSchema,
  primary: z.boolean().optional(),
  inactive: z.boolean().readonly().optional()
}).and(AddressPortableSchema).and(z.object({
    type: PersonAddressTypeSchema
}))

const PhoneTypeSchema = z.enum(["FAX", "HOME", "MOBILE", "OTHER", "PAGER"]);

const PhoneNumberTagSchema = z.enum(["MOBILE", "LANDLINE"]);

const PersonPhoneDetailSchema = z.object({
  contact_name: z.string().min(1).max(900).optional(),
  inactive: z.boolean().readonly().optional(),
  primary: z.boolean().optional(),
  primary_mobile: z.boolean().optional(),
  type: PhoneTypeSchema,
  tags: z.array(PhoneNumberTagSchema).min(0).max(20).optional()
}).and(PhoneSchema).and(z.object({
    type: PhoneTypeSchema
}))

const DateNoTimeSchema = z.string().min(10).max(10).regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/);

const BirthDetailsSchema = z.object({
  date_of_birth: DateNoTimeSchema,
});

const FileReferenceSchema = z.object({
  id: z.string().min(1).max(255).optional(),
  reference_url: z.string().url().min(1).max(2000).optional(),
  content_type: z.string().optional(),
  create_time: DateTimeSchema.optional(),
  size: z.string().regex(/^[0-9]+$/).optional(),
});

const DocumentSchema = z.object({
  id: z.string().min(1).max(20).regex(/^[0-9A-Z]+$/).readonly().optional(),
  labels: z.array(z.string()).min(1).max(50).optional(),
  name: z.string().min(1).max(100).regex(/^[0-9A-Za-z_-]+$/).optional(),
  identification_number: z.string().min(1).max(100).regex(/^[a-zA-Z0-9-]+$/).optional(),
  issue_date: DateNoTimeSchema.optional(),
  expiry_date: DateNoTimeSchema.optional(),
  issuing_country_code: CountryCodeSchema.optional(),
  files: z.array(FileReferenceSchema).min(1).max(50).optional(),
  links: z.array(LinkDescriptionSchema).min(1).max(10).readonly().optional(),
});

const PersonDocumentTypeSchema = z.enum([
  "SOCIAL_SECURITY_NUMBER", "EMPLOYMENT_IDENTIFICATION_NUMBER", "TAX_IDENTIFICATION_NUMBER",
  "PASSPORT_NUMBER", "PENSION_FUND_ID", "MEDICAL_INSURANCE_ID", "CNPJ", "CPF", "PAN"
]);

const PersonDocumentSchema = z.object({
  type: PersonDocumentTypeSchema,
}).and(DocumentSchema).and(z.object({
    type: PersonDocumentTypeSchema
}))

const PersonSchema = z.object({
  id: z.string().min(1).max(20).regex(/^[0-9A-Z]+$/).readonly().optional(),
  names: z.array(PersonNameSchema).min(0).max(5).optional(),
  citizenship: CountryCodeSchema.optional(),
  addresses: z.array(PersonAddressDetailSchema).min(0).max(5).optional(),
  phones: z.array(PersonPhoneDetailSchema).min(0).max(5).optional(),
  birth_details: BirthDetailsSchema.optional(),
  documents: z.array(PersonDocumentSchema).min(0).max(20).optional()
});

const IndividualOwnerTypeSchema = z.enum(["PRIMARY"]);

const IndividualOwnerSchema = z.object({
  type: IndividualOwnerTypeSchema,
}).and(PersonSchema).and(z.object({
    type: IndividualOwnerTypeSchema
}))

const BusinessTypeSchema = z.enum([
  "ANY_OTHER_BUSINESS_ENTITY", "ASSOCIATION", "CORPORATION", "GENERAL_PARTNERSHIP", "GOVERNMENT", "INDIVIDUAL",
  "LIMITED_LIABILITY_PARTNERSHIP", "LIMITED_LIABILITY_PROPRIETORS", "LIMITED_LIABILITY_PRIVATE_CORPORATION",
  "LIMITED_PARTNERSHIP", "LIMITED_PARTNERSHIP_PRIVATE_CORPORATION", "NONPROFIT", "ONLY_BUY_OR_SEND_MONEY",
  "OTHER_CORPORATE_BODY", "PARTNERSHIP", "PRIVATE_PARTNERSHIP", "PROPRIETORSHIP", "PROPRIETORSHIP_CRAFTSMAN",
  "PROPRIETORY_COMPANY", "PRIVATE_CORPORATION", "PUBLIC_COMPANY", "PUBLIC_CORPORATION", "PUBLIC_PARTNERSHIP",
  "REGISTERED_COOPERATIVE"
]);

const BusinessSubTypeSchema = z.enum([
  "ASSO_TYPE_INCORPORATED", "ASSO_TYPE_NON_INCORPORATED", "GOVT_TYPE_ENTITY", "GOVT_TYPE_EMANATION",
  "GOVT_TYPE_ESTD_COMM", "GOVT_TYPE_ESTD_FC", "GOVT_TYPE_ESTD_ST_TR"
]);

const BusinessTypeInfoSchema = z.object({
  type: BusinessTypeSchema,
  subtype: BusinessSubTypeSchema.optional()
});

const BusinessIndustrySchema = z.object({
  category: z.string().regex(/^\d+$/).min(1).max(20),
  mcc_code: z.string().regex(/^\d+$/).min(1).max(20),
  subcategory: z.string().regex(/^\d+$/).min(1).max(20)
});

const BusinessIncorporationSchema = z.object({
  incorporation_country_code: CountryCodeSchema,
  incorporation_date: DateNoTimeSchema.optional(),
  incorporation_province_code: z.string().min(1).max(50).regex(/^[A-Z]{2}-([A-Z]{2,3}|[0-9]{2,3})$/).optional()
});

const BusinessNameSchema = z.object({
  business_name: z.string().max(300)
});

const BusinessNameTypeSchema = z.enum(["DOING_BUSINESS_AS", "LEGAL_NAME"]);

const BusinessNameDetailSchema = z.object({
  id: z.string().min(1).max(20).readonly().optional(),
  type: BusinessNameTypeSchema
}).and(BusinessNameSchema).and(z.object({
    type: BusinessNameTypeSchema
}))

const EmailAddressSchema = z.string().email().min(3).max(254);

const EmailSchema = z.object({
  type: z.enum(["CUSTOMER_SERVICE"]),
  email: EmailAddressSchema
});

const BusinessAddressTypeSchema = z.enum(["WORK"]);

const BusinessAddressDetailSchema = z.object({
  type: BusinessAddressTypeSchema,
  primary: z.boolean().optional(),
  inactive: z.boolean().readonly().optional()
}).and(AddressPortableSchema).and(z.object({
    type: BusinessAddressTypeSchema
}))

const BusinessPhoneTypeSchema = z.enum(["CUSTOMER_SERVICE", "BUSINESS"]);

const BusinessPhoneDetailSchema = z.object({
  contact_name: z.string().min(1).max(900).optional(),
  inactive: z.boolean().readonly().optional(),
  primary: z.boolean().optional(),
  type: BusinessPhoneTypeSchema,
  tags: z.array(PhoneNumberTagSchema).min(0).max(20).optional()
}).and(PhoneSchema).and(z.object({
    type: BusinessPhoneTypeSchema
}))

const BusinessDocumentTypeSchema = z.enum([
  "SOCIAL_SECURITY_NUMBER", "EMPLOYMENT_IDENTIFICATION_NUMBER", "TAX_IDENTIFICATION_NUMBER",
  "PASSPORT_NUMBER", "PENSION_FUND_ID", "MEDICAL_INSURANCE_ID", "CNPJ", "CPF", "PAN"
]);

const BusinessDocumentSchema = z.object({
  type: BusinessDocumentTypeSchema,
}).and(DocumentSchema).and(z.object({
    type: BusinessDocumentTypeSchema
}))

const PercentageOfOwnershipSchema = z.string().regex(/^((-?[0-9]+)|(-?([0-9]+)?[.][0-9]+))$/);

const IndividualBeneficialOwnerSchema = z.object({
  percentage_of_ownership: PercentageOfOwnershipSchema
}).and(PersonSchema).and(z.object({
    percentage_of_ownership: PercentageOfOwnershipSchema
}))

const BusinessBeneficialOwnerSchema = z.object({
  percentage_of_ownership: PercentageOfOwnershipSchema
}).and(z.object({
    percentage_of_ownership: PercentageOfOwnershipSchema
}))

const BeneficialOwnersSchema = z.object({
  individual_beneficial_owners: z.array(IndividualBeneficialOwnerSchema).min(0).max(5).optional(),
  business_beneficial_owners: z.array(BusinessBeneficialOwnerSchema).min(0).max(5).optional()
});

const OfficeBearerRoleSchema = z.enum(["CEO", "CHAIRMAN", "DIRECTOR", "SECRETARY", "TREASURER", "TRUSTEE"]);

const OfficeBearerSchema = z.object({
  role: OfficeBearerRoleSchema,
}).and(PersonSchema).and(z.object({
    role: OfficeBearerRoleSchema
}))

const CurrencyRangeSchema = z.object({
  minimum_amount: MoneySchema.optional(),
  maximum_amount: MoneySchema.optional()
});

const BusinessEntitySchema = z.object({
  business_type: BusinessTypeInfoSchema.optional(),
  business_industry: BusinessIndustrySchema.optional(),
  business_incorporation: BusinessIncorporationSchema.optional(),
  names: z.array(BusinessNameDetailSchema).min(0).max(5).optional(),
  emails: z.array(EmailSchema).min(0).max(5).optional(),
  website: z.string().url().min(1).max(50).optional(),
  addresses: z.array(BusinessAddressDetailSchema).min(0).max(5).optional(),
  phones: z.array(BusinessPhoneDetailSchema).min(0).max(5).optional(),
  documents: z.array(BusinessDocumentSchema).min(0).max(20).optional(),
  beneficial_owners: BeneficialOwnersSchema.optional(),
  office_bearers: z.array(OfficeBearerSchema).min(0).max(5).optional(),
  annual_sales_volume_range: CurrencyRangeSchema.optional(),
  average_monthly_volume_range: CurrencyRangeSchema.optional(),
  purpose_code: z.array(PurposeCodeEnumSchema).optional(),
  business_description: z.string().min(1).max(256).optional()
});

const AccountSchema = z.object({
  individual_owners: z.array(IndividualOwnerSchema).min(0).max(2).optional(),
  business_entity: BusinessEntitySchema.optional(),
});

const LanguageSchema = z.string().min(2).max(10).regex(/^[a-z]{2}(?:-[A-Z][a-z]{3})?(?:-(?:[A-Z]{2}))?$/);

const PartnerConfigOverrideSchema = z.object({
  partner_logo_url: z.string().url().min(1).max(127).optional(),
  return_url: z.string().url().min(1).max(127).optional(),
  return_url_description: z.string().min(1).max(127).regex(/^.+$/).optional(),
  action_renewal_url: z.string().url().min(1).max(127).optional(),
  show_add_credit_card: z.boolean().optional()
});

const IdentifierTypeSchema = z.enum([
  "BANK_CODE", "BI_CODE", "ROUTING_NUMBER_1", "ROUTING_NUMBER_2", "ROUTING_NUMBER_3",
  "SWIFT_CODE", "BRANCH_CODE", "INTERMEDIARY_SWIFT_CODE", "BBAN", "BBAN_ENCRYPTED", "BBAN_HMAC",
  "AGGREGATOR_YODLEE"
]);

const IdentifierSchema = z.object({
  type: IdentifierTypeSchema,
  value: z.string().min(1).max(125).regex(/^[A-Za-z0-9-_.+/ =]+$/)
});

const MandateSchema = z.object({
  accepted: z.boolean()
});

const BankAccountTypeSchema = z.enum(["CHECKING", "SAVINGS"]);

const BankSchema = z.object({
  nick_name: z.string().min(1).max(50).regex(/^[0-9A-Za-z_-]+$/).optional(),
  account_number: z.string().regex(/\d+/).min(1).max(50),
  account_type: BankAccountTypeSchema,
  currency_code: z.string().min(3).max(3).optional(),
  identifiers: z.array(IdentifierSchema).min(0).max(20).optional(),
  branch_location: AddressPortableSchema.optional(),
  mandate: MandateSchema.optional()
});

const FinancialInstrumentsSchema = z.object({
  banks: z.array(BankSchema).min(0).max(5).optional()
});

const ClassicApiIntegrationSchema = z.object({})

const RestEndpointFeaturesEnumSchema = z.enum([
  "PAYOUTS", "PAYMENT", "REFUND", "FUTURE_PAYMENT", "DIRECT_PAYMENT", "PARTNER_FEE",
  "DELAY_FUNDS_DISBURSEMENT", "READ_SELLER_DISPUTE", "UPDATE_SELLER_DISPUTE", "ADVANCED_TRANSACTIONS_SEARCH",
  "SWEEP_FUNDS_EXTERNAL_SINK", "ACCESS_MERCHANT_INFORMATION", "TRACKING_SHIPMENT_READWRITE",
  "INVOICE_READ_WRITE", "DISPUTE_READ_BUYER", "UPDATE_CUSTOMER_DISPUTES", "VAULT", "BILLING_AGREEMENT"
]);

const RestApiIntegrationSchema = z.object({
  integration_method: z.enum(["BRAINTREE", "PAYPAL"]).default("PAYPAL").optional(),
  integration_type: z.enum(["FIRST_PARTY", "THIRD_PARTY"]).optional(),
  first_party_details: z.object({
    features: z.array(RestEndpointFeaturesEnumSchema),
    seller_nonce: z.string().min(44).max(128).regex(/^[a-zA-Z0-9-_:]+$/)
  }).optional(),
  third_party_details: z.object({
    features: z.array(RestEndpointFeaturesEnumSchema).min(0).max(20)
  }).optional()
});

const IntegrationDetailsSchema = z.object({
  classic_api_integration: ClassicApiIntegrationSchema.optional(),
  rest_api_integration: RestApiIntegrationSchema.optional()
});

const BillingExperiencePreferenceSchema = z.object({
  experience_id: z.string().min(1).max(20).regex(/^[a-zA-Z0-9-]+$/).optional(),
  billing_context_set: z.boolean().optional()
});

const BillingAgreementSchema = z.object({
  description: z.string().min(1).max(125).regex(/^.+$/).optional(),
  billing_experience_preference: BillingExperiencePreferenceSchema.optional(),
  merchant_custom_data: z.string().min(1).max(125).regex(/^[a-zA-Z0-9-]+$/).optional(),
  approval_url: z.string().url().min(1).max(125).optional(),
  ec_token: z.string().min(1).max(50).regex(/^[0-9A-Z_-]+$/).optional()
});

const OperationSchema = z.object({
  operation: z.enum(["API_INTEGRATION", "BANK_ADDITION", "BILLING_AGREEMENT", "CONTEXTUAL_MARKETING_CONSENT", "SALESFORCE_REFERRAL"]),
  api_integration_preference: IntegrationDetailsSchema.optional(),
  billing_agreement: BillingAgreementSchema.optional()
});

const ProductSchema = z.enum([
  "EXPRESS_CHECKOUT", "PAYPAL_COMMERCE_PLATFORM_BUSINESS", "PPPLUS", "WEBSITE_PAYMENT_PRO",
  "PAYMENT_METHODS", "PPCP", "ADVANCED_VAULTING", "IZETTLE"
]);

const CapabilitiesSchema = z.enum([
  "PAYPAL_WALLET_VAULTING_ADVANCED", "PAY_UPON_INVOICE", "APPLE_PAY"
]);

const DependentProcessSchema = z.any()

const LegalConsentSchema = z.object({
  type: z.enum(["SHARE_DATA_CONSENT"]),
  granted: z.boolean()
});

const TransferMethodTypeSchema = z.enum(["BANK_ACCOUNT", "PAYPAL", "VENMO", "WIRE_ACCOUNT"]);

const TransferMethodSchema = z.object({
  transfer_method_type: TransferMethodTypeSchema,
  currencies: z.array(CountryCodeSchema).min(1).max(50)
});

const CountryTransferMethodCurrencySelectionSchema = z.object({
  country: CountryCodeSchema,
  transfer_methods: z.array(TransferMethodSchema).min(1).max(50)
});

const PayoutAttributesSchema = z.object({
  marketplace: z.boolean().optional(),
  kyc_required: z.boolean().optional(),
  country_transfer_method_currency_selection: z.array(CountryTransferMethodCurrencySelectionSchema).min(1).max(50).optional()
});

const ReferralDataSchema = z.object({
  email: EmailAddressSchema,
  preferred_language_code: LanguageSchema.optional(),
  tracking_id: z.string().min(1).max(127).optional(),
  partner_config_override: PartnerConfigOverrideSchema.optional(),
  financial_instruments: FinancialInstrumentsSchema.optional(),
  operations: z.array(OperationSchema).min(1).max(5),
  products: z.array(ProductSchema).min(1).max(5).optional(),
  capabilities: z.array(CapabilitiesSchema).min(1).max(5).optional(),
  outside_process_dependencies: z.array(z.any()).min(1).max(5).optional(),
  legal_consents: z.array(LegalConsentSchema).min(1).max(5),
  payout_attributes: PayoutAttributesSchema.optional()
}).and(AccountSchema).and(z.object({
    operations: z.array(OperationSchema).min(1).max(5),
    legal_consents: z.array(LegalConsentSchema).min(1).max(5),
}))

const CreateReferralDataResponseSchema = z.object({
  links: z.array(LinkDescriptionSchema).min(2).max(10).readonly().optional()
});

const ReferralDataResponseSchema = z.object({
  partner_referral_id: z.string().regex(/^[0-9A-Za-z_.-]+$/).min(1).max(255).readonly().optional(),
  submitter_payer_id: z.string().min(1).max(20).regex(/^[0-9A-Z]+$/).readonly().optional(),
  referral_data: ReferralDataSchema.optional(),
  links: z.array(LinkDescriptionSchema).min(0).max(2).readonly().optional()
});

// --- Parameters Schemas ---

const PartnerReferralIdParameterSchema = z.string();


// --- Reamaining Schemas ---

const CurrencyCodeSchema = z.string().length(3);

const CountryCode2Schema = z.string().regex(/^([A-Z]{2}|C2)$/).length(2);

const BusinessSchema = z.object({
  business_type: BusinessTypeInfoSchema.optional(), 
  business_industry: BusinessIndustrySchema.optional(), 
  business_incorporation: BusinessIncorporationSchema.optional(), 
  names: z.array(BusinessNameDetailSchema).optional(), 
  emails: z.array(EmailSchema).optional(),
  website: z.string().url().optional(),
  addresses: z.array(BusinessAddressDetailSchema).optional(), 
  phones: z.array(BusinessPhoneDetailSchema).optional(), 
  documents: z.array(BusinessDocumentSchema).optional(),
});

// --- General Error Schemas ---

const ErrorTypes = {
  INVALID_STRING_LENGTH: z.object({
    issue: z.literal("INVALID_STRING_LENGTH"),
    description: z.literal("the value of a field is either too short or too long"),
  }),
  INVALID_PARAMETER_SYNTAX: z.object({
    issue: z.literal("INVALID_PARAMETER_SYNTAX"),
    description: z.literal("the value of a field does not conform to the expected format"),
  }),
  INVALID_PARAMETER_VALUE: z.object({
    issue: z.literal("INVALID_PARAMETER_VALUE"),
    description: z.literal("the value of a field is invalid"),
  }),
  INVALID_ARRAY_LENGTH: z.object({
    issue: z.literal("INVALID_ARRAY_LENGTH"),
    description: z.literal("the number of items in an array parameter is too small or too large"),
  }),
  AUTHORIZATION_ERROR: z.object({
    issue: z.literal("AUTHORIZATION_ERROR"),
    description: z.literal("This API call is not authorized"),
  }),
  PERMISSION_DENIED: z.object({
    issue: z.literal("PERMISSION_DENIED"),
    description: z.literal("You do not have permission to access or perform operations on this resource."),
  }),
  USER_NOT_FOUND: z.object({
    issue: z.literal("USER_NOT_FOUND"),
    description: z.literal("Account for this Partner ID does not exist."),
  }),
  ACCOUNT_STATUS_ERROR: z.object({
    issue: z.literal("ACCOUNT_STATUS_ERROR"),
    description: z.string(), 
  }),
  PRODUCT_PPCP_UNAUTHORIZED: z.object({
    issue: z.literal("PRODUCT_PPCP_UNAUTHORIZED"),
    description: z.literal("Account has not been configured to use PayPal Complete Payments"),
  }),
};

// Schemas for each error code that uses the error types
const Error400DetailsSchema = z.discriminatedUnion("issue", [
  ErrorTypes.INVALID_STRING_LENGTH,
  ErrorTypes.INVALID_PARAMETER_SYNTAX,
  ErrorTypes.INVALID_PARAMETER_VALUE,
  ErrorTypes.INVALID_ARRAY_LENGTH,
]);

const Error401DetailsSchema = z.discriminatedUnion("issue", [
  ErrorTypes.AUTHORIZATION_ERROR,
]);

const Error403DetailsSchema = z.discriminatedUnion("issue", [
  ErrorTypes.PERMISSION_DENIED,
]);

const Error422DetailsSchema = z.discriminatedUnion("issue", [
  ErrorTypes.USER_NOT_FOUND,
  ErrorTypes.ACCOUNT_STATUS_ERROR,
  ErrorTypes.PRODUCT_PPCP_UNAUTHORIZED,
]);

// Main Error Schemas - Using the structure from your Error400Schema example
const _400Schema = z.object({
  details: z.array(Error400DetailsSchema).optional(),
});

const _401Schema = z.object({
  details: z.array(Error401DetailsSchema).optional(),
});

const _403Schema = z.object({
  details: z.array(Error403DetailsSchema).optional(),
});

const _422Schema = z.object({
  details: z.array(Error422DetailsSchema).optional(),
});



// --- Exports ---
export {
  ErrorDetailsSchema,
  ErrorLinkDescriptionSchema,
  CountryCodeSchema,
  AddressPortableSchema,
  PhoneSchema,
  DateTimeSchema,
  MoneySchema,
  LinkDescriptionSchema,
  PurposeCodeEnumSchema,
  PercentageSchema,
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
  NameSchema,
  PersonNameTypeSchema,
  PersonNameSchema,
  PersonAddressTypeSchema,
  PersonAddressDetailSchema,
  PhoneTypeSchema,
  PhoneNumberTagSchema,
  PersonPhoneDetailSchema,
  DateNoTimeSchema,
  BirthDetailsSchema,
  FileReferenceSchema,
  DocumentSchema,
  PersonDocumentTypeSchema,
  PersonDocumentSchema,
  PersonSchema,
  IndividualOwnerTypeSchema,
  IndividualOwnerSchema,
  BusinessTypeSchema,
  BusinessSubTypeSchema,
  BusinessTypeInfoSchema,
  BusinessIndustrySchema,
  BusinessIncorporationSchema,
  BusinessNameSchema,
  BusinessNameTypeSchema,
  BusinessNameDetailSchema,
  EmailAddressSchema,
  EmailSchema,
  BusinessAddressTypeSchema,
  BusinessAddressDetailSchema,
  BusinessPhoneTypeSchema,
  BusinessPhoneDetailSchema,
  BusinessDocumentTypeSchema,
  BusinessDocumentSchema,
  PercentageOfOwnershipSchema,
  IndividualBeneficialOwnerSchema,
  BusinessBeneficialOwnerSchema,
  BeneficialOwnersSchema,
  OfficeBearerRoleSchema,
  OfficeBearerSchema,
  CurrencyRangeSchema,
  BusinessEntitySchema,
  AccountSchema,
  LanguageSchema,
  PartnerConfigOverrideSchema,
  IdentifierTypeSchema,
  IdentifierSchema,
  MandateSchema,
  BankSchema,
  FinancialInstrumentsSchema,
  ClassicApiIntegrationSchema,
  RestEndpointFeaturesEnumSchema,
  RestApiIntegrationSchema,
  IntegrationDetailsSchema,
  BillingExperiencePreferenceSchema,
  BillingAgreementSchema,
  OperationSchema,
  ProductSchema,
  CapabilitiesSchema,
  DependentProcessSchema,
  LegalConsentSchema,
  TransferMethodTypeSchema,
  TransferMethodSchema,
  CountryTransferMethodCurrencySelectionSchema,
  PayoutAttributesSchema,
  ReferralDataSchema,
  CreateReferralDataResponseSchema,
  ReferralDataResponseSchema,
  PartnerReferralIdParameterSchema,
  CurrencyCodeSchema,
  CountryCode2Schema,
  BusinessSchema,
  _400Schema,
  _401Schema,
  _403Schema,
  _422Schema
};