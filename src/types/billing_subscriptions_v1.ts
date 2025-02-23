import { z } from 'zod';
import {
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
  LanguageSchema,
} from '../schema/billing_subscriptions_v1';

export type ErrorDetails = z.infer<typeof ErrorDetailsSchema>;
export type ErrorLinkDescription = z.infer<typeof ErrorLinkDescriptionSchema>;
export type CurrencyCode = z.infer<typeof CurrencyCodeSchema>;
export type Money = z.infer<typeof MoneySchema>;
export type PricingTier = z.infer<typeof PricingTierSchema>;
export type DateTime = z.infer<typeof DateTimeSchema>;
export type Frequency = z.infer<typeof FrequencySchema>;
export type BillingCycle = z.infer<typeof BillingCycleSchema>;
export type PaymentPreferences = z.infer<typeof PaymentPreferencesSchema>;
export type Percentage = z.infer<typeof PercentageSchema>;
export type Taxes = z.infer<typeof TaxesSchema>;
export type LinkDescription = z.infer<typeof LinkDescriptionSchema>;
export type Plan = z.infer<typeof PlanSchema>;
export type PlanCollection = z.infer<typeof PlanCollectionSchema>;
export type PlanRequestPOST = z.infer<typeof PlanRequestPOSTSchema>;
export type Patch = z.infer<typeof PatchSchema>;
export type PatchRequest = z.infer<typeof PatchRequestSchema>;
export type UpdatePricingSchemeRequest = z.infer<typeof UpdatePricingSchemeRequestSchema>;
export type UpdatePricingSchemesListRequest = z.infer<typeof UpdatePricingSchemesListRequestSchema>;
export type Email = z.infer<typeof EmailSchema>;
export type AccountId = z.infer<typeof AccountIdSchema>;
export type Name = z.infer<typeof NameSchema>;
export type PhoneType = z.infer<typeof PhoneTypeSchema>;
export type Phone = z.infer<typeof PhoneSchema>;
export type PhoneWithType = z.infer<typeof PhoneWithTypeSchema>;
export type DateNoTime = z.infer<typeof DateNoTimeSchema>;
export type TaxInfo = z.infer<typeof TaxInfoSchema>;
export type CountryCode = z.infer<typeof CountryCodeSchema>;
export type AddressPortable = z.infer<typeof AddressPortableSchema>;
export type AddressDetails = z.infer<typeof AddressDetailsSchema>;
export type PayerBase = z.infer<typeof PayerBaseSchema>;
export type Payer = z.infer<typeof PayerSchema>;
export type ShippingDetail = z.infer<typeof ShippingDetailSchema>;
export type DateYearMonth = z.infer<typeof DateYearMonthSchema>;
export type CardBrand = z.infer<typeof CardBrandSchema>;
export type Card = z.infer<typeof CardSchema>;
export type PaymentSource = z.infer<typeof PaymentSourceSchema>;
export type SubscriberRequest = z.infer<typeof SubscriberRequestSchema>;
export type Language = z.infer<typeof LanguageSchema>;
export type PayeePaymentMethodPreference = z.infer<typeof PayeePaymentMethodPreferenceSchema>;
export type PaymentMethod = z.infer<typeof PaymentMethodSchema>;
export type ApplicationContext = z.infer<typeof ApplicationContextSchema>;
export type BillingCycleOverride = z.infer<typeof BillingCycleOverrideSchema>;
export type PaymentPreferencesOverride = z.infer<typeof PaymentPreferencesOverrideSchema>;
export type TaxesOverride = z.infer<typeof TaxesOverrideSchema>;
export type PlanOverride = z.infer<typeof PlanOverrideSchema>;
export type SubscriptionRequestPOST = z.infer<typeof SubscriptionRequestPOSTSchema>;
export type SubscriptionStatus = z.infer<typeof SubscriptionStatusSchema>;
export type LiabilityShift = z.infer<typeof LiabilityShiftSchema>;
export type ParesStatus = z.infer<typeof ParesStatusSchema>;
export type Enrolled = z.infer<typeof EnrolledSchema>;
export type ThreeDSecureAuthenticationResponse = z.infer<typeof ThreeDSecureAuthenticationResponseSchema>;
export type AuthenticationResponse = z.infer<typeof AuthenticationResponseSchema>;
export type CardResponse = z.infer<typeof CardResponseSchema>;
export type CardResponseWithBillingAddress = z.infer<typeof CardResponseWithBillingAddressSchema>;
export type PaymentSourceResponse = z.infer<typeof PaymentSourceResponseSchema>;
export type Subscriber = z.infer<typeof SubscriberSchema>;
export type CycleExecution = z.infer<typeof CycleExecutionSchema>;
export type LastPaymentDetails = z.infer<typeof LastPaymentDetailsSchema>;
export type FailedPaymentDetails = z.infer<typeof FailedPaymentDetailsSchema>;
export type SubscriptionBillingInfo = z.infer<typeof SubscriptionBillingInfoSchema>;
export type Subscription = z.infer<typeof SubscriptionSchema>;
export type SubscriptionsCreate400 = z.infer<typeof SubscriptionsCreate400Schema>;
export type SubscriptionsPatch400 = z.infer<typeof SubscriptionsPatch400Schema>;
export type SubscriptionsRevise400 = z.infer<typeof SubscriptionsRevise400Schema>;
export type SubscriptionsSuspend400 = z.infer<typeof SubscriptionsSuspend400Schema>;
export type SubscriptionsCancel400 = z.infer<typeof SubscriptionsCancel400Schema>;
export type SubscriptionsActivate400 = z.infer<typeof SubscriptionsActivate400Schema>;
export type SubscriptionsCapture400 = z.infer<typeof SubscriptionsCapture400Schema>;
export type SubscriptionsTransactions400 = z.infer<typeof SubscriptionsTransactions400Schema>;
export type SubscriptionReviseRequest = z.infer<typeof SubscriptionReviseRequestSchema>;
export type SubscriptionSuspendRequest = z.infer<typeof SubscriptionSuspendRequestSchema>;
export type SubscriptionActivateRequest = z.infer<typeof SubscriptionActivateRequestSchema>;
export type AmountWithBreakdown = z.infer<typeof AmountWithBreakdownSchema>;
export type CaptureStatusDetails = z.infer<typeof CaptureStatusDetailsSchema>;
export type CaptureStatus = z.infer<typeof CaptureStatusSchema>;
export type Transaction = z.infer<typeof TransactionSchema>;
export type TransactionsList = z.infer<typeof TransactionsListSchema>;
export type _400 = z.infer<typeof _400Schema>;
export type _401 = z.infer<typeof _401Schema>;
export type _403 = z.infer<typeof _403Schema>;
export type _404 = z.infer<typeof _404Schema>;
export type _422 = z.infer<typeof _422Schema>;
export type ErrorDefault = z.infer<typeof ErrorDefaultSchema>;
export type Error404 = z.infer<typeof Error404Schema>;
export type Error409 = z.infer<typeof Error409Schema>;
export type Error415 = z.infer<typeof Error415Schema>;
export type Error500 = z.infer<typeof Error500Schema>;
export type Error503 = z.infer<typeof Error503Schema>;
export type PlansCreate400 = z.infer<typeof PlansCreate400Schema>;
export type PlansPatch422 = z.infer<typeof PlansPatch422Schema>;
export type PlansActivate422 = z.infer<typeof PlansActivate422Schema>;
export type PlansDeactivate422 = z.infer<typeof PlansDeactivate422Schema>;
export type PlansUpdatePricingSchemes400 = z.infer<typeof PlansUpdatePricingSchemes400Schema>;
export type PlansUpdatePricingSchemes422 = z.infer<typeof PlansUpdatePricingSchemes422Schema>;
export type SubscriptionsCreate422 = z.infer<typeof SubscriptionsCreate422Schema>;
export type SubscriptionsPatch422 = z.infer<typeof SubscriptionsPatch422Schema>;
export type SubscriptionReviseResponse = z.infer<typeof SubscriptionReviseResponseSchema>;
export type SubscriptionsRevise404 = z.infer<typeof SubscriptionsRevise404Schema>;
export type SubscriptionsRevise422 = z.infer<typeof SubscriptionsRevise422Schema>;
export type SubscriptionsSuspend422 = z.infer<typeof SubscriptionsSuspend422Schema>;
export type SubscriptionsCancel422 = z.infer<typeof SubscriptionsCancel422Schema>;
export type SubscriptionsActivate422 = z.infer<typeof SubscriptionsActivate422Schema>;
export type SubscriptionCaptureRequest = z.infer<typeof SubscriptionCaptureRequestSchema>;
export type SubscriptionsCapture422 = z.infer<typeof SubscriptionsCapture422Schema>;

//Parameter Types
export type PreferParameter = z.infer<typeof PreferParameterSchema>;
export type PaypalRequestIdParameter = z.infer<typeof PaypalRequestIdParameterSchema>;
export type ProductIdParameter = z.infer<typeof ProductIdParameterSchema>;
export type PlanIdsParameter = z.infer<typeof PlanIdsParameterSchema>;
export type PageSizeParameter = z.infer<typeof PageSizeParameterSchema>;
export type PageParameter = z.infer<typeof PageParameterSchema>;
export type TotalRequiredParameter = z.infer<typeof TotalRequiredParameterSchema>;
export type IdParameter = z.infer<typeof IdParameterSchema>;
export type FieldsParameter = z.infer<typeof FieldsParameterSchema>;
export type StartTimeParameter = z.infer<typeof StartTimeParameterSchema>;
export type EndTimeParameter = z.infer<typeof EndTimeParameterSchema>;