// customer_partner_referrals_v2 ts types 

// Total 89 ts types

import { z } from 'zod';
import {
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
  _400Schema,
  _401Schema,
  _403Schema,
  _422Schema,
  ErrorDefaultSchema,
  Error404Schema,
  Error409Schema,
  Error415Schema,
  Error500Schema,
  Error503Schema,
  PartnerReferralIdParameterSchema,
  BusinessSchema
} from '../schema/customer_partner_referrals_v2';

export type ErrorDetails = z.infer<typeof ErrorDetailsSchema>;
export type ErrorLinkDescription = z.infer<typeof ErrorLinkDescriptionSchema>;
export type CountryCode = z.infer<typeof CountryCodeSchema>;
export type AddressPortable = z.infer<typeof AddressPortableSchema>;
export type Phone = z.infer<typeof PhoneSchema>;
export type DateTime = z.infer<typeof DateTimeSchema>;
export type Money = z.infer<typeof MoneySchema>;
export type LinkDescription = z.infer<typeof LinkDescriptionSchema>;
export type PurposeCodeEnum = z.infer<typeof PurposeCodeEnumSchema>;
export type Percentage = z.infer<typeof PercentageSchema>;
export type Name = z.infer<typeof NameSchema>;
export type PersonNameType = z.infer<typeof PersonNameTypeSchema>;
export type PersonName = z.infer<typeof PersonNameSchema>;
export type PersonAddressType = z.infer<typeof PersonAddressTypeSchema>;
export type PersonAddressDetail = z.infer<typeof PersonAddressDetailSchema>;
export type PhoneType = z.infer<typeof PhoneTypeSchema>;
export type PhoneNumberTag = z.infer<typeof PhoneNumberTagSchema>;
export type PersonPhoneDetail = z.infer<typeof PersonPhoneDetailSchema>;
export type DateNoTime = z.infer<typeof DateNoTimeSchema>;
export type BirthDetails = z.infer<typeof BirthDetailsSchema>;
export type FileReference = z.infer<typeof FileReferenceSchema>;
export type Document = z.infer<typeof DocumentSchema>;
export type PersonDocumentType = z.infer<typeof PersonDocumentTypeSchema>;
export type PersonDocument = z.infer<typeof PersonDocumentSchema>;
export type Person = z.infer<typeof PersonSchema>;
export type IndividualOwnerType = z.infer<typeof IndividualOwnerTypeSchema>;
export type IndividualOwner = z.infer<typeof IndividualOwnerSchema>;
export type BusinessType = z.infer<typeof BusinessTypeSchema>;
export type BusinessSubType = z.infer<typeof BusinessSubTypeSchema>;
export type BusinessTypeInfo = z.infer<typeof BusinessTypeInfoSchema>;
export type BusinessIndustry = z.infer<typeof BusinessIndustrySchema>;
export type BusinessIncorporation = z.infer<typeof BusinessIncorporationSchema>;
export type BusinessName = z.infer<typeof BusinessNameSchema>;
export type BusinessNameType = z.infer<typeof BusinessNameTypeSchema>;
export type BusinessNameDetail = z.infer<typeof BusinessNameDetailSchema>;
export type EmailAddress = z.infer<typeof EmailAddressSchema>;
export type Email = z.infer<typeof EmailSchema>;
export type BusinessAddressType = z.infer<typeof BusinessAddressTypeSchema>;
export type BusinessAddressDetail = z.infer<typeof BusinessAddressDetailSchema>;
export type BusinessPhoneType = z.infer<typeof BusinessPhoneTypeSchema>;
export type BusinessPhoneDetail = z.infer<typeof BusinessPhoneDetailSchema>;
export type BusinessDocumentType = z.infer<typeof BusinessDocumentTypeSchema>;
export type BusinessDocument = z.infer<typeof BusinessDocumentSchema>;
export type PercentageOfOwnership = z.infer<typeof PercentageOfOwnershipSchema>;
export type IndividualBeneficialOwner = z.infer<typeof IndividualBeneficialOwnerSchema>;
export type BusinessBeneficialOwner = z.infer<typeof BusinessBeneficialOwnerSchema>;
export type BeneficialOwners = z.infer<typeof BeneficialOwnersSchema>;
export type OfficeBearerRole = z.infer<typeof OfficeBearerRoleSchema>;
export type OfficeBearer = z.infer<typeof OfficeBearerSchema>;
export type CurrencyRange = z.infer<typeof CurrencyRangeSchema>;
export type BusinessEntity = z.infer<typeof BusinessEntitySchema>;
export type Account = z.infer<typeof AccountSchema>;
export type Language = z.infer<typeof LanguageSchema>;
export type PartnerConfigOverride = z.infer<typeof PartnerConfigOverrideSchema>;
export type IdentifierType = z.infer<typeof IdentifierTypeSchema>;
export type Identifier = z.infer<typeof IdentifierSchema>;
export type Mandate = z.infer<typeof MandateSchema>;
export type Bank = z.infer<typeof BankSchema>;
export type FinancialInstruments = z.infer<typeof FinancialInstrumentsSchema>;
export type ClassicApiIntegration = z.infer<typeof ClassicApiIntegrationSchema>;
export type RestEndpointFeaturesEnum = z.infer<typeof RestEndpointFeaturesEnumSchema>;
export type RestApiIntegration = z.infer<typeof RestApiIntegrationSchema>;
export type IntegrationDetails = z.infer<typeof IntegrationDetailsSchema>;
export type BillingExperiencePreference = z.infer<typeof BillingExperiencePreferenceSchema>;
export type BillingAgreement = z.infer<typeof BillingAgreementSchema>;
export type Operation = z.infer<typeof OperationSchema>;
export type Product = z.infer<typeof ProductSchema>;
export type Capabilities = z.infer<typeof CapabilitiesSchema>;
export type DependentProcess = z.infer<typeof DependentProcessSchema>;
export type LegalConsent = z.infer<typeof LegalConsentSchema>;
export type TransferMethodType = z.infer<typeof TransferMethodTypeSchema>;
export type TransferMethod = z.infer<typeof TransferMethodSchema>;
export type CountryTransferMethodCurrencySelection = z.infer<typeof CountryTransferMethodCurrencySelectionSchema>;
export type PayoutAttributes = z.infer<typeof PayoutAttributesSchema>;
export type ReferralData = z.infer<typeof ReferralDataSchema>;
export type CreateReferralDataResponse = z.infer<typeof CreateReferralDataResponseSchema>;
export type ReferralDataResponse = z.infer<typeof ReferralDataResponseSchema>;
export type _400 = z.infer<typeof _400Schema>;
export type _401 = z.infer<typeof _401Schema>;
export type _403 = z.infer<typeof _403Schema>;
export type _422 = z.infer<typeof _422Schema>;
export type ErrorDefault = z.infer<typeof ErrorDefaultSchema>;
export type Error404 = z.infer<typeof Error404Schema>;
export type Error409 = z.infer<typeof Error409Schema>;
export type Error415 = z.infer<typeof Error415Schema>;
export type Error500 = z.infer<typeof Error500Schema>;
export type Error503 = z.infer<typeof Error503Schema>;
export type PartnerReferralIdParameter = z.infer<typeof PartnerReferralIdParameterSchema>;
export type Business = z.infer<typeof BusinessSchema>;