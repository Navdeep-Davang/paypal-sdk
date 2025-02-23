// checkout_orders_v2 ts types 

// Total 203 ts types 

import { z } from 'zod';
import {
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
} from '../schema/checkout_orders_v2';

export type ErrorDetails = z.infer<typeof ErrorDetailsSchema>;
export type ErrorLocation = z.infer<typeof ErrorLocationSchema>;
export type ErrorDefault = z.infer<typeof ErrorDefaultSchema>;
export type Error400 = z.infer<typeof Error400Schema>;
export type Error401 = z.infer<typeof Error401Schema>;
export type Error403 = z.infer<typeof Error403Schema>;
export type Error404 = z.infer<typeof Error404Schema>;
export type Error409 = z.infer<typeof Error409Schema>;
export type Error415 = z.infer<typeof Error415Schema>;
export type Error422 = z.infer<typeof Error422Schema>;
export type Error500 = z.infer<typeof Error500Schema>;
export type Error503 = z.infer<typeof Error503Schema>;
export type CheckoutPaymentIntent = z.infer<typeof CheckoutPaymentIntentSchema>;
export type Email = z.infer<typeof EmailSchema>;
export type AccountId = z.infer<typeof AccountIdSchema>;
export type PayerBase = z.infer<typeof PayerBaseSchema>;
export type Name = z.infer<typeof NameSchema>;
export type PhoneType = z.infer<typeof PhoneTypeSchema>;
export type Phone = z.infer<typeof PhoneSchema>;
export type PhoneWithType = z.infer<typeof PhoneWithTypeSchema>;
export type DateNoTime = z.infer<typeof DateNoTimeSchema>;
export type TaxInfo = z.infer<typeof TaxInfoSchema>;
export type CountryCode = z.infer<typeof CountryCodeSchema>;
export type AddressPortable = z.infer<typeof AddressPortableSchema>;
export type Payer = z.infer<typeof PayerSchema>;
export type CurrencyCode = z.infer<typeof CurrencyCodeSchema>;
export type Money = z.infer<typeof MoneySchema>;
export type AmountBreakdown = z.infer<typeof AmountBreakdownSchema>;
export type PayeeBase = z.infer<typeof PayeeBaseSchema>;
export type Payee = z.infer<typeof PayeeSchema>;
export type PlatformFee = z.infer<typeof PlatformFeeSchema>;
export type DisbursementMode = z.infer<typeof DisbursementModeSchema>;
export type PaymentInstruction = z.infer<typeof PaymentInstructionSchema>;
export type Item = z.infer<typeof ItemSchema>;
export type ShippingType = z.infer<typeof ShippingTypeSchema>;
export type ShippingOption = z.infer<typeof ShippingOptionSchema>;
export type ShippingDetail = z.infer<typeof ShippingDetailSchema>;
export type Level2CardProcessingData = z.infer<typeof Level2CardProcessingDataSchema>;
export type LineItem = z.infer<typeof LineItemSchema>;
export type Level3CardProcessingData = z.infer<typeof Level3CardProcessingDataSchema>;
export type CardSupplementaryData = z.infer<typeof CardSupplementaryDataSchema>;
export type SupplementaryData = z.infer<typeof SupplementaryDataSchema>;
export type PurchaseUnitRequest = z.infer<typeof PurchaseUnitRequestSchema>;
export type InstrumentId = z.infer<typeof InstrumentIdSchema>;
export type DateYearMonth = z.infer<typeof DateYearMonthSchema>;
export type CardBrand = z.infer<typeof CardBrandSchema>;
export type CardType = z.infer<typeof CardTypeSchema>;
export type MerchantPartnerCustomerId = z.infer<typeof MerchantPartnerCustomerIdSchema>;
export type Customer = z.infer<typeof CustomerSchema>;
export type StoreInVaultInstruction = z.infer<typeof StoreInVaultInstructionSchema>;
export type VaultInstructionBase = z.infer<typeof VaultInstructionBaseSchema>;
export type CardAttributes = z.infer<typeof CardAttributesSchema>;
export type Card = z.infer<typeof CardSchema>;
export type VaultId = z.infer<typeof VaultIdSchema>;
export type PaymentInitiator = z.infer<typeof PaymentInitiatorSchema>;
export type StoredPaymentSourcePaymentType = z.infer<typeof StoredPaymentSourcePaymentTypeSchema>;
export type StoredPaymentSourceUsageType = z.infer<typeof StoredPaymentSourceUsageTypeSchema>;
export type NetworkTransactionReference = z.infer<typeof NetworkTransactionReferenceSchema>;
export type CardStoredCredential = z.infer<typeof CardStoredCredentialSchema>;
export type EciFlag = z.infer<typeof EciFlagSchema>;
export type NetworkTokenRequest = z.infer<typeof NetworkTokenRequestSchema>;
export type Url = z.infer<typeof UrlSchema>;
export type CardExperienceContext = z.infer<typeof CardExperienceContextSchema>;
export type CardRequest = z.infer<typeof CardRequestSchema>;
export type Token = z.infer<typeof TokenSchema>;
export type Name2 = z.infer<typeof Name2Schema>;
export type CountryCode2 = z.infer<typeof CountryCode2Schema>;
export type AddressPortable2 = z.infer<typeof AddressPortable2Schema>;
export type PaypalWalletCustomer = z.infer<typeof PaypalWalletCustomerSchema>;
export type VaultOwnerId = z.infer<typeof VaultOwnerIdSchema>;
export type VaultPaypalWalletBase = z.infer<typeof VaultPaypalWalletBaseSchema>;
export type PaypalWalletAttributes = z.infer<typeof PaypalWalletAttributesSchema>;
export type Language = z.infer<typeof LanguageSchema>;
export type PaypalWalletExperienceContext = z.infer<typeof PaypalWalletExperienceContextSchema>;
export type BillingAgreementId = z.infer<typeof BillingAgreementIdSchema>;
export type PaypalWallet = z.infer<typeof PaypalWalletSchema>;
export type FullName = z.infer<typeof FullNameSchema>;
export type ExperienceContextBase = z.infer<typeof ExperienceContextBaseSchema>;
export type AltpayRecurringAttributesRequest = z.infer<typeof AltpayRecurringAttributesRequestSchema>;
export type BancontactRequest = z.infer<typeof BancontactRequestSchema>;
export type IpAddress = z.infer<typeof IpAddressSchema>;
export type BlikExperienceContext = z.infer<typeof BlikExperienceContextSchema>;
export type BlikSeamless = z.infer<typeof BlikSeamlessSchema>;
export type BlikOneClick = z.infer<typeof BlikOneClickSchema>;
export type BlikRequest = z.infer<typeof BlikRequestSchema>;
export type EpsRequest = z.infer<typeof EpsRequestSchema>;
export type GiropayRequest = z.infer<typeof GiropayRequestSchema>;
export type Bic = z.infer<typeof BicSchema>;
export type IdealRequest = z.infer<typeof IdealRequestSchema>;
export type MybankRequest = z.infer<typeof MybankRequestSchema>;
export type P24Request = z.infer<typeof P24RequestSchema>;
export type SofortRequest = z.infer<typeof SofortRequestSchema>;
export type TrustlyRequest = z.infer<typeof TrustlyRequestSchema>;
export type CurrencyCode2 = z.infer<typeof CurrencyCode2Schema>;
export type Money2 = z.infer<typeof Money2Schema>;
export type ApplePayPaymentData = z.infer<typeof ApplePayPaymentDataSchema>;
export type ApplePayDecryptedTokenData = z.infer<typeof ApplePayDecryptedTokenDataSchema>;
export type ApplePayAttributes = z.infer<typeof ApplePayAttributesSchema>;
export type ApplePayRequest = z.infer<typeof ApplePayRequestSchema>;
export type GooglePayRequest = z.infer<typeof GooglePayRequestSchema>;
export type VenmoWalletExperienceContext = z.infer<typeof VenmoWalletExperienceContextSchema>;
export type V3VaultInstructionBase = z.infer<typeof V3VaultInstructionBaseSchema>;
export type VaultVenmoWalletBase = z.infer<typeof VaultVenmoWalletBaseSchema>;
export type VenmoWalletAttributes = z.infer<typeof VenmoWalletAttributesSchema>;
export type VenmoWalletRequest = z.infer<typeof VenmoWalletRequestSchema>;
export type PaymentSource = z.infer<typeof PaymentSourceSchema>;
export type PayeePaymentMethodPreference = z.infer<typeof PayeePaymentMethodPreferenceSchema>;
export type PaymentMethod = z.infer<typeof PaymentMethodSchema>;
export type StoredPaymentSource = z.infer<typeof StoredPaymentSourceSchema>;
export type OrderApplicationContext = z.infer<typeof OrderApplicationContextSchema>;
export type OrderRequest = z.infer<typeof OrderRequestSchema>;
export type DateTime = z.infer<typeof DateTimeSchema>;
export type ActivityTimestamps = z.infer<typeof ActivityTimestampsSchema>;
export type LiabilityShift = z.infer<typeof LiabilityShiftSchema>;
export type ParesStatus = z.infer<typeof ParesStatusSchema>;
export type Enrolled = z.infer<typeof EnrolledSchema>;
export type ThreeDSecureAuthenticationResponse = z.infer<typeof ThreeDSecureAuthenticationResponseSchema>;
export type AuthenticationFlow = z.infer<typeof AuthenticationFlowSchema>;
export type ExemptionDetails = z.infer<typeof ExemptionDetailsSchema>;
export type AuthenticationResponse = z.infer<typeof AuthenticationResponseSchema>;
export type LinkDescription = z.infer<typeof LinkDescriptionSchema>;
export type VaultResponse = z.infer<typeof VaultResponseSchema>;
export type CardAttributesResponse = z.infer<typeof CardAttributesResponseSchema>;
export type CardFromRequest = z.infer<typeof CardFromRequestSchema>;
export type BinDetails = z.infer<typeof BinDetailsSchema>;
export type CardResponse = z.infer<typeof CardResponseSchema>;
export type AccountId2 = z.infer<typeof AccountId2Schema>;
export type PhoneType2 = z.infer<typeof PhoneType2Schema>;
export type Phone2 = z.infer<typeof Phone2Schema>;
export type PaypalWalletVaultResponse = z.infer<typeof PaypalWalletVaultResponseSchema>;
export type CobrandedCard = z.infer<typeof CobrandedCardSchema>;
export type PaypalWalletAttributesResponse = z.infer<typeof PaypalWalletAttributesResponseSchema>;
export type PaypalWalletResponse = z.infer<typeof PaypalWalletResponseSchema>;
export type IbanLastChars = z.infer<typeof IbanLastCharsSchema>;
export type AltpayRecurringAttributes = z.infer<typeof AltpayRecurringAttributesSchema>;
export type Bancontact = z.infer<typeof BancontactSchema>;
export type BlikOneClickResponse = z.infer<typeof BlikOneClickResponseSchema>;
export type Blik = z.infer<typeof BlikSchema>;
export type Eps = z.infer<typeof EpsSchema>;
export type Giropay = z.infer<typeof GiropaySchema>;
export type Ideal = z.infer<typeof IdealSchema>;
export type Mybank = z.infer<typeof MybankSchema>;
export type P24 = z.infer<typeof P24Schema>;
export type Sofort = z.infer<typeof SofortSchema>;
export type Trustly = z.infer<typeof TrustlySchema>;
export type VenmoWalletAttributesResponse = z.infer<typeof VenmoWalletAttributesResponseSchema>;
export type VenmoWalletResponse = z.infer<typeof VenmoWalletResponseSchema>;
export type PaymentSourceResponse = z.infer<typeof PaymentSourceResponseSchema>;
export type ProcessingInstruction = z.infer<typeof ProcessingInstructionSchema>;
export type TrackerStatus = z.infer<typeof TrackerStatusSchema>;
export type UniversalProductCode = z.infer<typeof UniversalProductCodeSchema>;
export type TrackerItem = z.infer<typeof TrackerItemSchema>;
export type Tracker = z.infer<typeof TrackerSchema>;
export type ShippingWithTrackingDetails = z.infer<typeof ShippingWithTrackingDetailsSchema>;
export type AuthorizationStatusDetails = z.infer<typeof AuthorizationStatusDetailsSchema>;
export type AuthorizationStatus = z.infer<typeof AuthorizationStatusSchema>;
export type SellerProtection = z.infer<typeof SellerProtectionSchema>;
export type Authorization = z.infer<typeof AuthorizationSchema>;
export type ProcessorResponse = z.infer<typeof ProcessorResponseSchema>;
export type AuthorizationWithAdditionalData = z.infer<typeof AuthorizationWithAdditionalDataSchema>;
export type CaptureStatusDetails = z.infer<typeof CaptureStatusDetailsSchema>;
export type CaptureStatus = z.infer<typeof CaptureStatusSchema>;
export type ExchangeRate = z.infer<typeof ExchangeRateSchema>;
export type SellerReceivableBreakdown = z.infer<typeof SellerReceivableBreakdownSchema>;
export type Capture = z.infer<typeof CaptureSchema>;
export type RefundStatusDetails = z.infer<typeof RefundStatusDetailsSchema>;
export type RefundStatus = z.infer<typeof RefundStatusSchema>;
export type NetAmountBreakdownItem = z.infer<typeof NetAmountBreakdownItemSchema>;
export type Refund = z.infer<typeof RefundSchema>;
export type PaymentCollection = z.infer<typeof PaymentCollectionSchema>;
export type PurchaseUnit = z.infer<typeof PurchaseUnitSchema>;
export type OrderStatus = z.infer<typeof OrderStatusSchema>;
export type Order = z.infer<typeof OrderSchema>;
export type Patch = z.infer<typeof PatchSchema>;
export type PatchRequest = z.infer<typeof PatchRequestSchema>;
export type OrdersPatch400 = z.infer<typeof OrdersPatch400Schema>;
export type OrdersPatch422 = z.infer<typeof OrdersPatch422Schema>;
export type OrderConfirmApplicationContext = z.infer<typeof OrderConfirmApplicationContextSchema>;
export type ConfirmOrderRequest = z.infer<typeof ConfirmOrderRequestSchema>;
export type OrdersConfirm400 = z.infer<typeof OrdersConfirm400Schema>;
export type OrdersConfirm422 = z.infer<typeof OrdersConfirm422Schema>;
export type OrderAuthorizeRequest = z.infer<typeof OrderAuthorizeRequestSchema>;
export type OrderAuthorizeResponse = z.infer<typeof OrderAuthorizeResponseSchema>;
export type OrdersAuthorize400 = z.infer<typeof OrdersAuthorize400Schema>;
export type OrdersAuthorize403 = z.infer<typeof OrdersAuthorize403Schema>;
export type OrdersAuthorize422 = z.infer<typeof OrdersAuthorize422Schema>;
export type OrderCaptureRequest = z.infer<typeof OrderCaptureRequestSchema>;
export type OrdersCapture400 = z.infer<typeof OrdersCapture400Schema>;
export type OrdersCapture403 = z.infer<typeof OrdersCapture403Schema>;
export type OrdersCapture422 = z.infer<typeof OrdersCapture422Schema>;
export type ShipmentTrackingNumberType = z.infer<typeof ShipmentTrackingNumberTypeSchema>;
export type ShipmentTrackingStatus = z.infer<typeof ShipmentTrackingStatusSchema>;
export type ShipmentCarrier = z.infer<typeof ShipmentCarrierSchema>;
export type ShipmentTracker = z.infer<typeof ShipmentTrackerSchema>;
export type OrderTrackerRequest = z.infer<typeof OrderTrackerRequestSchema>;
export type OrdersTrackCreate400 = z.infer<typeof OrdersTrackCreate400Schema>;
export type OrdersTrackCreate403 = z.infer<typeof OrdersTrackCreate403Schema>;
export type OrdersTrackCreate422 = z.infer<typeof OrdersTrackCreate422Schema>;
export type OrdersTrackersPatch400 = z.infer<typeof OrdersTrackersPatch400Schema>;
export type OrdersTrackersPatch403 = z.infer<typeof OrdersTrackersPatch403Schema>;
export type OrdersTrackersPatch404 = z.infer<typeof OrdersTrackersPatch404Schema>;
export type OrdersTrackersPatch422 = z.infer<typeof OrdersTrackersPatch422Schema>;