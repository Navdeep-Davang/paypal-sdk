import { z } from 'zod';
import {
  ErrorDetailsSchema,
  ErrorLocationSchema,
  ErrorLinkDescriptionSchema,
  MerchantPartnerCustomerIdSchema,
  CustomerSchema,
  VaultIdSchema,
  CardBrand,
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
  IdParameterSchema,
  Error400Schema,
  Error401Schema,
  Error403Schema,
  Error404Schema,
  Error409Schema,
  Error415Schema,
  Error422Schema,
  Error500Schema,
  Error503Schema,
  _3DsResultSchema,
} from '../schema/vault_payment_tokens_v3';

export type ErrorDetails = z.infer<typeof ErrorDetailsSchema>;
export type ErrorLocation = z.infer<typeof ErrorLocationSchema>;
export type ErrorLinkDescription = z.infer<typeof ErrorLinkDescriptionSchema>;
export type MerchantPartnerCustomerId = z.infer<typeof MerchantPartnerCustomerIdSchema>;
export type Customer = z.infer<typeof CustomerSchema>;
export type VaultId = z.infer<typeof VaultIdSchema>;
export type CardBrandType = z.infer<typeof CardBrand>;
export type CardBrandSchemaType = z.infer<typeof CardBrandSchema>;
export type DateYearMonth = z.infer<typeof DateYearMonthSchema>;
export type AddressEntity = z.infer<typeof AddressEntitySchema>;
export type CardVerificationStatus = z.infer<typeof CardVerificationStatusSchema>;
export type DateTime = z.infer<typeof DateTimeSchema>;
export type CurrencyCode = z.infer<typeof CurrencyCodeSchema>;
export type Money = z.infer<typeof MoneySchema>;
export type ProcessorResponse = z.infer<typeof ProcessorResponseSchema>;
export type ThreeDSResult = z.infer<typeof ThreeDSResultSchema>;
export type ACHDebitResponse = z.infer<typeof ACHDebitResponseSchema>;
export type CardVerificationDetails = z.infer<typeof CardVerificationDetailsSchema>;
export type CardResponse = z.infer<typeof CardResponseSchema>;
export type Name = z.infer<typeof NameSchema>;
export type CountryCode = z.infer<typeof CountryCodeSchema>;
export type AddressPortable = z.infer<typeof AddressPortableSchema>;
export type ShippingDetail = z.infer<typeof ShippingDetailSchema>;
export type WalletBase = z.infer<typeof WalletBaseSchema>;
export type Email = z.infer<typeof EmailSchema>;
export type AccountId = z.infer<typeof AccountIdSchema>;
export type PayerBase = z.infer<typeof PayerBaseSchema>;
export type PhoneType = z.infer<typeof PhoneTypeSchema>;
export type Phone = z.infer<typeof PhoneSchema>;
export type PhoneWithType = z.infer<typeof PhoneWithTypeSchema>;
export type DateNoTime = z.infer<typeof DateNoTimeSchema>;
export type TaxInfo = z.infer<typeof TaxInfoSchema>;
export type Payer = z.infer<typeof PayerSchema>;
export type PayPalWalletResponse = z.infer<typeof PayPalWalletResponseSchema>;
export type VenmoResponse = z.infer<typeof VenmoResponseSchema>;
export type InstrumentId = z.infer<typeof InstrumentIdSchema>;
export type CardType = z.infer<typeof CardTypeSchema>;
export type Card = z.infer<typeof CardSchema>;
export type ApplePayCard = z.infer<typeof ApplePayCardSchema>;
export type ApplePayPaymentTokenResponse = z.infer<typeof ApplePayPaymentTokenResponseSchema>;
export type ACHDebitResponse2 = z.infer<typeof ACHDebitResponse2Schema>;
export type ACHDebitVerificationStatus = z.infer<typeof ACHDebitVerificationStatusSchema>;
export type BankResponse = z.infer<typeof BankResponseSchema>;
export type LinkDescription = z.infer<typeof LinkDescriptionSchema>;
export type PaymentTokenResponse = z.infer<typeof PaymentTokenResponseSchema>;
export type CustomerVaultPaymentTokensResponse = z.infer<typeof CustomerVaultPaymentTokensResponseSchema>;
export type ErrorDetails2 = z.infer<typeof ErrorDetails2Schema>;
export type Error = z.infer<typeof ErrorSchema>;
export type CardVerificationMethod = z.infer<typeof CardVerificationMethodSchema>;
export type Language = z.infer<typeof LanguageSchema>;
export type VaultInstruction = z.infer<typeof VaultInstructionSchema>;
export type ExperienceContext = z.infer<typeof ExperienceContextSchema>;
export type CardRequest = z.infer<typeof CardRequestSchema>;
export type TokenAttributes = z.infer<typeof TokenAttributesSchema>;
export type TokenIdRequest = z.infer<typeof TokenIdRequestSchema>;
export type Metadata = z.infer<typeof MetadataSchema>;
export type PaymentTokenRequest = z.infer<typeof PaymentTokenRequestSchema>;
export type PayPalWalletRequest = z.infer<typeof PayPalWalletRequestSchema>;
export type VenmoRequest = z.infer<typeof VenmoRequestSchema>;
export type SetupTokenRequest = z.infer<typeof SetupTokenRequestSchema>;
export type Ordinal = z.infer<typeof OrdinalSchema>;
export type PaymentTokenStatus = z.infer<typeof PaymentTokenStatusSchema>;
export type SetupTokenResponse = z.infer<typeof SetupTokenResponseSchema>;
export type PayPalRequestIdParameter = z.infer<typeof PayPalRequestIdParameterSchema>;
export type CustomerIdParameter = z.infer<typeof CustomerIdParameterSchema>;
export type PageSizeParameter = z.infer<typeof PageSizeParameterSchema>;
export type PageParameter = z.infer<typeof PageParameterSchema>;
export type TotalRequiredParameter = z.infer<typeof TotalRequiredParameterSchema>;
export type IdParameter = z.infer<typeof IdParameterSchema>;
export type Error400 = z.infer<typeof Error400Schema>;
export type Error401 = z.infer<typeof Error401Schema>;
export type Error403 = z.infer<typeof Error403Schema>;
export type Error404 = z.infer<typeof Error404Schema>;
export type Error409 = z.infer<typeof Error409Schema>;
export type Error415 = z.infer<typeof Error415Schema>;
export type Error422 = z.infer<typeof Error422Schema>;
export type Error500 = z.infer<typeof Error500Schema>;
export type Error503 = z.infer<typeof Error503Schema>;
export type _3DsResult = z.infer<typeof _3DsResultSchema>;