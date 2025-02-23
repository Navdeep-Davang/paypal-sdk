// customer_partner_referrals_v1 ts types 

// Total 81 ts types

import { z } from 'zod';
import {
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
  BusinessBeneficialOwnerSchema,
  BeneficialOwnersSchema,
  IndividualBeneficialOwnerSchema,
  PersonSchema,
  BusinessSchema,
  OfficeBearerSchema,
  ErrorDetails2Schema,
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
} from '../schema/customer_partner_referrals_v1';

export type ErrorDetails = z.infer<typeof ErrorDetailsSchema>;
export type ErrorLocation = z.infer<typeof ErrorLocationSchema>;
export type ErrorLinkDescription = z.infer<typeof ErrorLinkDescriptionSchema>;
export type CountryCode = z.infer<typeof CountryCodeSchema>;
export type Name = z.infer<typeof NameSchema>;
export type Phone = z.infer<typeof PhoneSchema>;
export type PhoneType = z.infer<typeof PhoneTypeSchema>;
export type PhoneDetails = z.infer<typeof PhoneDetailsSchema>;
export type Address = z.infer<typeof AddressSchema>;
export type IdentityDocumentType = z.infer<typeof IdentityDocumentTypeSchema>;
export type IdentityDocument = z.infer<typeof IdentityDocumentSchema>;
export type AccountOwnerRelationship = z.infer<typeof AccountOwnerRelationshipSchema>;
export type Currency = z.infer<typeof CurrencySchema>;
export type CurrencyRange = z.infer<typeof CurrencyRangeSchema>;
export type EmailAddress = z.infer<typeof EmailAddressSchema>;
export type EmailContact = z.infer<typeof EmailContactSchema>;
export type PurposeCodeEnum = z.infer<typeof PurposeCodeEnumSchema>;
export type BusinessName = z.infer<typeof BusinessNameSchema>;
export type EventsType = z.infer<typeof EventsTypeSchema>;
export type DateOfEvent = z.infer<typeof DateOfEventSchema>;
export type BusinessTypeEnum = z.infer<typeof BusinessTypeEnumSchema>;
export type BusinessSubType = z.infer<typeof BusinessSubTypeSchema>;
export type Identifier = z.infer<typeof IdentifierSchema>;
export type BankDetails = z.infer<typeof BankDetailsSchema>;
export type AccountIdentifier = z.infer<typeof AccountIdentifierSchema>;
export type PartnerSpecificIdentifiers = z.infer<typeof PartnerSpecificIdentifiersSchema>;
export type RestEndpointFeaturesEnum = z.infer<typeof RestEndpointFeaturesEnumSchema>;
export type BillingExperiencePreference = z.infer<typeof BillingExperiencePreferenceSchema>;
export type LegalConsent = z.infer<typeof LegalConsentSchema>;
export type ProductName = z.infer<typeof ProductNameSchema>;
export type PersonDetails = z.infer<typeof PersonDetailsSchema>;
export type BusinessDetails = z.infer<typeof BusinessDetailsSchema>;
export type FinancialInstrumentData = z.infer<typeof FinancialInstrumentDataSchema>;
export type User = z.infer<typeof UserSchema>;
export type IntegrationDetails = z.infer<typeof IntegrationDetailsSchema>;
export type BillingAgreement = z.infer<typeof BillingAgreementSchema>;
export type Capabilities = z.infer<typeof CapabilitiesSchema>;
export type WebExperiencePreference = z.infer<typeof WebExperiencePreferenceSchema>;
export type ReferralData = z.infer<typeof ReferralDataSchema>;
export type Error = z.infer<typeof ErrorSchema>;
export type LinkDescription = z.infer<typeof LinkDescriptionSchema>;
export type CreateReferralDataResponse = z.infer<typeof CreateReferralDataResponseSchema>;
export type ReferralDataResponse = z.infer<typeof ReferralDataResponseSchema>;
export type AccountCapabilityNames = z.infer<typeof AccountCapabilityNamesSchema>;
export type Product = z.infer<typeof ProductSchema>;
export type Signature = z.infer<typeof SignatureSchema>;
export type Certificate = z.infer<typeof CertificateSchema>;
export type Credential = z.infer<typeof CredentialSchema>;
export type OauthThirdParty = z.infer<typeof OauthThirdPartySchema>;
export type OauthIntegration = z.infer<typeof OauthIntegrationSchema>;
export type Limitation = z.infer<typeof LimitationSchema>;
export type AccountCapabilityStatus = z.infer<typeof AccountCapabilityStatusSchema>;
export type CapabilityLimitTypes = z.infer<typeof CapabilityLimitTypesSchema>;
export type CapabilityLimit = z.infer<typeof CapabilityLimitSchema>;
export type AccountCapability = z.infer<typeof AccountCapabilitySchema>;
export type MerchantIntegration = z.infer<typeof MerchantIntegrationSchema>;
export type MerchantIntegrationCredentials = z.infer<typeof MerchantIntegrationCredentialsSchema>;
export type ErrorDetails3 = z.infer<typeof ErrorDetails3Schema>;
export type Error2 = z.infer<typeof Error2Schema>;
export type ProductIntegration = z.infer<typeof ProductIntegrationSchema>;
export type ProductPreferences = z.infer<typeof ProductPreferencesSchema>;
export type Message = z.infer<typeof MessageSchema>;
export type RegionPreferences = z.infer<typeof RegionPreferencesSchema>;
export type Partner = z.infer<typeof PartnerSchema>;
export type BusinessBeneficialOwner = z.infer<typeof BusinessBeneficialOwnerSchema>
export type BeneficialOwners = z.infer<typeof BeneficialOwnersSchema>
export type IndividualBeneficialOwner = z.infer<typeof IndividualBeneficialOwnerSchema>
export type Person = z.infer<typeof PersonSchema>
export type Business = z.infer<typeof BusinessSchema>
export type OfficeBearer = z.infer<typeof OfficeBearerSchema>
export type ErrorDetails2 = z.infer<typeof ErrorDetails2Schema>

//Parameter Types
export type PartnerReferralIdParameter = z.infer<typeof PartnerReferralIdParameterSchema>;
export type PartnerIdParameter = z.infer<typeof PartnerIdParameterSchema>;
export type TrackingIdParameter = z.infer<typeof TrackingIdParameterSchema>;
export type MerchantIdParameter = z.infer<typeof MerchantIdParameterSchema>;
export type FieldsParameter = z.infer<typeof FieldsParameterSchema>;
export type IdParameter = z.infer<typeof IdParameterSchema>;
export type CountryCodeParameter = z.infer<typeof CountryCodeParameterSchema>;
export type ProductParameter = z.infer<typeof ProductParameterSchema>;
export type ContentTypeParameter = z.infer<typeof ContentTypeParameterSchema>;
export type XPaypalSecurityContextParameter = z.infer<typeof XPaypalSecurityContextParameterSchema>;